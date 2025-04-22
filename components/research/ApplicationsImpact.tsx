import React from 'react';
import { cn } from "@/lib/utils";
import { BookOpen, Briefcase, BrainCircuit, ShieldAlert } from 'lucide-react'; // Icons for audiences

/**
 * Props for the ApplicationsImpact component.
 */
interface ApplicationsImpactProps {}

const impacts = [
  {
    audience: 'Academics',
    benefit: 'A deterministic framework for modeling market structure based on geometric principles and fixed time cycles.',
    icon: BookOpen
  },
  {
    audience: 'Asset Managers',
    benefit: 'Enhanced timing signals derived from price-time geometry and cyclical confluence points for improved entry, exit, and hedging.',
    icon: Briefcase
  },
  {
    audience: 'Quant Funds',
    benefit: 'Access to uncorrelated predictive factors rooted in market geometry and temporal harmonics, distinct from standard statistical models.',
    icon: BrainCircuit
  },
  {
    audience: 'Risk Management',
    benefit: 'Proactive identification of potential volatility shifts and market turning points based on predictive cycle analysis.',
    icon: ShieldAlert
  },
];

/**
 * Applications and impact section component for the Research subdomain.
 * Highlights the value proposition for different target audiences.
 * @param props - The props for the component.
 * @returns The rendered applications and impact section.
 */
export const ApplicationsImpact: React.FC<ApplicationsImpactProps> = (props) => {
  return (
    <section className="py-16 md:py-24 w-full bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Applications & Impact
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 shadow-md">
            <ul className="space-y-8">
              {impacts.map((impact) => {
                const Icon = impact.icon;
                return (
                  <li key={impact.audience} className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800 text-white">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{impact.audience}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">{impact.benefit}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}; 