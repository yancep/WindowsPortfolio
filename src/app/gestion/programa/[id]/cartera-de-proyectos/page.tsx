import WalletProjectsView from '@/src/features/programs/ui/views/ProgramProjectsWalletView/WalletProjectsView';

export default async function page({ params }: { params: Promise<{ id: string }> }) {

  const id = (await params).id;

  return <WalletProjectsView id={id} />;
}
