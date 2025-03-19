import ProgramCertificationConfigView from '@/src/features/programs/ui/views/ProgramCertificationConfigView/ProgramCertificationConfigView';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <ProgramCertificationConfigView />;
}
