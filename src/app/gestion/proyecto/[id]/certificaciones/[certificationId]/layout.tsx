'use client';

import ErrorComponent from '@/src/components/pageStates/ErrorComponent';
import { LoadingComponent } from '@/src/components/pageStates/LoadingComponent';
import { ReactNode, useEffect } from 'react';
import { useProjectCertificationStore } from '@/src/features/projects/ui/views/ProjectCertificationView/store/useProjectCertificationStore';
import { ProjectCertificationLayout } from '@/src/features/projects/ui/views/ProjectCertificationView/ProjectCertificationLayout';

export default async function Layout({
  params,
  children,
}: {
  children: ReactNode;
  params: Promise<{ certificationId: string }>;
}) {
  const id = (await params).certificationId;

  return (
    <ProjectCertificationLayout id={id}>{children}</ProjectCertificationLayout>
  );
}
