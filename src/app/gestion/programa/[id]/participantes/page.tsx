import ProgramParticipantsView from '@/src/features/programs/ui/views/ProgramParticipantsView/ProgramParticipantsView';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <ProgramParticipantsView id={id} />;
}
