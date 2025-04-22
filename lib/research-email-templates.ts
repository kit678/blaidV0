import { config } from './config';

export interface ResearchContactFormData {
  name: string;
  email: string;
  contactType: 'investor' | 'academic';
  company?: string;
  phone?: string;
  institution?: string;
  researchArea?: string;
  investorInquiry?: string;
  academicInquiry?: string;
  message: string;
}

/**
 * Generate HTML for the admin notification email for research contact form submissions
 */
export function generateResearchAdminEmailHtml(data: ResearchContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Research Contact Form Submission</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(to right, #4f46e5, #7c3aed);
            padding: 20px;
            text-align: center;
            color: white;
            margin-bottom: 20px;
            border-radius: 8px;
          }
          .logo {
            max-height: 80px;
          }
          .content {
            background-color: #f9f9f9;
            border-radius: 8px;
            padding: 20px;
          }
          h1 {
            color: white;
            font-size: 24px;
            margin-bottom: 10px;
          }
          h2 {
            color: #4f46e5;
            font-size: 20px;
            margin-top: 0;
          }
          .field {
            margin-bottom: 15px;
          }
          .label {
            font-weight: bold;
            margin-right: 5px;
          }
          .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #666;
            text-align: center;
          }
          .contact-type {
            display: inline-block;
            padding: 4px 12px;
            background-color: #4f46e5;
            color: white;
            border-radius: 20px;
            font-size: 14px;
            margin-bottom: 15px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="${config.siteInfo.url}/logov3.svg" alt="Blaide Logo" class="logo">
          <h1>New Research Contact Submission</h1>
          <h2>Blaide Research Division</h2>
        </div>
        
        <div class="content">
          <div class="contact-type">
            ${data.contactType === 'investor' ? 'Investor Contact' : 'Academic Contact'}
          </div>

          <div class="field">
            <span class="label">From:</span>
            ${data.name} (${data.email})
          </div>
          
          ${data.phone ? `
          <div class="field">
            <span class="label">Phone:</span>
            ${data.phone}
          </div>
          ` : ''}
          
          ${data.company ? `
          <div class="field">
            <span class="label">Company:</span>
            ${data.company}
          </div>
          ` : ''}

          ${data.institution ? `
          <div class="field">
            <span class="label">Institution:</span>
            ${data.institution}
          </div>
          ` : ''}

          ${data.researchArea ? `
          <div class="field">
            <span class="label">Research Area:</span>
            ${data.researchArea}
          </div>
          ` : ''}

          ${data.investorInquiry ? `
          <div class="field">
            <span class="label">Inquiry Type:</span>
            ${formatInquiryType(data.investorInquiry)}
          </div>
          ` : ''}
          
          ${data.academicInquiry ? `
          <div class="field">
            <span class="label">Inquiry Type:</span>
            ${formatInquiryType(data.academicInquiry)}
          </div>
          ` : ''}
          
          <div class="field">
            <span class="label">Message:</span>
            <p>${data.message || 'No additional message provided'}</p>
          </div>
        </div>
        
        <div class="footer">
          <p>This message was sent from the research contact form on research.blaidelabs.com</p>
        </div>
      </body>
    </html>
  `;
}

/**
 * Generate HTML for the confirmation email sent to users who submit the research contact form
 */
export function generateResearchUserEmailHtml(data: ResearchContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank you for contacting Blaide Research</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(to right, #4f46e5, #7c3aed);
            padding: 20px;
            text-align: left;
            color: white;
            margin-bottom: 20px;
            border-radius: 8px;
          }
          .logo {
            max-height: 80px;
          }
          .content {
            background-color: #f9f9f9;
            border-radius: 8px;
            padding: 20px;
          }
          h1 {
            color: white;
            font-size: 24px;
            margin-bottom: 10px;
          }
          h2 {
            color: white;
            font-size: 20px;
            margin-top: 0;
            opacity: 0.9;
          }
          .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #666;
            text-align: center;
          }
          .signature {
            margin-top: 30px;
          }
          .social-links {
            margin-top: 15px;
          }
          .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #4f46e5;
            text-decoration: none;
          }
          .contact-details {
            background-color: #f0f0f0;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
          }
          .contact-details h3 {
            margin-top: 0;
            color: #4f46e5;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="${config.siteInfo.url}/logov3.svg" alt="Blaide Logo" class="logo">
          <h1>Thank You for Contacting Blaide Research</h1>
          <h2>Uncovering Hidden Rhythms in Financial Markets</h2>
        </div>
        
        <div class="content">
          <p>Dear ${data.name},</p>
          
          <p>Thank you for your interest in Blaide Research. We've received your inquiry as a <strong>${data.contactType === 'investor' ? 'potential investor' : 'academic researcher'}</strong>.</p>
          
          <p>Our team will review your message and respond within 1-2 business days. We look forward to discussing how our research in market periodicity and cyclical pattern analysis might align with your interests.</p>

          ${data.investorInquiry === 'schedule_demo' ? `
          <div class="contact-details">
            <h3>Regarding Your Demo Request</h3>
            <p>We'll be in touch shortly to schedule a personalized demonstration of our research methodologies and findings. Please have your availability handy for the next week.</p>
          </div>
          ` : ''}
          
          <p>If you need immediate assistance, please feel free to reply to this email or call our research division directly.</p>
          
          <div class="signature">
            <p>Best Regards,<br>
            The Blaide Research Team<br>
            ${config.email.contactEmail}<br>
            research.blaidelabs.com</p>
          </div>
        </div>
        
        <div class="footer">
          <p>Blaide Research | Financial Market Analysis & Predictive Analytics</p>
          <p><a href="https://research.blaidelabs.com">research.blaidelabs.com</a></p>
          <div class="social-links">
            <a href="#">LinkedIn</a>
            <a href="#">Twitter</a>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Format inquiry types for more readable display in emails
 */
function formatInquiryType(inquiryType: string): string {
  const formattedTypes: Record<string, string> = {
    // Investor inquiry types
    'schedule_demo': 'Schedule a Demonstration',
    'data_access': 'Data Access Inquiry',
    'investment_ops': 'Investment Opportunities',
    'general': 'General Question',
    
    // Academic inquiry types
    'collaboration': 'Collaboration Inquiry',
    'whitepaper': 'Whitepaper Questions',
    'methodology': 'Methodology Inquiry',
    'data_request': 'Data Request',
  };
  
  return formattedTypes[inquiryType] || inquiryType;
} 