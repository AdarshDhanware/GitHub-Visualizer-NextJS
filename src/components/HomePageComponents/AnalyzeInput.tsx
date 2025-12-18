"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AnalyzeInput = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // skip server-client mismatch

  const handleAnalyze = () => {
    // 🔒 Not logged in → redirect
    if (!session) {
      router.push("/login");
      return;
    }

    // ✅ Logged in → proceed (call backend later)
    if (!username) return; // optional: prevent empty input

    // Navigate to dynamic route
    window.open(
      `/analyze/${encodeURIComponent(username)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

 return (
  <div className="bg-gradient-to-br from-zinc-900/80 via-neutral-900/70 to-slate-900/80 
                  rounded-2xl p-5 sm:p-8 border border-white/10 backdrop-blur-sm w-full max-w-3xl mx-auto">
    
    {/* Header */}
    <div className="flex items-center gap-4 mb-6">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
      </div>
      <div className="text-sm text-gray-400 truncate">
        github-visualizer.app
      </div>
    </div>

    {/* Input Container */}
    <div className="bg-black/50 rounded-lg p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row gap-4">
        
        {/* Input */}
        <input
          type="text"
          placeholder="Enter GitHub username..."
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3
                     text-white placeholder-gray-500 focus:outline-none
                     focus:border-zinc-400/50 transition-colors"
        />

        {/* Button */}
        <button
          onClick={handleAnalyze}
          className="w-full sm:w-auto px-6 py-3 bg-zinc-600 hover:bg-gray-700
                     rounded-lg font-medium transition-colors whitespace-nowrap"
        >
          Analyze Profile
        </button>

      </div>
    </div>
  </div>
);

};

export default AnalyzeInput;
