import ProgramEvaluationsView from '@/src/features/programs/ui/views/ProgramEvaluationsView/ProgramEvaluationsView';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <ProgramEvaluationsView id={id} />;
}
