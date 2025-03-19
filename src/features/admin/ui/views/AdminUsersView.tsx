/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import CustomTable, {
  CustomTableState,
  SearchState,
} from '@/src/components/tables/CustomTable';
import AdminRegisterUserModal from '@/src/features/admin/ui/components/modals/AdminRegisterUser';
import { useEffect, useMemo, useState } from 'react';
import { Button, Selection, Spacer } from "@heroui/react";
import moment from 'moment';
import { useUsersStore } from '@/src/features/users/ui/store/useUsersStore';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { User } from '@/src/features/users/domain/entities/User';
import { UsersTableActions } from '@/src/features/admin/ui/components/UserDataTableComponents';
import TableSearchComponent from '@/src/components/tables/extra/TableSearchComponent';

export const INITIAL_VISIBLE_COLUMNS = [
  'person',
  'username',
  'email',
  'id',
  'actions',
  'lastLogin',
  'enabled',
];

export const columns = [
  { name: 'PERSONA', uid: 'person' },
  { name: 'USUARIO', uid: 'username' },
  { name: 'EMAIL', uid: 'email' },
  { name: 'ID', uid: 'id' },
  { name: 'ÚLTIMO ACCESO', uid: 'lastLogin' },
  { name: 'HABILITADO', uid: 'enabled' },
  { name: 'ACCIONES', uid: 'actions' },
];

export default function AdminUsersView() {
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const { getUsers, data, updateUser, isLoading } = useUsersStore();

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
    getUsers({
      page: tableState.page ?? 1,
      limit: tableState.rowsPerPage,
      search: searchState.value,
    });
  };

  const [userId, setUserId] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAction = (id: string, action: string, enabled?: boolean) => {
    setUserId(id);
    if (action === 'disabled') {
      const data = { is_enabled: enabled };
      updateUser(id, data);
    }
    if (action === 'password') {
      setUserId(id);
      toggleModal();
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      html: '#table',
      theme: 'grid',
      bodyStyles: { cellWidth: 'auto' },
      headStyles: { cellWidth: 'wrap' },
    });
    doc.save('Datos de usuarios.pdf');
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
    person: (user: User) => (
      <div className={'cursor-pointer'}>
        {/* <UserInformationPopover key={`popover-${user.id}`} user={user} /> */}
      </div>
    ),
    username: (user: User) => (
      <span key={`username-${user.id}`}>{user.username}</span>
    ),
    email: (user: User) => <span key={`email-${user.id}`}>{user.email}</span>,
    id: (user: User) => <span key={`id-${user.id}`}>{user.id}</span>,
    lastLogin: (user: User) => {
      const formattedDate =
        user.lastLogin != null
          ? moment(user.lastLogin).format('DD/MM/YY, h:mm:ss a')
          : 'Vacío';
      return <span key={`lastLogin-${user.id}`}>{formattedDate}</span>;
    },
    enabled: (user: User) => (
      <span key={`enabled-${user.id}`}>{user.isEnabled ? 'Sí' : 'No'}</span>
    ),
    actions: (user: User) => (
      <UsersTableActions
        key={`actions-${user.id}`}
        handleAction={handleAction}
        user={user}
      />
    ),
  };

  const TopContent = () => (
    <div
      className="flex"
      style={{
        justifyContent: 'flex-end',
      }}
    >
      <div className="flex flex-row justify-end">
        <AdminRegisterUserModal />
      </div>
      <Spacer />
      <div>
        {data?.data && data.data.length !== 0 ? (
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
  );

  return (
    <CustomTable
      HEADER_COLUMNS={headerColumns}
      ITEMS={data?.data || []}
      LOADING_STATE={LOADING_STATE}
      CELL_RENDERERS={RENDER_CELLS}
      PAGINATION={data?.meta}
      TABLE_STATE={tableState}
      UPDATE_TABLE_STATE={setTableState}
      TOP_CONTENT={
        <TableSearchComponent
          changeValueSearchState={(value) =>
            setSearchState({ ...searchState, value: value })
          }
          isLoading={searchState.isLoading}
          topContent={<TopContent />}
        />
      }
    />
  );
}
