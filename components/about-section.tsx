"use client"

import { motion, useScroll, useTransform, useSpring, MotionValue, useMotionValueEvent, animate, motionValue } from "framer-motion"
import { useRef, useMemo, useState, useEffect } from "react"
import { cn } from "@/lib/utils" // Assuming you have a utility like this for classnames

/**
 * Interface for the animated statistic component.
 */
interface AnimatedStatisticProps {
  value: MotionValue<number>;
  formatOptions?: Intl.NumberFormatOptions;
  className?: string;
}

/**
 * Component to display an animated number.
 * @param {AnimatedStatisticProps} props - The component props.
 * @returns {JSX.Element} The animated statistic element.
 */
const AnimatedStatistic: React.FC<AnimatedStatisticProps> = ({ value, formatOptions = {}, className }) => {
  const [isMounted, setIsMounted] = useState(false);

  // Get the initial value *once* for the static render
  // Note: This assumes the MotionValue is initialized synchronously with the component.
  // If it's updated async *before* mount, this might need adjustment, but usually fine.
  const initialValue = useMemo(() => value.get(), [value]); 

  useEffect(() => {
    // This runs only on the client after the initial render
    setIsMounted(true);
  }, []);

  const displayValue = useTransform(value, latest => {
    // Rounding here ensures we format integers, potentially avoiding minor float issues with compact notation
    return new Intl.NumberFormat("en-US", formatOptions).format(Math.round(latest));
  });

  if (!isMounted) {
    // Render static value matching potential server render before hydration
    const formattedInitial = new Intl.NumberFormat("en-US", formatOptions).format(Math.round(initialValue));
    // Use a regular span, not motion.span
    return <span className={cn("tabular-nums", className)}>{formattedInitial}</span>;
  }

  // After mounting, render the animated motion component
  return <motion.span className={cn("tabular-nums", className)}>{displayValue}</motion.span>;
};

/**
 * Data structure for each slide.
 */
interface SlideData {
  id: number;
  statisticValue: number;
  statisticLabel: string;
  statisticFormatOptions?: Intl.NumberFormatOptions;
  description: string;
  source: string;
}

/**
 * Content for the three slides.
 */
const slidesData: SlideData[] = [
  {
    id: 1,
    statisticValue: 70717,
    statisticLabel: "AI startups worldwide in 2024",
    description: "The rapid proliferation of AI startups—totaling over 70,000 globally—demonstrates the unprecedented opportunities AI is creating for entrepreneurship. This surge reflects how AI is democratizing innovation, enabling individuals with diverse skill sets to launch their own ventures, particularly in tech and software sectors. By leveraging AI, aspiring entrepreneurs can tap into a thriving ecosystem that not only supports new business creation but also positions them at the forefront of technological advancement. Partnering with our firm ensures you have the end-to-end support needed to transform your AI-driven idea into a successful, sustainable business.",
    source: "EdgeDelta, 2024",
  },
  {
    id: 2,
    statisticValue: 42.5e9, // 42.5 billion
    statisticLabel: "received by AI startups in funding in 2023",
    statisticFormatOptions: { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 },
    description: "The staggering $42.5 billion invested in AI startups in 2023 underscores the immense confidence investors have in AI's potential to drive economic growth. This funding not only fuels the creation of cutting-edge businesses but also signals a golden era for self-employment and entrepreneurship. With AI as your ally, you can access the tools and resources needed to build scalable, impactful ventures. Our firm provides the expertise to help you secure funding, refine your business model, and navigate the competitive landscape, ensuring your AI-powered business thrives.",
    source: "EdgeDelta, 2024",
  },
  {
    id: 3,
    statisticValue: 826.7e9, // 826.7 billion
    statisticLabel: "expected AI market reach by 2030",
    statisticFormatOptions: { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 },
    description: "The AI market's projected growth to $826.70 billion by 2030 highlights the vast economic potential of AI-driven industries. This exponential expansion creates a wealth of opportunities for individuals to start their own businesses, whether as AI consultants, software developers, or innovators in AI applications. As AI reshapes industries, those who embrace it will lead the future of work. By partnering with our firm, you gain a strategic advantage with comprehensive support—from ideation and implementation to marketing and scaling—ensuring your venture captures a share of this booming market.",
    source: "EdgeDelta, 2024", // Assuming same source
  },
];

