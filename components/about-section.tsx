"use client"

import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import ContactCTA from "./contact-cta"

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)

  // State for the displayed percentage
  const [displayPercent, setDisplayPercent] = useState(100)

  // Scroll progress for the ENTRY animation (section entering viewport)
  const { scrollYProgress: entryScrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"], // Start when top hits bottom, end when top hits top
  })

  // Scroll progress for the PINNED animation (during sticky phase)
  const { scrollYProgress: pinnedScrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"], // Start when top hits top, end when end hits end
  })

  // Smoothed progress for ENTRY animations
  const smoothEntryScrollProgress = useSpring(entryScrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Smoothed progress for PINNED animations (will be used later for images)
  const smoothPinnedScrollProgress = useSpring(pinnedScrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Transform values based on ENTRY progress
  const textScale = useTransform(smoothEntryScrollProgress, [0, 1], [1.5, 1])
  const percentValue = useTransform(smoothEntryScrollProgress, [0, 1], [100, 1])
  const textOpacity = useTransform(smoothEntryScrollProgress, [0, 0.5, 1], [0, 0.5, 1])

  // --- Image Reveal Animations (based on PINNED progress) ---
  const imageRevealProgress = smoothPinnedScrollProgress // Alias for clarity

  // Image 1 Reveal (0% to 33% of pinned scroll)
  const img1Opacity = useTransform(imageRevealProgress, [0, 0.33], [0, 1])
  const img1Y = useTransform(imageRevealProgress, [0, 0.33], [50, 0])

  // Image 2 Reveal (33% to 66% of pinned scroll)
  const img2Opacity = useTransform(imageRevealProgress, [0.33, 0.66], [0, 1])
  const img2Y = useTransform(imageRevealProgress, [0.33, 0.66], [50, 0])

  // Image 3 Reveal (66% to 100% of pinned scroll)
  const img3Opacity = useTransform(imageRevealProgress, [0.66, 1], [0, 1])
  const img3Y = useTransform(imageRevealProgress, [0.66, 1], [50, 0])

  // Update displayPercent state when percentValue (based on entry) changes
  useMotionValueEvent(percentValue, "change", (latest) => {
    setDisplayPercent(Math.max(1, Math.round(latest)))
  })

  return (
    <section id="infographic-2" ref={sectionRef} className="h-[300vh] py-20 md:py-32 bg-white text-black relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="container mx-auto px-4 md:px-16 h-full flex items-center">
          <div className="grid md:grid-cols-2 gap-16 items-center w-full">
            <motion.div
              ref={contentRef}
              style={{
                opacity: textOpacity,
                scale: textScale,
              }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-8 flex items-baseline gap-2">
                <span className="tabular-nums">{displayPercent}%</span>
                <span>better every day</span>
              </h2>

              <motion.p className="text-lg mb-8">
                At Blaide, we believe in continuous improvement and the compound effect of small, daily advancements. Our
                team of strategists, designers, and technologists work together to help organizations navigate complexity
                and drive meaningful change.
              </motion.p>

              <motion.div>
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
              style={{ opacity: useTransform(imageRevealProgress, [0, 0.1], [0, 1]) }}
            >
              <div className="relative h-[400px] md:h-[500px] w-full">
                <motion.div
                  className="absolute inset-0 z-10"
                  style={{ opacity: img1Opacity, y: img1Y }}
                >
                  <Image
                    src="/placeholder.svg?height=500&width=500&text=Team Photo 1"
                    alt="Team at Blaide"
                    fill
                    className="object-cover rounded-lg shadow-lg"
                  />
                </motion.div>

                <motion.div
                  className="absolute inset-0 z-20 translate-x-6 -translate-y-6"
                  style={{ opacity: img2Opacity, y: img2Y }}
                >
                  <Image
                    src="/placeholder.svg?height=500&width=500&text=Team Photo 2"
                    alt="Team at Blaide"
                    fill
                    className="object-cover rounded-lg shadow-lg"
                  />
                </motion.div>

                <motion.div
                  className="absolute inset-0 z-30 -translate-x-6 translate-y-6"
                  style={{ opacity: img3Opacity, y: img3Y }}
                >
                  <Image
                    src="/placeholder.svg?height=500&width=500&text=Team Photo 3"
                    alt="Team at Blaide"
                    fill
                    className="object-cover rounded-lg shadow-lg"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
