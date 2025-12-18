import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/80 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Github className="w-5 h-5 text-white" />
              <span className="font-semibold text-white">GitHub Visualizer</span>
            </div>
            <p className="text-sm text-gray-400">
              Transform GitHub profiles into comprehensive developer reports with AI-powered insights.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © 2025 GitHub Visualizer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