// --- Graphic Component Props Interface ---
interface GraphicProps {
  progress: MotionValue<number>; // Represents progress from 0 to 1 for this specific graphic
}

// --- Slide 1 Graphic: Global Network ---
const WorldMapSVG = () => (
  // Simple illustrative SVG map - replace with a more detailed/styled one if desired
  <svg viewBox="0 0 1000 500" className="w-full h-auto absolute inset-0 opacity-10">
    <path d="M..." fill="#ccc" /> {/* Add actual SVG path data here */} 
    {/* Example simplified path - THIS NEEDS REAL SVG DATA */} 
    <path d="M500 0 L450 100 L200 150 L100 300 L300 450 L700 450 L900 300 L800 150 L550 100 Z" fill="#E0E0E0" stroke="#BDBDBD" strokeWidth="1" />
    {/* Add more paths for continents */}
  </svg>
);

const TOTAL_DOTS = 150; // Number of dots to represent startups
const MAX_STARTUPS = 70717; // The actual statistic value

const Slide1Graphic: React.FC<GraphicProps> = ({ progress }) => {
  const opacity = useTransform(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]); // Fade in/out container

  // Generate random positions for dots ONCE using useMemo
  const dotPositions = useMemo(() => {
    return Array.from({ length: TOTAL_DOTS }).map(() => ({
      x: `${Math.random() * 90 + 5}%`, // 5% to 95% to avoid edges
      y: `${Math.random() * 90 + 5}%`,
      delay: Math.random() * 0.8, // Random delay factor for staggering appearance (relative to progress)
    }));
  }, []);

  // Calculate how many dots should be visible based on progress
  // Map progress 0 -> 1 to dots 0 -> TOTAL_DOTS
  const visibleDotsCount = useTransform(progress, [0, 1], [0, TOTAL_DOTS]);
  // Map progress 0 -> 1 to the actual statistic 0 -> MAX_STARTUPS
  const animatedStatValue = useTransform(progress, [0, 1], [0, MAX_STARTUPS]);

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center rounded-lg relative overflow-hidden bg-blue-50"
      style={{ opacity }} // Fade the whole container
    >
      {/* Optional: Render the map SVG */}
      {/* <WorldMapSVG /> */}
      
      {/* Render the dots */}
      <div className="absolute inset-0">
        {dotPositions.map((pos, index) => {
          // Determine opacity based on whether this dot index is within the visible count
          // Stagger appearance using the delay factor
          const dotOpacity = useTransform(
            progress, // Use the main 0-1 progress
            [pos.delay * 0.5, pos.delay * 0.5 + 0.3], // Appears between delay*0.5 and delay*0.5 + 0.3
            [0, 1] // Fade from 0 to 1
          );
          const dotScale = useTransform(dotOpacity, [0, 1], [0.5, 1]); // Scale up as it fades in

          return (
            <motion.div
              key={index}
              className="absolute w-2 h-2 bg-blue-500 rounded-full"
              style={{
                left: pos.x,
                top: pos.y,
                opacity: dotOpacity,
                scale: dotScale,
              }}
            />
          );
        })}
      </div>
      
      {/* Display the animated statistic value - optional, could be part of the text side */}
      <div className="relative z-10 p-4 bg-black/50 rounded">
         <AnimatedStatistic 
            value={animatedStatValue} 
            className="text-2xl font-bold text-white" 
            formatOptions={{ notation: 'compact' }}
         />
         <p className="text-white/80 text-sm">AI Startups</p>
      </div>

    </motion.div>
  );
};

// --- Slide 2 Graphic: Particle Flow ---
const NUM_PARTICLES = 100;
const MAX_FUNDING = 42.5e9; // Slide 2 statistic

