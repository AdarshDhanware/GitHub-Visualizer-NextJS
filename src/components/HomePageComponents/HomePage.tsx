"use client"

import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import AnalyticsShowcase from './AnalyticsShowcase';
import RecruitersSection from './RecruitersSection';
import InsightsSection from './InsightsSection';
import CTASection from './CTASection';
import AnalyzerComponent from '../AnalyzerComponent';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black/50 text-white">
      <HeroSection />
      <FeaturesSection />
      <AnalyticsShowcase />
      <RecruitersSection />
      <InsightsSection />
      <CTASection />
    </div>
  );
}
