"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LogoutBtn() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      toast.dismiss();

      await signOut({ redirect: false });

      toast.success("Logged out successfully");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to logout, try again later");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={handleLogout}
      className="
        px-4 py-1.5 rounded-full
        text-white text-sm font-medium
        bg-white/15 backdrop-blur-md
        border border-white/20
        transition-all duration-200
        hover:bg-white/25
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      {loading ? "Signing out..." : "Sign Out"}
    </button>
  );
}
