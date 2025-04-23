import React from 'react';
import Image from 'next/image';
import { cn } from "@/lib/utils"; // Assuming cn utility exists for class merging

/**
 * Props for the ResearchHero component.
 */
interface ResearchHeroProps {}

const backgroundImage = '/images/unsplash/photo-1611974789855-9c2a0a7236a3.webp';

/**
 * Hero section component for the Research subdomain.
 * Displays headline, introduction, and background image with gradient overlay.
 * @param props - The props for the component.
 * @returns The rendered hero section.
 */
export const ResearchHero: React.FC<ResearchHeroProps> = (props) => {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt="Financial market data visualization"
        layout="fill"
        objectFit="cover"
        quality={85}
        priority // Load hero image faster
        className="absolute inset-0 z-0"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/90 via-slate-900/80 to-black/90"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 w-full max-w-6xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 mb-6 sm:mb-8 leading-tight">
          Unveiling Market Structure Through Time & Price Geometry
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto">
          Blaide Research pioneers quantitative frameworks that decipher the intrinsic geometric and temporal architecture governing market movements across equities, commodities, and FX.
        </p>
        {/* Optional: Add a CTA button later if needed */}
      </div>

      {/* Optional: Add subtle waveform/visual element if available */}
    </section>
  );
}; 