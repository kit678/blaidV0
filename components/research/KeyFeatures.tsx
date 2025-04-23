import React from 'react';
// import { LineChart, Target, ShieldCheck, BarChartBig, Bot } from 'lucide-react'; // Assuming lucide-react icons - Removed unused
import { cn } from "@/lib/utils";
import { TrendingUp, CalendarClock, Scale, Waves, Activity } from 'lucide-react';
import { motion } from 'framer-motion'; // Import motion
import { useScrollAnimation } from '@/hooks/use-scroll-animation'; // Import hook for animation

/**
 * Props for the KeyFeatures component.
 */
interface KeyFeaturesProps {}

const features = [
  {
    name: 'Geometric Angle Forecasting',
    icon: TrendingUp,
    description: 'Identifying dynamic support/resistance levels and trend channels based on fixed geometric angles derived from price action.'
  },
  {
    name: 'Cyclical Turning Point Identification',
    icon: CalendarClock,
    description: 'Pinpointing potential market reversals through the analysis of dominant, recurring time cycles and their harmonic relationships.'
  },
  {
    name: 'Price-Time Equilibrium Analysis',
    icon: Scale,
    description: 'Detecting zones of potential trend completion or initiation where price movement achieves mathematical equivalence with time duration.'
  },
  {
    name: 'Harmonic Resonance Mapping',
    icon: Waves,
    description: 'Mapping key price levels where market action exhibits numerical resonance, indicating potential support, resistance, or acceleration points.'
  },
];

/**
 * Key features section component for the Research subdomain.
 * Displays a grid of key features with icons and descriptions.
 * Incorporates Differentiator content and styling similar to the Services component.
 * @param props - The props for the component.
 * @returns The rendered key features section.
 */
export const KeyFeatures: React.FC<KeyFeaturesProps> = (props) => {
  // Use scroll animations for each card, similar to Services
  const scrollAnimations = features.map(() => useScrollAnimation(0.1));

  return (
    // Apply styling similar to Services component: white bg, dark text, adjusted padding
    <section className="py-16 md:py-32 bg-white dark:bg-black text-black dark:text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-16">

        {/* --- Restructured Differentiator Intro Area (Similar to Services) --- */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start mb-16 md:mb-20"> {/* Added grid and bottom margin */}
          {/* Left Column */}
          <motion.div
            // Add motion similar to Services left column if needed
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Mapping Market Architecture
              </h2>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-md">
                Our methodology moves beyond statistical inference to identify deterministic patterns based on fixed time cycles, geometric proportions, and price-time equivalencies, revealing a deeper layer of market order.
              </p>
              {/* Optional: Add a link like in Services if applicable */}
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            // Add motion similar to Services right column if needed
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            <p className="text-lg md:text-xl font-light text-gray-700 dark:text-gray-300 max-w-xl"> {/* Matched styling closer to Services right column */}
              Conventional analysis often treats price action, time cycles, and chart patterns in isolation. Blaide Research integrates these dimensions, positing that markets unfold according to a quantifiable geometric and temporal structure.
            </p>
          </motion.div>
        </div>
        {/* --- End Restructured Differentiator Intro Area --- */}

        {/* Apply grid layout similar to Services component for feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const { ref, isInView } = scrollAnimations[index]; // Use individual animation refs
            return (
              // Apply card styling and animation similar to Services component
              <motion.div
                key={feature.name}
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 50,
                  damping: 20,
                }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)", // Match shadow
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
                // Adjusted padding, border, rounded corners to match Services cards
                className="p-6 border border-black/10 dark:border-white/10 rounded-lg transition-all text-left" // Ensure text is left-aligned
              >
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full text-black dark:text-white"> {/* Simplified icon container */}
                  <Icon className="w-7 h-7" /> {/* Slightly adjusted icon size */}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{feature.name}</h3>
                <p className="text-black/70 dark:text-white/70">{feature.description}</p> {/* Match text opacity */}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}; 