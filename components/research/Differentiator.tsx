import React from 'react';
import { cn } from "@/lib/utils";
// Consider adding an icon like Zap or Activity from lucide-react if appropriate

/**
 * Props for the Differentiator component.
 */
interface DifferentiatorProps {}

/**
 * Differentiator section component for the Research subdomain.
 * Explains the unique focus on market periodicity.
 * @param props - The props for the component.
 * @returns The rendered differentiator section.
 */
export const Differentiator: React.FC<DifferentiatorProps> = (props) => {
  return (
    <section className="py-16 md:py-24 w-full bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Our Differentiator: Synthesizing Price, Time & Geometry
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Conventional analysis often treats price action, time cycles, and chart patterns in isolation. Blaide Research integrates these dimensions, positing that markets unfold according to a quantifiable geometric and temporal structure.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Our methodology moves beyond statistical inference to identify deterministic patterns based on fixed time cycles, geometric proportions, and price-time equivalencies, revealing a deeper layer of market order.
            </p>
          </div>

          {/* Visual Element - REMOVED */}
          {/* 
          <div className="order-1 md:order-2 flex justify-center items-center h-64 md:h-80 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 rounded-xl p-8 shadow-md">
            <div className="text-center text-indigo-600 dark:text-indigo-300">
              <svg width="180" height="180" viewBox="0 0 180 180" className="mx-auto mb-4">
                <circle cx="90" cy="90" r="80" stroke="currentColor" strokeWidth="2" fill="none" 
                  className="opacity-70 animate-pulse" style={{ animationDuration: '4s' }} />
                <circle cx="90" cy="90" r="60" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4" 
                  className="opacity-60 animate-pulse" style={{ animationDuration: '6s' }} />
                <circle cx="90" cy="90" r="40" stroke="currentColor" strokeWidth="2" fill="none" 
                  className="opacity-50 animate-pulse" style={{ animationDuration: '8s' }} />
                <circle cx="90" cy="90" r="20" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="2" 
                  className="opacity-40 animate-pulse" style={{ animationDuration: '10s' }} />
              </svg>
              <p className="font-semibold">Integrated Temporal-Geometric Analysis</p>
            </div>
          </div>
          */}
        </div>
      </div>
    </section>
  );
}; 