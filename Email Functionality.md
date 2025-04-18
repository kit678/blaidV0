# Email Functionality Documentation

This document provides a detailed analysis of the email functionality in the Blaide website, which uses the Resend email service provider. It covers the complete flow from contact form submission to email delivery, including both the notification email to the admin and the feedback email to the user.

## Overall Architecture

The email functionality follows this general flow:

1. User submits a contact form on the website
2. Form data is validated on the frontend
3. Contact message is stored in Firebase Firestore
4. Email data is sent to a backend API endpoint
5. The backend uses Resend's SDK to send two emails:
   - A notification email to the admin
   - A confirmation email to the user
6. Success/error status is returned to the frontend
7. User receives feedback via toast notification

## Environment Configuration

The email service relies on the following environment variables:

```
VITE_RESEND_API_KEY=re_iszndcoK_2MvbWUEVEhfwPi3fHbW1Tp5d
VITE_CONTACT_EMAIL=kit.shukla88@gmail.com
VITE_API_BASE_URL=/api
```

These are loaded by the application through the environment configuration module:

```typescript
// src/config/environment.ts
function buildConfig() {
  const isDev = getMode() !== 'production';
  return {
    apiBaseUrl: isDev ? 'http://localhost:3001' : '/api',
    emailService: {
      from: getEnv('VITE_CONTACT_EMAIL'),
      adminEmail: getEnv('VITE_ADMIN_EMAIL'),
      resendApiKey: getEnv('VITE_RESEND_API_KEY')
    }
  };
}
```

## Contact Form Implementation

The contact form is implemented in both App.tsx and PrevApp.tsx with similar functionality. The form collects:

- Name (required)
- Email (required)
- Phone (optional)
- Division (optional, pre-filled when navigating from a division section)
- Message (required)

### Form HTML Structure

```jsx
<form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 flex-grow flex flex-col overflow-auto">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="flex flex-col">
      <label htmlFor="name" className="block text-sm font-medium mb-1 text-white">Name</label>
      <input
        type="text"
        id="name"
        required
        className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none focus-visible:ring-0 text-white"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
    </div>
    
    <div className="flex flex-col">
      <label htmlFor="email" className="block text-sm font-medium mb-1 text-white">Email</label>
      <input
        type="email"
        id="email"
        required
        className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none focus-visible:ring-0 text-white"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
    </div>
  </div>
  
  <!-- Other form fields -->
  
  <button
    type="submit"
    disabled={isSubmitting}
    className={`w-full ${
      isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
    } text-white font-bold py-3 px-8 rounded-full transition-colors focus:outline-none focus-visible:ring-0 shadow-lg`}
  >
    {isSubmitting ? 'Sending...' : 'Send Message'}
  </button>
</form>
```

## Form Submission Flow

### 1. Frontend Validation

