"use client";

import { useParams } from "next/navigation";
import AnalyzeDashboard from "@/components/dashboard/AnalyzeDashboard";

export default function AnalyzePage() {
  const params = useParams();
  const usernameParam = params?.username;

  // ensure it's a string
  const username =
    typeof usernameParam === "string"
      ? usernameParam
      : Array.isArray(usernameParam)
      ? usernameParam[0] // take the first if array
      : ""; // fallback

  return <AnalyzeDashboard username={username} />;
}