const Slide2Graphic: React.FC<GraphicProps> = ({ progress }) => {
  const containerOpacity = useTransform(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const particles = useMemo(() => {
    return Array.from({ length: NUM_PARTICLES }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2; // Random angle
      const radius = 150 + Math.random() * 50; // Start radius (outside center)
      const startX = `${50 + radius * Math.cos(angle)}%`;
      const startY = `${50 + radius * Math.sin(angle)}%`;
      const endX = `${50 + Math.random() * 10 - 5}%`; // End near center with slight variation
      const endY = `${50 + Math.random() * 10 - 5}%`;
      const delay = Math.random() * 0.7; // Delay factor (0 to 0.7 of progress)
      const duration = 0.3 + Math.random() * 0.2; // Duration factor (0.3 to 0.5 of progress)

      return {
        id: i,
        startX,
        startY,
        endX,
        endY,
        delay,
        duration,
      };
    });
  }, []);

  // Central core animation
  const coreScale = useTransform(progress, [0.3, 0.8], [0.5, 1.2]); // Grows as particles arrive
  const coreOpacity = useTransform(progress, [0.2, 0.5, 0.9], [0, 1, 0.8]);

  // Animated statistic for display within graphic
  const animatedStatValue = useTransform(progress, [0, 1], [0, MAX_FUNDING]);

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center rounded-lg relative overflow-hidden bg-green-50"
      style={{ opacity: containerOpacity }}
    >
      {/* Central Core Element */}
      <motion.div
        className="absolute w-16 h-16 bg-green-500 rounded-full blur-md"
        style={{
          left: '50%',
          top: '50%',
          translateX: '-50%',
          translateY: '-50%',
          scale: coreScale,
          opacity: coreOpacity,
        }}
      />

      {/* Particle Elements */}
      <div className="absolute inset-0">
        {particles.map(p => {
          // Map particle's movement based on its delay and duration within the overall progress
          const particleProgress = useTransform(progress, [p.delay, p.delay + p.duration], [0, 1]);
          
          const x = useTransform(particleProgress, [0, 1], [p.startX, p.endX]);
          const y = useTransform(particleProgress, [0, 1], [p.startY, p.endY]);
          const opacity = useTransform(particleProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]); // Fade in quickly, fade out at end
          const scale = useTransform(particleProgress, [0, 1], [0.3, 1]);

          return (
            <motion.div
              key={p.id}
              className="absolute w-2 h-2 bg-green-600 rounded-full"
              style={{ 
                x, 
                y, 
                opacity, 
                scale, 
                // Position origin needs to be center for x/y % values to work correctly
                transformOrigin: 'center center',
                // Use translate to center the dot itself relative to its top/left % point
                translateX: '-50%', 
                translateY: '-50%',
              }}
            />
          );
        })}
      </div>

      {/* Optional Statistic Display */}
      <div className="relative z-10 p-4 bg-black/50 rounded">
         <AnimatedStatistic 
            value={animatedStatValue} 
            className="text-2xl font-bold text-white" 
            formatOptions={{ style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 }}
         />
         <p className="text-white/80 text-sm">Funding Received</p>
      </div>

    </motion.div>
  );
};

// --- Slide 3 Graphic: Geometric Landscape ---
const MAX_MARKET_VALUE = 826.7e9; // Slide 3 statistic

// Define SVG layers
const landscapeLayers = [
  // Define layers as objects with path data and optional base color
  // Paths should span the width (e.g., 0 to 100) and have height variations
  { id: 1, d: "M0,100 C20,80 40,110 60,90 S80,100 100,80 L100,100 Z", fill: "#CDB4DB" }, // Farthest back
  { id: 2, d: "M0,100 C15,85 35,105 55,80 S75,95 100,70 L100,100 Z", fill: "#FFAFCC" },
  { id: 3, d: "M0,100 C25,75 45,100 65,70 S85,90 100,60 L100,100 Z", fill: "#BDE0FE" },
  { id: 4, d: "M0,100 C30,70 50,95 70,65 S90,85 100,50 L100,100 Z", fill: "#A2D2FF" }  // Closest front
];

