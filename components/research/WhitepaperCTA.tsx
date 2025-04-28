import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui Button
import { Download } from 'lucide-react';

/**
 * Props for the WhitepaperCTA component.
 */
interface WhitepaperCTAProps {
  whitepaperUrl?: string; // Optional prop for the actual URL
}

/**
 * Whitepaper call-to-action section component for the Research subdomain.
 * @param props - The props for the component.
 * @returns The rendered whitepaper CTA section.
 */
export const WhitepaperCTA: React.FC<WhitepaperCTAProps> = ({ whitepaperUrl = '/BlaideResearchWhitePaper.pdf' }) => {
  // Use '/BlaideResearchWhitePaper.pdf' as default URL

  return (
    <section className="py-16 md:py-24 w-full bg-gradient-to-r from-slate-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Explore the Geometry of Markets
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Delve into the core principles guiding our research. Download our introductory whitepaper, "Geometric Principles in Predictive Market Analysis", for insights into the mathematical relationship between price, time, and market structure.
          </p>
          <Button
            asChild
            className="bg-white text-indigo-700 hover:bg-gray-100 dark:bg-white dark:text-indigo-700 dark:hover:bg-gray-100 py-6 px-8 rounded-full shadow-lg text-lg font-medium"
          >
            <a href={whitepaperUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
              <Download className="mr-2 h-5 w-5" />
              Download Whitepaper
            </a>
          </Button>
          <p className="mt-8 text-sm text-slate-400">
            For collaboration or institutional inquiries, contact <a href="mailto:research@blaide.com" className="underline hover:text-white">research@blaide.com</a>
          </p>
        </div>
      </div>
    </section>
  );
}; 