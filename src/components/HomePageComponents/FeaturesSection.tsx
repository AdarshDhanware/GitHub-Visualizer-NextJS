import { Brain, Code2, TrendingUp } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "GitHub profile insights",
      description:
        "Collects and analyzes repositories, commits, languages, and collaboration metrics from publicly available GitHub data.",
    },
    {
      icon: Code2,
      title: "Language analytics",
      description:
        "Comprehensive breakdown of programming languages with usage percentages and expertise levels.",
    },
    {
      icon: TrendingUp,
      title: "Developer scoring",
      description:
        "Industry-standard 0-100 rating based on activity, quality, and community impact.",
    },
  ];

  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all hover:transform hover:scale-[1.02] duration-300"
            >
              <div className="w-12 h-12 bg-zinc-400/10 rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-zinc-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
