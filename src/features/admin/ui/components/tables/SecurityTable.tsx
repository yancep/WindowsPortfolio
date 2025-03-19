'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
} from "@heroui/react";
import moment from 'moment';
import CustomTable, {
  CustomTableState,
  SearchState,
} from '@/src/components/tables/CustomTable';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useSecurityStore } from '@/src/features/admin/ui/stores/SecurityStore';
import { VerticalDotsIcon } from '@/src/components/Icons/extra/TableIcons';
import { AccessBlacklisted } from '@/src/features/admin/data/models/securityAccessBlacklistedModel';

export const INITIAL_VISIBLE_COLUMNS = [
  'id',
  'remaining_minutes',
  'user_agent',
  'ip_address',
  'username',
  'attempt_time',
  'failures_since_start',
  'actions',
];

export const columns = [
  { name: 'ID', uid: 'id' },
  { name: 'USUARIO', uid: 'username' },
  { name: 'CANTIDAD DE FALLOS', uid: 'failures_since_start' },
  { name: 'MINUTOS RESTANTES', uid: 'remaining_minutes' },
  { name: 'FECHA DEL INTENTO', uid: 'attempt_time' },
  { name: 'DIRECCIÓN IP', uid: 'ip_address' },
  { name: 'NAVEGADOR DEL USUARIO', uid: 'user_agent' },
  { name: 'ACCIONES', uid: 'actions' },
];

export default function SecurityTable() {
  const { getAccessBlacklisted, error, isLoading, data } = useSecurityStore();

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
    getAccessBlacklisted({
      page: tableState.page ?? 1,
      limit: tableState.rowsPerPage,
      search: searchState.value,
    });
  };

  const [visibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  console.log(data);

  const { deleteAccessBlacklisted } = useSecurityStore();

  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      html: '#table',
      theme: 'grid',
      bodyStyles: { cellWidth: 'auto' },
    });
    doc.save('Datos de accesos en lista negra.pdf');
  };

  const handleUnlockUser = async (id: number) => {
    const response = await deleteAccessBlacklisted(id.toString());
    if (response) fetchData();
  };

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const LOADING_STATE = isLoading ? 'loading' : 'idle';

  const RENDER_CELLS = {
    id: (event: AccessBlacklisted) => <span>{event.id}</span>,
    username: (event: AccessBlacklisted) => <span>{event.username}</span>,
    remaining_minutes: (event: AccessBlacklisted) => (
      <span>{event.remainingMinutes ? event.remainingMinutes : 'Vacío'}</span>
    ),

    user_agent: (event: AccessBlacklisted) => <span>{event.userAgent}</span>,
    ip_address: (event: AccessBlacklisted) => <span>{event.ipAddress}</span>,
    attempt_time: (event: AccessBlacklisted) => (
      <span>{moment(event.attemptTime).format('DD/MM/YYYY,h:mm:ss a')}</span>
    ),
    failures_since_start: (event: AccessBlacklisted) => (
      <span>{event.failuresSinceStart}</span>
    ),
    actions: (event: AccessBlacklisted) => (
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly radius="sm" size="sm" variant="bordered">
            <VerticalDotsIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem
            key={'unlock-user'}
            onPress={() => handleUnlockUser(event.id)}
          >
            Desbloquear usuario
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    ),
  };

  return (
    <CustomTable
      TABLE_STATE={tableState}
      UPDATE_TABLE_STATE={setTableState}
      ERROR={error ?? undefined}
      HEADER_COLUMNS={headerColumns}
      ITEMS={data?.data}
      PAGINATION={data?.meta}
      LOADING_STATE={LOADING_STATE}
      CELL_RENDERERS={RENDER_CELLS}
      TOP_CONTENT={
        <div
          className="flex"
          style={{
            justifyContent: 'flex-end',
          }}
        >
          {data && data.data.length !== 0 ? (
            <Button
              variant="solid"
              size="sm"
              color="primary"
              onClick={() => exportToPDF()}
            >
              Exportar a PDF
            </Button>
          ) : (
            <Button isDisabled color="default" size="sm">
              No hay datos para exportar
            </Button>
          )}
        </div>
      }
    />
  );
}
