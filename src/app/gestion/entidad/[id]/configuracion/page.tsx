'use client';
import ManagementEntitiesConfigView from '@/src/features/entities/ui/views/ManagementEntitiesConfigView';
import { useEntityStore } from '@/src/features/entities/ui/stores/entityStore';
import { LoadingComponent } from '@/src/components/pageStates/LoadingComponent';

export default function Page() {
  const data = useEntityStore((state) => state.data);

  return !data ? (
    <LoadingComponent text={'Cargando datos de la entidad'} />
  ) : (
    <ManagementEntitiesConfigView entityToEdit={data} />
  );
}
