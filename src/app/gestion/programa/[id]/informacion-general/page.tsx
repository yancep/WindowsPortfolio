import ProgramStatsView from '@/src/features/programs/ui/views/ProgramStatsView/ProgramStatsView';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <ProgramStatsView id={id} />;
}
