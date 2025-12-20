import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { config } from '@/lib/config';
import {
  ResearchContactFormData,
  generateResearchAdminEmailHtml,
  generateResearchUserEmailHtml
} from '@/lib/research-email-templates';
import { addResearchContactMessageAdmin, logFailedSubmission } from '@/lib/firebase-admin';

/**
 * Handler for POST requests to /api/research-contact
 * Processes research contact form submissions and sends notification emails
 */
export async function POST(request: Request) {
  try {
    // Parse the form data from the request
    const formData = await request.json() as ResearchContactFormData & { website_url?: string; cf_turnstile_response?: string };
    console.log("Received Research Contact Form Data:", formData);

    // 0. Security Checks

    // Honeypot Check
    if (formData.website_url) {
      console.log("Honeypot triggered. Rejecting silently.");
      await logFailedSubmission("Honeypot-Research", formData, { ip: request.headers.get('x-forwarded-for') || 'unknown' });
      return NextResponse.json({ message: "Form submitted successfully!", id: "honeypot" }, { status: 200 }); // Silent rejection
    }

    // Name Length Check
    if (formData.name && formData.name.length > 20 && !formData.name.includes(" ")) {
      console.log("Suspicious name format detected.");
      await logFailedSubmission("Invalid Name Format-Research", formData);
      return NextResponse.json({ message: "Invalid name format", error: "Invalid name format" }, { status: 400 });
    }

    // Strict Phone Validation
    if (formData.phone && /[a-zA-Z]/.test(formData.phone)) {
      console.log("Invalid phone format detected (contains letters).");
      await logFailedSubmission("Invalid Phone Format-Research", formData);
      return NextResponse.json({ message: "Invalid phone number", error: "Please provide a valid phone number" }, { status: 400 });
    }

    // Turnstile Verification
    const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
    if (formData.cf_turnstile_response) {
      // Allow bypass in development
      if (process.env.NODE_ENV === 'development' && formData.cf_turnstile_response === 'test-token') {
        console.log("Turnstile bypass for testing in development.");
      } else {
        if (!TURNSTILE_SECRET_KEY) {
          console.error("TURNSTILE_SECRET_KEY is not set");
          return NextResponse.json({ message: "Configuration error", error: "Server misconfiguration" }, { status: 500 });
        }

        const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
        const verifyFormData = new URLSearchParams();
        verifyFormData.append('secret', TURNSTILE_SECRET_KEY);
        verifyFormData.append('response', formData.cf_turnstile_response);

        const verifyRes = await fetch(verifyUrl, { // Pass request IP headers if possible, but optional
          method: 'POST',
          body: verifyFormData,
        });

        const verifyData = await verifyRes.json();
        if (!verifyData.success) {
          console.error("Turnstile verification failed:", verifyData);
          await logFailedSubmission("Turnstile Failed-Research", formData, { error: JSON.stringify(verifyData) });
          return NextResponse.json({ message: "Security check failed", error: "Please complete the captcha" }, { status: 400 });
        }
      }
    } else {
      console.error("Missing Turnstile response");
      await logFailedSubmission("Missing Turnstile-Research", formData);
      return NextResponse.json({ message: "Security check required", error: "Please complete the captcha" }, { status: 400 });
    }

    // Validate the request data
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json({
        message: "Missing required fields",
        error: "Name, email, and message are required"
      }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json({
        message: "Invalid email address",
        error: "Please provide a valid email address"
      }, { status: 400 });
    }

    // 1. Store the contact form data in Firebase
    try {
      await addResearchContactMessageAdmin(formData);
    } catch (error) {
      console.error('Error storing contact message in Firebase:', error);
      // Continue with email sending even if storage fails
    }

    // 2. Initialize Resend with API Key
    const resendApiKey = config.email.resendApiKey;
    if (!resendApiKey) {
      console.error('Resend API key not configured');
      return NextResponse.json(
        { message: "Email service not configured", error: "Server configuration error" },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    // Get admin email from config
    const adminEmail = config.email.adminEmail;
    if (!adminEmail) {
      console.error('Admin email not configured');
      return NextResponse.json(
        { message: "Admin email not configured", error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Determine inquiry type based on contact type
    const inquiryType = formData.contactType === 'investor'
      ? (formData.investorInquiry || 'General')
      : (formData.academicInquiry || 'General');

    // 3. Send email notification to admin
    const { data: adminEmailData, error: adminEmailError } = await resend.emails.send({
      from: process.env.NODE_ENV === 'development' ? 'onboarding@resend.dev' : `Blaide Research <${config.email.contactEmail}>`,
      to: adminEmail,
      replyTo: formData.email,
      subject: `New Research ${formData.contactType === 'investor' ? 'Investor' : 'Academic'} Inquiry: ${inquiryType}`,
      html: generateResearchAdminEmailHtml(formData),
    });

    if (adminEmailError) {
      console.error('Admin email error:', adminEmailError);
      return NextResponse.json(
        { message: "Failed to send notification email", error: adminEmailError.message },
        { status: 500 }
      );
    }

    // 4. Send confirmation email to the user
    const { error: userEmailError } = await resend.emails.send({
      from: process.env.NODE_ENV === 'development' ? 'onboarding@resend.dev' : `Blaide Research <${config.email.contactEmail}>`,
      to: formData.email,
      subject: 'Thank you for contacting Blaide Research',
      html: generateResearchUserEmailHtml(formData),
    });

    if (userEmailError) {
      console.error('User confirmation email error:', userEmailError);
      // Continue since the admin notification was sent successfully
    }

    // Return success response
    return NextResponse.json({
      message: "Form submitted successfully!",
      id: adminEmailData?.id
    }, { status: 200 });

  } catch (error) {
    console.error("Research Contact API Error:", error);
    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ message: "Failed to submit form", error: errorMessage }, { status: 500 });
  }
}

/**
 * Handler for GET requests to /api/research-contact
 * Provides status information about the API endpoint
 */
export async function GET(request: Request) {
  return NextResponse.json({
    message: "Research Contact API endpoint is active. Use POST to submit form data."
  }, { status: 200 });
} 