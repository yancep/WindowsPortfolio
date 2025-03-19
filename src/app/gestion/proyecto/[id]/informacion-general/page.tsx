import ProjectsStatsView from '@/src/features/projects/ui/views/StatsView/ProjectsStatsView';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <ProjectsStatsView id={id} />;
}
