import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6">
          <span className="text-sm text-gray-500 tracking-wide uppercase">
            Get Started in Seconds
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-serif mb-6">
          Ready to see GitHub Visualizer<br />
          <span className="italic">in action?</span>
        </h2>

        <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto">
          Start analyzing developer profiles instantly with powerful AI-driven insights.
        </p>

        <Link href='#hero' scroll={true} className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
          Get Started
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>

        <div className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-zinc-300 rounded-full" />
            <span>No credit card required</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-zinc-300 rounded-full" />
            <span>Free forever</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-zinc-300 rounded-full" />
            <span>Instant results</span>
          </div>
        </div>
      </div>
    </section>
  );
}
