import { CheckCircle2, Clock, Target } from 'lucide-react';

export default function DeveloperSection() {
  return (
    <section id="recruiters" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-zinc-500/10 border border-zinc-500/20 rounded-full px-4 py-2 mb-6">
            <Target className="w-4 h-4 text-zinc-400" />
            <span className="text-sm text-zinc-400">Powered Insights</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Gain clear insights from GitHub profiles
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Quickly understand developer activity, skills, and contributions through clean, comprehensive reports.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-white/5 to-transparent rounded-2xl p-6 border border-white/10">
            <Clock className="w-8 h-8 text-zinc-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Fast Insights</h3>
            <p className="text-gray-400 text-sm">
              Get reports from publicly available GitHub data in seconds.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-transparent rounded-2xl p-6 border border-white/10">
            <CheckCircle2 className="w-8 h-8 text-zinc-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Skill Overview</h3>
            <p className="text-gray-400 text-sm">
              Understand a developer’s programming languages, repositories, and activity patterns.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-transparent rounded-2xl p-6 border border-white/10">
            <Target className="w-8 h-8 text-zinc-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Activity Metrics</h3>
            <p className="text-gray-400 text-sm">
              Track contributions, commits, and collaboration to get a complete picture of developer activity.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-zinc-900/20 via-black to-black rounded-3xl p-12 border border-zinc-500/20">
          <div className="max-w-3xl">
            <h3 className="text-3xl font-serif mb-6">Understand developer profiles</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-zinc-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Developer Score:</span> Calculated from publicly available GitHub activity, including repositories, commits, and contributions
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-zinc-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Language Expertise:</span> Breakdown of programming languages with usage and proficiency
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-zinc-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Activity Timeline:</span> Overview of commits, streaks, and contributions over time
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-zinc-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Collaboration:</span> Insights into repositories, pull requests, and teamwork
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
