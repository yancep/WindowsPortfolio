import { ReactNode } from 'react';
import ProjectLayout from '@/src/features/projects/ui/layout/ProjectLayout';

export default async function Layout({
  params,
  children,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <ProjectLayout id={id}>{children}</ProjectLayout>;
}
