"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useInView, MotionProps, Variants } from "framer-motion"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const offerings = [
  {
    id: "innovation-audit",
    title: "Innovation Audit",
    type: "Advisory Only",
    tagline: "Free/Pro Bono",
    description: "A 60-minute virtual consultation to identify high-impact automation opportunities.",
    features: [
      "60-minute virtual consultation analyzing your business operations",
      "Identification of 2-3 high-impact automation opportunities",
      "Assessment of current innovation capabilities and gaps",
      "Brief recommendations document highlighting next steps",
      "No implementation included - purely diagnostic and advisory",
    ],
    color: "#6366F1",
  },
  {
    id: "process-optimization",
    title: "Process Optimization Blueprint",
    type: "Advisory Only",
    tagline: "",
    description: "Comprehensive analysis of your core business processes with detailed improvement plans.",
    features: [
      "Comprehensive analysis of your core business processes",
      "Documentation of inefficiency points and automation opportunities",
      "ROI calculations for each recommended improvement",
      "Detailed blueprint with step-by-step optimization plan",
      "Vendor recommendations (but no implementation management)",
    ],
    color: "#10B981",
  },
  {
    id: "ai-implementation",
    title: "AI Implementation Roadmap",
    type: "Hybrid",
    tagline: "Strategy + Implementation Management",
    description: "Strategic selection and implementation oversight of AI tools tailored to your needs.",
    features: [
      "Strategic selection of optimal AI tools for your specific needs",
      "Vendor evaluation and selection (3-5 potential partners)",
      "Project scoping and requirements documentation",
      "Implementation timeline and budget planning",
      "Oversight of technical partners during execution (but no direct coding)",
    ],
    color: "#3B82F6",
  },
  {
    id: "product-innovation",
    title: "Product Innovation Accelerator",
    type: "Hybrid",
    tagline: "Strategy + Implementation Management",
    description: "End-to-end support for bringing new product concepts to market.",
    features: [
      "Product concept refinement and market fit validation",
      "Creation of detailed product requirements document",
      "Technical specification and architecture planning",
      "Developer hiring/selection and project management",
      "Launch strategy planning and execution oversight",
    ],
    color: "#8B5CF6",
  },
  {
    id: "fractional-director",
    title: "Fractional Innovation Director",
    type: "Comprehensive",
    tagline: "Strategy + Implementation Management",
    description: "Ongoing innovation leadership and project management for continuous improvement.",
    features: [
      "Monthly innovation strategy sessions and priority setting",
      "Ongoing process automation project management",
      "Product development initiative oversight",
      "Vendor and technical partner management",
      "Regular reporting on innovation KPIs and ROI tracking",
    ],
    color: "#EC4899",
  },
]

// Define Offering type based on the data structure
type Offering = typeof offerings[0];

// --- Reusable Offering Detail Card Component --- 
interface OfferingDetailCardProps {
  offering: Offering;
  getTypeColor: (type: string) => string;
  isMobile: boolean; // To slightly adjust styles if needed
  // Add animation props if card needs its own animation based on visibility
  // featureVariants?: Variants;
  // motionProps?: MotionProps;
}

