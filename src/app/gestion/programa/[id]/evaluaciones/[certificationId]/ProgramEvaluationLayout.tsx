'use client';
import { useProgramEvaluationStore } from '@/src/features/programs/ui/views/ProgramEvaluationsView/stores/useProgramEvaluationStore';
import React, { useEffect } from 'react';
import { LoadingComponent } from '@/src/components/pageStates/LoadingComponent';
import ErrorComponent from '@/src/components/pageStates/ErrorComponent';

export default function ProgramEvaluationLayout({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { isLoading, getEvaluationPeriod, error, data } =
    useProgramEvaluationStore();

  useEffect(() => {
    fetchData();
  }, [id]);

  function fetchData() {
    if (!data) getEvaluationPeriod(id);
  }

  if (isLoading)
    return <LoadingComponent text="Cargando Período de evaluación" />;

  if (error) return <ErrorComponent errorTitle={error} />;

  if (data) return <>{children}</>;
}
