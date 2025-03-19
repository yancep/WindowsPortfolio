import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";


interface TableNivelProps {
  headers: Array<string>;
  rows: Array<Array<string | number>>;
  projectId: string
}

const id = '18999a79-a6d3-4265-895e-14c9178ad94a'


const TableNivel: React.FC<TableNivelProps> = ({ headers, rows, projectId }) => {
  return (
    <>
      <Table className=" flex  w-auto" aria-label="table">
        <TableHeader>
          {headers.map((header, index) => (
            <TableColumn key={index}>{header}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={`${rowIndex}-${cellIndex}`}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <ProyectCardStatus margin={'mt-4'} projectId={projectId} /> */}
    </>
  );
};

export default TableNivel;
