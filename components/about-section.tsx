"use client"

import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)

  // State to track which images are visible
  const [visibleImages, setVisibleImages] = useState(0)
  const [textAnimationComplete, setTextAnimationComplete] = useState(false)
  const [isScrollHijacked, setIsScrollHijacked] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Scroll progress for the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Smoother scroll progress for text animations
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Transform values for text animations
  const textScale = useTransform(smoothScrollProgress, [0, 0.15], [1.5, 1])
  const percentValue = useTransform(smoothScrollProgress, [0, 0.15], [100, 1])
  const textOpacity = useTransform(smoothScrollProgress, [0, 0.1, 0.15], [0, 0.5, 1])

  // Check when text animation is complete
  useMotionValueEvent(smoothScrollProgress, "change", (latest) => {
    if (latest >= 0.15 && !textAnimationComplete) {
      setTextAnimationComplete(true)
    }
    setScrollProgress(latest)
  })

  // Handle scroll hijacking for image reveals
  useEffect(() => {
    if (!textAnimationComplete) return

    const handleScroll = (e: WheelEvent) => {
      if (!isScrollHijacked || visibleImages >= 3) return

      e.preventDefault()

      // Determine scroll direction
      if (e.deltaY > 0) {
        // Scrolling down - reveal next image
        setVisibleImages((prev) => Math.min(prev + 1, 3))
      } else if (e.deltaY < 0 && visibleImages > 0) {
        // Scrolling up - hide last image
        setVisibleImages((prev) => Math.max(prev - 1, 0))
      }
    }

    // Enable scroll hijacking when text animation completes
    if (textAnimationComplete && visibleImages < 3) {
      setIsScrollHijacked(true)
      window.addEventListener("wheel", handleScroll, { passive: false })
    } else if (visibleImages >= 3) {
      setIsScrollHijacked(false)
    }

    return () => {
      window.removeEventListener("wheel", handleScroll)
    }
  }, [textAnimationComplete, visibleImages, isScrollHijacked])

  // Image animation variants
  const imageVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } },
  }

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-32 bg-white text-black overflow-hidden min-h-screen">
      <div className="container mx-auto px-4 md:px-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={contentRef}
            style={{
              opacity: textOpacity,
              scale: textScale,
            }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8 flex items-baseline gap-2">
              <motion.span>
                <motion.span style={{ display: "inline-block" }}>
                  {percentValue.get() < 2 ? "1" : Math.round(percentValue.get())}
                </motion.span>
              </motion.span>
              <motion.span className="text-xl md:text-2xl">%</motion.span>
              <span>better every day</span>
            </h2>

            <motion.p className="text-lg mb-8">
              At Blaide, we believe in continuous improvement and the compound effect of small, daily advancements. Our
              team of strategists, designers, and technologists work together to help organizations navigate complexity
              and drive meaningful change.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: textAnimationComplete ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/about">
                <motion.span
                  className="inline-block bg-black text-white py-3 px-8 rounded-full font-medium hover:bg-black/80 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Get to know us
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            ref={imagesRef}
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: textAnimationComplete ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-[400px] md:h-[500px] w-full">
              {/* First image - appears first */}
              <motion.div
                className="absolute inset-0 z-10"
                variants={imageVariants}
                initial="hidden"
                animate={visibleImages >= 1 ? "visible" : "hidden"}
              >
                <Image
                  src="/placeholder.svg?height=500&width=500&text=Team Photo 1"
                  alt="Team at Blaide"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
              </motion.div>

              {/* Second image - appears second */}
              <motion.div
                className="absolute inset-0 z-20 translate-x-6 -translate-y-6"
                variants={imageVariants}
                initial="hidden"
                animate={visibleImages >= 2 ? "visible" : "hidden"}
              >
                <Image
                  src="/placeholder.svg?height=500&width=500&text=Team Photo 2"
                  alt="Team at Blaide"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
              </motion.div>

              {/* Third image - appears last */}
              <motion.div
                className="absolute inset-0 z-30 -translate-x-6 translate-y-6"
                variants={imageVariants}
                initial="hidden"
                animate={visibleImages >= 3 ? "visible" : "hidden"}
              >
                <Image
                  src="/placeholder.svg?height=500&width=500&text=Team Photo 3"
                  alt="Team at Blaide"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
              </motion.div>
            </div>

            {/* Scroll indicator that appears when text animation is complete but not all images are visible */}
            {textAnimationComplete && visibleImages < 3 && (
              <motion.div
                className="absolute bottom-0 right-0 text-sm text-gray-500 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{
                  opacity: { duration: 0.5 },
                  y: { repeat: Number.POSITIVE_INFINITY, duration: 1.5 },
                }}
              >
                Scroll to reveal {visibleImages + 1}/3
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Debug info - remove in production */}
        {/* <div className="fixed bottom-4 right-4 bg-black text-white p-2 text-xs z-50">
          Progress: {scrollProgress.toFixed(2)}<br />
          Text Animation: {textAnimationComplete ? "Complete" : "In Progress"}<br />
          Visible Images: {visibleImages}/3<br />
          Scroll Hijacked: {isScrollHijacked ? "Yes" : "No"}
        </div> */}
      </div>
    </section>
  )
}
