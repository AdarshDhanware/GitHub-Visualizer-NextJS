import { Activity, Award, Briefcase, Zap } from 'lucide-react';

export default function InsightsSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-zinc-400" />
            <span className="text-sm text-gray-400">Actionable Intelligence</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Turn data into decisions
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-white/5 to-transparent rounded-2xl p-6 border border-white/10 group-hover:border-white/20 h-full">
              <Activity className="w-10 h-10 text-zinc-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Real-time data</h3>
              <p className="text-gray-400 text-sm">
                Access fresh insights from GitHub's public API with zero login required.
              </p>
            </div>
          </div>

          <div className="group hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-white/5 to-transparent rounded-2xl p-6 border border-white/10 group-hover:border-white/20 h-full">
              <Award className="w-10 h-10 text-zinc-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Quality metrics</h3>
              <p className="text-gray-400 text-sm">
                Industry-standard scoring system trusted by leading tech companies.
              </p>
            </div>
          </div>

          <div className="group hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-white/5 to-transparent rounded-2xl p-6 border border-white/10 group-hover:border-white/20 h-full">
              <Briefcase className="w-10 h-10 text-zinc-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Portfolio ready</h3>
              <p className="text-gray-400 text-sm">
                Perfect for developers to showcase their work and recruiters to evaluate talent.
              </p>
            </div>
          </div>

          <div className="group hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-white/5 to-transparent rounded-2xl p-6 border border-white/10 group-hover:border-white/20 h-full">
              <Zap className="w-10 h-10 text-zinc-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Lightning fast</h3>
              <p className="text-gray-400 text-sm">
                Optimized performance delivers comprehensive reports in under 3 seconds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