When the form is submitted, the `handleSubmit` function performs initial validation:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const config = getEnvironmentConfig();

  // Basic validation
  if (!formData.name || !formData.email || !formData.message) {
    toast.error('Please fill all required fields');
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    toast.error('Please enter a valid email address');
    return;
  }

  setIsSubmitting(true);

  try {
    // Process submission
    // ...
  } catch (error) {
    console.error('Error sending message:', error);
    toast.error('Failed to send message. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
```

### 2. Firestore Storage

After validation passes, the contact message is stored in Firebase Firestore:

```typescript
// Update Firestore
await addContactMessage({
  name: formData.name,
  email: formData.email,
  phone: formData.phone || null,
  division: formData.division,
  message: formData.message,
  created_at: new Date(),
  is_read: false
});
```

The `addContactMessage` function is defined in `src/services/firestore.ts`:

```typescript
export async function addContactMessage(message: ContactMessage) {
  try {
    const docRef = await addDoc(collection(db, 'contact_messages'), {
      ...message,
      created_at: serverTimestamp() // Use server timestamp for consistency
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding document to Firestore:', error);
    throw error;
  }
}
```

### 3. Email API Call

After storing the message in Firestore, the frontend makes an API call to send emails:

```typescript
// Send email through API
await sendEmail({
  to: config.emailService.adminEmail,
  from_name: formData.name,
  from_email: formData.email,
  subject: `New message from ${formData.name}`,
  message: formData.message,
  division: formData.division,
  phone: formData.phone || undefined
});
```

The `sendEmail` function is defined in `src/lib/email.ts`:

```typescript
export async function sendEmail(data: EmailData) {
  const config = getEnvironmentConfig();
  try {
    const response = await fetch(`${config.apiBaseUrl}/sendEmail`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send email');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
```

### 4. Backend API Handler

The backend handles the email request differently depending on the environment:

#### Development (Local) Environment

In development, the request is handled by `src/api/sendEmail.local.ts`:

```typescript
export async function POST(req: Request, res: Response, apiKey: string) {
  const config = getEnvironmentConfig();
  try {
    const resend = new Resend(apiKey);
    const body = req.body as EmailRequestBody;

    // Send email to admin
    const { data: adminEmailData, error: adminEmailError } = await resend.emails.send({
      from: config.emailService.from,
      to: body.to,
      reply_to: body.from_email,
      subject: `New Contact Form Submission: ${body.subject}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>From:</strong> ${body.from_name} (${body.from_email})</p>
        <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
        <p><strong>Division:</strong> ${body.division}</p>
        <p><strong>Subject:</strong> ${body.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${body.message}</p>
      `,
    });

    if (adminEmailError) {
      console.error('Admin email error:', adminEmailError);
      return res.status(500).json({ error: adminEmailError.message });
    }

    // Send confirmation email to user
    const { error: userEmailError } = await resend.emails.send({
      from: config.emailService.from,
      to: body.from_email,
      subject: 'Thank you for contacting Blaide',
      html: `
        <h1>Thank you for contacting Blaide</h1>
        <p>Dear ${body.from_name},</p>
        <p>Thanks for contacting Blaide. We will get back to you shortly.</p>
        <p>Best regards,<br>The Blaide Team</p>
      `,
    });

    if (userEmailError) {
      console.error('User confirmation email error:', userEmailError);
      // Don't return error here as the main email was sent successfully
    }

    return res.status(200).json({ success: true, id: adminEmailData?.id });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
```

#### Production (Vercel) Environment

In production, the serverless function in `api/sendEmail.vercel.ts` handles the request:

```typescript
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const apiKey = process.env.VITE_RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Resend API key not configured' });
  }

  try {
    const resend = new Resend(apiKey);
    const body = req.body as EmailRequestBody;

    // Skip Firestore update in Vercel environment
    console.log('Skipping Firestore update in Vercel environment');

    const fromAddress = process.env.VITE_CONTACT_EMAIL || 'noreply@example.com';
    const adminAddress = process.env.VITE_ADMIN_EMAIL || 'admin@example.com';

    // Send email to admin
    const { data: adminEmailData, error: adminEmailError } = await resend.emails.send({
      from: fromAddress,
      to: adminAddress,
      reply_to: body.from_email,
      subject: `New Contact Form Submission: ${body.subject}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>From:</strong> ${body.from_name} (${body.from_email})</p>
        <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
        <p><strong>Division:</strong> ${body.division}</p>
        <p><strong>Subject:</strong> ${body.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${body.message}</p>
      `,
    });

    if (adminEmailError) {
      console.error('Admin email error:', adminEmailError);
      return res.status(500).json({ error: adminEmailError.message });
    }

    // Send confirmation email to user
    const { error: userEmailError } = await resend.emails.send({
      from: fromAddress,
      to: body.from_email,
      subject: 'Thank you for contacting Blaide',
      html: `
        <h1>Thank you for contacting Blaide</h1>
        <p>Dear ${body.from_name},</p>
        <p>Thanks for contacting Blaide. We will get back to you shortly.</p>
        <p>Best regards,<br>The Blaide Team</p>
      `,
    });

    if (userEmailError) {
      console.error('User confirmation email error:', userEmailError);
      // Don't return error here as the main email was sent successfully
    }

    return res.status(200).json({ success: true, id: adminEmailData?.id });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
```

## Email Content

### Admin Notification Email

The admin receives an email with the following content:

- **Subject**: "New Contact Form Submission: {subject}"
- **From**: The configured email address in VITE_CONTACT_EMAIL
- **Reply-To**: The visitor's email address
- **Body HTML**:
  ```html
  <h1>New Contact Form Submission</h1>
  <p><strong>From:</strong> {visitor's name} ({visitor's email})</p>
  <p><strong>Phone:</strong> {visitor's phone or 'Not provided'}</p>
  <p><strong>Division:</strong> {selected division}</p>
  <p><strong>Subject:</strong> {email subject}</p>
  <p><strong>Message:</strong></p>
  <p>{visitor's message}</p>
  ```

### User Confirmation Email

The visitor receives a confirmation email with the following content:

- **Subject**: "Thank you for contacting Blaide"
- **From**: The configured email address in VITE_CONTACT_EMAIL
- **Body HTML**:
  ```html
  <h1>Thank you for contacting Blaide</h1>
  <p>Dear {visitor's name},</p>
  <p>Thanks for contacting Blaide. We will get back to you shortly.</p>
  <p>Best regards,<br>The Blaide Team</p>
  ```

## User Experience

1. User fills out the contact form 
2. User submits the form
3. Form shows a "Sending..." button state while the request is processing
4. On success, a toast notification displays "Message sent successfully!"
5. The form fields are cleared for potential future submissions
6. A confirmation email arrives in the user's inbox

## Admin Experience

1. Admin receives a notification email with all the form details
2. The email has the user's email set as the Reply-To, enabling direct response
3. The contact message is stored in Firebase Firestore for later reference
4. Admin can access all messages through the admin panel
5. Admin can mark messages as read in the admin panel

## Error Handling

The application implements several error handling mechanisms:

1. **Frontend validation** prevents submission of invalid data
2. **Toast notifications** inform the user of any errors
3. **Console logging** records detailed error information for debugging
4. **Error prioritization** ensures that if the admin email is sent but the confirmation email fails, the submission is still considered successful

## Implementation Notes

1. In the Vercel production environment, Firestore updates are skipped in the API handler since they're already handled on the frontend
2. The application uses environment variables to configure email addresses and API keys
3. The Resend SDK is used to send emails through their API
4. Both HTML emails are simple and straightforward for maximum compatibility

## Technical Requirements for Replication

To replicate this functionality in a new website, you'll need:

1. A Resend account with an API key
2. Firebase Firestore for storing contact messages (optional)
3. Environment variables for configuration
4. Frontend form validation
5. API endpoints for email sending
6. Error handling mechanisms
