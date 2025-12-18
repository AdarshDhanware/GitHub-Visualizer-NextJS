// src/lib/github-service.ts
// Secure GitHub Analyzer with Rate Limit Protection

const GITHUB_API = "https://api.github.com";

interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number; // Unix timestamp
  resetDate: Date;
}

export class GithubAnalyzer {
  private username: string;
  private rateLimitInfo: RateLimitInfo | null = null;

  constructor(username: string) {
    this.username = username;
  }

  // ⚠️ CHECK RATE LIMIT BEFORE ANY REQUEST
  private async checkRateLimit(): Promise<void> {
    try {
      const res = await fetch(`${GITHUB_API}/rate_limit`);
      const data = await res.json();

      this.rateLimitInfo = {
        limit: data.rate.limit,
        remaining: data.rate.remaining,
        reset: data.rate.reset,
        resetDate: new Date(data.rate.reset * 1000),
      };

      // If less than 10 requests remaining, throw error
      if (this.rateLimitInfo.remaining < 10) {
        const minutesUntilReset = Math.ceil(
          (this.rateLimitInfo.resetDate.getTime() - Date.now()) / 60000
        );

        throw new Error(
          `RATE_LIMIT_EXCEEDED: GitHub API rate limit exceeded. ` +
            `Please try again in ${minutesUntilReset} minutes. ` +
            `(Resets at ${this.rateLimitInfo.resetDate.toLocaleTimeString()})`
        );
      }

      console.log(
        `✅ Rate limit OK: ${this.rateLimitInfo.remaining}/${this.rateLimitInfo.limit} remaining`
      );
    } catch (error: any) {
      if (error.message.includes("RATE_LIMIT_EXCEEDED")) {
        throw error;
      }
      // If rate limit check fails, continue but log warning
      console.warn("⚠️ Could not check rate limit, proceeding with caution");
    }
  }

  // Enhanced fetch with rate limit handling
  private async safeFetch(
    url: string,
    context: string = ""
  ): Promise<Response> {
    const res = await fetch(url);

    // Check rate limit from response headers
    const remaining = res.headers.get("x-ratelimit-remaining");
    const reset = res.headers.get("x-ratelimit-reset");

    if (remaining && reset) {
      const remainingCount = parseInt(remaining);
      const resetTime = new Date(parseInt(reset) * 1000);

      if (remainingCount < 5) {
        const minutesUntilReset = Math.ceil(
          (resetTime.getTime() - Date.now()) / 60000
        );

        throw new Error(
          `RATE_LIMIT_WARNING: Only ${remainingCount} API calls remaining. ` +
            `Stopping to prevent incomplete data. ` +
            `Please try again in ${minutesUntilReset} minutes.`
        );
      }
    }

    // Handle 403 (rate limit exceeded)
    if (res.status === 403) {
      const resetHeader = res.headers.get("x-ratelimit-reset");
      if (resetHeader) {
        const resetTime = new Date(parseInt(resetHeader) * 1000);
        const minutesUntilReset = Math.ceil(
          (resetTime.getTime() - Date.now()) / 60000
        );

        throw new Error(
          `RATE_LIMIT_EXCEEDED: GitHub API rate limit exceeded. ` +
            `Try again in ${minutesUntilReset} minutes. ` +
            `(Resets at ${resetTime.toLocaleTimeString()})`
        );
      }
      throw new Error(
        "RATE_LIMIT_EXCEEDED: GitHub API rate limit exceeded. Try again later."
      );
    }

    // Handle 404
    if (res.status === 404 && context === "user") {
      throw new Error("USER_NOT_FOUND: GitHub user not found");
    }

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    }

