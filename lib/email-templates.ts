import { ContactFormData } from './firebase';
import { config } from './config';

export function generateAdminEmailHtml(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
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
            background-color: #000;
            padding: 20px;
            text-align: center;
            color: white;
            margin-bottom: 20px;
          }
          .logo {
            max-height: 80px;
          }
          .content {
            background-color: #f9f9f9;
            border-radius: 5px;
            padding: 20px;
          }
          h1 {
            color: #000;
            font-size: 24px;
            margin-bottom: 20px;
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
        </style>
      </head>
      <body>
        <div class="header">
          <img src="${config.siteInfo.url}/logov3.svg" alt="Blaide Logo" class="logo">
          <h1>New Contact Form Submission</h1>
        </div>
        
        <div class="content">
          <div class="field">
            <span class="label">From:</span>
            ${data.name} (${data.email})
          </div>
          
          <div class="field">
            <span class="label">Phone:</span>
            ${data.phone || 'Not provided'}
          </div>
          
          <div class="field">
            <span class="label">Company:</span>
            ${data.company || 'Not provided'}
          </div>
          
          <div class="field">
            <span class="label">Services:</span>
            ${data.services.join(', ')}
          </div>
          
          <div class="field">
            <span class="label">Timeline:</span>
            ${data.timeline}
          </div>
          
          <div class="field">
            <span class="label">Budget:</span>
            ${data.budget}
          </div>
          
          <div class="field">
            <span class="label">Message:</span>
            <p>${data.message || 'No additional message provided'}</p>
          </div>
        </div>
        
        <div class="footer">
          <p>This message was sent from the contact form on ${config.siteInfo.name} website.</p>
        </div>
      </body>
    </html>
  `;
}

export function generateUserEmailHtml(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank you for contacting ${config.siteInfo.name}</title>
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
            background-color: #000;
            padding: 20px;
            text-align: left;
            color: white;
            margin-bottom: 20px;
          }
          .logo {
            max-height: 80px;
          }
          .content {
            background-color: #f9f9f9;
            border-radius: 5px;
            padding: 20px;
          }
          h1 {
            color: #000;
            font-size: 24px;
            margin-bottom: 20px;
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
            color: #666;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="${config.siteInfo.url}/logov3.svg" alt="Blaide Logo" class="logo">
          <h1>Thank You for Contacting Us</h1>
        </div>
        
        <div class="content">
          <p>Dear ${data.name},</p>
          
          <p>Thank you for reaching out to us about your ${data.services.join(', ')} needs. We appreciate your interest in ${config.siteInfo.name} and are excited about the possibility of working with you.</p>
          
          <p>Our team will review your submission and get back to you within 1-2 business days to discuss how we can help with your project.</p>
          
          <p>If you need immediate assistance, please feel free to reply to this email or contact our support team.</p>
          
          <div class="signature">
            <p>Best Regards,<br>
            Blaide Innovation Labs<br>
            ${config.email.contactEmail}<br>
            (+1) 929-228-7526</p>
          </div>
        </div>
        
        <div class="footer">
          <p>${config.siteInfo.name} | Innovation & Strategy</p>
          <p><a href="${config.siteInfo.url}">${config.siteInfo.url}</a></p>
          <div class="social-links">
            <a href="#">LinkedIn</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </body>
    </html>
  `;
} 