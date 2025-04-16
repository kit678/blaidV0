"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    title: "ConversAI: Intelligent Support",
    client: "Customer Support",
    tags: ["AI Chatbot", "GPT-4o", "Customer Service"],
    image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1",
    color: "#6366F1",
    slug: "conversai-intelligent-support",
  },
  {
    title: "ContentForge AI",
    client: "Marketing",
    tags: ["Content Generation", "Multi-format", "SEO"],
    image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740",
    color: "#10B981",
    slug: "contentforge-ai",
  },
  {
    title: "InsightPulse",
    client: "Business Intelligence",
    tags: ["Data Analysis", "Visualization", "Predictive Analytics"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    color: "#3B82F6",
    slug: "insightpulse",
  },
  {
    title: "NarrativeCraft",
    client: "Interactive Storytelling",
    tags: ["Generative AI", "Education", "Entertainment"],
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8",
    color: "#8B5CF6",
    slug: "narrativecraft",
  },
  {
    title: "AdGenesis",
    client: "Advertising",
    tags: ["Creative Generation", "A/B Testing", "Multi-format"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    color: "#EC4899",
    slug: "adgenesis",
  },
  {
    title: "DocuMind Analyzer",
    client: "Document Intelligence",
    tags: ["Document Analysis", "Knowledge Graphs", "Research"],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
    color: "#F59E0B",
    slug: "documind-analyzer",
  },
]

export default function FeaturedWork() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
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

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    }),
  }

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 50, damping: 20 }}
          className="flex flex-col md:flex-row justify-between items-baseline mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-0">Featured work</h2>
          <p className="text-white/60 max-w-md">
            Our innovation lab where cutting-edge AI solutions are developed, tested, and refined for real-world
            applications.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onHoverStart={() => setHoveredProject(project.slug)}
              onHoverEnd={() => setHoveredProject(null)}
            >
              <Link href={`/work/${project.slug}`} className="block group h-full">
                <div
                  className="relative overflow-hidden rounded-lg mb-6 aspect-[4/3]"
                  style={{ backgroundColor: project.color }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="h-full w-full"
                  >
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover opacity-70 transition-all duration-500"
                    />
                  </motion.div>
                  <motion.div
                    className="absolute bottom-6 right-6 bg-white text-black p-3 rounded-full"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={
                      hoveredProject === project.slug
                        ? { opacity: 1, scale: 1, y: 0 }
                        : { opacity: 0, scale: 0.8, y: 20 }
                    }
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <ArrowUpRight className="h-6 w-6" />
                  </motion.div>
                </div>
                <motion.h3
                  className="text-xl md:text-2xl font-bold mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  className="text-white/60 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  {project.client}
                </motion.p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tagIndex}
                      custom={tagIndex}
                      variants={tagVariants}
                      className="text-sm border border-white/30 rounded-full px-3 py-1"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
          className="mt-16 text-center"
        >
          <Link href="/work">
            <motion.span
              className="inline-block border border-white text-white py-3 px-8 rounded-full font-medium hover:bg-white hover:text-black transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              View all projects
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
