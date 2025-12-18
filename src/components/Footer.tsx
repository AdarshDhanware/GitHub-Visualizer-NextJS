import { Github } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/80 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Left: App Info */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5 text-white" />
            <span className="font-semibold text-white">GitHub Visualizer</span>
          </div>
          <p className="text-sm text-gray-400 max-w-xs text-center md:text-left">
            Transform GitHub profiles into clear, easy-to-read developer reports using publicly available data.
          </p>
        </div>

        {/* Right: Links */}
        <div className="flex gap-6">
          <Link href="/login" className="text-sm text-white hover:underline">
            Login
          </Link>
          <Link href="/signup" className="text-sm text-white hover:underline">
            Sign Up
          </Link>
        </div>

      </div>
    </footer>
  );
}
