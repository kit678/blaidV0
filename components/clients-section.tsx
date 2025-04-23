"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

// Updated clients array with actual logo paths and URLs
const clients = [
  { name: "Morgan Stanley", logo: "/clients/morgan.svg", url: "https://www.morganstanley.com" },
  { name: "Manipal", logo: "/clients/manipal.svg", url: "https://www.manipal.edu" },
  { name: "Tata", logo: "/clients/tata-logo.svg", url: "https://www.tata.com" },
  { name: "Baruch", logo: "/clients/baruch.svg", url: "https://www.baruch.cuny.edu" },
  { name: "Delta Airlines", logo: "/clients/delta-airlines.svg", url: "https://www.delta.com" },
  { name: "Pivoton", logo: "/clients/pivoton.svg", url: "https://www.linkedin.com/company/pivoton-capital/" },
  { name: "Citrix", logo: "/clients/citrix.svg", url: "https://www.citrix.com" },
  { name: "Illinois University", logo: "/clients/illinois-university-2.svg", url: "https://illinois.edu" },
  { name: "Stevens Institute", logo: "/clients/stevens-institute-of-technology.svg", url: "https://www.stevens.edu" },
  { name: "Credit Suisse", logo: "/clients/credit-suisse-1.svg", url: "https://www.credit-suisse.com" },
  { name: "IBM", logo: "/clients/ibm.svg", url: "https://www.ibm.com" },
  // Add any other clients here following the pattern
]

export default function ClientsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
      },
    },
  }

  return (
    <section ref={sectionRef} className="py-20 bg-white text-black overflow-hidden">
      <div className="container mx-auto px-4 md:px-16">
        <h2 className="text-xl md:text-2xl font-light text-center mb-12 md:mb-16">
          Affiliations
        </h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          // Changed grid columns for more balanced rows: 2 -> 3 -> 4
          // className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-12 md:gap-x-16 md:gap-y-16 items-center justify-items-center" // Added justify-items-center
          // Switch to Flexbox for centering incomplete last row
          className="flex flex-wrap justify-center items-center gap-x-8 gap-y-12 md:gap-x-16 md:gap-y-16"
        >
          {clients.map((client, index) => {
            // Add specific class for the Stevens logo if needed
            const isStevensLogo = client.name === "Stevens Institute";
            const logoHeightClass = isStevensLogo
              ? "h-12 md:h-14" // Slightly larger height for Stevens
              : "h-10 md:h-12"; // Default height for others

            return (
              // Wrap the motion.div with an anchor tag
              <a
                key={client.name} // Use a more stable key like name or URL
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Link to ${client.name} website`} // Add accessibility label
              >
                <motion.div
                  // No key needed here as it's on the parent anchor
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  // Make the container slightly taller to accommodate the potentially larger Stevens logo
                  className={`flex items-center justify-center p-2 grayscale hover:grayscale-0 transition-all duration-300 ${isStevensLogo ? 'h-16' : 'h-14 md:h-16'}`} // Adjust container height
                >
                  <Image
                    src={client.logo}
                    alt={client.name} // Alt text remains descriptive of the logo itself
                    width={160} // Keep base width/height for Next.js
                    height={isStevensLogo ? 56 : 48} // Adjust base height slightly for Stevens
                    // Apply conditional height class and existing classes
                    className={`${logoHeightClass} w-auto object-contain`}
                  />
                </motion.div>
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  )
}
