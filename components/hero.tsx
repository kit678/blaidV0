"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"

// Define the image paths
const images = [
  "/hero/synapse.webp",
  "/hero/architecture.webp",
  "/hero/wave.webp",
  "/hero/transformation.webp",
]

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Parallax effect for scroll
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])

  // Effect for image carousel rotation
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 10000) // 10 seconds interval

    return () => clearInterval(intervalId) // Cleanup interval on unmount
  }, [])

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.8,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  }

  return (
    <section ref={containerRef} className="relative h-screen flex items-center overflow-hidden bg-black">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex} // Important for AnimatePresence to detect changes
            style={{
              y, // Apply parallax
              backgroundImage: `url(${images[currentIndex]})`,
            }}
            className="absolute inset-0 bg-cover bg-center"
            initial={{ opacity: 0, filter: 'brightness(0.5)', scale: 1.1 }} // Start dimmed and slightly scaled up
            animate={{ opacity: 0.5, filter: 'brightness(1)', scale: 1, transition: { duration: 1.5, ease: "easeOut" } }} // Animate to brighter and normal scale
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeIn" } }} // Fade out
          >
            {/* Optional: Add a subtle overlay if needed */}
            {/* <div className="absolute inset-0 bg-black/30"></div> */}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="container mx-auto px-4 md:px-16 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-4xl">
          <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block">Innovation</span>
            <span className="block">strategy &</span>
            <span className="block">transformation</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-white/80 max-w-2xl mb-8">
            We help organizations navigate complexity and drive meaningful change through strategic innovation.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href="/services"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="bg-white text-black py-3 px-8 rounded-full inline-block font-medium hover:bg-white/90 transition-colors"
            >
              Our Services
            </motion.a>
            <motion.a
              href="/contact"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="border border-white text-white py-3 px-8 rounded-full inline-block font-medium hover:bg-white/10 transition-colors"
            >
              Get in Touch
            </motion.a>
          </motion.div>

          {/* Add the link to the research site here */}
          <motion.div variants={itemVariants} className="mt-6">
            <a
              href="#" // Replace # with the actual URL for Blaide Research
              className="text-white/70 hover:text-white transition-colors text-sm"
              target="_blank" // Optional: open in new tab
              rel="noopener noreferrer" // Optional: security for new tab
            >
              Looking for our foundational research? <span className="underline">Visit Blaide Research</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 right-8 md:right-16 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.p
          className="text-white/60 text-sm rotate-90 origin-bottom-right"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
        >
          Scroll to explore
        </motion.p>
      </motion.div>
    </section>
  )
}
