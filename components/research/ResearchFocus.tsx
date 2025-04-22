import React from 'react';
import { cn } from "@/lib/utils";
import { Target, CalendarDays, Scaling } from 'lucide-react'; // Icons representing geometric price projection, harmonic time cycle analysis, and price-time squaring & resonance

/**
 * Props for the ResearchFocus component.
 */
interface ResearchFocusProps {}

const focusAreas = [
  {
    name: 'Geometric Price Projection',
    icon: Target, // Represents targeting price levels/angles
    description: 'Identifying high-probability support, resistance, and trend trajectories based on intrinsic geometric relationships inherent in price charts.'
  },
  {
    name: 'Harmonic Time Cycle Analysis',
    icon: CalendarDays, // Represents time cycles
    description: 'Forecasting market turning points by analyzing the confluence of recurring, mathematically derived time cycles observed across multiple scales.'
  },
  {
    name: 'Price-Time Squaring & Resonance',
    icon: Scaling, // Represents balance/scaling/squaring
    description: 'Detecting potential trend exhaustion or acceleration points where price range and time duration achieve specific proportional relationships.'
  },
];

/**
 * Research focus section component for the Research subdomain.
 * Details the three core research areas.
 * @param props - The props for the component.
 * @returns The rendered research focus section.
 */
export const ResearchFocus: React.FC<ResearchFocusProps> = (props) => {
  return (
    <section className="py-16 md:py-24 w-full bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Research Focus
        </h2>
        
        {/* Use flex with justify-center to ensure center alignment when fewer items are in a row */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {focusAreas.map((area) => {
            const Icon = area.icon;
            return (
              <div 
                key={area.name} 
                className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] max-w-sm"
              >
                {/* Optional Image placeholder - uncomment if using images
                {area.image && (
                  <div className="relative h-40 mb-4 rounded-t-lg overflow-hidden">
                    <Image src={area.image} alt={area.name} layout="fill" objectFit="cover" />
                  </div>
                )} */}
                <div className="flex items-center mb-4">
                  <div className="mr-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{area.name}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 flex-grow">{area.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}; 