'use client';
import React, { useEffect } from 'react';
import { ProgramsStore } from '@/src/features/admin/ui/stores/ProgramsStore';
import ProgramModal from '@/src/features/admin/ui/components/ProgramModal';
import { LoadingComponent } from '@/src/components/pageStates/LoadingComponent';
import ErrorComponent from '@/src/components/pageStates/ErrorComponent';
import { EmptyComponent } from '@/src/components/pageStates/EmptyComponent';
import ProgramCard from '@/src/features/admin/ui/components/ProgramCard';
import { Spacer } from "@heroui/react";

export default function AdminProgramsView() {
  const { getPrograms, error, data: programs, isLoading } = ProgramsStore();

  useEffect(() => {
    getPrograms();
  }, []);

  return isLoading ? (
    <LoadingComponent text="Cargando programas..." />
  ) : error ? (
    <ErrorComponent errorTitle={error} />
  ) : programs && programs.length === 0 ? (
    <EmptyComponent />
  ) : (
    <section className={'flex h-full w-full flex-col overflow-hidden p-4'}>
      <div className="flex w-full flex-row justify-end  text-xl font-bold">
        <ProgramModal />
      </div>
      <Spacer />
      <div className="flex max-h-full flex-row flex-wrap  overflow-y-auto">
        {programs?.map((program, index) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>
    </section>
  );
}
