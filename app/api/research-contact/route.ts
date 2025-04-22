import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { config } from '@/lib/config';
import { 
  ResearchContactFormData, 
  generateResearchAdminEmailHtml, 
  generateResearchUserEmailHtml 
} from '@/lib/research-email-templates';
import { addResearchContactMessage } from '@/lib/firebase';

/**
 * Handler for POST requests to /api/research-contact
 * Processes research contact form submissions and sends notification emails
 */
export async function POST(request: Request) {
  try {
    // Parse the form data from the request
    const formData = await request.json() as ResearchContactFormData;
    console.log("Received Research Contact Form Data:", formData);

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
      await addResearchContactMessage(formData);
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
      from: `Blaide Research <${config.email.contactEmail}>`,
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
      from: `Blaide Research <${config.email.contactEmail}>`,
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