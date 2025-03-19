import { ReactNode } from 'react';
import ProgramLayout from '@/src/features/programs/ui/layouts/ProgramLayout';

export default async function Layout({
  params,
  children,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <ProgramLayout id={id}>{children}</ProgramLayout>;
}
