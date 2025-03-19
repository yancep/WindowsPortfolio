'use client';
import React, { useEffect, useState } from 'react';
import { Selection, Spacer, User } from "@heroui/react";
import { useEntitiesStore } from '@/src/features/admin/ui/stores/UseEntitiesStore';
import CustomTable, {
  CustomTableState,
  SearchState,
} from '@/src/components/tables/CustomTable';
import { Entity } from '@/src/features/entities/domain/entities/Entity';
import { EntityTypeNomenclature } from '@/src/features/shared/nomenclatures/domain/entities/EntityNomenclatures';
import { AppEntityIcon } from '@/src/components/Icons/app/sideBarIcons';
import {
  RenderPhone,
  RenderValuesName,
  RenderWebSite,
} from '@/src/components/tables/extra/CustomRenderCells';
import TableSearchComponent from '@/src/components/tables/extra/TableSearchComponent';
import { usePathname } from 'next/navigation';
import { EntityActions } from '@/src/features/entities/ui/components/EntityActionComponent';

export function getEntityType(type: EntityTypeNomenclature) {
  switch (type) {
    case 'BUDGETED':
      return 'Unidad Presupuestada';
    case 'BUSINESS':
      return 'Unidad Empresarial';
    default:
      return 'No especificado';
  }
}

const INITIAL_VISIBLE_COLUMNS = [
  'name',
  'contactPhone',
  'generalDirector',
  'ctiDirector',
  'actions',
];

export default function AdminEntitiesView() {
  const pathname = usePathname();

  const columns = [
    { name: 'NOMBRE', uid: 'name', sortable: true },
    { name: 'TELÉFONO DE CONTACTO', uid: 'contactPhone', sortable: true },
    { name: 'TIPO', uid: 'type' },
    { name: 'DIRECTOR GENERAL', uid: 'generalDirector' },
    { name: 'DIRECTOR DE CTI', uid: 'ctiDirector' },
    { name: 'TIPO', uid: 'type' },
    { name: 'SITIO WEB', uid: 'webSite' },
    { name: 'PROVINCIA', uid: 'province' },
    { name: 'OACE', uid: 'oace' },
    pathname.includes('administracion')
      ? { name: 'ACCIONES', uid: 'actions' }
      : { name: '', uid: 'none' },
  ];

  const { getEntities, data, isLoading } = useEntitiesStore();

  const [tableState, setTableState] = useState<CustomTableState>({
    rowsPerPage: 10,
    page: 1,
    order: 'asc',
  });

  const [searchState, setSearchState] = useState<SearchState>({
    isLoading: false,
    value: '',
  });

  useEffect(() => {
    fetchData();
  }, [tableState, searchState.value]);

  const fetchData = async () => {
    getEntities({
      page: tableState.page ?? 1,
      limit: tableState.rowsPerPage,
      search: searchState.value,
    });
  };

  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const LOADING_STATE = isLoading ? 'loading' : 'idle';

  function RenderEntityNameCell({ entity }: { entity: Entity }) {
    return (
      <User
        name={
          <div className=" max-w-md overflow-x-auto whitespace-nowrap ">
            {entity.name}
          </div>
        }
        description={
          <div className={'flex flex-row items-center'}>
            <span className="text-md font-mono">Código Duine</span>
            <Spacer />
            <span className="text-md font-mono">{entity.code}</span>
          </div>
        }
        avatarProps={{
          showFallback: true,
          fallback: <AppEntityIcon />,
          isBordered: true,
        }}
      />
    );
  }

  const RENDER_CELLS = {
    name: (item: Entity) => <RenderEntityNameCell entity={item} />,
    contactPhone: (item: Entity) => RenderPhone({ phone: item.contactPhone }),
    webSite: (item: Entity) => RenderWebSite({ web: item.webSite }),
    province: (item: Entity) => RenderValuesName(item.province?.name),
    generalDirector: (item: Entity) =>
      RenderValuesName(item.generalManagerName),
    ctiDirector: (item: Entity) => RenderValuesName(item.ctiManagerName),
    oace: (item: Entity) => RenderValuesName(item.oace?.name),
    actions: (item: Entity) => (
      <EntityActions entity={item} handleUpdate={fetchData} />
    ),
  };

  return (
    <CustomTable
      TABLE_STATE={tableState}
      UPDATE_TABLE_STATE={setTableState}
      TOP_CONTENT={
        <TableSearchComponent
          changeValueSearchState={(value) =>
            setSearchState({ ...searchState, value: value })
          }
          isLoading={searchState.isLoading}
        />
      }
      PAGINATION={data?.meta}
      HEADER_COLUMNS={headerColumns}
      ITEMS={data?.data || []}
      LOADING_STATE={LOADING_STATE}
      CELL_RENDERERS={RENDER_CELLS}
    />
  );
}
