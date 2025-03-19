import ResultView from '@/src/features/projects/ui/views/ProjectPlanningViews/ResultView';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <ResultView projectId={id} />;
}
