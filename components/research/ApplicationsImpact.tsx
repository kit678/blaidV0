import React, { useState } from 'react';
import { cn } from "@/lib/utils";
// Removed Lucide icons specific to audiences as they are no longer used
import { ChevronDown } from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Props for the ApplicationsImpact component.
 */
interface ApplicationsImpactProps {}

const impacts = [
  {
    id: 'academics',
    audience: 'Academics',
    benefit: 'A deterministic framework for modeling market structure based on geometric principles and fixed time cycles.',
    // icon: BookOpen // Icon removed
  },
  {
    id: 'asset-managers',
    audience: 'Asset Managers',
    benefit: 'Enhanced timing signals derived from price-time geometry and cyclical confluence points for improved entry, exit, and hedging.',
    // icon: Briefcase // Icon removed
  },
  {
    id: 'quant-funds',
    audience: 'Quant Funds',
    benefit: 'Access to uncorrelated predictive factors rooted in market geometry and temporal harmonics, distinct from standard statistical models.',
    // icon: BrainCircuit // Icon removed
  },
  {
    id: 'risk-management',
    audience: 'Risk Management',
    benefit: 'Proactive identification of potential volatility shifts and market turning points based on predictive cycle analysis.',
    // icon: ShieldAlert // Icon removed
  },
];

// Animation variants exactly copied from Industries.tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  // Using spring animation for smoother item appearance like Industries.tsx
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }, 
};

const accordionVariants = {
  hidden: { opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }, 
  visible: { 
    opacity: 1, 
    height: "auto", 
    // Using exact margins from Industries.tsx
    marginTop: "1rem", 
    marginBottom: "1rem", 
    // Using exact transition ease from Industries.tsx for smoother open/close
    transition: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] } 
  },
};


/**
 * Applications and impact section component for the Research subdomain.
 * Highlights the value proposition for different target audiences using an accordion.
 * Styles and animations are matched to the Industries component.
 * @param props - The props for the component.
 * @returns The rendered applications and impact section.
 */
export const ApplicationsImpact: React.FC<ApplicationsImpactProps> = (props) => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    // Matched section styling with Industries.tsx (dark theme)
    <section className="py-16 md:py-24 w-full bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-16"> {/* Matched container padding */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"> {/* Ensured title is white */}
          Applications & Impact
        </h2>
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            // Trigger animation when component mounts or comes into view
            // For consistency with Industries, consider adding useInView hook here if needed
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            // Matched border color and added top border like Industries.tsx
            className="border-t border-white/20" 
          >
            {impacts.map((impact) => {
              // Removed Icon constant
              const isOpen = activeAccordion === impact.id;
              return (
                <motion.div
                  key={impact.id}
                  variants={itemVariants}
                  // Matched border color like Industries.tsx
                  className="border-b border-white/20" 
                >
                  <button
                    // Matched button styling, padding, group class like Industries.tsx
                    className="w-full py-6 md:py-8 text-left group flex items-center justify-between cursor-pointer"
                    onClick={() => handleToggle(impact.id)}
                    aria-expanded={isOpen}
                    aria-controls={`content-${impact.id}`}
                  >
                    {/* Removed Icon section */}
                    {/* Matched text styling and hover effect like Industries.tsx */}
                    <span className="text-xl md:text-2xl font-light text-white group-hover:text-white/80 transition-colors duration-200">
                      {impact.audience}
                    </span>
                    
                    {/* Chevron Icon - matched styling and hover effect like Industries.tsx */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-white/60 group-hover:text-white transition-colors duration-200"
                    >
                      <ChevronDown className="h-6 w-6" />
                    </motion.div>
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`content-${impact.id}`}
                        key="content"
                        variants={accordionVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        // Adjusted padding (removed icon offset), matched styling from Industries.tsx
                        className="overflow-hidden pl-4 pr-4" 
                        role="region"
                        aria-labelledby={`button-${impact.id}`}
                      >
                        {/* Matched text color from Industries.tsx content */}
                        <p className="text-white/80">
                          {impact.benefit}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 