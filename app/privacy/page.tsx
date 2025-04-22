import React from 'react';

export default function PrivacyPolicyPage() {
  // TODO: Replace 'Your Name / Operating Name' with your actual name or registered business name
  const operatorName = 'Pulkit Shukla'; 
  // TODO: Replace with your actual contact email
  const contactEmail = 'pulkit@blaidelabs.com'; 
  // TODO: Update this link once the Cookie Policy/Section exists
  const cookiePolicyLink = '/cookies'; 

  return (
    <div className="container mx-auto px-4 md:px-16 py-16 pt-32 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-invert max-w-none text-white/80">
        <p>
          <em>Last updated: {new Date().toLocaleDateString()}</em>
        </p>

        <p>
          Welcome. This Privacy Policy explains how {operatorName} ("we," "us," or "our") collects, uses, discloses, and safeguards your information when you visit our website (the "Site"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
        </p>
        <p>
          We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of this Privacy Policy. 
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
        <p>
          We may collect information about you in a variety of ways. The information we may collect on the Site includes:
        </p>
        <h3 className="text-xl font-medium mt-4 mb-2">Personal Data</h3>
        <p>
          Personally identifiable information, such as your name, email address, phone number, company name, project timeline, project budget, and the reason for your inquiry, that you voluntarily give to us when you submit an inquiry through our contact form. You are under no obligation to provide us with personal information of any kind, however your refusal to do so may prevent you from using certain features of the Site, such as submitting inquiries.
        </p>
        <h3 className="text-xl font-medium mt-4 mb-2">Derivative Data & Analytics</h3>
        <p>
          Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site. We also plan to use Vercel Analytics, which collects aggregated and anonymized usage data to help us understand website traffic and user activity. This data does not typically include personally identifiable information.
        </p>
        <h3 className="text-xl font-medium mt-4 mb-2">Data from Social Networks</h3>
        <p>
         Our website includes social media sharing buttons. If you interact with these features, the respective social network may collect information such as your IP address and which page you are visiting on our Site, and may set a cookie to enable the feature to function properly. Your interactions with these features are governed by the privacy policy of the company providing it.
        </p>


        <h2 className="text-2xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
        <p>
          Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
        </p>
        <ul className="list-disc pl-6">
          <li>Respond to your inquiries submitted via the contact form.</li>
          <li>Email you regarding your inquiry or potential services.</li>
          <li>Understand how users interact with our Site through analytics to improve user experience and service offerings.</li>
          <li>Comply with legal and regulatory requirements.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">3. Disclosure of Your Information</h2>
        <p>
          We do not sell, trade, or rent your personal identification information to others. We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
        </p>
        <h3 className="text-xl font-medium mt-4 mb-2">By Law or to Protect Rights</h3>
        <p>
          If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
        </p>
        <h3 className="text-xl font-medium mt-4 mb-2">Third-Party Service Providers</h3>
        <p>
          We may share your information with third parties that perform services for us or on our behalf, including data storage, email delivery, and website analytics. Specifically:
        </p>
        <ul className="list-disc pl-6">
          <li><strong>Contact Form Submission & Email:</strong> We use Resend (Resend Inc.) to process and deliver emails initiated through our contact form. Your submitted information (name, email, phone, company, inquiry details, etc.) will be processed by Resend to facilitate communication.</li>
          <li><strong>Data Storage:</strong> Contact form submissions are stored in a Firebase database (provided by Google). Google has its own privacy policies and security measures.</li>
          <li><strong>Analytics:</strong> We plan to use Vercel Analytics (Vercel Inc.) to analyze the use of our Site. Vercel Analytics collects usage data which is typically anonymized or aggregated.</li>
          <li><strong>Social Media Features:</strong> As mentioned, social media buttons are provided by third-party social networks.</li>
        </ul>
        <p>
          We take steps to ensure these third-party service providers have appropriate privacy and security measures in place, but we are not responsible for the actions of third parties with whom you share personal or sensitive data independently of our Site.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Storage and Security of Your Information</h2>
         <p>
           We use administrative, technical, and physical security measures to help protect your personal information. Data submitted via the contact form is stored on Firebase infrastructure. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse. Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information.
         </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">5. Use of Cookies and Tracking Technologies</h2>
        <p>
          We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience. When you access the Site, your personal information is not collected through the use of tracking technology. 
        </p>
        <p>
          Specifically, we anticipate using cookies for:
        </p>
         <ul className="list-disc pl-6">
           <li><strong>Analytics:</strong> Vercel Analytics may use cookies to collect anonymous usage data.</li>
           <li><strong>Functionality:</strong> Social media sharing buttons may use cookies to function correctly.</li>
         </ul>
        <p>
          Most browsers are set to accept cookies by default. You can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Site. For more information on our use of cookies, please refer to our <a href={cookiePolicyLink} className="text-indigo-400 hover:underline">Cookie Policy</a>.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">6. Your Rights Regarding Your Information</h2>
        <p>
          Under Canadian privacy legislation (such as PIPEDA and Alberta's PIPA), you have certain rights regarding your personal information. Subject to certain exceptions, you may have the right to:
        </p>
        <ul className="list-disc pl-6">
          <li>Request access to the personal information we hold about you.</li>
          <li>Request correction of inaccurate or incomplete personal information.</li>
          <li>Withdraw consent to our collection, use, or disclosure of your personal information (this may affect our ability to respond to inquiries or provide services).</li>
          <li>Request deletion of your personal information, subject to legal and contractual restrictions.</li>
        </ul>
        <p>
          To exercise these rights, please contact us using the contact information provided below. We may need to verify your identity before processing your request.
        </p>


        <h2 className="text-2xl font-semibold mt-6 mb-4">7. Policy for Children</h2>
         <p>
           We do not knowingly solicit information from or market to children under the age of 13 (or 16 in the EU/EEA). If you become aware of any data we have collected from children under the relevant age, please contact us using the contact information provided below.
         </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">8. Contacting Us</h2>
        <p>
          If you have any questions or comments about this Privacy Policy, please contact us at: <a href={`mailto:${contactEmail}`} className="text-indigo-400 hover:underline">{contactEmail}</a>
        </p>
        
        <p className="mt-8 text-sm text-white/60">
          **Disclaimer:** This Privacy Policy provides a general overview. While based on provided information and common practices, it is not a substitute for professional legal advice. You should consult with a qualified legal professional to ensure compliance with all applicable laws and regulations, especially considering your target audience and data collection practices.
        </p>
      </div>
    </div>
  );
} 