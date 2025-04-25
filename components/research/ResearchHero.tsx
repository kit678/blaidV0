import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from "@/lib/utils";

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
    <section className="relative w-full h-screen overflow-hidden flex items-center bg-black">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt="Financial market data visualization"
        layout="fill"
        objectFit="cover"
        quality={85}
        priority // Load hero image faster
        className="absolute inset-0 z-0 opacity-50"
      />

      {/* Gradient Overlay - Adjusted for better readability with left-aligned text */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>

      {/* Content - Aligned Left */}
      <div className="container mx-auto px-4 md:px-16 relative z-20">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Unveiling Market Structure Through Time & Price Geometry
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mb-8">
            Blaide Research pioneers quantitative frameworks that decipher the intrinsic geometric and temporal architecture governing market movements across equities, commodities, and FX.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="text-white/70 hover:text-white transition-colors text-sm"
            >
              Looking for our main services? <span className="underline">Visit Blaide Labs</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Optional: Add subtle waveform/visual element if available */}
    </section>
  );
}; 