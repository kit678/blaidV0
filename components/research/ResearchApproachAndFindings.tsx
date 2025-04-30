import React, { useRef } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Props for the ResearchApproachAndFindings component.
 * Includes props needed by the original WhitepaperCTA part.
 */
interface ResearchApproachAndFindingsProps {
  whitepaperUrl?: string; // Optional prop for the actual URL
}

/**
 * Combined section component for the Research subdomain.
 * Integrates Differentiator, Research Abstract, and Whitepaper CTA content.
 * @param props - The props for the component.
 * @returns The rendered combined section.
 */
const ResearchApproachAndFindingsComponent: React.FC<ResearchApproachAndFindingsProps> = ({ whitepaperUrl = '/BlaideResearchWhitePaper.pdf' }) => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const leftX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["-50%", "0%", "0%", "-50%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["50%", "0%", "0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} id="abstracts-section" className="py-16 md:py-24 w-full bg-white dark:bg-gray-800 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
            
            <motion.div 
              id="abstract-content" 
              className="w-full md:w-1/2" 
              style={{ x: leftX, opacity, willChange: 'transform, opacity' }}
            >
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 md:p-8 shadow-md text-left">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  A Structural Approach to Market Forecasting via Price-Time Geometry
                </h4>
                <p className="text-base text-gray-700 dark:text-gray-400 leading-relaxed">
                  This research investigates the hypothesis that financial market movements are governed by an underlying deterministic structure defined by the geometric relationship between price and time. Moving beyond purely statistical or stochastic models, our methodology integrates fixed geometric angle projections, harmonic time cycle analysis derived from natural periodicities, and the principle of price-time squaring to identify potential market turning points and trend trajectories. We present a framework for mapping key support/resistance levels and forecasting volatility shifts based on this intrinsic market architecture. Preliminary findings across various asset classes suggest that this temporal-geometric synthesis offers a distinct and potentially predictive lens for market analysis.
                </p>
              </div>
            </motion.div>

            <motion.div 
              id="deeper-content"
              className="w-full md:w-1/2 flex flex-col justify-center" 
              style={{ x: rightX, opacity, willChange: 'transform, opacity' }}
            >
              <div className="text-left">
                <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white text-center">
                  Dive Deeper
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto text-center">
                  Download our introductory whitepaper, "Geometric Principles in Predictive Market Analysis", for detailed insights into the mathematical relationship between price, time, and market structure.
                </p>
                <div className="flex justify-center">
                  <Button
                    asChild
                    className="bg-slate-800 text-white hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 py-3 px-8 rounded-lg shadow-md text-lg font-medium"
                  >
                    <a href={whitepaperUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                      <Download className="mr-2 h-5 w-5" />
                      Download Whitepaper
                    </a>
                  </Button>
                </div>
                <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
                  For collaboration or institutional inquiries, contact <a href="mailto:research@blaide.com" className="underline hover:text-gray-900 dark:hover:text-white">research@blaide.com</a>
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

// Export the component as default
export default ResearchApproachAndFindingsComponent; 