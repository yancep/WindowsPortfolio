import ProgramEvaluationMemberView from '@/src/features/programs/ui/views/ProgramEvaluationMemberView/ProgramEvaluationMemberView';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; certificationId: string }>;
}) {
  const id = (await params).certificationId;

  return <ProgramEvaluationMemberView id={id} />;
}
