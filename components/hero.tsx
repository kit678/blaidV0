"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLElement>(null)

  // Parallax effect for scroll
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])

  useEffect(() => {
    const videoElement = videoRef.current

    if (videoElement) {
      // Only attempt to play when the video is ready
      const playVideo = () => {
        videoElement.play().catch((error) => {
          // Silently handle the abort error
          if (error.name !== "AbortError") {
            console.error("Video playback error:", error)
          }
        })
      }

      // Play when the video data is loaded enough to start playing
      videoElement.addEventListener("canplay", playVideo)

      // If the video is already loaded, try to play it
      if (videoElement.readyState >= 3) {
        playVideo()
      }

      // Clean up event listener on component unmount
      return () => {
        videoElement.removeEventListener("canplay", playVideo)
      }
    }
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
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y }}>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-50"
          >
            <source src="/videos/hero-background.mp4" type="video/mp4" />
          </video>
        </motion.div>
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
