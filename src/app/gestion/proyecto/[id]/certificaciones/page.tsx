import ProjectCertificationsView from '@/src/features/projects/ui/views/ProjectCertificationView/ProjectCertificationsView';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <ProjectCertificationsView id={id} />;
}
