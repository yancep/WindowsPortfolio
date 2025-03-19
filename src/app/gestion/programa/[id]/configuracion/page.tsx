import PrograminfoView from '@/src/features/programs/ui/views/ProgramInfoView/ProgramInfoView';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <PrograminfoView id={id} />;
}