    return res;
  }

  // User profile
  async getUserProfile() {
    const res = await this.safeFetch(
      `${GITHUB_API}/users/${this.username}`,
      "user"
    );
    return res.json();
  }

  // All repo
  async getAllRepo() {
    const repos = [];
    let page = 1;
    const maxPages = 10; // Limit to prevent excessive API calls

    while (page <= maxPages) {
      const res = await this.safeFetch(
        `${GITHUB_API}/users/${this.username}/repos?per_page=100&page=${page}&sort=updated`
      );
      const data = await res.json();
      if (data.length === 0) break;
      repos.push(...data);
      page++;
    }
    return repos;
  }

  // events recent activity - last 90 days
  async getrecentEvents() {
    const res = await this.safeFetch(
      `${GITHUB_API}/users/${this.username}/events/public?per_page=100`
    );
    return res.json();
  }

  // Repository languages
  async getRepoLanguage(owner: string, repo: string) {
    try {
      const res = await this.safeFetch(
        `${GITHUB_API}/repos/${owner}/${repo}/languages`
      );
      return res.json();
    } catch (error) {
      console.warn(`⚠️ Could not fetch languages for ${repo}`);
      return {};
    }
  }

  // repository statistics
  async getRepoStats(owner: string, repo: string) {
    const [commits, contributors, codeFreq, participation] =
      await Promise.allSettled([
        this.safeFetch(`${GITHUB_API}/repos/${owner}/${repo}/stats/commits`)
          .then((r) => r.json())
          .catch(() => null),
        this.safeFetch(
          `${GITHUB_API}/repos/${owner}/${repo}/stats/contributors`
        )
          .then((r) => r.json())
          .catch(() => null),
        this.safeFetch(
          `${GITHUB_API}/repos/${owner}/${repo}/stats/code_frequency`
        )
          .then((r) => r.json())
          .catch(() => null),
        this.safeFetch(
          `${GITHUB_API}/repos/${owner}/${repo}/stats/participation`
        )
          .then((r) => r.json())
          .catch(() => null),
      ]);

    return {
      commitActivity: commits.status === "fulfilled" ? commits.value : null,
      contributors:
        contributors.status === "fulfilled" ? contributors.value : null,
      codeFrequency: codeFreq.status === "fulfilled" ? codeFreq.value : null,
      participation:
        participation.status === "fulfilled" ? participation.value : null,
    };
  }

  // Starred repositories
  async getStarredRepos() {
    try {
      const res = await this.safeFetch(
        `${GITHUB_API}/users/${this.username}/starred?per_page=100`
      );
      return res.json();
    } catch (error) {
      console.warn("⚠️ Could not fetch starred repos");
      return [];
    }
  }

  // organizations
  async getUserOrgs() {
    try {
      const res = await this.safeFetch(
        `${GITHUB_API}/users/${this.username}/orgs`
      );
      return res.json();
    } catch (error) {
      console.warn("⚠️ Could not fetch organizations");
      return [];
    }
  }

  // gists (code snippets)
  async getUserGists() {
    try {
      const res = await this.safeFetch(
        `${GITHUB_API}/users/${this.username}/gists?per_page=100`
      );
      return res.json();
    } catch (error) {
      console.warn("⚠️ Could not fetch gists");
      return [];
    }
  }

  // advanced analytics & insights
  async generateCompleteReport() {
    try {
      // 🔒 STEP 1: Check rate limit BEFORE starting
      await this.checkRateLimit();

      // 🔒 STEP 2: Fetch critical data first (will throw if rate limited)
      const [profile, repos, events] = await Promise.all([
        this.getUserProfile(),
        this.getAllRepo(),
        this.getrecentEvents(),
      ]);

      // 🔒 STEP 3: Fetch optional data (wrapped in try-catch)
      const [starred, orgs, gists] = await Promise.all([
        this.getStarredRepos().catch(() => []),
        this.getUserOrgs().catch(() => []),
        this.getUserGists().catch(() => []),
      ]);

      // 🔒 STEP 4: Analyze languages with rate limit awareness
      const languageAnalysis = await this.analyzeLanguages(repos);

      // analyze commit patterns
      const commitAnalysis = this.analyzeCommitPatterns(events);

      // analyze repos
      const repoAnalysis = this.analyzeRepositories(repos);

      // calculate developer score
      const developerScore = this.calculateDeveloperScore(
        profile,
        repos,
        events
      );

      // Analyze activity timeline
      const activityTimeLine = this.analyzeActivityTimeLine(events);

      // tech stack analysis
      const techStack = this.analyzeTechStack(repos, languageAnalysis);

      // Collaboration analysis
      const collaboration = this.analyzeCollaboration(repos, orgs);

      return {
        profile: {
          username: profile.login,
          name: profile.name,
          avatar: profile.avatar_url,
          bio: profile.bio,
          company: profile.company,
          location: profile.location,
          email: profile.email,
          blog: profile.blog,
          twitter: profile.twitter_username,
          hireable: profile.hireable,
          followers: profile.followers,
          following: profile.following,
          publicRepos: profile.public_repos,
          publicGists: profile.public_gists,
          accountAge: this.calculateAccountAge(profile.created_at),
          lastUpdated: profile.updated_at,
        },
        developerScore,
        languageAnalysis,
        repoAnalysis,
        commitAnalysis,
        activityTimeLine,
        techStack,
        collaboration,
        interests: this.analyzeInterests(starred),
        gistActivity: this.analyzeGists(gists),
        recommendations: this.generateRecommendations(profile, repos, events),
        // Include rate limit info in response
        rateLimitInfo: this.rateLimitInfo,
      };
    } catch (error: any) {
      // Handle specific error types
      if (error.message.includes("RATE_LIMIT")) {
        throw error; // Pass through rate limit errors as-is
      }
      if (error.message.includes("USER_NOT_FOUND")) {
        throw error;
      }

      throw new Error(
        `Failed to generate report for ${this.username}: ${error.message}`
      );
    }
  }

  // language analysis with rate limit protection
  async analyzeLanguages(repos: any[]) {
    const languageMap: { [key: string]: number } = {};
    let totalBytes = 0;

    // Reduce to top 10 repos to save API calls
    const topRepos = repos
      .filter((r) => !r.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 10); // Reduced from 20 to 10

    let successfulFetches = 0;
    const maxFetches = 8; // Stop after 8 successful fetches

    for (const repo of topRepos) {
      if (successfulFetches >= maxFetches) break;

      try {
        const languages = await this.getRepoLanguage(
          repo.owner.login,
          repo.name
        );

        if (Object.keys(languages).length > 0) {
          successfulFetches++;
          for (const [lang, bytes] of Object.entries(languages)) {
            languageMap[lang] = (languageMap[lang] || 0) + (bytes as number);
            totalBytes += bytes as number;
          }
        }
      } catch (error: any) {
        if (error.message.includes("RATE_LIMIT")) {
          console.warn("⚠️ Rate limit hit during language analysis");
          break; // Stop fetching more languages
        }
      }
    }

    const languageStats = Object.entries(languageMap)
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage: Number(((bytes / totalBytes) * 100).toFixed(2)),
      }))
      .sort((a, b) => b.bytes - a.bytes);

    if (totalBytes === 0) {
      return {
        totalLanguages: 0,
        languages: [],
        primaryLanguage: "Unknown",
        diversity: "Low",
      };
    }

    return {
      totalLanguages: languageStats.length,
      languages: languageStats,
      primaryLanguage: languageStats[0]?.name || "Unknown",
      diversity: this.calculateLanguageDiversity(languageStats),
    };
  }

  analyzeCommitPatterns(events: any[]) {
    const pushEvents = events.filter((e) => e.type === "PushEvent");
    const commits = pushEvents.flatMap((e) => e.payload.commits || []);

    const commitsByDay: { [key: string]: number } = {};
    const commitsByHour: { [key: string]: number } = {};

    pushEvents.forEach((event) => {
      const date = new Date(event.created_at);
      const day = date.toLocaleDateString();
      const hour = date.getHours();

      commitsByDay[day] = (commitsByDay[day] || 0) + (event.payload.size || 1);
      commitsByHour[hour] =
        (commitsByHour[hour] || 0) + (event.payload.size || 1);
    });

    const mostActiveHour = Object.entries(commitsByHour).sort(
      ([, a], [, b]) => b - a
    )[0];

    return {
      totalRecentCommits: commits.length,
      commitsLast30Days: pushEvents.reduce((sum, e) => {
        const date = new Date(e.created_at);
        const last30 = new Date();
        last30.setDate(last30.getDate() - 30);
        return date > last30 ? sum + (e.payload.size || 1) : sum;
      }, 0),
      mostActiveHour: mostActiveHour ? `${mostActiveHour[0]}:00` : "N/A",
      commitFrequency: this.calculateCommitFrequency(pushEvents),
      averageCommitSize:
        commits.length > 0
          ? (commits.length / pushEvents.length).toFixed(2)
          : 0,
    };
  }

  // repository analysis
  analyzeRepositories(repos: any[]) {
    const originalRepos = repos.filter((r) => !r.fork);
    const forkedRepos = repos.filter((r) => r.fork);

    const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
    const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);
    const totalWatchers = repos.reduce((sum, r) => sum + r.watchers_count, 0);

    const topRepos = originalRepos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5)
      .map((r) => ({
        name: r.name,
        description: r.description,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
        url: r.html_url,
        lastUpdated: r.updated_at,
      }));

    return {
      totalRepos: repos.length,
      originalRepos: originalRepos.length,
      forkedRepos: forkedRepos.length,
      totalStars,
      totalForks,
      totalWatchers,
      averageStarsPreRepo:
        originalRepos.length > 0
          ? Number((totalStars / originalRepos.length).toFixed(2))
          : 0,
      topRepositories: topRepos,
      repoHealth: this.calculateRepoHealth(originalRepos),
    };
  }

  // Developer score
  calculateDeveloperScore(profile: any, repos: any[], events: any[]) {
    let profileScore = 0;
    if (profile.bio) profileScore += 1;
    if (profile.name) profileScore += 1;
    if (profile.username) profileScore += 1;
    if (profile.company) profileScore += 3;
    if (profile.location) profileScore += 2;
    if (profile.email) profileScore += 2;
    if (profile.blog) profileScore += 3;
    if (profile.twitter_username) profileScore += 2;
    profileScore = Math.min(15, profileScore);

    let repoScore = 0;
    const originalRepos = repos.filter((r) => !r.fork);
    const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);

    repoScore += Math.min(15, originalRepos.length * 0.5);
    repoScore += Math.min(15, totalStars * 0.1);
    repoScore = Math.min(30, repoScore);

    const pushEvents = events.filter((e) => e.type === "PushEvent").length;
    const activityScore = Math.min(25, pushEvents);

    let communityScore = 0;
    communityScore += Math.min(10, profile.followers * 0.1);
    communityScore += Math.min(5, profile.following * 0.05);
    communityScore = Math.min(15, communityScore);

    const prEvents = events.filter((e) => e.type === "PullRequestEvent").length;
    const issueEvents = events.filter((e) => e.type === "IssuesEvent").length;
    const contributionScore = Math.min(15, (prEvents + issueEvents) * 0.5);

    const totalScore =
      profileScore +
      repoScore +
      activityScore +
      communityScore +
      contributionScore;

    return {
      overall: Math.min(100, Math.round(totalScore)),
      breakdown: {
        profile: profileScore,
        repositories: repoScore,
        activity: activityScore,
        community: communityScore,
        contribution: contributionScore,
      },
      level: this.getDeveloperLevel(Math.min(100, Math.round(totalScore))),
    };
  }

  analyzeActivityTimeLine(events: any[]) {
    const timeline: { [key: string]: any } = {};

    events.forEach((event) => {
      const date = new Date(event.created_at).toISOString().split("T")[0];
      if (!timeline[date]) {
        timeline[date] = {
          commits: 0,
          pullRequests: 0,
          issues: 0,
          stars: 0,
          other: 0,
        };
      }

      switch (event.type) {
        case "PushEvent":
          timeline[date].commits += event.payload.size || 1;
          break;
        case "PullRequestEvent":
          timeline[date].pullRequests++;
          break;
        case "IssuesEvent":
          timeline[date].issues++;
          break;
        case "WatchEvent":
          timeline[date].stars++;
          break;
        default:
          timeline[date].other++;
      }
    });

    return {
      dailyActivity: Object.entries(timeline)
        .sort(([a], [b]) => b.localeCompare(a))
        .slice(0, 30),
      streakDays: this.calculateStreak(Object.keys(timeline)),
      mostActivity: this.findMostActiveDay(timeline),
    };
  }

  analyzeTechStack(repos: any[], languageAnalysis: any) {
    const frameworks: { [key: string]: number } = {};
    const topics: { [key: string]: number } = {};

    repos.forEach((repo) => {
      if (repo.topics) {
        repo.topics.forEach((topic: string) => {
          topics[topic] = (topics[topic] || 0) + 1;
        });
      }

      const text = `${repo.name} ${repo.description || ""}`.toLowerCase();
      const detectedFrameworks = this.detectFrameworks(text);
      detectedFrameworks.forEach((fw) => {
        frameworks[fw] = (frameworks[fw] || 0) + 1;
      });
    });

    return {
      primaryLanguage: languageAnalysis.primaryLanguage,
      languages: languageAnalysis.languages.slice(0, 10),
      frameworks: Object.entries(frameworks)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([name, count]) => ({ name, count })),
      topics: Object.entries(topics)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 15)
        .map(([name, count]) => ({ name, count })),
    };
  }

  analyzeCollaboration(repos: any[], orgs: any[]) {
    const forkedRepos = repos.filter((r) => r.fork);
    const sharedRepos = repos.filter((r) => r.owner.login !== this.username);
    return {
      organizations: orgs.map((o: any) => ({
        name: o.login,
        url: o.url,
        avatar: o.avatar_url,
      })),
      contributedToRepos: forkedRepos.length + sharedRepos.length,
      teamPlayer: orgs.length > 0 || forkedRepos.length > 5,
      openSource: forkedRepos.length > 0,
    };
  }

  analyzeInterests(starred: any[]) {
    const categories: { [key: string]: number } = {};
    starred.forEach((repo) => {
      if (repo.topics) {
        repo.topics.forEach((topic: string) => {
          categories[topic] = (categories[topic] || 0) + 1;
        });
      }
    });

    return {
      totalStarred: starred.length,
      topInterests: Object.entries(categories)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([name, count]) => ({ name, count })),
    };
  }

  analyzeGists(gists: any[]) {
    return {
      total: gists.length,
      public: gists.filter((g) => g.public).length,
      languages: [...new Set(gists.flatMap((g) => Object.keys(g.files)))]
        .length,
    };
  }

  generateRecommendations(profile: any, repos: any[], events: any[]) {
    const recommendations = [];

    const recentEvents = events.filter((e) => {
      const eventDate = new Date(e.created_at);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return eventDate > thirtyDaysAgo;
    });

    if (recentEvents.length > 20) {
      recommendations.push("🔥 Highly Active Developer");
    } else if (recentEvents.length > 10) {
      recommendations.push("✅ Moderately Active");
    }

    const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
    if (totalStars > 100) {
      recommendations.push("⭐ Popular Open Source Contributor");
    }

    const accountAge = this.calculateAccountAge(profile.created_at);
    if (accountAge > 5) {
      recommendations.push("🎓 Experienced Developer (5+ years)");
    } else if (accountAge > 2) {
      recommendations.push("📈 Mid-Level Developer");
    }

    if (profile.followers > 100) {
      recommendations.push("👥 Strong Community Presence");
    }

    return recommendations;
  }

  // Helper functions
  calculateAccountAge(createdAt: string): number {
    const years =
      (Date.now() - new Date(createdAt).getTime()) /
      (1000 * 60 * 60 * 24 * 365);
    return Number(years.toFixed(2));
  }

  calculateLanguageDiversity(languages: any[]): string {
    if (languages.length >= 10) return "High";
    if (languages.length >= 5) return "Medium";
    return "Low";
  }

  calculateCommitFrequency(pushEvents: any[]): string {
    if (pushEvents.length > 50) return "Very High";
    if (pushEvents.length > 20) return "High";
    if (pushEvents.length > 10) return "Medium";
    return "Low";
  }

  calculateRepoHealth(repos: any[]): string {
    if (repos.length === 0) return "N/A";

    const recentlyUpdated = repos.filter((r) => {
      const updated = new Date(r.updated_at);
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      return updated > sixMonthsAgo;
    }).length;

    const percentage = (recentlyUpdated / repos.length) * 100;
    if (percentage > 60) return "Excellent";
    if (percentage > 30) return "Good";
    return "Fair";
  }

  getDeveloperLevel(score: number): string {
    if (score >= 80) return "Elite";
    if (score >= 60) return "Advanced";
    if (score >= 40) return "Intermediate";
    return "Beginner";
  }

  calculateStreak(dates: string[]): number {
    if (dates.length === 0) return 0;

    const sortedDates = dates.sort().reverse();
    let streak = 0;
    let currentDate = new Date();

    for (const date of sortedDates) {
      const checkDate = new Date(date);
      const diffDays = Math.floor(
        (currentDate.getTime() - checkDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffDays <= 1) {
        streak++;
        currentDate = checkDate;
      } else {
        break;
      }
    }

    return streak;
  }

  findMostActiveDay(timeline: any): string {
    const entries = Object.entries(timeline);
    if (entries.length === 0) return "N/A";
    const [date] = entries.reduce(
      ([maxDate, maxTotal]: any, [date, data]: any) => {
        const total = Object.values(data).reduce(
          (sum: number, val) => sum + (val as number),
          0
        );
        return total > maxTotal ? [date, total] : [maxDate, maxTotal];
      },
      ["", 0]
    );
    return date;
  }

  detectFrameworks(text: string): string[] {
    const content = text.toLowerCase().replace(/[\s.-]/g, "");
    const frameworks = [
      // Frontend
      "react","angular","vue","svelte","nextjs","nuxt","gatsby","remix","astro","solid","preact","ember","backbone","jquery",

      // Backend
      "express","nestjs","fastapi","spring","springboot","laravel","rails","django","flask","gin","actix","fastify","koa","hapi",

      // Mobile
      "reactnative","flutter","ionic","capacitor","cordova","nativescript","expo",

      // AI / ML
      "tensorflow","pytorch","keras","scikitlearn","pandas","opencv","transformers","huggingface","langchain","jax",

      // Databases / Backend tools
      "mongodb","postgresql","mysql","redis","elasticsearch","dynamodb","cassandra","neo4j","supabase","firebase","prisma",

      // DevOps / Cloud
      "docker","kubernetes","terraform","ansible","jenkins","aws","azure","gcp","heroku","vercel","netlify","githubactions",

      // CSS / UI
      "tailwind","bootstrap","materialui","chakraui","bulma","shadcn","antdesign",

      // Game / Graphics
      "unity","unreal","godot","threejs","babylonjs","phaser","pixijs",

      // Blockchain
      "ethereum","solidity","web3","ethers","hardhat","polygon","solana",

      // Testing
      "jest","mocha","cypress","playwright","vitest","pytest","selenium","puppeteer",

      // Build tools
      "webpack","vite","rollup","parcel","esbuild","turbopack",

      // State management
      "redux","mobx","zustand","recoil","jotai","xstate",

      // Other
      "graphql","apollo","nginx","socketio","oauth","jwt","auth0","clerk",
    ];

    return frameworks.filter((fw) => content.includes(fw));
  }
}

export async function analyzeGitHubUser(username: string) {
  const analyzer = new GithubAnalyzer(username);
  return await analyzer.generateCompleteReport();
}
