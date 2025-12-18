import AnalyzeDashboard from "@/components/dashboard/AnalyzeDashboard";

interface PageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function AnalyzePage({ params }: PageProps) {
  const { username } =await params;

  return <AnalyzeDashboard username={username} />;
}