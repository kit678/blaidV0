import React from 'react';

export default function CookiePolicyPage() {
  // TODO: Replace with your actual contact email if different from privacy policy
  const contactEmail = 'pulkit@blaidelabs.com';
  const operatorName = 'Pulkit Shukla'; // Match the name used in Privacy Policy

  return (
    <div className="container mx-auto px-4 md:px-16 py-16 pt-32 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Cookie Policy</h1>
      
      <div className="prose prose-invert max-w-none text-white/80">
        <p>
          <em>Last updated: {new Date().toLocaleDateString()}</em>
        </p>

        <p>
          This Cookie Policy explains how {operatorName} ("we," "us," or "our") uses cookies and similar tracking technologies on our website (the "Site"). By using the Site, you consent to the use of cookies as described in this policy.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">1. What Are Cookies?</h2>
        <p>
          Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site. Cookies help us improve your experience on our Site by enabling certain functionalities and gathering usage statistics.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">2. How We Use Cookies</h2>
        <p>
          We use cookies and similar technologies for the following purposes:
        </p>
        <ul className="list-disc pl-6">
          <li>
            <strong>Analytics:</strong> We use Vercel Analytics to understand how visitors interact with our website. Vercel Analytics is designed to be privacy-focused and may collect anonymized or aggregated data about your visit (like pages viewed, duration, browser type) to help us improve the Site. It aims to do this without using traditional identifying cookies where possible.
          </li>
          <li>
            <strong>Third-Party / Social Media:</strong> Our Site includes social media sharing buttons (e.g., links to Twitter, LinkedIn). These features are provided by third-party social media platforms. If you interact with these buttons or are logged into these platforms while visiting our Site, they may place their own cookies on your device. These cookies might be used for tracking or functionality purposes defined by the respective platforms.
          </li>
          {/* Add other categories if you use cookies for preferences, security, etc. */}
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">3. Types of Cookies We Use</h2>
        <p>
           Given our use of Vercel Analytics and social media buttons, the following types of cookies might be encountered:
        </p>
        <ul className="list-disc pl-6">
           <li><strong>Analytical/Performance Cookies:</strong> These allow us to recognize and count the number of visitors and see how visitors move around our Site. This helps us improve the way our Site works. Vercel Analytics contributes to this.</li>
           <li><strong>Third-Party Cookies:</strong> These cookies are set by a domain other than our Site. As mentioned, social media platforms may set cookies when you use the sharing buttons on our Site. We do not control the setting of these cookies.</li>
        </ul>
        <p>
           We do not typically use cookies that store direct personal identification information ourselves.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Third-Party Cookies</h2>
        <p>
           Please note that third parties (such as social media platforms) may also use cookies, over which we have no control. These cookies are likely to be analytical/performance cookies or targeting cookies set by those platforms according to their own privacy and cookie policies. We recommend you review the policies of services like Twitter, LinkedIn, etc., for more information about their cookie practices.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">5. Managing Cookies</h2>
        <p>
          Most web browsers allow some control of most cookies through the browser settings. You can block cookies by activating the setting on your browser that allows you to refuse the setting of all or some cookies. However, if you use your browser settings to block all cookies (including essential cookies) you may not be able to access all or parts of our Site.
        </p>
        <p>
          To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">www.allaboutcookies.org</a>.
        </p>
        <p>
          Instructions for managing cookies in popular browsers can usually be found via their help menus or websites:
          {/* Optional: Add direct links to browser cookie settings pages */}
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">6. Changes to This Policy</h2>
        <p>
          We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">7. Contact Us</h2>
        <p>
          If you have any questions about our use of cookies, please contact us at: <a href={`mailto:${contactEmail}`} className="text-indigo-400 hover:underline">{contactEmail}</a>
        </p>
        
        <p className="mt-8 text-sm text-white/60">
          **Disclaimer:** This Cookie Policy provides a general overview. It is recommended to consult with a legal professional to ensure full compliance with relevant regulations (like GDPR, CCPA, ePrivacy Directive) applicable to your website and users.
        </p>
      </div>
    </div>
  );
} 