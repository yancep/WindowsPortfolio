'use client';

import ManagementEntityLayout from '@/src/features/entities/ui/layouts/EntityLayout';
import { ReactNode } from 'react';

export default async function Layout({
  params,
  children,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <ManagementEntityLayout id={id}>{children}</ManagementEntityLayout>;
}
