"use client";

import { useParams } from "next/navigation";
import AnalyzeDashboard from "@/components/dashboard/AnalyzeDashboard";

export default function AnalyzePage() {
  const params = useParams();
  const username = params?.username || ""; // dynamic from URL

  return <AnalyzeDashboard username={username} />;
}