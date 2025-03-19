import ProjectsInfoComponent from '@/src/features/projects/ui/components/ProjectsInfoComponent';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <ProjectsInfoComponent id={id} />;
}
