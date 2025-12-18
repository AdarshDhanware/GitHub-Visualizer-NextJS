"use client";

import { useState } from "react";
import Dashboard from "./dashboard/Dashboard";

export default function AnalyzerComponent() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    const res = await fetch("/api/auth/analyzer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 text-white">

      <form onSubmit={handleSubmit} className="space-y-4 text-white">
        <input
          className="p-2 rounded text-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="GitHub username"
        />
        <button className="bg-white text-black px-4 py-2 rounded">
          Analyze
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {JSON.stringify(data, null, 2)}
      
      {/* {data && <Dashboard data={data.data} />} */}


    </main>
  );
}
