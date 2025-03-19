import ProjectsParticipantsView from '@/src/features/projects/ui/views/ProjectMemberView/ProjectsParticipantsView';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <ProjectsParticipantsView id={id} />;
}
