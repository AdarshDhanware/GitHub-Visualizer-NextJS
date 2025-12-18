"use client"

import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import AnalyticsShowcase from './AnalyticsShowcase';
import DeveloperSection from './DeveloperSection';
import CTASection from './CTASection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black/50 text-white">
      <HeroSection />
      <FeaturesSection />
      <AnalyticsShowcase />
      <DeveloperSection />
      <CTASection />
    </div>
  );
}
