import CustomTable, {
  CustomTableState,
  SearchState,
} from '@/src/components/tables/CustomTable';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Chip,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  Selection,
  SelectItem,
  Spacer,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import moment from 'moment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import AddChange from '@/public/icons/AddChange';
import QuitChange from '@/public/icons/QuitChange';
import { useUsersStore } from '@/src/features/users/ui/store/useUsersStore';
import { useCrudEventsStore } from '@/src/features/admin/ui/stores/CrudEventsStore';
import { CrudEventModel } from '@/src/features/admin/data/models/crudEventsModel';

export const INITIAL_VISIBLE_COLUMNS = [
  'id',
  'user',
  'eventName',
  'datetime',
  'contentType',
  'objectRepr',
  'changedFields',
  'objectJsonRepr',
];

export const columns = [
  { name: 'ID', uid: 'id' },
  { name: 'USUARIO', uid: 'user' },
  { name: 'EVENTO', uid: 'eventName' },
  { name: 'TIPO DE CONTENIDO', uid: 'contentType' },
  { name: 'ACCIÓN SOBRE', uid: 'objectRepr' },
  { name: 'TIEMPO', uid: 'datetime' },
  { name: 'CAMBIOS', uid: 'changedFields' },
  { name: 'MODELO', uid: 'objectJsonRepr' },
];

