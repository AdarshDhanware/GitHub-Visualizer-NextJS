"use client"

import { Sparkles } from 'lucide-react';
import AnalyzeInput from './AnalyzeInput';

export default function HeroSection() {
  return (
    <section id="hero" className="pt-32 pb-20 px-6 bg-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 justify-center mb-6">
          <Sparkles className="w-4 h-4 text-zinc-400" />
          <span className="text-sm text-zinc-400 tracking-wide">Smart Developer Analysis</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-serif text-center mb-8 leading-tight">
          The more developers you analyze,<br />
          <span className="italic">the better decisions you make</span>
        </h1>

        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12 text-lg leading-relaxed">
          Transform GitHub profiles into comprehensive developer reports with AI-powered insights.
          Make hiring decisions in seconds instead of hours with industry-level analytics.
        </p>

        <div className="flex justify-center gap-6 mb-20">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">100+</div>
            <div className="text-sm text-gray-500">Data Points</div>
          </div>
          <div className="w-px bg-white/10" />
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">8+</div>
            <div className="text-sm text-gray-500">API Endpoints</div>
          </div>
          <div className="w-px bg-white/10" />
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">0-100</div>
            <div className="text-sm text-gray-500">Developer Score</div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <AnalyzeInput/>
        </div>
      </div>
    </section>
  );
}
