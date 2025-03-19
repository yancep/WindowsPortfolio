import ActivityView from '@/src/features/projects/ui/views/ProjectPlanningViews/ActivityView';
import { ReactNode } from 'react';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <ActivityView projectId={id} />;
}
