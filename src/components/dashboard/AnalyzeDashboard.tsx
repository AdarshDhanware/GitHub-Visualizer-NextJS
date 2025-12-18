"use client";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import {
  Github,
  Star,
  GitFork,
  Eye,
  Code,
  Activity,
  Award,
  Users,
  TrendingUp,
  Calendar,
  AlertCircle,
  Clock,
  RefreshCw,
  ExternalLink,
  GitCommit,
  BookOpen,
  Zap,
} from "lucide-react";
import Link from "next/link";


interface AnalyzeDashboardProps {
  username: string;
}

export default function AnalyzeDashboard({ username }: AnalyzeDashboardProps) {


  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ type: string; message: string } | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/auth/analyzer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        });

        if (!res.ok) {
          const errorData = await res
            .json()
            .catch(() => ({ error: res.statusText }));

          if (
            res.status === 404 ||
            errorData.error?.includes("USER_NOT_FOUND")
          ) {
            setError({
              type: "USER_NOT_FOUND",
              message: `The GitHub user "${username}" does not exist. Please check the username and try again.`,
            });
          } else if (
            res.status === 403 ||
            errorData.error?.includes("RATE_LIMIT_EXCEEDED")
          ) {
            const timeMatch = errorData.error?.match(/(\d+) minutes/);
            const minutes = timeMatch ? timeMatch[1] : "60";
            const resetMatch = errorData.error?.match(/Resets at (.+)\)/);
            const resetTime = resetMatch ? resetMatch[1] : "soon";

            setError({
              type: "RATE_LIMIT_EXCEEDED",
              message: `GitHub API rate limit exceeded. Please try again in ${minutes} minutes (resets at ${resetTime}).`,
            });
          } else if (errorData.error?.includes("RATE_LIMIT_WARNING")) {
            const remainingMatch = errorData.error?.match(
              /Only (\d+) API calls remaining/
            );
            const remaining = remainingMatch ? remainingMatch[1] : "few";

            setError({
              type: "RATE_LIMIT_WARNING",
              message: `Only ${remaining} API calls remaining. Analysis stopped to prevent incomplete data. Please try again later.`,
            });
          } else {
            setError({
              type: "GENERAL_ERROR",
              message:
                errorData.error ||
                "An unexpected error occurred while fetching GitHub data. Please try again later.",
            });
          }
          return;
        }

        const json = await res.json();
        setData(json.data);
      } catch (err: any) {
        console.error("Dashboard error:", err);
        setError({
          type: "NETWORK_ERROR",
          message:
            "Network error occurred. Please check your connection and try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950/10 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative">
            <div className="w-24 h-24 border-8 border-zinc-500/20 border-t-zinc-500 rounded-full animate-spin mx-auto"></div>
            <Github className="w-12 h-12 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-white">
            Analyzing GitHub Profile
          </h2>
          <p className="mt-2 text-white">Fetching data for @{username}</p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white">
            <Activity className="w-4 h-4 animate-pulse" />
            <span>Processing repositories, commits, and contributions...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    const errorConfig = {
      USER_NOT_FOUND: {
        icon: AlertCircle,
        color: "zinc",
        title: "User Not Found",
        gradient: "bg-zinc-500",
      },
      RATE_LIMIT_EXCEEDED: {
        icon: Clock,
        color: "amber",
        title: "Rate Limit Exceeded",
        gradient: "bg-zinc-500",
      },
      RATE_LIMIT_WARNING: {
        icon: AlertCircle,
        color: "zinc",
        title: "Rate Limit Warning",
        gradient: "bg-zinc-500",
      },
      NETWORK_ERROR: {
        icon: RefreshCw,
        color: "zinc",
        title: "Network Error",
        gradient: "bg-zinc-500",
      },
      GENERAL_ERROR: {
        icon: AlertCircle,
        color: "zinc",
        title: "Error Occurred",
        gradient: "bg-zinc-500",
      },
    };

    const config =
      errorConfig[error.type as keyof typeof errorConfig] ||
      errorConfig.GENERAL_ERROR;
    const Icon = config.icon;

    return (
      <div className="min-h-screen bg-zinc-950/10 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-zinc-800/50 backdrop-blur-xl rounded-2xl border border-zinc-700/50 shadow-2xl overflow-hidden">
            <div className={`${config.gradient} p-6`}>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {config.title}
                  </h2>
                  <p className="text-white/80 text-sm">@{username}</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <p className="text-zinc-300 text-lg leading-relaxed mb-6">
                {error.message}
              </p>

              {error.type === "USER_NOT_FOUND" && (
                <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-700/50">
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Suggestions:
                  </h3>
                  <ul className="text-zinc-400 text-sm space-y-1 ml-6 list-disc">
                    <li>Double-check the username spelling</li>
                    <li>Ensure the GitHub account exists and is public</li>
                    <li>Try searching on GitHub.com first</li>
                  </ul>
                </div>
              )}

              {(error.type === "RATE_LIMIT_EXCEEDED" ||
                error.type === "RATE_LIMIT_WARNING") && (
                <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-700/50">
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    What's happening?
                  </h3>
                  <p className="text-zinc-400 text-sm mb-3">
                    GitHub limits the number of API requests to prevent abuse.
                    This limit has been reached temporarily.
                  </p>
                  <ul className="text-zinc-400 text-sm space-y-1 ml-6 list-disc">
                    <li>Wait for the specified time before trying again</li>
                    <li>The limit resets automatically every hour</li>
                    <li>Consider authenticating for higher limits</li>
                  </ul>
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 bg-zinc-500 hover:from-zinc-600 hover:to-zinc-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </button>
                <Link
                  href={`https://github.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  Visit GitHub
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-zinc-500 mx-auto mb-4" />
          <p className="text-zinc-400 text-lg">No data available</p>
        </div>
      </div>
    );
  }

  const {
    profile,
    developerScore,
    languageAnalysis,
    repoAnalysis,
    commitAnalysis,
    activityTimeLine,
    techStack,
    collaboration,
    interests,
  } = data;

  const COLORS = [
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#f59e0b",
    "#10b981",
    "#06b6d4",
    "#f43f5e",
    "#a78bfa",
  ];

  const languageData = languageAnalysis.languages.map((lang: any) => ({
    name: lang.name,
    value: parseFloat(lang.percentage.toFixed(2)),
    bytes: lang.bytes,
  }));

  const scoreData = [
    {
      category: "Profile",
      score: developerScore.breakdown.profile * 10,
      fullMark: 10,
    },
    {
      category: "Repos",
      score: developerScore.breakdown.repositories,
      fullMark: 10,
    },
    {
      category: "Activity",
      score: developerScore.breakdown.activity * 10,
      fullMark: 10,
    },
    {
      category: "Community",
      score: developerScore.breakdown.community * 10,
      fullMark: 10,
    },
    {
      category: "Contribution",
      score: developerScore.breakdown.contribution * 10,
      fullMark: 10,
    },
  ];

  const topReposData = repoAnalysis.topRepositories
    .slice(0, 5)
    .map((repo: any) => ({
      name:
        repo.name.length > 20 ? repo.name.substring(0, 20) + "..." : repo.name,
      fullName: repo.name,
      stars: repo.stars,
      forks: repo.forks,
      language: repo.language,
      url: repo.url,
    }));

  const activityData = activityTimeLine.dailyActivity.map((day: any) => ({
    date: new Date(day[0]).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    fullDate: day[0],
    commits: day[1].commits,
    prs: day[1].pullRequests,
    issues: day[1].issues,
    stars: day[1].stars,
    total: day[1].commits + day[1].pullRequests + day[1].issues + day[1].stars,
  }));

  const interestsData = interests.topInterests
    .slice(0, 10)
    .map((interest: any) => ({
      name: interest.name,
      count: interest.count,
    }));

  const getLevelColor = (level: string) => {
    const colors: any = {
      Beginner: "bg-zinc-500",
      Intermediate: "bg-zinc-500",
      Advanced: "bg-zinc-500",
      Expert: "bg-zinc-500",
    };
    return colors[level] || "bg-zinc-500";
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-800/95 backdrop-blur-sm border border-zinc-700 rounded-lg p-3 shadow-xl">
          <p className="text-zinc-300 font-semibold mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-bold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="min-h-screen mt-20 sm:mt-15 md:mt-20 p-4 md:p-6 lg:p-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="relative rounded-3xl mb-8 shadow-2xl">
          <div className="bg-zinc-900/50 rounded-[22px] p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-zinc-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <img
                  className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white/20 shadow-2xl"
                  src={profile.avatar}
                  alt={profile.name}
                />
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 bg-zinc-400 bg-clip-text text-transparent">
                  {profile.name || profile.username}
                </h1>
                <p className="text-zinc-300 text-lg mb-3 flex items-center gap-2 justify-center md:justify-start">
                  <Github className="w-5 h-5" />@{profile.username}
                </p>
                {profile.bio && (
                  <p className="text-zinc-300 text-base mb-4 max-w-2xl">
                    {profile.bio}
                  </p>
                )}
                <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-zinc-300">
                  <span className="flex items-center gap-1.5 bg-zinc-800/50 px-3 py-1.5 rounded-lg">
                    <Users className="w-4 h-4 text-zinc-400" />
                    <strong className="text-white">
                      {profile.followers}
                    </strong>{" "}
                    followers
                  </span>
                  <span className="flex items-center gap-1.5 bg-zinc-800/50 px-3 py-1.5 rounded-lg">
                    <Code className="w-4 h-4 text-zinc-400" />
                    <strong className="text-white">
                      {profile.publicRepos}
                    </strong>{" "}
                    repositories
                  </span>
                  <span className="flex items-center gap-1.5 bg-zinc-800/50 px-3 py-1.5 rounded-lg">
                    <Calendar className="w-4 h-4 text-zinc-400" />
                    <strong className="text-white">
                      {profile.accountAge.toFixed(1)}
                    </strong>{" "}
                    years
                  </span>
                </div>
              </div>

              <div className="text-center bg-zinc-900/10 backdrop-blur-sm rounded-2xl p-6 border border-zinc-700/50 shadow-xl">
                <div className="text-6xl font-bold bg-zinc-400 bg-clip-text text-transparent mb-2">
                  {developerScore.overall}
                </div>
                <div className="text-zinc-400 text-sm mb-3">
                  Developer Score
                </div>
                <div
                  className={`px-4 py-2 ${getLevelColor(
                    developerScore.level
                  )} rounded-full text-white text-sm font-bold shadow-lg`}
                >
                  {developerScore.level}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {[
            {
              icon: Star,
              label: "Total Stars",
              value: repoAnalysis.totalStars,
              color: "zinc",
              gradient: "bg-zinc-500",
            },
            {
              icon: GitFork,
              label: "Total Forks",
              value: repoAnalysis.totalForks,
              color: "zinc",
              gradient: "bg-zinc-500",
            },
            {
              icon: Code,
              label: "Languages",
              value: languageAnalysis.totalLanguages,
              color: "zinc",
              gradient: "bg-zinc-500",
            },
            {
              icon: Zap,
              label: "Streak Days",
              value: activityTimeLine.streakDays,
              color: "zinc",
              gradient: "bg-zinc-500",
            },
          ].map((metric, idx) => (
            <div
              key={idx}
              className="group relative bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm mb-1">{metric.label}</p>
                  <p className="text-4xl font-bold text-white">
                    {metric.value}
                  </p>
                </div>
                <div
                  className={`p-4 ${metric.gradient} rounded-xl opacity-80 group-hover:opacity-100 transition-opacity`}
                >
                  <metric.icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Language Distribution */}
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-700/50 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Code className="w-5 h-5 text-zinc-400" />
              Language Distribution
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={languageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={110}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}
                >
                  {languageData.map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 flex flex-wrap gap-3 justify-center">
              <div className="bg-zinc-900/50 px-4 py-2 rounded-lg border border-zinc-700/50">
                <span className="text-zinc-400 text-sm">Primary: </span>
                <span className="text-zinc-400 font-semibold">
                  {techStack.primaryLanguage}
                </span>
              </div>
              <div className="bg-zinc-900/50 px-4 py-2 rounded-lg border border-zinc-700/50">
                <span className="text-zinc-400 text-sm">Diversity: </span>
                <span className="text-zinc-400 font-semibold">
                  {languageAnalysis.diversity}
                </span>
              </div>
            </div>
          </div>

          {/* Developer Skills Radar */}
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-700/50 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-zinc-400" />
              Skill Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={scoreData}>
                <PolarGrid stroke="#475569" />
                <PolarAngleAxis
                  dataKey="category"
                  stroke="#94a3b8"
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 10]}
                  stroke="#475569"
                  tick={{ fill: "#64748b", fontSize: 10 }}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                  animationDuration={800}
                />
                <Radar
                  name="Max"
                  dataKey="fullMark"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.1}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-zinc-500/20 border border-zinc-500/30 rounded-full">
                <Star className="w-4 h-4 text-zinc-400" />
                <span className="text-white font-semibold">
                  Overall: {developerScore.overall}/10
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Repository and Activity Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Repositories */}
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-700/50 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-zinc-400" />
              Top Repositories
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={topReposData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  type="number"
                  stroke="#94a3b8"
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#94a3b8"
                  width={140}
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  dataKey="stars"
                  fill="#fbbf24"
                  name="Stars"
                  radius={[0, 8, 8, 0]}
                  animationDuration={800}
                />
                <Bar
                  dataKey="forks"
                  fill="#3b82f6"
                  name="Forks"
                  radius={[0, 8, 8, 0]}
                  animationDuration={800}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Activity Timeline */}
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-700/50 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-zinc-400" />
              Recent Activity
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPRs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="date"
                  stroke="#94a3b8"
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                />
                <YAxis
                  stroke="#94a3b8"
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="commits"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorCommits)"
                  name="Commits"
                  animationDuration={800}
                />
                <Area
                  type="monotone"
                  dataKey="prs"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorPRs)"
                  name="Pull Requests"
                  animationDuration={800}
                />
                <Line
                  type="monotone"
                  dataKey="stars"
                  stroke="#fbbf24"
                  strokeWidth={2}
                  name="Stars"
                  dot={{ fill: "#fbbf24", r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-700/50">
                <span className="text-zinc-400">Commits (30d): </span>
                <span className="text-zinc-400 font-bold">
                  {commitAnalysis.commitsLast30Days}
                </span>
              </div>
              <div className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-700/50">
                <span className="text-zinc-400">Most Active: </span>
                <span className="text-zinc-400 font-bold">
                  {commitAnalysis.mostActiveHour}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Interests Chart */}
        <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-700/50 shadow-xl mb-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-zinc-400" />
            Top Interests
            <span className="ml-auto text-sm text-zinc-400">
              ({interests.totalStarred} starred repos)
            </span>
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={interestsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="name"
                stroke="#94a3b8"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                stroke="#94a3b8"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="count"
                fill="#8b5cf6"
                radius={[8, 8, 0, 0]}
                animationDuration={800}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-700/50 shadow-xl">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-zinc-400" />
              Repository Health
            </h4>
            <div className="space-y-2 text-zinc-300">
              <p>
                Total Repos:{" "}
                <span className="text-zinc-400 font-semibold">
                  {repoAnalysis.totalRepos}
                </span>
              </p>
              <p>
                Original:{" "}
                <span className="text-zinc-400 font-semibold">
                  {repoAnalysis.originalRepos}
                </span>
              </p>
              <p>
                Forked:{" "}
                <span className="text-zinc-400 font-semibold">
                  {repoAnalysis.forkedRepos}
                </span>
              </p>
              <p>
                Avg Stars:{" "}
                <span className="text-zinc-400 font-semibold">
                  {repoAnalysis.averageStarsPreRepo.toFixed(2)}
                </span>
              </p>
              <div className="mt-3 px-3 py-1 bg-zinc-500/20 border border-zinc-500/30 rounded-lg inline-block">
                <span className="text-zinc-400 font-semibold">
                  {repoAnalysis.repoHealth}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-700/50 shadow-xl">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-zinc-400" />
              Collaboration
            </h4>
            <div className="space-y-2 text-zinc-300">
              <p>
                Organizations:{" "}
                <span className="text-zinc-400 font-semibold">
                  {collaboration.organizations.length}
                </span>
              </p>
              <p>
                Contributed Repos:{" "}
                <span className="text-zinc-400 font-semibold">
                  {collaboration.contributedToRepos}
                </span>
              </p>
              <p>
                Team Player:{" "}
                <span
                  className={
                    collaboration.teamPlayer ? "text-zinc-400" : "text-zinc-400"
                  }
                >
                  {collaboration.teamPlayer ? "Yes" : "No"}
                </span>
              </p>
              <p>
                Open Source:{" "}
                <span
                  className={
                    collaboration.openSource ? "text-zinc-400" : "text-zinc-400"
                  }
                >
                  {collaboration.openSource ? "Active" : "Inactive"}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-700/50 shadow-xl">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-zinc-400" />
              Recommendations
            </h4>
            <div className="space-y-2">
              {data.recommendations.map((rec: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2 text-zinc-300">
                  <span className="text-lg">{rec.charAt(0)}</span>
                  <span>{rec.slice(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-zinc-500 pb-6">
          <p>
            Last updated: {new Date(profile.lastUpdated).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
