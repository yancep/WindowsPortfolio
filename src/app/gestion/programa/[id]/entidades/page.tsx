import ProgramEntitiesView from '@/src/features/programs/ui/views/ProgramEntitiesView/ProgramEntitiesView';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <ProgramEntitiesView id={id} />;
}
