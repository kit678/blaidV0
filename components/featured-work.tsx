"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const products = [
  {
    title: "ConversAI: Intelligent Support",
    client: "Customer Support",
    tags: ["AI Chatbot", "GPT-4o", "Customer Service"],
    image: "/images/unsplash/photo-1507146153580-69a1fe6d8aa1.webp",
    color: "#6366F1",
    slug: "conversai-intelligent-support",
    description:
      "An AI-powered chatbot using GPT-4o to provide instant, intelligent customer support, reducing wait times and improving satisfaction.",
  },
  {
    title: "DocuMind Analyzer",
    client: "Document Intelligence",
    tags: ["Knowledge Extraction", "Semantic Search", "RAG"],
    image: "/images/unsplash/photo-1450101499163-c8848c66ca85.webp",
    color: "#F59E0B",
    slug: "documind-analyzer",
    description: "Extract key information and build knowledge graphs from complex documents to accelerate research and analysis.",
  },
  {
    title: "InsightPulse",
    client: "Business Intelligence",
    tags: ["Data Analysis", "Visualization", "Predictive Analytics"],
    image: "/images/unsplash/photo-1551288049-bebda4e38f71.webp",
    color: "#3B82F6",
    slug: "insightpulse",
    description:
      "Transform raw data into actionable insights with powerful visualization tools and predictive analytics capabilities.",
  },
  {
    title: "ContentForge AI",
    client: "Marketing",
    tags: ["Content Generation", "Multi-format", "SEO"],
    image: "/images/unsplash/photo-1606857521015-7f9fcf423740.webp",
    color: "#10B981",
    slug: "contentforge-ai",
    description:
      "Generate high-quality marketing content in multiple formats, optimized for SEO, driving engagement and organic growth.",
  },
  {
    title: "NarrativeCraft",
    client: "Interactive Storytelling",
    tags: ["Generative AI", "Education", "Entertainment"],
    image: "/images/unsplash/photo-1456513080510-7bf3a84b82f8.webp",
    color: "#8B5CF6",
    slug: "narrativecraft",
    description: "Create immersive, interactive stories using generative AI, perfect for education and entertainment.",
  },
  {
    title: "AdGenesis",
    client: "Advertising",
    tags: ["Creative Generation", "A/B Testing", "Multi-format"],
    image: "/images/unsplash/photo-1460925895917-afdab827c52f.webp",
    color: "#EC4899",
    slug: "adgenesis",
    description: "Automate ad creative generation and A/B testing across multiple formats to optimize campaign performance.",
  },
]

const NUM_PRODUCTS = 4; // Number of products to animate
const PRODUCT_SECTION_HEIGHT_VH = 200; // VH per product for scroll calculation

/**
 * FeaturedWork component with scroll-driven animations.
 * @returns {JSX.Element} The rendered FeaturedWork component.
 */
