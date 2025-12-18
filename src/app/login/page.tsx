"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
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

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!mounted) return;
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      setLoading(true);
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      toast.dismiss();
      toast.success("User logged in successfully");
      router.replace("/");
    } catch (error) {
      toast.dismiss();
      toast.error("Invalid email or password");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-28 sm:mt-24 w-full flex items-center justify-center px-4">
      {/* Glass Container */}
      <div
        className="
      w-full max-w-5xl
      rounded-2xl bg-white/5
      backdrop-blur-xl
      border border-white/20
      shadow-2xl
      grid grid-cols-1 md:grid-cols-2
      overflow-hidden
    "
      >
        {/* ===== LEFT (FORM on desktop, SECOND on mobile) ===== */}
        <div className="order-2 md:order-1 p-8 bg-white/5 backdrop-blur-lg">
          <h1 className="text-2xl font-semibold text-white text-center mb-6">
            Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/40"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/40"
            />

            <button
              type="submit"
              className="w-full py-2 rounded-md bg-white text-black font-medium hover:opacity-90 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="my-4 text-center text-white/50">OR</div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-md border border-white/30 text-white hover:bg-white/10 transition"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 533.5 544.3"
            >
              <path
                fill="#4285F4"
                d="M533.5 278.4c0-17.6-1.5-34.6-4.3-51.1H272v96.9h146.9c-6.4 34.6-25.7 63.9-54.6 83.5v69.5h88.3c51.7-47.6 81.9-118 81.9-198.8z"
              />
              <path
                fill="#34A853"
                d="M272 544.3c73.7 0 135.6-24.3 180.8-66.1l-88.3-69.5c-24.6 16.6-56.2 26.5-92.5 26.5-71.2 0-131.5-48-153.1-112.5H27.2v70.9C72.2 478 164.8 544.3 272 544.3z"
              />
              <path
                fill="#FBBC05"
                d="M118.9 324.1c-11.4-33.9-11.4-70.6 0-104.5v-70.9H27.2c-45 88-45 193.2 0 281.2l91.7-70.8z"
              />
              <path
                fill="#EA4335"
                d="M272 107.7c38.5 0 73 13.3 100.3 39.3l75.2-75.2C407.6 24.3 345.7 0 272 0 164.8 0 72.2 66.3 27.2 160.8l91.7 70.9c21.6-64.5 81.9-112.5 153.1-112.5z"
              />
            </svg>
            Continue with Google
          </button>

          <p className="text-sm text-center mt-4 text-white/70">
            No account?{" "}
            <Link href="/signup" className="underline hover:text-white">
              Create an account
            </Link>
          </p>
        </div>

        {/* ===== RIGHT (CONTENT on desktop, FIRST on mobile) ===== */}
        <div className="order-1 md:order-2 p-8 flex flex-col justify-center gap-6 text-white">
          <h2 className="text-3xl font-bold">Welcome Back 👋</h2>

          <div className="relative flex flex-col gap-4 text-white">
            {/* Quote Icon */}
            <span className="text-6xl text-white/20 leading-none select-none">
              “
            </span>

            {/* Quote Text */}
            <p className="text-lg italic text-white/90 leading-relaxed">
              {quote}
            </p>

            {/* Divider */}
            <div className="w-12 h-[1px] bg-white/30" />

            {/* Author */}
            <p className="text-sm text-white/70 self-end">
              — {author || "Unknown"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
