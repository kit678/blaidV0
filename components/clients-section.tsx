"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

// Updated clients array with actual logo paths
const clients = [
  { name: "Morgan Stanley", logo: "/clients/morgan.svg" },
  { name: "Manipal", logo: "/clients/manipal.svg" },
  { name: "Tata", logo: "/clients/tata-logo.svg" },
  { name: "Baruch", logo: "/clients/baruch.svg" },
  { name: "Delta Airlines", logo: "/clients/delta-airlines.svg" },
  { name: "Pivoton", logo: "/clients/pivoton.svg" },
  { name: "Citrix", logo: "/clients/citrix.svg" },
  { name: "Illinois University", logo: "/clients/illinois-university-2.svg" },
  { name: "Stevens Institute", logo: "/clients/stevens-institute-of-technology.svg" },
  { name: "Credit Suisse", logo: "/clients/credit-suisse-1.svg" },
  { name: "IBM", logo: "/clients/ibm.svg" },
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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          // Changed grid columns for more balanced rows: 2 -> 3 -> 4
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-12 md:gap-x-16 md:gap-y-16 items-center justify-items-center" // Added justify-items-center
        >
          {clients.map((client, index) => {
            // Add specific class for the Stevens logo if needed
            const isStevensLogo = client.name === "Stevens Institute";
            const logoHeightClass = isStevensLogo
              ? "h-12 md:h-14" // Slightly larger height for Stevens
              : "h-10 md:h-12"; // Default height for others

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                // Make the container slightly taller to accommodate the potentially larger Stevens logo
                className={`flex items-center justify-center p-2 grayscale hover:grayscale-0 transition-all duration-300 ${isStevensLogo ? 'h-16' : 'h-14 md:h-16'}`} // Adjust container height
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={160} // Keep base width/height for Next.js
                  height={isStevensLogo ? 56 : 48} // Adjust base height slightly for Stevens
                  // Apply conditional height class and existing classes
                  className={`${logoHeightClass} w-auto object-contain`}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  )
}
