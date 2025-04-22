import React from 'react';
import { cn } from "@/lib/utils";

/**
 * Props for the Disclaimer component.
 */
interface DisclaimerProps {}

const disclaimerText = "Blaide Research's findings are preliminary and subject to peer review. Past observations are not indicative of future results. This is not investment advice. Proprietary methodology details remain confidential.";

/**
 * Disclaimer section component for the Research subdomain.
 * Displays the required disclaimer text.
 * @param props - The props for the component.
 * @returns The rendered disclaimer section.
 */
export const Disclaimer: React.FC<DisclaimerProps> = (props) => {
  return (
    <section className="py-8 w-full bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
          <strong>Disclaimer:</strong> {disclaimerText}
        </p>
      </div>
    </section>
  );
}; 