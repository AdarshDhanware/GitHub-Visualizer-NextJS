import { CheckCircle2, Clock, Target } from 'lucide-react';

export default function RecruitersSection() {
  return (
    <section id="recruiters" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-zinc-500/10 border border-zinc-500/20 rounded-full px-4 py-2 mb-6">
            <Target className="w-4 h-4 text-zinc-400" />
            <span className="text-sm text-zinc-400">Built for Recruiters</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Make confident hiring decisions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Everything you need to evaluate developer candidates, presented in a clean,
            comprehensive report that saves hours of manual research.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-white/5 to-transparent rounded-2xl p-6 border border-white/10">
            <Clock className="w-8 h-8 text-zinc-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Instant Analysis</h3>
            <p className="text-gray-400 text-sm">
              Generate complete developer reports in seconds. No more hours spent browsing GitHub manually.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-transparent rounded-2xl p-6 border border-white/10">
            <CheckCircle2 className="w-8 h-8 text-zinc-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Hiring Readiness</h3>
            <p className="text-gray-400 text-sm">
              Clear indicators show if a candidate is actively contributing and maintaining their skills.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-transparent rounded-2xl p-6 border border-white/10">
            <Target className="w-8 h-8 text-zinc-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Skills Matching</h3>
            <p className="text-gray-400 text-sm">
              Automatically match candidates tech stack with your job requirements and team needs.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-zinc-900/20 via-black to-black rounded-3xl p-12 border border-zinc-500/20">
          <div className="max-w-3xl">
            <h3 className="text-3xl font-serif mb-6">See the complete picture</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-zinc-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Developer Score:</span> AI-calculated rating based on code quality, consistency, and community impact
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-zinc-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Language Expertise:</span> Detailed breakdown of programming languages with proficiency indicators
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-zinc-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Activity Timeline:</span> Visual representation of coding patterns, streaks, and contribution frequency
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-zinc-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Team Collaboration:</span> Insights into open source work, code reviews, and team contributions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
