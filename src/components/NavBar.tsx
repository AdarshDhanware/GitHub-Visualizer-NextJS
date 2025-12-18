"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import LogoutBtn from "./LogoutBtn";
import { Github } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  console.log(session);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // skip server-client mismatch

  return (
    <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[90vw] max-w-7xl z-50">
      <div
        className="flex items-center justify-between px-6 py-2 rounded-full
                      bg-black/10 backdrop-blur-md backdrop-saturate-150
                      border border-white/20 shadow-lg"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center text-white gap-2">
            <Github className="w-6 h-6" />
            <span className="font-semibold text-lg">GitHub Visualizer</span>
          </div>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {status === "loading" ? null : !session ? (
            <>
              <Link
                href="/login"
                className="px-4 py-1.5 text-center rounded-full text-white bg-white/15 hover:bg-white/25 transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-1.5 text-center rounded-full text-white bg-white/20 hover:bg-white/30 transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <LogoutBtn />
          )}
        </div>
      </div>
    </nav>
  );
}
