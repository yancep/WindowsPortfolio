import ProjectsEntitiesView from '@/src/features/projects/ui/views/ProjectEntitiesView/ProjectsEntitiesView';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <ProjectsEntitiesView id={id} />;
}
