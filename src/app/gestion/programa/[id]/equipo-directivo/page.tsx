import ProgramManagementTeamView from '@/src/features/programs/ui/views/ProgramManagementTeamView/ProgramManagementTeamView';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <ProgramManagementTeamView id={id} />;
}