const Slide3Graphic: React.FC<GraphicProps> = ({ progress }) => {
  const containerOpacity = useTransform(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  // Animated statistic for display within graphic
  const animatedStatValue = useTransform(progress, [0, 1], [0, MAX_MARKET_VALUE]);

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center rounded-lg relative overflow-hidden bg-purple-50"
      style={{ opacity: containerOpacity }}
    >
      {/* SVG Container for Landscape */}
      <motion.svg
        viewBox="0 0 100 100" // Use a 0-100 viewBox for easy path coordinates
        preserveAspectRatio="none" // Stretch to fill container
        className="absolute inset-0 w-full h-full"
      >
        {landscapeLayers.map((layer, index) => {
          const layerCount = landscapeLayers.length;
          // Stagger the animation start slightly for each layer
          const startProgress = index * 0.1; // Layer 0 starts at progress 0, Layer 1 at 0.1, etc.
          const endProgress = startProgress + (1 - startProgress) * 0.8; // End animation earlier for faster feel

          // Map the overall progress to this layer's animation timeline (0 to 1)
          const layerProgress = useTransform(progress, [startProgress, endProgress], [0, 1]);

          // Animate scaleY from 0 to 1 based on layerProgress
          const scaleY = useTransform(layerProgress, [0, 1], [0, 1]);
          // Fade in the layer
          const opacity = useTransform(layerProgress, [0, 0.5], [0, 1]);

          return (
            <motion.path
              key={layer.id}
              d={layer.d}
              fill={layer.fill}
              style={{
                scaleY,
                opacity,
                transformOrigin: '50% 100%', // Scale from bottom center
                // Ensure layers stack correctly visually (optional, depends on path design)
                // translateY: useTransform(layerProgress, [0, 1], ["1px", "0px"]) // Tiny push to avoid gaps
              }}
            />
          );
        })}
      </motion.svg>

      {/* Optional Statistic Display */}
      <div className="relative z-10 p-4 bg-black/50 rounded">
         <AnimatedStatistic
            value={animatedStatValue}
            className="text-2xl font-bold text-white"
            formatOptions={{ style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 }}
         />
         <p className="text-white/80 text-sm">Projected Market Value 2030</p>
      </div>

    </motion.div>
  );
};

