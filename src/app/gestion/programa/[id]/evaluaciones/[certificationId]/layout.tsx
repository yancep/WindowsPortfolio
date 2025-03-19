'use client';

import ErrorComponent from '@/src/components/pageStates/ErrorComponent';
import { LoadingComponent } from '@/src/components/pageStates/LoadingComponent';
import { useProgramEvaluationStore } from '@/src/features/programs/ui/views/ProgramEvaluationsView/stores/useProgramEvaluationStore';
import { ReactNode, useEffect } from 'react';
import ProgramEvaluationLayout from '@/src/app/gestion/programa/[id]/evaluaciones/[certificationId]/ProgramEvaluationLayout';

export default async function Layout({
  params,
  children,
}: {
  children: ReactNode;
  params: Promise<{ certificationId: string }>;
}) {
  const id = (await params).certificationId;
  return <ProgramEvaluationLayout id={id}>{children}</ProgramEvaluationLayout>;
}
