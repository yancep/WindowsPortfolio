'use client';
import CustomTable, {
  CustomTableState,
  SearchState,
} from '@/src/components/tables/CustomTable';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Select,
  Selection,
  SelectItem,
  Spacer,
} from "@heroui/react";
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useUsersStore } from '@/src/features/users/ui/store/useUsersStore';
import { useRequestEventsStore } from '@/src/features/admin/ui/stores/RequestEventsStore';
import { RequestEventModel } from '@/src/features/admin/data/models/requestEventsModel';

export const INITIAL_VISIBLE_COLUMNS = [
  'id',
  'user',
  'method',
  'url',
  'remoteIp',
  'datetime',
  'queryString',
];

export const columns = [
  { name: 'ID', uid: 'id' },
  { name: 'USUARIO', uid: 'user' },
  { name: 'MÉTODO', uid: 'method' },
  { name: 'URL', uid: 'url' },
  { name: 'IP REMOTO', uid: 'remoteIp' },
  { name: 'TIEMPO', uid: 'datetime' },
  { name: 'PARÁMETROS', uid: 'queryString' },
];

export default function RequestEventsTab() {
  const {
    isLoading,
    getRequestEvents,
    data: requestData,
  } = useRequestEventsStore();
  const { data: userData, getUsers } = useUsersStore();

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
    getRequestEvents({
      page: tableState.page ?? 1,
      limit: tableState.rowsPerPage,
      search: searchState.value,
    });
  };
  useEffect(() => {
    getUsers({});
  }, []);
  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      html: '#table',
      theme: 'grid',
      bodyStyles: { cellWidth: 'auto' },
    });
    doc.save('Datos de eventos de lectura.pdf');
  };

  const handleUserFilterChange = (value: string) => {
    useRequestEventsStore.getState().setFilters({ user: value });
  };
  const handleMaxDateFilterChange = (value: string) => {
    if (value) {
      const DateValue = moment(value).format('YYYY-MM-DD HH:mm:ss.SSSSSSZZ');
      useRequestEventsStore.getState().setFilters({ max_date: DateValue });
    }
  };
  const handleMinDateFilterChange = (value: string) => {
    if (value) {
      const DateValue = moment(value).format('YYYY-MM-DD HH:mm:ss.SSSSSSZZ');
      useRequestEventsStore.getState().setFilters({ min_date: DateValue });
    }
  };

  const cleanFilters = () => {
    useRequestEventsStore.getState().setFilters({
      user: undefined,
      min_date: undefined,
      max_date: undefined,
    });
    getRequestEvents({});
  };

  const [visibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const LOADING_STATE = isLoading ? 'loading' : 'idle';

  const RENDER_CELLS = {
    id: (event: RequestEventModel) => <span>{event.id}</span>,
    user: (event: RequestEventModel) => (
      <span>{event.user ? event.user.username : 'Operación del sistema'}</span>
    ),
    method: (event: RequestEventModel) => <span>{event.method}</span>,
    url: (event: RequestEventModel) => <span>{event.url}</span>,
    remoteIp: (event: RequestEventModel) => <span>{event.remoteIp}</span>,
    datetime: (event: RequestEventModel) => (
      <span>{moment(event.datetime).format('DD/MM/YYYY, h:mm:ss a')}</span>
    ),
    queryString: (event: RequestEventModel) => (
      <span>
        {event.queryString != '' ? event.queryString : 'No hay parámetros'}
      </span>
    ),
  };

  return (
    <CustomTable
      HEADER_COLUMNS={headerColumns}
      ITEMS={requestData?.data || []}
      LOADING_STATE={LOADING_STATE}
      CELL_RENDERERS={RENDER_CELLS}
      PAGINATION={requestData?.meta}
      TABLE_STATE={tableState}
      UPDATE_TABLE_STATE={setTableState}
      TOP_CONTENT={
        <div
          className="flex"
          style={{
            justifyContent: 'flex-end',
          }}
        >
          <Dropdown>
            <DropdownTrigger>
              <Button size="sm" color="default" variant={'bordered'}>
                Filtros
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                isReadOnly
                className="cursor-default"
                key={'Usuario'}
              >
                <div>
                  <div
                    className="flex"
                    style={{ justifyContent: 'space-between' }}
                  >
                    <div style={{ width: '100%' }}>
                      <Select
                        id="user"
                        name="Usuario"
                        size="sm"
                        label={'Usuario'}
                        style={{ width: '100%' }}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          handleUserFilterChange(e.target.value);
                        }}
                      >
                        {(userData?.data ?? []).map((user) => {
                          return (
                            <SelectItem key={user.id} value={user.id}>
                              {user.username}
                            </SelectItem>
                          );
                        })}
                      </Select>
                    </div>
                  </div>
                </div>
              </DropdownItem>
              <DropdownItem
                isReadOnly
                className="cursor-default"
                key={'max_date'}
              >
                <div>
                  <div
                    className="flex"
                    style={{ justifyContent: 'space-between' }}
                  >
                    <div style={{ width: '100%' }}>
                      <Input
                        size="md"
                        label={'Fecha mínima'}
                        placeholder="Fecha mínima"
                        type="date"
                        onChange={(event) =>
                          handleMinDateFilterChange(event.target.value)
                        }
                      ></Input>
                    </div>
                  </div>
                </div>
              </DropdownItem>
              <DropdownItem
                isReadOnly
                className="cursor-default"
                key={'min_date'}
              >
                <div>
                  <div
                    className="flex"
                    style={{ justifyContent: 'space-between' }}
                  >
                    <div style={{ width: '100%' }}>
                      <Input
                        size="md"
                        label={'Fecha máxima'}
                        placeholder="Fecha máxima"
                        type="date"
                        onChange={(event) =>
                          handleMaxDateFilterChange(event.target.value)
                        }
                      ></Input>
                    </div>
                  </div>
                </div>
              </DropdownItem>
              <DropdownItem
                key={'apply'}
                isReadOnly
                endContent={
                  <Button size="sm" color="primary" onClick={fetchData}>
                    Aplicar
                  </Button>
                }
              >
                <Button
                  onPress={() => cleanFilters()}
                  size="sm"
                  color="primary"
                >
                  Limpiar
                </Button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Spacer />
          {requestData ? (
            <Button
              variant="solid"
              size="sm"
              color="primary"
              onPress={() => exportToPDF()}
            >
              Exportar a PDF
            </Button>
          ) : (
            <Button isDisabled color="primary" size="sm">
              No hay datos para exportar
            </Button>
          )}
        </div>
      }
    />
  );
}
