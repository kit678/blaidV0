"use client";

// Placeholder for the research landing page

import { ResearchHero } from '@/components/research/ResearchHero';
import { KeyFeatures } from '@/components/research/KeyFeatures';
import { ApplicationsImpact } from '@/components/research/ApplicationsImpact';
import { ContactResearch } from '@/components/research/ContactResearch';
import { Disclaimer } from '@/components/research/Disclaimer';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { motion } from 'framer-motion';
import ResearchApproachAndFindings from '@/components/research/ResearchApproachAndFindings';

export default function ResearchPage() {
  // Use scroll animations for each section with enhanced configuration
  const heroAnim = useScrollAnimation(0.1);
  const featuresAnim = useScrollAnimation(0.2);
  const approachAnim = useScrollAnimation(0.2);
  const impactAnim = useScrollAnimation(0.2);
  const contactAnim = useScrollAnimation(0.2);

  // Define animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <main className="flex min-h-screen flex-col w-full">
      {/* No navbar as specified in requirements */}
      
      <section ref={heroAnim.ref} className="w-full overflow-hidden">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={heroAnim.isInView ? "visible" : "hidden"}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <ResearchHero />
        </motion.div>
      </section>

      {/* KeyFeatures Section */}
      <section ref={featuresAnim.ref} className="w-full overflow-hidden">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={featuresAnim.isInView ? "visible" : "hidden"}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <KeyFeatures />
        </motion.div>
      </section>

      {/* Combined Approach, Findings, CTA Section */}
      <section ref={approachAnim.ref} className="w-full overflow-hidden">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={approachAnim.isInView ? "visible" : "hidden"}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <ResearchApproachAndFindings />
        </motion.div>
      </section>

      {/* ApplicationsImpact Section */}
      <section ref={impactAnim.ref} className="w-full overflow-hidden">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={impactAnim.isInView ? "visible" : "hidden"}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <ApplicationsImpact />
        </motion.div>
      </section>

      <section ref={contactAnim.ref} className="w-full overflow-hidden">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={contactAnim.isInView ? "visible" : "hidden"}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <ContactResearch />
        </motion.div>
      </section>

      <Disclaimer />
    </main>
  );
} 