"use client";

import { Sparkles } from "lucide-react";
import AnalyzeInput from "./AnalyzeInput";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [quote, setQuote] = useState("Loading your inspiration...");
  const [author, setAuthor] = useState("Loading...");
  useEffect(() => {
    const fetchQuote = async () => {
      const url = "https://api.freeapi.app/api/v1/public/quotes/quote/random";
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (data) {
          setQuote(data.data.content);
          setAuthor(data.data.author);
        }
        // console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuote();
  }, []);
  return (
    <section id="hero" className="pt-32 pb-20 px-6 bg-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 justify-center mb-6">
          <Sparkles className="w-4 h-4 text-zinc-400" />
          <span className="text-sm text-zinc-400 tracking-wide">
            Smart Developer Analysis
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-serif text-center mb-8 leading-tight">
          The more GitHub profiles you review,
          <br />
          <span className="italic">the sharper your insights become</span>
        </h1>

        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12 text-lg leading-relaxed">
          Transform publicly available GitHub profiles into detailed developer insights to better understand skills, contributions, and expertise.
        </p>

        <div className="flex justify-center gap-6 mb-20">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">20+</div>
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
        {/* Motivational Quote Box */}
        <div className="max-w-3xl mx-auto mb-12 p-8 bg-zinc-800/30 backdrop-blur-md rounded-2xl border border-white/10 text-center">
          <p className="text-lg md:text-xl text-white italic">
            {quote} <br />
            <span className="text-gray-400 text-sm">– {author}</span>
          </p>
        </div>

        {/* Analyze Input Component */}
        <div id="input-username" className="max-w-4xl mx-auto">
          <AnalyzeInput />
        </div>
      </div>
    </section>
  );
}
