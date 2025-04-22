import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { config } from '@/lib/config';
import { generateAdminEmailHtml, generateUserEmailHtml } from '@/lib/email-templates';
import { addContactMessage, ContactFormData } from '@/lib/firebase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as ContactFormData;
    
    // 1. Store the contact message in Firestore
    try {
      await addContactMessage(body);
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
    
    const { data: adminEmailData, error: adminEmailError } = await resend.emails.send({
      from: `Blaide Contact Form <${config.email.contactEmail}>`,
      to: adminEmail,
      replyTo: body.email,
      subject: `New Contact Form Submission: ${body.services.join(', ')}`,
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
      from: `Blaide <${config.email.contactEmail}>`,
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