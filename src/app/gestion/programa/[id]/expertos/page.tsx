import ProgramExpertsView from '@/src/features/programs/ui/views/ProgramExpertsView/ProgramExpertsView';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <ProgramExpertsView id={id} />;
}
