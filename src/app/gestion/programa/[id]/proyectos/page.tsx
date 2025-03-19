import ProgramProjectsView from '@/src/features/programs/ui/views/ProgramProjectsView/ProgramProjectsView';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <ProgramProjectsView id={id} />;
}
