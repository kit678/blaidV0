// Configuration module for environment variables
export const config = {
  email: {
    resendApiKey: process.env.RESEND_API_KEY,
    contactEmail: process.env.CONTACT_EMAIL || 'noreply@blaide.com',
    adminEmail: process.env.ADMIN_EMAIL || 'admin@blaide.com',
  },
  siteInfo: {
    name: 'Blaide',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://blaide.com',
    logo: '/logo.png', // Update with your actual logo path
  }
}; 