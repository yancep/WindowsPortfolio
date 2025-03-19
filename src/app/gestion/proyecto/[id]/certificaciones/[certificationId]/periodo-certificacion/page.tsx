'use client';

import ProjectCertificationPeriodView from '@/src/features/projects/ui/views/ProjectCertificationView/ProjectCertificationPeriodView';

export default async function Page({
  params,
}: {
  params: Promise<{ certificationId: string }>;
}) {
  const id = (await params).certificationId;
  return <ProjectCertificationPeriodView certificationId={id} />;
}