function OfferingDetailCard({ offering, getTypeColor, isMobile }: OfferingDetailCardProps) {
  // Adjust padding for mobile to be smaller to prevent overflow
  const cardPadding = isMobile ? "p-4" : "p-8";
  const titleSize = isMobile ? "text-xl" : "text-2xl md:text-3xl";
  const descriptionSize = isMobile ? "text-base" : "text-lg";
  const featureListStyle = isMobile ? "space-y-2 mb-4 text-sm" : "space-y-3 mb-8";
  const featureIconSize = isMobile ? "h-4 w-4" : "h-5 w-5";
  const featureIconMargin = isMobile ? "mr-2 mt-0.5" : "mr-3 mt-1";
  // Adjusted button padding to be smaller on mobile
  const buttonPadding = isMobile ? "py-2 px-4" : "py-3 px-8";
  const buttonContainerStyle = isMobile ? "mt-auto pt-2" : ""; // Reduced padding-top
  // Make the button auto-width on mobile instead of full width
  const buttonWidth = isMobile ? "" : ""; // Removed w-full for mobile

  return (
    <div className={`bg-white border border-gray-200 ${cardPadding} rounded-xl shadow-sm h-full flex flex-col`}>
      {/* Color bar */}
      <div className={`w-16 h-1 mb-4 ${isMobile ? 'md:mb-6' : 'mb-6'} rounded flex-shrink-0`} style={{ backgroundColor: offering.color }}></div>
      
      {/* Title */}
      <h3 className={`${titleSize} font-bold mb-2 text-gray-900 break-words`}>{offering.title}</h3>
      
      {/* Type & Tagline */}
      <div className="mb-3 flex flex-wrap gap-2 items-center">
          <span className={`inline-block px-2 py-1 text-xs rounded-full ${getTypeColor(offering.type)}`}>{offering.type}</span>
          {offering.tagline && <span className="text-xs text-gray-500">{offering.tagline}</span>}
      </div>
      
      {/* Description */}
      <p className={`${descriptionSize} text-gray-700 ${isMobile ? 'mb-4' : 'mb-8'} break-words`}>{offering.description}</p>
      
      {/* Features */}
      <h4 className="text-md font-semibold mb-2 text-gray-900">What's included:</h4>
      <ul className={featureListStyle}>
          {offering.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-start">
                  <CheckCircle2 className={`${featureIconSize} text-green-500 ${featureIconMargin} flex-shrink-0`} />
                  <span className="text-gray-700 break-words">{feature}</span>
              </li>
          ))}
      </ul>
      
      {/* Button */}
      <div className={buttonContainerStyle}> 
          {/* Use Button component */}
           <Button 
             asChild 
             variant="dark-pill" 
             size="pill" 
             className={`inline-block ${buttonWidth} text-center`} // Simplified classes
           > 
             <Link href={`/contact?intent=service_inquiry&service=${offering.id}`}>
                {/* Keep motion span if needed, Button might handle hover/tap differently */}
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="inline-block">
                     Inquire about this service
                 </motion.span>
             </Link>
           </Button>
      </div>
    </div>
  );
}

