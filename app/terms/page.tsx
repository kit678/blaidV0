import React from 'react';

export default function TermsOfServicePage() {
  const operatorName = 'Pulkit Shukla'; // Match the name used in other policies
  const contactEmail = 'pulkit@blaidelabs.com'; // Match the email used in other policies
  const privacyPolicyLink = '/privacy'; // Link to the privacy policy

  return (
    <div className="container mx-auto px-4 md:px-16 py-16 pt-32 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-invert max-w-none text-white/80">
        <p>
          <em>Last updated: {new Date().toLocaleDateString()}</em>
        </p>

        <p>
          Welcome to the website of {operatorName} ("we," "us," or "our"). These Terms of Service ("Terms") govern your access to and use of our website (the "Site"). Please read these Terms carefully.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Acceptance of Terms</h2>
        <p>
          By accessing or using our Site, you agree to be bound by these Terms and our <a href={privacyPolicyLink} className="text-indigo-400 hover:underline">Privacy Policy</a>. If you do not agree to these Terms or the Privacy Policy, please do not access or use the Site.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">2. Use of the Site & Intellectual Property</h2>
        <p>
          The Site and its original content, features, and functionality are owned by {operatorName} and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
        </p>
        <p>
           Permission is granted to access and use the Site for personal, non-commercial informational purposes only. This is a grant of a license, not a transfer of title, and under this license you may not:
        </p>
        <ul className="list-disc pl-6">
            <li>Modify or copy the materials;</li>
            <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>Attempt to decompile or reverse engineer any software contained on the Site;</li>
            <li>Remove any copyright or other proprietary notations from the materials; or</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
        </ul>
         <p>
           This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time.
         </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">3. Disclaimers</h2>
        <p>
          The information and materials on the Site are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>
        <p>
          Further, we do not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on the Site or otherwise relating to such materials or on any sites linked to this site. The information provided is for general informational purposes only and does not constitute professional advice.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Limitations of Liability</h2>
        <p>
          In no event shall {operatorName} or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the Site or the materials on the Site, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">5. Third-Party Links</h2>
        <p>
            The Site may contain links to third-party web sites or services that are not owned or controlled by us (e.g., social media links). We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. You further acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">6. Modifications to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will alert you about any changes by updating the "Last updated" date of these Terms. Your continued use of the Site after any such changes constitutes your acceptance of the new Terms.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">7. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of the Province of Alberta and the federal laws of Canada applicable therein, without regard to its conflict of law provisions. You irrevocably submit to the exclusive jurisdiction of the courts in the Province of Alberta.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">8. Contact Us</h2>
        <p>
           If you have any questions about these Terms, please contact us at: <a href={`mailto:${contactEmail}`} className="text-indigo-400 hover:underline">{contactEmail}</a>
        </p>
        
        <p className="mt-8 text-sm text-white/60">
          **Disclaimer:** These Terms of Service provide a general framework. They are not a substitute for professional legal advice. You should consult with a qualified legal professional to ensure these Terms are appropriate for your specific business activities and comply with all applicable laws.
        </p>
      </div>
    </div>
  );
} 