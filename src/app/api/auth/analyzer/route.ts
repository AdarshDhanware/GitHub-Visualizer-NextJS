import { NextRequest, NextResponse } from "next/server";
import { analyzeGitHubUser } from "@/GithubService/githubService";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { username } = await req.json();
    if (!username || username.trim() === "" || typeof username !== "string") {
      return NextResponse.json(
        { message: "GitHub username required" },
        { status: 400 }
      );
    }

    const report = await analyzeGitHubUser(username);

    return NextResponse.json(
      {
        data: report,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("GitHub Analyze Error:", error);

    const status = error.message?.includes("RATE_LIMIT_EXCEEDED")
      ? 403
      : error.message?.includes("USER_NOT_FOUND")
      ? 404
      : 500;

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to analyze GitHub profile",
      },
      { status }
    );
  }
}

// const res = await fetch("/api/auth/analyze", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ username }),
// });

// const data = await res.json();
