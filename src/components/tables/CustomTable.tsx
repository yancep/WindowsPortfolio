/* eslint-disable no-unused-vars */
'use client';
import {
  Pagination,
  SortDescriptor,
  Spacer,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import React from 'react';
import clsx from 'clsx';
import { PaginationMeta } from '@/src/core/api/BaseState';

export interface CustomTableState {
  rowsPerPage: number;
  page: number;
  order: 'asc' | 'desc';
}

export interface SearchState {
  value: string;
  isLoading: boolean;
}

export default function CustomTable<T>({
  HEADER_COLUMNS,
  TOP_CONTENT,
  ITEMS,
  LOADING_STATE,
  CELL_RENDERERS,
  PAGINATION,
  CUSTOM_BOTTOM_CONTENT,
  ERROR,
  topContentPlacement = 'outside' ,
  TABLE_STATE,
  UPDATE_TABLE_STATE,
  customMemoDeps = []
}: {
  TABLE_STATE: CustomTableState;
  UPDATE_TABLE_STATE: (state: CustomTableState) => void;
  CUSTOM_BOTTOM_CONTENT?: React.ReactNode | null;
  PAGINATION?: PaginationMeta | null;
  TOP_CONTENT?: React.ReactNode;
  HEADER_COLUMNS: { name: string; uid: string; sortable?: boolean }[];
  LOADING_STATE: 'loading' | 'idle';
  ITEMS: T[] | undefined | null;
  CELL_RENDERERS: { [key: string]: (item: T) => React.ReactNode };
  ERROR?: string | null;
  topContentPlacement? :  'outside' | 'inside'
  customMemoDeps?: any[]
}) {
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'name',
    direction: 'ascending',
  });

  function showItemsCount() {
    return PAGINATION ? (
      <div>
        <span className={'text-small'}>
          {PAGINATION?.currentPage === 1
            ? 1
            : (PAGINATION!.currentPage! - 1) * TABLE_STATE.rowsPerPage! +
              1}{' '}
          -{' '}
          {PAGINATION!.currentPage! * TABLE_STATE.rowsPerPage! >
          PAGINATION!.itemCount!
            ? PAGINATION!.itemCount
            : PAGINATION!.currentPage! * TABLE_STATE.rowsPerPage!}{' '}
          de {PAGINATION!.itemCount}
        </span>
      </div>
    ) : (
      <></>
    );
  }

  const BOTTOM_CONTENT = React.useMemo(() => {
    return (
      <div className="flex w-full flex-row items-center justify-between">
        {PAGINATION ? (
          <>
            {showItemsCount()}
            <div className={'flex flex-row'}>
              {changeRowsCount()}
              <Spacer />
              <Pagination 
                isCompact
                showControls
                showShadow
                color="primary"
                page={PAGINATION.currentPage!}
                total={PAGINATION.pageCount!}
                onChange={(page) =>
                  UPDATE_TABLE_STATE({
                    ...TABLE_STATE,
                    page: page,
                  })
                }
              />
            </div>
          </>
        ) : (
          <div className="flex w-full justify-end">{CUSTOM_BOTTOM_CONTENT}</div>
        )}
      </div>
    );
  }, [TABLE_STATE.rowsPerPage, PAGINATION, ...customMemoDeps]);

  function changeRowsCount() {
    return (
      <label className="flex items-center text-small text-default-400">
        Filas por páginas:
        <Spacer />
        <select
          value={TABLE_STATE.rowsPerPage}
          className="bg-transparent text-small text-default-400 outline-none"
          onChange={(e) => {
            UPDATE_TABLE_STATE({
              ...TABLE_STATE,
              rowsPerPage: parseInt(e.target.value),
            });
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </select>
      </label>
    );
  }

  const heightTable = LOADING_STATE === 'loading' ? 'h-full' : 'max-h-full';

  return (
    <Table
      id="table"
      classNames={{
        wrapper: `p-0 ${heightTable} overflow-y-auto max-w-full`,
        base: `p-4 ${heightTable}  max-w-full overflow-y-auto`,
        tr: 'border-primary',
      }}
      isHeaderSticky
      bottomContentPlacement="outside"
      topContentPlacement={topContentPlacement}
      topContent={TOP_CONTENT}
      bottomContent={LOADING_STATE != 'loading' && BOTTOM_CONTENT}
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={HEADER_COLUMNS}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        style={{
          padding: 4,
        }}
        emptyContent={
          LOADING_STATE !== 'loading' && !ERROR ? (
            <span>Sin registro</span>
          ) : (
            <span>{ERROR}</span>
          )
        }
        items={LOADING_STATE === 'loading' ? [] : ITEMS ? ITEMS : []}
        loadingState={LOADING_STATE}
        loadingContent={<Spinner />}
      >
        {(item: T) => (
          <TableRow
            style={{
              borderBottomWidth: '0.5px',
            }}
            className=" border-b-default  hover:bg-default-100"
          >
            {HEADER_COLUMNS.map((column) => (
              <TableCell
                style={{
                  paddingLeft: '16px',
                  paddingRight: '16px',
                }}
                className={clsx(
                  column.uid === 'projectsActions' ? 'w-full' : '',
                )}
                key={column.uid}
              >
                {CELL_RENDERERS[column.uid](item)}
              </TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
