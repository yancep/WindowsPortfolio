import ObjectivesView from '@/src/features/projects/ui/views/ProjectPlanningViews/ObjectivesView';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <ObjectivesView projectId={id} />;
}
