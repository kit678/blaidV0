"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"

// Project data
const projectsData = [
  {
    slug: "conversai-intelligent-support",
    title: "ConversAI: Intelligent Support",
    client: "Customer Support",
    preview:
      "Transform customer support with our advanced AI chatbot that handles inquiries, troubleshoots issues, and executes transactions autonomously.",
    description:
      "ConversAI is a sophisticated customer support platform powered by the latest large language models (LLMs) including GPT-4o and our proprietary agentic enhancements. It goes beyond basic chatbots by understanding complex queries, executing multi-step processes, and learning from interactions to continually improve its performance. Our solution integrates seamlessly with existing customer support systems while reducing operational costs by up to 60%.",
    features: [
      "Natural language understanding with 97% accuracy",
      "Autonomous issue resolution for common problems",
      "Seamless handoff to human agents when needed",
      "Multi-channel deployment (website, mobile, social)",
      "Real-time sentiment analysis and escalation protocols",
      "Custom knowledge base integration",
      "Transaction processing capabilities",
      "Multilingual support in over 30 languages",
    ],
    techStack: "GPT-4o, Custom Agentic Framework, Python, Node.js, Redis, MongoDB, Docker, Kubernetes",
    benefits: [
      "24/7 Availability: Provide round-the-clock support without staffing concerns or increased costs.",
      "Cost Reduction: Decrease support costs by up to 60% while improving customer satisfaction metrics.",
      "Improved Experience: Deliver consistent, high-quality responses with minimal wait times.",
      "Scalable Solution: Handle sudden increases in demand without performance degradation.",
    ],
    backgroundImage: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1",
    detailImage: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e",
    color: "#6366F1",
  },
  {
    slug: "contentforge-ai",
    title: "ContentForge AI",
    client: "Marketing",
    preview: "Generate high-converting marketing content at scale with our adaptive AI content creation platform.",
    description:
      "ContentForge AI revolutionizes marketing content creation by generating high-quality, tailored content across multiple formats. From engaging blog posts to compelling social media captions and conversion-focused email campaigns, our platform leverages advanced AI to produce content that resonates with your specific audience segments. What sets ContentForge apart is its ability to adapt tone, style, and messaging to match your brand voice while maintaining consistency across all channels.",
    features: [
      "Brand voice calibration and maintenance",
      "Multi-format content generation (blogs, social, ads, emails)",
      "SEO optimization built into content creation",
      "Automated content calendar management",
      "A/B testing variations generator",
      "Audience segment customization",
      "Performance analytics and feedback loop",
      "Brand compliance checking",
    ],
    techStack: "LLM fine-tuning, NLP frameworks, Python, TensorFlow, React, NextJS, GraphQL, PostgreSQL",
    benefits: [
      "Time Efficiency: Reduce content creation time by up to 80%, allowing teams to focus on strategy.",
      "Content Consistency: Maintain brand voice across all channels and team members automatically.",
      "Increased Output: Produce 10x more content without increasing headcount or budget.",
      "Personalization at Scale: Create tailored content for different audience segments simultaneously.",
    ],
    backgroundImage: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740",
    detailImage: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
    color: "#10B981",
  },
  {
    slug: "insightpulse",
    title: "InsightPulse",
    client: "Business Intelligence",
    preview: "Transform complex data into actionable insights with our AI-powered business intelligence solution.",
    description:
      "InsightPulse is a revolutionary data summarization and business intelligence tool that empowers decision-makers to extract meaningful insights from massive datasets in seconds. Using advanced natural language processing and machine learning algorithms, InsightPulse automatically analyzes reports, research papers, market data, and unstructured content to deliver concise summaries and actionable recommendations. The platform features automated dashboard generation that transforms raw data into visual insights, making complex information accessible to stakeholders at all levels.",
    features: [
      "Automated data ingestion from multiple sources",
      "Natural language summaries of complex reports",
      "Visual dashboard generation from unstructured data",
      "Trend identification and anomaly detection",
      "Predictive analytics and forecasting",
      "Custom KPI tracking and alerts",
      "Competitive intelligence gathering",
      "Executive-ready presentation generation",
    ],
    techStack:
      "Deep Learning, NLP, Data Processing Pipeline, Python, R, D3.js, Tableau Integration, Cloud Data Warehouse",
    benefits: [
      "Data Democratization: Make complex data accessible and actionable for non-technical stakeholders.",
      "Faster Decision Making: Reduce analysis time from days to minutes, accelerating strategic decisions.",
      "Competitive Advantage: Identify market trends and opportunities before competitors can react.",
      "Resource Optimization: Redirect data analysts to high-value tasks instead of report generation.",
    ],
    backgroundImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    detailImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3",
    color: "#3B82F6",
  },
  {
    slug: "narrativecraft",
    title: "NarrativeCraft",
    client: "Interactive Storytelling",
    preview: "Create personalized, interactive storytelling experiences that adapt to user choices and preferences.",
    description:
      "NarrativeCraft is an innovative platform that enables the creation of dynamic, interactive storytelling experiences powered by generative AI. Whether for entertainment, education, or marketing, our platform allows content creators to build engaging narratives that adapt to user choices in real-time. NarrativeCraft can generate rich, branching storylines, educational content with personalized learning paths, or interactive marketing experiences that respond to consumer preferences—all at a scale previously impossible with traditional content creation methods.",
    features: [
      "Dynamic storyline generation with branching narratives",
      "Personalized character and plot development",
      "Interactive learning paths for educational content",
      "Voice and text input for narrative progression",
      "Multi-format output (text, audio narration, visuals)",
      "User preference learning and adaptation",
      "Content moderation and safety filters",
      "Analytics on user engagement and choices",
    ],
    techStack: "GPT-4, Stable Diffusion, Audio Generation, React, Three.js, AWS, Firebase, WebSockets",
    benefits: [
      "Enhanced Engagement: Increase user retention by 40% through personalized narrative experiences.",
      "Content Scalability: Generate thousands of unique narrative paths from a single content framework.",
      "Learning Outcomes: Improve information retention by 35% through interactive educational content.",
      "User Insights: Gather valuable data on user preferences and decision-making patterns.",
    ],
    backgroundImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8",
    detailImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
    color: "#8B5CF6",
  },
  {
    slug: "adgenesis",
    title: "AdGenesis",
    client: "Advertising",
    preview:
      "Revolutionize your advertising with AI-generated creatives tailored for different audience segments and platforms.",
    description:
      "AdGenesis is a cutting-edge platform that transforms advertising creative development through generative AI. Our system can automatically produce dozens of variations of ad creatives—from compelling copy and eye-catching images to short video clips—all tailored to specific audience segments and distribution channels. By analyzing performance data and user engagement metrics, AdGenesis continuously refines its outputs to maximize campaign effectiveness. This allows marketing teams to rapidly test and iterate on their advertising strategies while significantly reducing production costs and time-to-market.",
    features: [
      "Multi-format creative generation (text, image, video)",
      "Audience segment personalization engine",
      "Platform-specific formatting (social, display, search)",
      "A/B testing automation with performance analytics",
      "Brand voice and style consistency enforcement",
      "Dynamic creative adaptation based on performance",
      "Seasonal and trend-based creative updating",
      "Compliance and regulatory checks by industry",
    ],
    techStack:
      "Generative AI, Computer Vision, Video Generation, Python, TensorFlow, AWS, Figma API Integration, Analytics Pipeline",
    benefits: [
      "Production Efficiency: Reduce creative production time from weeks to hours while maintaining quality.",
      "Improved Performance: Increase click-through rates by 30% through targeted creative variations.",
      "Cost Reduction: Lower creative production costs by up to 70% compared to traditional methods.",
      "Campaign Agility: Quickly adapt to market trends and competitive activity with fresh creatives.",
    ],
    backgroundImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    detailImage: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1",
    color: "#EC4899",
  },
  {
    slug: "documind-analyzer",
    title: "DocuMind Analyzer",
    client: "Document Intelligence",
    preview: "Extract deep insights from complex documents with our advanced document analysis and research platform.",
    description:
      "DocuMind Analyzer is a sophisticated document intelligence system that processes and analyses documents of any format, from academic papers to legal contracts and creative works. Using advanced AI techniques, it triages documents by type, performs necessary conversions, and builds a comprehensive textual corpus. What sets DocuMind apart is its ability to extract and contextualize images within documents, understanding their relationship to the surrounding text and building a rich, interconnected knowledge graph. This enables nuanced question-answering capabilities and deeper analysis than traditional document processing systems.",
    features: [
      "Multi-format document processing (PDF, DOCX, ePub, etc.)",
      "Automatic document classification and triage",
      "Image extraction and contextual understanding",
      "Cross-reference identification between documents",
      "Deep semantic analysis for subtext and implications",
      "Custom knowledge graph construction",
      "Advanced question-answering system",
      "Summarization at multiple abstraction levels",
    ],
    techStack:
      "OCR Technology, Natural Language Understanding, Computer Vision, Knowledge Graphs, Vector Databases, Python, TensorFlow, Neo4j",
    benefits: [
      "Research Acceleration: Reduce research time by 80% while discovering deeper connections in content.",
      "Knowledge Extraction: Uncover hidden insights and relationships across vast document collections.",
      "Compliance Assurance: Identify regulatory concerns and contractual obligations automatically.",
      "Content Utilization: Maximize the value of existing document repositories and institutional knowledge.",
    ],
    backgroundImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
    detailImage: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06",
    color: "#F59E0B",
  },
  {
    slug: "careerpilot-ai",
    title: "CareerPilot AI",
    client: "Career Development",
    preview: "Optimize job applications and accelerate your career progress with our AI-powered career assistant.",
    description:
      "CareerPilot AI is a comprehensive career advancement platform that leverages artificial intelligence to optimize every aspect of the job search and career development process. Starting with resume analysis and optimization, CareerPilot intelligently tailors application materials to specific job descriptions, significantly increasing interview rates. The platform continuously scans job boards and company websites for opportunities that match the user's skills and career goals, providing personalized recommendations and application strategies. Through its coaching capabilities, CareerPilot also offers interview preparation, salary negotiation guidance, and ongoing career development planning.",
    features: [
      "AI-powered resume optimization for ATS systems",
      "Job description matching and application tailoring",
      "Automated cover letter generation with customization",
      "Personalized job opportunity alerts and recommendations",
      "Interview preparation with industry-specific questions",
      "Salary negotiation strategies and market data",
      "Career progression planning and skill gap analysis",
      "Professional network growth recommendations",
    ],
    techStack: "NLP, Machine Learning, Web Scraping, Python, React, Node.js, PostgreSQL, Redis",
    benefits: [
      "Application Success: Increase interview rates by 300% through optimized application materials.",
      "Time Efficiency: Reduce job search time by automating application customization and discovery.",
      "Market Insights: Access real-time salary and job requirement data for informed career decisions.",
      "Career Advancement: Accelerate professional growth through targeted skill development recommendations.",
    ],
    backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    detailImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    color: "#14B8A6",
  },
  {
    slug: "devflow-ai",
    title: "DevFlow AI",
    client: "Software Development",
    preview:
      "Streamline your development process from ideation to deployment with our intelligent workflow automation.",
    description:
      "DevFlow AI is a comprehensive development workflow automation platform that transforms how software products are built. From initial business idea to final deployment, our system employs specialized AI agents that assist at every stage of the development lifecycle. DevFlow helps users refine concepts, create detailed roadmaps, generate code, conduct thorough testing, handle deployment, and manage launch activities. By automating repetitive tasks and providing intelligent guidance, DevFlow significantly accelerates development timelines while maintaining high quality standards.",
    features: [
      "AI-assisted product ideation and validation",
      "Automated roadmap and sprint planning",
      "Code generation and documentation",
      "Intelligent testing and quality assurance",
      "CI/CD pipeline integration and optimization",
      "Deployment automation across environments",
      "Launch strategy planning and execution",
      "Progress tracking and bottleneck identification",
    ],
    techStack: "LLM for Code, Agent Framework, GitHub Integration, CI/CD Tools, Kubernetes, Docker, TypeScript, Python",
    benefits: [
      "Development Speed: Reduce development time by up to 60% while maintaining code quality.",
      "Quality Assurance: Decrease production bugs by 75% through consistent testing and best practices.",
      "Resource Optimization: Allow developers to focus on creative problem-solving instead of repetitive tasks.",
      "Predictable Delivery: Improve project estimation accuracy and consistently meet deadlines.",
    ],
    backgroundImage: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d",
    detailImage: "https://images.unsplash.com/photo-1629904853716-f0bc54eea481",
    color: "#0EA5E9",
  },
  {
    slug: "quantumtrade-ai",
    title: "QuantumTrade AI",
    client: "Financial Trading",
    preview:
      "Harness the power of advanced AI algorithms for sophisticated market analysis and automated trading strategies.",
    description:
      "QuantumTrade AI is a state-of-the-art trading platform powered by sophisticated artificial intelligence and machine learning algorithms. Our system analyzes vast amounts of market data, news, social sentiment, and economic indicators in real-time to identify trading opportunities across multiple asset classes. QuantumTrade employs a multi-agent architecture where specialized AI agents handle different aspects of the trading process—from market analysis and strategy formulation to risk management and execution. The platform adapts to changing market conditions and continuously optimizes its strategies based on performance data.",
    features: [
      "Multi-agent trading system architecture",
      "Real-time data processing across markets",
      "Sentiment analysis of news and social media",
      "Pattern recognition and anomaly detection",
      "Automated strategy development and backtesting",
      "Risk management and position sizing",
      "Multi-timeframe analysis",
      "Portfolio optimization and rebalancing",
    ],
    techStack:
      "Reinforcement Learning, Time Series Analysis, Neural Networks, Python, TensorFlow, Kafka, InfluxDB, AWS",
    benefits: [
      "Enhanced Performance: Access institutional-grade trading strategies previously unavailable to most investors.",
      "Risk Mitigation: Implement sophisticated risk management to protect capital in volatile markets.",
      "24/7 Operation: Take advantage of global market opportunities without constant human monitoring.",
      "Data-Driven Decisions: Eliminate emotional biases from trading decisions through systematic analysis.",
    ],
    backgroundImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3",
    detailImage: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29",
    color: "#6366F1",
  },
]