// --- Main Component --- 
export default function ProductOfferings() {
  const [activeOfferingId, setActiveOfferingId] = useState(offerings[0].id)
  const [currentIndex, setCurrentIndex] = useState(0)

  const sectionRef = useRef(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, offerings.length)
  }, [])

  // --- Scroll Handlers (Keep as is) --- 
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || window.innerWidth >= 768) return
    const container = scrollContainerRef.current
    const scrollLeft = container.scrollLeft
    const containerWidth = container.offsetWidth
    let closestIndex = 0
    let minDistance = Infinity
    itemRefs.current.forEach((item, index) => {
      if (item) {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2
        const distance = Math.abs(scrollLeft + containerWidth / 2 - itemCenter)
        if (distance < minDistance) {
          minDistance = distance
          closestIndex = index
        }
      }
    })
    if (closestIndex !== currentIndex) {
        setCurrentIndex(closestIndex)
    }
  }, [currentIndex])

  const scrollToItem = (index: number) => {
    const item = itemRefs.current[index]
    if (item && scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const scrollLeft = item.offsetLeft - container.offsetLeft
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
      setCurrentIndex(index)
    }
  }
  // --- End Scroll Handlers ---

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Advisory Only": return "bg-blue-100 text-blue-800"
      case "Hybrid": return "bg-purple-100 text-purple-800"
      case "Comprehensive": return "bg-pink-100 text-pink-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  // --- Animation Variants (Define outside if static, or keep here) ---
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } } }
  const featureVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({ opacity: 1, x: 0, transition: { delay: i * 0.05, type: "spring", stiffness: 100, damping: 20 } })
  }
  const desktopCardAnimationProps: MotionProps = {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -30 },
      transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.3 }
  }
  // --- End Animation Variants ---

  // Get the currently active offering details for desktop view
  const currentOfferingDetails = offerings.find(o => o.id === activeOfferingId) || offerings[0];

  return (
    <section
      id="services"
      className="py-16 md:py-32 bg-white text-black overflow-hidden"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 md:px-16">
        {/* --- Section Header (Keep as is) --- */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 50, damping: 20 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Innovation Services</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Our productized services offer clear pathways to innovation, with transparent advisory and implementation options tailored to your needs.
          </p>
        </motion.div>

        {/* --- Main Content Grid --- */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* --- Desktop Sidebar (Hidden on Mobile) --- */}
          <div className="hidden md:block md:col-span-1">
             <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-4 md:sticky md:top-24"
            >
              {offerings.map((offering) => (
                // Consider extracting this sidebar item too if it gets complex
                <motion.div
                  key={offering.id}
                  variants={itemVariants}
                  whileHover={{ x: 5, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  className={`cursor-pointer p-4 rounded-lg transition-all ${
                    activeOfferingId === offering.id
                      ? "bg-gray-100 border-l-4 shadow-sm"
                      : "hover:bg-gray-50 border-l-4 border-transparent"
                  }`}
                  style={{ borderLeftColor: activeOfferingId === offering.id ? offering.color : "transparent" }}
                  onClick={() => setActiveOfferingId(offering.id)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">{offering.title}</h3>
                    {activeOfferingId === offering.id && (
                      <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                        <ArrowRight className="h-4 w-4 text-gray-900" />
                      </motion.div>
                    )}
                  </div>
                   <div className="mt-2 flex flex-wrap gap-2 items-center">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${getTypeColor(offering.type)}`}>{offering.type}</span>
                    {offering.tagline && <span className="text-xs text-gray-500">{offering.tagline}</span>}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* --- Content Area (Handles Mobile Scroll & Desktop Details) --- */}
          <div className="col-span-1 md:col-span-2">

            {/* --- Mobile Horizontal Scroll Container --- */}
            <div className="md:hidden">
              <div
                  ref={scrollContainerRef}
                  className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mb-4 scrollbar-hide -mx-4 px-4" // Added px-4 to balance negative margins
                  onScroll={handleScroll}
              >
                  {offerings.map((offering, index) => {
                      const setRef = (el: HTMLDivElement | null): void => { itemRefs.current[index] = el; };
                      return (
                          <div // Item Wrapper
                              key={offering.id}
                              ref={setRef}
                              className="min-w-full flex-shrink-0 snap-center pr-4" // Added right padding to ensure space between cards
                          >
                              {/* Use the reusable card component */}
                              <OfferingDetailCard 
                                offering={offering} 
                                getTypeColor={getTypeColor} 
                                isMobile={true} 
                              />
                          </div>
                      );
                  })}
              </div>

              {/* --- Mobile Pagination Dots --- */}
              <div className="flex justify-center space-x-2 mt-6">
                {offerings.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToItem(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentIndex === index ? 'bg-black' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to offering ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* --- Desktop Detail View (Hidden on Mobile) --- */}
             <div className="hidden md:block">
                <AnimatePresence mode="wait">
                    <motion.div key={currentOfferingDetails.id} {...desktopCardAnimationProps} >
                       {/* Use the reusable card component */}
                       <OfferingDetailCard 
                          offering={currentOfferingDetails} 
                          getTypeColor={getTypeColor} 
                          isMobile={false}
                       />
                    </motion.div>
                </AnimatePresence>
            </div>

          </div> {/* End Content Area */}
        </div> {/* End Main Grid */}
      </div> {/* End Container */}
    </section>
  )
}
