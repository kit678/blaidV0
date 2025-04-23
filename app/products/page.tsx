"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const allProducts = [
  {
    title: "ConversAI: Intelligent Support",
    preview:
      "Transform customer support with our advanced AI chatbot that handles inquiries, troubleshoots issues, and executes transactions autonomously.",
    client: "Customer Support",
    tags: ["AI Chatbot", "GPT-4o", "Customer Service"],
    image: "/images/unsplash/photo-1507146153580-69a1fe6d8aa1.webp",
    color: "#6366F1",
    slug: "conversai-intelligent-support",
  },
  {
    title: "ContentForge AI",
    preview: "Generate high-converting marketing content at scale with our adaptive AI content creation platform.",
    client: "Marketing",
    tags: ["Content Generation", "Multi-format", "SEO"],
    image: "/images/unsplash/photo-1606857521015-7f9fcf423740.webp",
    color: "#10B981",
    slug: "contentforge-ai",
  },
  {
    title: "InsightPulse",
    preview: "Transform complex data into actionable insights with our AI-powered business intelligence solution.",
    client: "Business Intelligence",
    tags: ["Data Analysis", "Visualization", "Predictive Analytics"],
    image: "/images/unsplash/photo-1551288049-bebda4e38f71.webp",
    color: "#3B82F6",
    slug: "insightpulse",
  },
  {
    title: "NarrativeCraft",
    preview: "Create personalized, interactive storytelling experiences that adapt to user choices and preferences.",
    client: "Interactive Storytelling",
    tags: ["Generative AI", "Education", "Entertainment"],
    image: "/images/unsplash/photo-1456513080510-7bf3a84b82f8.webp",
    color: "#8B5CF6",
    slug: "narrativecraft",
  },
  {
    title: "AdGenesis",
    preview:
      "Revolutionize your advertising with AI-generated creatives tailored for different audience segments and platforms.",
    client: "Advertising",
    tags: ["Creative Generation", "A/B Testing", "Multi-format"],
    image: "/images/unsplash/photo-1460925895917-afdab827c52f.webp",
    color: "#EC4899",
    slug: "adgenesis",
  },
  {
    title: "DocuMind Analyzer",
    preview: "Extract deep insights from complex documents with our advanced document analysis and research platform.",
    client: "Document Intelligence",
    tags: ["Knowledge Extraction", "Semantic Search", "RAG"],
    image: "/images/unsplash/photo-1450101499163-c8848c66ca85.webp",
    color: "#F59E0B",
    slug: "documind-analyzer",
  },
  {
    title: "CareerPilot AI",
    preview: "Optimize job applications and accelerate your career progress with our AI-powered career assistant.",
    client: "Career Development",
    tags: ["Resume Optimization", "Job Matching", "Interview Prep"],
    image: "/images/unsplash/photo-1486406146926-c627a92ad1ab.webp",
    color: "#14B8A6",
    slug: "careerpilot-ai",
  },
  {
    title: "DevFlow AI",
    preview:
      "Streamline your development process from ideation to deployment with our intelligent workflow automation.",
    client: "Software Development",
    tags: ["Workflow Automation", "Code Generation", "CI/CD"],
    image: "/images/unsplash/photo-1522542550221-31fd19575a2d.webp",
    color: "#0EA5E9",
    slug: "devflow-ai",
  },
  {
    title: "QuantumTrade AI",
    preview:
      "Harness the power of advanced AI algorithms for sophisticated market analysis and automated trading strategies.",
    client: "Financial Trading",
    tags: ["Algorithmic Trading", "Market Analysis", "Risk Management"],
    image: "/images/unsplash/photo-1611974789855-9c2a0a7236a3.webp",
    color: "#6366F1",
    slug: "quantumtrade-ai",
  },
]

const categories = [
  "All",
  "Customer Support",
  "Marketing",
  "Business Intelligence",
  "Interactive Storytelling",
  "Advertising",
  "Document Intelligence",
  "Career Development",
  "Software Development",
  "Financial Trading",
]

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  const filteredProducts =
    activeCategory === "All" ? allProducts : allProducts.filter((product) => product.client === activeCategory)

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mb-16"
        >
          {/* <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Products</h1> */}
          <p className="text-xl md:text-2xl">
            Explore our portfolio of cutting-edge AI solutions developed in our innovation labs.
          </p>
        </motion.div>

        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4 pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category ? "bg-black text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredProduct(product.slug)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <Link href={`/products/${product.slug}`} className="block group h-full">
                <div className="flex flex-col h-full">
                  <div
                    className="relative overflow-hidden rounded-lg mb-6 aspect-[4/3]"
                    style={{ backgroundColor: product.color }}
                  >
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-6 right-6 bg-white text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{product.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{product.client}</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">{product.preview}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {product.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-sm border border-gray-300 dark:border-gray-700 rounded-full px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 