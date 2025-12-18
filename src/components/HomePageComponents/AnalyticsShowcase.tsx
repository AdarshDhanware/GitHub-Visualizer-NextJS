import { BarChart3, GitBranch, Star, Users } from 'lucide-react';

export default function AnalyticsShowcase() {
  return (
    <section id="analytics" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif mb-4 text-center">
          Comprehensive developer intelligence
        </h2>
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
          Every metric recruiters need, delivered instantly with beautiful visualizations
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-zinc-900/20 to-zinc-950/20 rounded-2xl p-8 border border-zinc-500/20">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-5 h-5 text-zinc-400" />
              <h3 className="text-xl font-semibold">Activity Patterns</h3>
            </div>
            <p className="text-gray-400 mb-8">
              Track commit frequency, coding streaks, and peak productivity hours to understand developer work patterns.
            </p>
            <div className="bg-black/30 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Weekly commits</span>
                  <span className="text-zinc-400 font-semibold">47</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-zinc-500 to-zinc-400 w-4/5" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Longest streak</span>
                  <span className="text-zinc-400 font-semibold">156 days</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-zinc-500 to-zinc-400 w-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/20 to-zinc-950/20 rounded-2xl p-8 border border-zinc-500/20">
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-5 h-5 text-zinc-400" />
              <h3 className="text-xl font-semibold">Repository Insights</h3>
            </div>
            <p className="text-gray-400 mb-8">
              Analyze repository quality, community engagement, and impact through stars, forks, and contributions.
            </p>
            <div className="bg-black/30 rounded-lg p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-zinc-400 mb-1">2.4K</div>
                  <div className="text-sm text-gray-500">Total stars</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-zinc-400 mb-1">847</div>
                  <div className="text-sm text-gray-500">Total forks</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-zinc-400 mb-1">34</div>
                  <div className="text-sm text-gray-500">Repositories</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-zinc-400 mb-1">189</div>
                  <div className="text-sm text-gray-500">Contributors</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/20 to-zinc-950/20 rounded-2xl p-8 border border-zinc-500/20">
            <div className="flex items-center gap-3 mb-6">
              <GitBranch className="w-5 h-5 text-zinc-400" />
              <h3 className="text-xl font-semibold">Tech Stack Detection</h3>
            </div>
            <p className="text-gray-400 mb-8">
              Automatically identify frameworks, libraries, and tools used across all repositories.
            </p>
            <div className="bg-black/30 rounded-lg p-6">
              <div className="flex flex-wrap gap-2">
                {['TypeScript', 'React', 'Node.js', 'Python', 'Docker', 'PostgreSQL', 'AWS', 'GraphQL'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-zinc-500/10 border border-zinc-500/20 rounded-lg text-sm text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/20 to-zinc-950/20 rounded-2xl p-8 border border-zinc-500/20">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-5 h-5 text-zinc-400" />
              <h3 className="text-xl font-semibold">Collaboration Metrics</h3>
            </div>
            <p className="text-gray-400 mb-8">
              Evaluate teamwork through pull requests, code reviews, and open source contributions.
            </p>
            <div className="bg-black/30 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Pull requests</span>
                  <span className="text-zinc-400 font-semibold">142 merged</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Code reviews</span>
                  <span className="text-zinc-400 font-semibold">89 completed</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Organizations</span>
                  <span className="text-zinc-400 font-semibold">5 active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
