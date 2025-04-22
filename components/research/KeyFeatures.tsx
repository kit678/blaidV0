import React from 'react';
// import { LineChart, Target, ShieldCheck, BarChartBig, Bot } from 'lucide-react'; // Assuming lucide-react icons - Removed unused
import { cn } from "@/lib/utils";
import { TrendingUp, CalendarClock, Scale, Waves, Activity } from 'lucide-react';

/**
 * Props for the KeyFeatures component.
 */
interface KeyFeaturesProps {}

const features = [
  {
    name: 'Geometric Angle Forecasting',
    icon: TrendingUp,
    description: 'Identifying dynamic support/resistance levels and trend channels based on fixed geometric angles derived from price action.'
  },
  {
    name: 'Cyclical Turning Point Identification',
    icon: CalendarClock,
    description: 'Pinpointing potential market reversals through the analysis of dominant, recurring time cycles and their harmonic relationships.'
  },
  {
    name: 'Price-Time Equilibrium Analysis',
    icon: Scale,
    description: 'Detecting zones of potential trend completion or initiation where price movement achieves mathematical equivalence with time duration.'
  },
  {
    name: 'Harmonic Resonance Mapping',
    icon: Waves,
    description: 'Mapping key price levels where market action exhibits numerical resonance, indicating potential support, resistance, or acceleration points.'
  },
  {
    name: 'Volatility Cycle Prediction',
    icon: Activity,
    description: 'Anticipating shifts in market volatility by correlating price fluctuations with underlying temporal cycle patterns.'
  },
];

/**
 * Key features section component for the Research subdomain.
 * Displays a grid of key features with icons and descriptions.
 * @param props - The props for the component.
 * @returns The rendered key features section.
 */
export const KeyFeatures: React.FC<KeyFeaturesProps> = (props) => {
  return (
    <section className="py-16 md:py-24 w-full bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Key Capabilities
        </h2>
        
        {/* Using flex with wrap and justify-center instead of grid to ensure center alignment */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.name} 
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] max-w-sm"
              >
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800 text-white">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}; 