export default function FeaturedWork() {
  const marqueeRef = useRef(null) // section work1
  const featuredSectionWrapperRef = useRef(null) // New wrapper for section work2 height
  const featuredSectionStickyRef = useRef(null) // Ref for the sticky container
  const buttonRef = useRef(null);

  // Marquee scroll animation
  const { scrollYProgress: marqueeScrollProgress } = useScroll({
    target: marqueeRef,
    offset: ["start end", "end start"]
  })
  const marqueeX = useTransform(marqueeScrollProgress, [0, 1], ["100%", "-100%"])

  // Overall scroll progress through the *entire* featured works section
  const { scrollYProgress: overallScrollProgress } = useScroll({
    target: featuredSectionWrapperRef, // Target the tall wrapper
    offset: ["start center", "end end"] // Start tracking when top hits viewport center
  });

  // Create the smoothed scroll progress value
  const smoothScrollProgress = useSpring(overallScrollProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001
  });

  // Black section initial slide-up
   const { scrollYProgress: blackSectionEntryProgress } = useScroll({
     target: featuredSectionWrapperRef,
     offset: ["start end", "start start"] // From bottom of viewport to top
   })
   const blackSectionY = useTransform(blackSectionEntryProgress, [0, 1], ["100%", "0%"])


  return (
    <>
      {/* White section with marquee text (section work1) */}
      <section
        ref={marqueeRef}
        className="relative h-[50vh] bg-white overflow-hidden"
      >
        <div className="sticky top-0 h-full flex items-center">
          <motion.h2
            className="text-[15vw] font-extrabold whitespace-nowrap text-black absolute right-0"
            style={{ x: marqueeX, willChange: "transform" }}
          >
            Featured Products
          </motion.h2>
        </div>
      </section>

      {/* Tall Wrapper for Black Section (section work2) - Defines scroll height */}
      <div
        ref={featuredSectionWrapperRef}
        className="relative"
        style={{ height: `${NUM_PRODUCTS * PRODUCT_SECTION_HEIGHT_VH}vh` }} // Set height based on products
      >
        {/* Sticky Container for actual content */}
        <motion.div
          ref={featuredSectionStickyRef}
          className="sticky top-0 h-screen bg-black text-white overflow-hidden"
          style={{
             y: blackSectionY, // Initial slide-up
             willChange: "transform",
             zIndex: 10
           }}
        >
          {/* Featured products */}
          {products.slice(0, NUM_PRODUCTS).map((product, index) => {
            const isLeftAligned = index % 2 === 0

            // Calculate the start and end scroll progress for this product's segment
            const segmentStart = index / NUM_PRODUCTS;
            const segmentEnd = (index + 1) / NUM_PRODUCTS;

            // Define animation ranges *within* this segment
            const entryStart = segmentStart;
            const entryEnd = segmentStart + (segmentEnd - segmentStart) * 0.2; // Entry takes 20% (was 0.4)
            const exitStart = entryEnd;
            const exitEnd = segmentEnd;

            // --- Image Animation ---
            const imgY = useTransform(
              smoothScrollProgress, // Use smoothed value
              [entryStart, entryEnd, exitStart, exitEnd],
              ["100%", "0%", "0%", "-100%"]
            );


            // --- Description Animation ---
            const descEntryStart = segmentStart + (segmentEnd - segmentStart) * 0.05; // Start slightly earlier (was 0.1)
            const descEntryEnd = entryEnd; // Align end with image entry end
            const descXEntryValues = isLeftAligned ? ["100%", "0%"] : ["-100%", "0%"];
            const descX = useTransform(
              smoothScrollProgress, // Use smoothed value
              [descEntryStart, descEntryEnd, exitStart, exitEnd],
              [descXEntryValues[0], descXEntryValues[1], "0%", "0%"]
            );

            // Define vertical movement for description, matching the image
            const descY = useTransform(
              smoothScrollProgress, // Use smoothed value
              [entryStart, entryEnd, exitStart, exitEnd], // Same ranges as image
              ["100%", "0%", "0%", "-100%"]             // Same vertical motion as image
            );

             // --- Opacity Animation ---
             const opacity = useTransform(
                 smoothScrollProgress, // Use smoothed value
                 [entryStart, entryStart + 0.05, exitEnd - 0.05, exitEnd], // Faster fade in/out (was 0.1)
                 [0, 1, 1, 0]
             );

             // --- Pointer Events Control ---
             const pointerEvents = useTransform(
                 opacity,
                 [0.1, 0.2],  // Using slightly higher threshold for more reliable behavior
                 ["none", "auto"]
             );


            return (
              <motion.div
                key={product.slug}
                className="absolute inset-0 h-screen w-full flex items-center justify-center"
                style={{ 
                  opacity: opacity,
                  pointerEvents: pointerEvents // Apply dynamic pointer-events
                }}
              >
                <div className="container mx-auto px-4 md:px-16">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
                      {/* Image Container */}
                      <motion.div
                        className={cn(
                          "w-full md:w-1/2 relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl",
                          isLeftAligned ? "md:order-1" : "md:order-2"
                        )}
                        style={{
                          y: imgY,
                          willChange: "transform",
                        }}
                      >
                        <Link href={`/products/${product.slug}`} className="block group h-full w-full rounded-xl overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            fill
                            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            style={{ borderRadius: "inherit" }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300 rounded-xl" />
                          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white text-black p-2 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 ease-in-out">
                            <ArrowUpRight className="h-4 w-4 sm:h-6 sm:w-6" />
                          </div>
                        </Link>
                      </motion.div>

                      {/* Text Content */}
                      <motion.div
                        className={cn(
                          "w-full md:w-1/2 flex flex-col",
                          isLeftAligned ? "md:order-2 md:items-start" : "md:order-1 md:items-end md:text-right"
                        )}
                        style={{
                          x: descX,
                          y: descY,
                          willChange: "transform",
                        }}
                      >
                        <Link href={`/products/${product.slug}`} className="group block" aria-label={`View product: ${product.title}`}>
                          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 group-hover:text-indigo-400 transition-colors duration-300">
                            {product.title}
                          </h3>
                          <p className="text-lg md:text-xl text-white/70 mb-5">
                            {product.description}
                          </p>
                          <p className="text-md text-white/50 mb-6">{product.client}</p>
                        </Link>
                        <div className={cn("flex flex-wrap gap-2 mb-6", isLeftAligned ? "justify-start" : "md:justify-end")}>
                          {product.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-sm border border-white/30 rounded-full px-3 py-1"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Link href={`/products/${product.slug}`} className="inline-block group" aria-label={`View product: ${product.title}`}>
                            <motion.span
                                className="flex items-center text-indigo-400"
                                whileHover="hover"
                            >
                                View Product
                                <motion.span variants={{ hover: { x: 4 } }} className="ml-1 transition-transform">
                                    <ArrowUpRight className="h-5 w-5" />
                                </motion.span>
                            </motion.span>
                        </Link>
                      </motion.div>
                    </div>
                  </div>
              </motion.div>
            )
          })}
           {/* Explore All Button */}
             <motion.div
                 ref={buttonRef}
                 className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20"
                 style={{
                     opacity: useTransform(smoothScrollProgress, [(NUM_PRODUCTS - 1) / NUM_PRODUCTS, 0.95], [0, 1]) // Use smoothed value
                 }}
             >
                 <Link href="/products">
                     <motion.span
                         className="inline-block border border-white text-white py-3 px-8 rounded-full font-medium hover:bg-white hover:text-black transition-colors duration-300"
                         whileHover={{ scale: 1.05 }}
                         whileTap={{ scale: 0.95 }}
                         transition={{ type: "spring", stiffness: 400, damping: 10 }}
                     >
                         View all products
                     </motion.span>
                 </Link>
             </motion.div>
        </motion.div>
      </div>
    </>
  )
}