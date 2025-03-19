import ProjectsInEntityView from '@/src/features/entities/ui/views/ProjectsInEntityView';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <ProjectsInEntityView id={id} />;
}