export default function ProjectPage() {
  const params = useParams()
  const { slug } = params

  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      const foundProject = projectsData.find((p) => p.slug === slug)
      setProject(foundProject)
      setLoading(false)
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Project not found</h1>
          <p className="mb-8">The project you're looking for doesn't exist or has been moved.</p>
          <Link href="/work" className="inline-block bg-black text-white py-3 px-8 rounded-full">
            Back to all projects
          </Link>
        </div>
      </div>
    )
  }

  // Find index of current project to determine next/prev
  const currentIndex = projectsData.findIndex((p) => p.slug === project.slug)
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="h-[50vh] relative" style={{ backgroundColor: project.color }}>
        <Image
          src={project.backgroundImage || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
        <div className="container mx-auto px-4 md:px-16 h-full flex items-end">
          <div className="pb-12 text-white">
            <Link href="/work" className="inline-flex items-center text-white/80 hover:text-white mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to all projects
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-white/80">{project.client}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-16 py-16">
        <div className="grid md:grid-cols-3 gap-16">
          <div className="md:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Overview</h2>
              <p className="text-lg mb-8">{project.description}</p>

              <div className="relative rounded-lg overflow-hidden mb-12 aspect-video">
                <Image
                  src={project.detailImage || "/placeholder.svg"}
                  alt={`${project.title} detail`}
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-6">Key Features</h2>
              <ul className="list-disc pl-6 mb-12 space-y-2">
                {project.features.map((feature: string, index: number) => (
                  <li key={index} className="text-lg">
                    {feature}
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl md:text-3xl font-bold mb-6">Benefits</h2>
              <ul className="list-disc pl-6 mb-12 space-y-2">
                {project.benefits.map((benefit: string, index: number) => (
                  <li key={index} className="text-lg">
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-32"
            >
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">Project Details</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-500 dark:text-gray-400">Client</h4>
                    <p>{project.client}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-500 dark:text-gray-400">Tech Stack</h4>
                    <p>{project.techStack}</p>
                  </div>
                </div>
              </div>

              <Link
                href="/contact"
                className="block w-full bg-black text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-black/80 transition-colors"
              >
                Discuss a similar project
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-8 text-center">More Projects</h2>
          <div className="flex flex-col md:flex-row justify-between">
            {prevProject && (
              <Link href={`/work/${prevProject.slug}`} className="group mb-8 md:mb-0">
                <div className="flex items-center">
                  <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-2 transition-transform" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Previous Project</p>
                    <h3 className="font-bold">{prevProject.title}</h3>
                  </div>
                </div>
              </Link>
            )}

            {nextProject && (
              <Link href={`/work/${nextProject.slug}`} className="group text-right">
                <div className="flex items-center justify-end">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Next Project</p>
                    <h3 className="font-bold">{nextProject.title}</h3>
                  </div>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
