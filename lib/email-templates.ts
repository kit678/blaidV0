import { ContactFormData } from '@/lib/firebase';
import { config } from './config';

// Helper to safely display optional fields
const displayField = (label: string, value: string | null | undefined) => {
  if (!value) return ''; // Don't display if null or empty
  // Display "Not Sure" as is, otherwise format normally
  const displayValue = value === 'Not Sure' ? 'Not Sure' : value;
  return `<p><strong>${label}:</strong> ${displayValue}</p>`;
};

// Helper to format slugs/IDs into readable names
const formatName = (name: string | null | undefined): string => {
  if (!name) return '';
  return name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export function generateAdminEmailHtml(formData: ContactFormData): string {
  // Determine the main subject/title for the email body
  let inquiryTitle = "New Contact Form Submission";
  if (formData.intent === 'demo' && formData.product) {
    inquiryTitle = `Demo Request: ${formatName(formData.product)}`;
  } else if (formData.intent === 'service_inquiry' && formData.service) {
    inquiryTitle = `Service Inquiry: ${formatName(formData.service)}`;
  } else if (formData.intent === 'general') {
      inquiryTitle = "General Inquiry" 
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        /* Basic styles */
        body { font-family: sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
        h1 { color: #000; }
        strong { color: #555; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>${inquiryTitle}</h1>
        <hr>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        ${displayField('Phone', formData.phone)}
        ${displayField('Company', formData.company)}
        ${formData.intent !== 'demo' ? displayField('Timeline', formData.timeline) : ''} 
        ${formData.intent !== 'demo' ? displayField('Budget', formData.budget) : ''}
        ${displayField('Message', formData.message)}
        
        <hr>
        <p><em>This email was sent from the contact form on your website.</em></p>
      </div>
    </body>
    </html>
  `;
}

export function generateUserEmailHtml(formData: ContactFormData): string {
   // Determine the context for the confirmation message
   let confirmationContext = "Your general inquiry has been received.";
   if (formData.intent === 'demo' && formData.product) {
     confirmationContext = `Your request for a demo of <strong>${formatName(formData.product)}</strong> has been received.`;
   } else if (formData.intent === 'service_inquiry' && formData.service) {
     confirmationContext = `Your inquiry about <strong>${formatName(formData.service)}</strong> has been received.`;
   }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
        h1 { color: #000; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Thank you for contacting Blaide, ${formData.name}!</h1>
        <p>${confirmationContext}</p>
        <p>We have received the following details:</p>
        <ul>
          <li><strong>Name:</strong> ${formData.name}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
          ${formData.phone ? `<li><strong>Phone:</strong> ${formData.phone}</li>` : ''}
          ${formData.company ? `<li><strong>Company:</strong> ${formData.company}</li>` : ''}
          ${formData.intent !== 'demo' && formData.timeline ? `<li><strong>Timeline:</strong> ${formData.timeline === 'Not Sure' ? 'Not Sure' : formData.timeline}</li>` : ''}
          ${formData.intent !== 'demo' && formData.budget ? `<li><strong>Budget:</strong> ${formData.budget === 'Not Sure' ? 'Not Sure' : formData.budget}</li>` : ''}
          ${formData.message ? `<li><strong>Message:</strong> ${formData.message}</li>` : ''}
        </ul>
        <p>Our team will review your submission and get back to you as soon as possible (usually within 1-2 business days).</p>
        <p>Best regards,<br>The Blaide Team</p>
      </div>
    </body>
    </html>
  `;
} 