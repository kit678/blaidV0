"use client";

// Placeholder for the research landing page

import { useRef } from 'react';
import Header from '@/components/header';
import { ResearchHero } from '@/components/research/ResearchHero';
import { KeyFeatures } from '@/components/research/KeyFeatures';
import { ApplicationsImpact } from '@/components/research/ApplicationsImpact';
import { ContactResearch } from '@/components/research/ContactResearch';
import { Disclaimer } from '@/components/research/Disclaimer';
import { motion, useInView } from 'framer-motion';
import ResearchApproachAndFindings from '@/components/research/ResearchApproachAndFindings';

export default function ResearchPage() {
  // Define animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  // Refs and InView hooks for sections (excluding approachRef)
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const impactRef = useRef(null);
  const contactRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, amount: 0.1 });
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const isImpactInView = useInView(impactRef, { once: true, amount: 0.2 });
  const isContactInView = useInView(contactRef, { once: true, amount: 0.2 });

  return (
    <main className="flex min-h-screen flex-col w-full">
      <Header variant="research" />
      
      <div className="pt-24">
        <section ref={heroRef} className="w-full overflow-hidden">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <ResearchHero />
          </motion.div>
        </section>

        {/* KeyFeatures Section */}
        <section id="focus" ref={featuresRef} className="w-full overflow-hidden">
          <motion.div
            id="focus-content"
            variants={sectionVariants}
            initial="hidden"
            animate={isFeaturesInView ? "visible" : "hidden"}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <KeyFeatures />
          </motion.div>
        </section>

        {/* Combined Approach, Findings, CTA Section */}
        <section id="abstracts" className="w-full overflow-hidden">
          <ResearchApproachAndFindings />
        </section>

        {/* ApplicationsImpact Section */}
        <section ref={impactRef} className="w-full overflow-hidden">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate={isImpactInView ? "visible" : "hidden"}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <ApplicationsImpact />
          </motion.div>
        </section>

        <section id="contact" ref={contactRef} className="w-full overflow-hidden">
          <motion.div
            id="contact-content"
            variants={sectionVariants}
            initial="hidden"
            animate={isContactInView ? "visible" : "hidden"}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <ContactResearch />
          </motion.div>
        </section>

        <Disclaimer />
      </div>
    </main>
  );
} 