// export default function CrudEventsTab(data?: NewData<CrudEventModel> | null) {
export default function CrudEventsTab() {
  const { isLoading, data: crudData, getCrudEvents } = useCrudEventsStore();
  const { data: userData, getUsers } = useUsersStore();

  const [visibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );

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
    getCrudEvents({
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
      bodyStyles: { cellWidth: 'auto', overflow: 'linebreak' },
      headStyles: { cellWidth: 'auto' },
      tableWidth: 'auto',
      // horizontalPageBreak:true
    });
    doc.save('Datos de eventos de escritura.pdf');
  };

  const handleUserFilterChange = (value: string) => {
    useCrudEventsStore.getState().setFilters({ user: value });
  };
  const handleMaxDateFilterChange = (value: string) => {
    if (value) {
      const DateValue = moment(value).format('YYYY-MM-DD HH:mm:ss.SSSSSSZZ');
      useCrudEventsStore.getState().setFilters({ max_date: DateValue });
    }
  };
  const handleMinDateFilterChange = (value: string) => {
    if (value) {
      const DateValue = moment(value).format('YYYY-MM-DD HH:mm:ss.SSSSSSZZ');
      useCrudEventsStore.getState().setFilters({ min_date: DateValue });
    }
  };

  const cleanFilters = () => {
    useCrudEventsStore.getState().setFilters({
      user: undefined,
      min_date: undefined,
      max_date: undefined,
    });
    getCrudEvents({});
  };

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const LOADING_STATE = isLoading ? 'loading' : 'idle';

  const RENDER_CELLS = {
    id: (event: CrudEventModel) => <span>{event.id}</span>,
    user: (event: CrudEventModel) => (
      <span>{event.user ? event.user.username : 'Operación del sistema'}</span>
    ),
    eventName: (event: CrudEventModel) => <span>{event.eventName}</span>,
    datetime: (event: CrudEventModel) => (
      <span>{moment(event.datetime).format('DD/MM/YYYY ,h:mm:ss a')}</span>
    ),
    contentType: (event: CrudEventModel) => <span>{event.contentType}</span>,
    objectRepr: (event: CrudEventModel) => <span>{event.objectRepr}</span>,
    changedFields: (event: CrudEventModel) => {
      if (
        typeof event.changedFields === 'string' &&
        event.changedFields != 'null'
      ) {
        try {
          const parsedData = JSON.parse(event.changedFields);

          const formattedFields = [];
          let counter = 1;
          for (const key in parsedData) {
            const oldData = parsedData[key][0];
            const newData = parsedData[key][1];
            formattedFields.push(
              <div
                className="flex flex-col"
                style={{
                  alignItems: 'center',
                  placeContent: 'center',
                  marginBottom: ' 10px',
                }}
                key={counter}
              >
                <Chip size="sm" variant="flat" color="primary">
                  {counter}
                </Chip>
                <span
                  style={{ fontWeight: 'lighter', fontFamily: 'monospace' }}
                >{`${key}\n`}</span>
                <div
                  style={{ alignContent: 'center', alignItems: 'center' }}
                  className="flex"
                >
                  <AddChange color="green" />
                  <span>{newData}</span>
                </div>
                <div
                  style={{ alignContent: 'center', alignItems: 'center' }}
                  className="flex"
                >
                  <QuitChange color="red" /> <span>{oldData}</span>
                </div>
                <Divider orientation="vertical" />
              </div>,
            );

            counter++;
          }
          return (
            <section>
              <Popover>
                <PopoverTrigger>
                  <Button size="sm" variant="bordered">
                    Ver cambios{' '}
                    <Chip variant="flat" color="primary" size="sm">
                      {counter - 1}
                    </Chip>
                  </Button>
                </PopoverTrigger>
                <PopoverContent>{formattedFields}</PopoverContent>
              </Popover>
            </section>
          );
        } catch (error) {
          return <span>Error: los datos no están en el formato correcto.</span>;
        }
      } else {
        return (
          <Button size="sm" isDisabled variant="bordered">
            Ver cambios
            <Chip variant="flat" color="primary" size="sm">
              0
            </Chip>
          </Button>
        );
      }
    },
    objectJsonRepr: (event: CrudEventModel) => {
      if (typeof event.objectJsonRepr === 'string') {
        try {
          const parsedData = JSON.parse(event.objectJsonRepr);

          const formattedFields = [];
          let counter = 1;
          for (let i = 0; i < parsedData.length; i++) {
            for (const key in parsedData[i].fields) {
              const data = parsedData[i].fields[key];
              formattedFields.push(
                <TableRow key={counter}>
                  <TableCell>
                    <Chip size="sm" variant="flat" color="primary">
                      {counter}
                    </Chip>
                  </TableCell>
                  <TableCell>{key}</TableCell>
                  <TableCell>{data}</TableCell>
                </TableRow>,
              );

              counter++;
            }
          }
          return (
            <section>
              <Popover>
                <PopoverTrigger>
                  <Button size="sm" variant="bordered">
                    Ver modelo{' '}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Table
                    isStriped
                    removeWrapper
                    aria-label="Parsed Data Table"
                    style={{
                      maxWidth: '500px',
                      maxHeight: '400px',
                      overflow: 'auto',
                    }}
                  >
                    <TableHeader>
                      <TableColumn>ID</TableColumn>
                      <TableColumn>CAMPO</TableColumn>
                      <TableColumn>DATO</TableColumn>
                    </TableHeader>
                    <TableBody>{formattedFields}</TableBody>
                  </Table>
                </PopoverContent>
              </Popover>
            </section>
          );
        } catch (error) {
          return <span>Error: los datos no están en el formato correcto.</span>;
        }
      } else {
        return (
          <Button size="sm" isDisabled variant="bordered">
            Ver modelo
          </Button>
        );
      }
    },
  };

  return (
    <CustomTable
      HEADER_COLUMNS={headerColumns}
      ITEMS={crudData?.data || []}
      LOADING_STATE={LOADING_STATE}
      CELL_RENDERERS={RENDER_CELLS}
      PAGINATION={crudData?.meta}
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
                        {((userData && userData.data) || []).map((user) => {
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
                  onClick={() => cleanFilters()}
                  size="sm"
                  color="primary"
                >
                  Limpiar
                </Button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Spacer />
          <div>
            {crudData && crudData.data.length !== 0 ? (
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
        </div>
      }
    />
  );
}
