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

  // Image 1 Reveal (0% to 33% of pinned scroll) - Tech Startup City Skyline
  const img1Opacity = useTransform(imageRevealProgress, [0, 0.33], [0, 1])
  const img1Y = useTransform(imageRevealProgress, [0, 0.33], [50, 0])
  // Blur Image 1 when Image 2 starts revealing
  const img1Blur = useTransform(imageRevealProgress, [0.33, 0.5], [0, 8]) // Blur from 0px to 8px

  // Image 2 Reveal (33% to 66% of pinned scroll) - AI Startup Funding
  const img2Opacity = useTransform(imageRevealProgress, [0.33, 0.66], [0, 1])
  const img2X = useTransform(imageRevealProgress, [0.33, 0.66], [50, 0]) // Slide from right (50px) to center (0px)
  // Blur Image 2 when Image 3 starts revealing
  const img2Blur = useTransform(imageRevealProgress, [0.66, 0.83], [0, 8]) // Blur from 0px to 8px

  // Image 3 Reveal (66% to 100% of pinned scroll) - AI Market Growth
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
              <h2 className="text-2xl md:text-5xl font-bold mb-6 md:mb-8 flex items-baseline gap-2 mt-8">
                <span className="tabular-nums">{displayPercent}%</span>
                <span>better every day</span>
              </h2>

              <motion.p className="text-base md:text-lg mb-6 md:mb-8">
                At Blaide, we believe in continuous improvement and the compound effect of small, daily advancements. Our
                team of strategists, designers, and technologists work together to help organizations navigate complexity
                and drive meaningful change.
              </motion.p>

              <motion.div>
                <Link href="/about">
                  <motion.span
                    className="inline-block bg-black text-white py-2 px-6 md:py-3 md:px-8 rounded-full font-medium hover:bg-black/80 transition-colors"
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
              <div className="relative h-[350px] md:h-[650px] mx-0 md:-mx-8">
                <motion.div
                  className="absolute inset-0 z-10"
                  style={{
                    opacity: img1Opacity,
                    y: img1Y,
                    filter: useTransform(img1Blur, v => `blur(${v}px)`), // Apply blur
                  }}
                >
                  <Image
                    src="/infographic/Tech Startup City Skyline.png"
                    alt="Stylized city skyline representing tech startups"
                    fill
                    className="object-contain rounded-lg"
                    priority // Load first image eagerly
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>

                <motion.div
                  className="absolute inset-0 z-20" // Removed translate classes, using motion values
                  style={{
                    opacity: img2Opacity,
                    x: img2X, // Use x transform for right-to-left
                    filter: useTransform(img2Blur, v => `blur(${v}px)`), // Apply blur
                  }}
                >
                  <Image
                    src="/infographic/AI Startup Funding in 2023.png"
                    alt="Infographic showing AI startup funding trends in 2023"
                    fill
                    className="object-contain rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>

                <motion.div
                  className="absolute inset-0 z-30" // Removed translate classes, using motion values
                  style={{
                    opacity: img3Opacity,
                    y: img3Y,
                  }}
                >
                  <Image
                    src="/infographic/AI Market Growth Projection 2030.png"
                    alt="Infographic projecting AI market growth to 2030"
                    fill
                    className="object-contain rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
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
