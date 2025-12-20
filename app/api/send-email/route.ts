import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { config } from '@/lib/config';
import { generateAdminEmailHtml, generateUserEmailHtml } from '@/lib/email-templates';
import { ContactFormData } from '@/lib/firebase';
import { addContactMessageAdmin, logFailedSubmission } from '@/lib/firebase-admin';

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as ContactFormData & { website_url?: string; cf_turnstile_response?: string };

    // 0. Security Checks

    // Honeypot Check
    if (body.website_url) {
      console.log("Honeypot triggered. Rejecting silently.");
      await logFailedSubmission("Honeypot", body, { ip: req.headers.get('x-forwarded-for') || 'unknown' });
      return NextResponse.json({ success: true, id: "honeypot" }); // Silent rejection
    }

    // Name Length Check (Suspiciously long single string)
    if (body.name && body.name.length > 20 && !body.name.includes(" ")) {
      console.log("Suspicious name format detected.");
      await logFailedSubmission("Invalid Name Format", body);
      return NextResponse.json({ error: 'Invalid name format' }, { status: 400 });
    }

    // Strict Phone Validation (Only digits, +, -, space, parenthesis)
    // If phone contains letters, reject.
    if (body.phone && /[a-zA-Z]/.test(body.phone)) {
      console.log("Invalid phone format detected (contains letters).");
      await logFailedSubmission("Invalid Phone Format", body);
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
    }

    // Turnstile Verification
    if (body.cf_turnstile_response) {
      // Allow bypass in development
      if (process.env.NODE_ENV === 'development' && body.cf_turnstile_response === 'test-token') {
        console.log("Turnstile bypass for testing in development.");
      } else {
        if (!TURNSTILE_SECRET_KEY) {
          console.error("TURNSTILE_SECRET_KEY is not set");
          return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
        }

        const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
        const verifyFormData = new URLSearchParams();
        verifyFormData.append('secret', TURNSTILE_SECRET_KEY);
        verifyFormData.append('response', body.cf_turnstile_response);
        verifyFormData.append('remoteip', req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || '');

        const verifyRes = await fetch(verifyUrl, {
          method: 'POST',
          body: verifyFormData,
        });

        const verifyData = await verifyRes.json();
        if (!verifyData.success) {
          console.error("Turnstile verification failed:", verifyData);
          await logFailedSubmission("Turnstile Failed", body, { error: JSON.stringify(verifyData) });
          return NextResponse.json({ error: 'Security check failed' }, { status: 400 });
        }
      }
    } else {
      // Enforce Turnstile
      console.error("Missing Turnstile response");
      await logFailedSubmission("Missing Turnstile", body);
      return NextResponse.json({ error: 'Security check required' }, { status: 400 });
    }

    // 1. Store the contact message in Firestore
    try {
      await addContactMessageAdmin(body);
    } catch (error) {
      console.error('Error storing contact message in Firestore:', error);
      // Continue with email sending even if Firestore fails
    }

    // 2. Initialize Resend
    const resendApiKey = config.email.resendApiKey;
    if (!resendApiKey) {
      console.error('Resend API key not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    // 3. Send admin notification email
    const adminEmail = config.email.adminEmail;
    if (!adminEmail) {
      console.error('Admin email not configured');
      return NextResponse.json(
        { error: 'Admin email not configured' },
        { status: 500 }
      );
    }

    // Generate a more informative subject line based on intent
    let subject = 'New Contact Form Submission';
    if (body.intent === 'demo' && body.product) {
      subject = `Demo Request: ${body.product.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
    } else if (body.intent === 'service_inquiry' && body.service) {
      subject = `Service Inquiry: ${body.service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
    } else if (body.name) {
      subject += ` from ${body.name}`
    }

    const { data: adminEmailData, error: adminEmailError } = await resend.emails.send({
      from: process.env.NODE_ENV === 'development' ? 'onboarding@resend.dev' : `Blaide Contact Form <${config.email.contactEmail}>`,
      to: adminEmail,
      replyTo: body.email,
      subject: subject,
      html: generateAdminEmailHtml(body),
    });

    if (adminEmailError) {
      console.error('Admin email error:', adminEmailError);
      return NextResponse.json(
        { error: adminEmailError.message },
        { status: 500 }
      );
    }

    // 4. Send confirmation email to user
    const { error: userEmailError } = await resend.emails.send({
      from: process.env.NODE_ENV === 'development' ? 'onboarding@resend.dev' : `Blaide <${config.email.contactEmail}>`,
      to: body.email,
      subject: 'Thank you for contacting Blaide',
      html: generateUserEmailHtml(body),
    });

    if (userEmailError) {
      console.error('User confirmation email error:', userEmailError);
      // Don't fail the whole process if only the confirmation email fails
    }

    return NextResponse.json({
      success: true,
      id: adminEmailData?.id
    });

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