/**
 * Main component for the scrolling infographic section.
 * @returns {JSX.Element} The AboutSection component.
 */
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const numSlides = slidesData.length;
  // Increase height significantly to allow for gated scrolling
  const sectionHeightVh = 100 + numSlides * 150; 

  const [activeSlide, setActiveSlide] = useState(0);

  // Explicit motion values for each slide's 0-1 progress
  const slideProgressValues = useMemo(() => 
    Array.from({ length: numSlides }).map(() => motionValue(0)),
    [numSlides]
  );

  // Scroll progress relative to the entire section height
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"], // Pinned from top to bottom
  });

  // Smoothed progress for responsive updates
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 150, // Slightly stiffer for faster reaction
    damping: 40,
    restDelta: 0.001,
  });

  // --- Logic for Gated Slide Advancement --- 
  useMotionValueEvent(smoothScrollYProgress, "change", (latest) => {
    const currentScroll = latest;
    let newActiveSlide = activeSlide;

    // Determine progress within the current active slide's dedicated scroll range
    const activeSlideStart = activeSlide / numSlides; 
    const progressInActiveSlide = Math.max(0, Math.min(1, (currentScroll - activeSlideStart) * numSlides));
    
    // Update the progress MotionValue for the current active slide
    slideProgressValues[activeSlide]?.set(progressInActiveSlide); 

    // Check for advancing to the next slide
    if (progressInActiveSlide >= 0.99 && activeSlide < numSlides - 1) {
      const nextSlideStartThreshold = (activeSlide + 1) / numSlides;
      if (currentScroll >= nextSlideStartThreshold) {
        newActiveSlide = activeSlide + 1;
        // Ensure previous slide value is exactly 1 when advancing
        slideProgressValues[activeSlide]?.set(1);
        // Start the new slide's progress based on current scroll overshoot
        const progressInNewSlide = Math.max(0, Math.min(1, (currentScroll - nextSlideStartThreshold) * numSlides));
        slideProgressValues[newActiveSlide]?.set(progressInNewSlide);
      }
    } 

    // Check for scrolling back up
    const targetSlideBasedOnScroll = Math.max(0, Math.min(numSlides - 1, Math.floor(currentScroll * numSlides)));
    if (targetSlideBasedOnScroll < activeSlide) {
       newActiveSlide = targetSlideBasedOnScroll;
       // Reset progress for slides ahead of the new active one
       for (let i = newActiveSlide + 1; i < numSlides; i++) {
         slideProgressValues[i]?.set(0);
       }
    }
    
    // Only update state if the active slide actually changed
    if (newActiveSlide !== activeSlide) {
      setActiveSlide(newActiveSlide);
    }
    
    // Ensure progress values for slides *before* the new active one are set correctly (e.g., 1 if passed, or their partial progress if scrolling up)
    for (let i = 0; i < newActiveSlide; i++) {
        slideProgressValues[i]?.set(1); // Set previous slides to completed
    }
  });

  // Map slide index to the graphic component
  const graphicComponents = [Slide1Graphic, Slide2Graphic, Slide3Graphic];
  const START_PERCENTAGE = 0.8; // Start counter animations from 80%

  return (
    <section
      id="infographic-slides"
      ref={sectionRef}
      className={`h-[${sectionHeightVh}vh] py-20 md:py-32 bg-white text-black relative`}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="container mx-auto px-4 md:px-16 h-full flex items-center">
          <div className="grid md:grid-cols-2 gap-16 items-center w-full relative">
            {/* Left Side: Text Content - Now driven by slideProgressValues */}
            <div className="relative h-[400px] md:h-[500px]"> 
              {slidesData.map((slide, index) => {
                 // Use the dedicated motionValue for this slide's progress
                const currentSlideProgress = slideProgressValues[index];

                // Animate text opacity/transform based on its OWN progress (0 to 1)
                const opacity = useTransform(currentSlideProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
                const scale = useTransform(currentSlideProgress, [0, 0.1, 0.9, 1], [0.95, 1, 1, 0.95]);
                const y = useTransform(currentSlideProgress, [0, 0.1, 0.9, 1], ["20px", "0px", "0px", "-20px"]);

                // Animate statistic value based on its OWN progress, starting from START_PERCENTAGE
                const animatedValue = useTransform(currentSlideProgress, 
                  [0, 1], 
                  [slide.statisticValue * START_PERCENTAGE, slide.statisticValue]
                );
                
                return (
                  <motion.div
                    key={slide.id}
                    className="absolute inset-0 flex flex-col justify-center"
                    // Use the index as zIndex, higher index means potentially active
                    style={{ opacity, scale, y, zIndex: index === activeSlide ? 10 : index }}
                  >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 flex flex-col items-start gap-1">
                      <AnimatedStatistic
                        value={animatedValue}
                        formatOptions={slide.statisticFormatOptions}
                        className="text-blue-600" // Keep color consistent for now
                      />
                      <span className="text-xl md:text-2xl font-medium text-gray-700">{slide.statisticLabel}</span>
                    </h2>
                    <p className="text-base md:text-lg mb-4 md:mb-6 text-gray-800">{slide.description}</p>
                    <p className="text-sm text-gray-500 italic">Source: {slide.source}</p>
              </motion.div>
                );
              })}
            </div>

            {/* Right Side: Graphics - Container fades based on activeSlide, internal animation uses slideProgressValues */}
              <div className="relative h-[350px] md:h-[650px] mx-0 md:-mx-8">
              {slidesData.map((slide, index) => {
                 const GraphicComponent = graphicComponents[index];
                 if (!GraphicComponent) return null;

                 // Use the dedicated motionValue for this graphic's internal animation
                 const graphicInternalProgress = slideProgressValues[index];
                 
                 // Determine visibility/scale of the *container* based on whether its slide is active
                 // Simple approach: Fully visible if active, hidden otherwise (can be faded)
                 const isActive = index === activeSlide;
                 const containerOpacity = isActive ? 1 : 0;
                 const containerScale = isActive ? 1 : 0.9;

                 return (
                <motion.div
                     key={`graphic-container-${slide.id}`}
                     className="absolute inset-0"
                  style={{
                       zIndex: index === activeSlide ? 10 : index, // Ensure active graphic is on top
                     }}
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{
                        opacity: containerOpacity,
                        scale: containerScale,
                     }}
                     transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth fade between containers
                   >
                     <GraphicComponent progress={graphicInternalProgress} />
                </motion.div>
                 );
              })}
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
