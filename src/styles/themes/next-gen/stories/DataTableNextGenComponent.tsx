import React from 'react';

import {
  Badge,
  Box,
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableColumn,
  DataTableHeader,
  DataTableMenu,
  DataTableRow,
  Text,
} from '../../../../index';

export default {
  title: 'Onyx Recipes/DataTable',
};

const getCellProps = (columnKey, align) => ({
  pr: columnKey !== 'menu' ? 'lg' : 12,
  pl: columnKey === 'menu' ? 0 : 'lg',
  hideHeader: columnKey === 'menu',
  align,
});

export const DataTableNextGenComponent = () => {
  const date = '2023-05-03';
  const time = '07:16:30 pm UTC';

  const timestampCell = (
    <>
      <Box>{date}</Box>
      <Box>{time}</Box>
    </>
  );

  const columns = [
    { name: 'Timestamp', key: 'timestamp' },
    { name: 'Event Type', key: 'eventType' },
    { name: 'Description', key: 'description' },
    { name: 'Status', key: 'status', isSortable: true },
    { name: 'User Identity', key: 'userIdentity' },
    { name: 'Menu', key: 'menu' },
  ];

  const rows = [
    {
      id: 1,
      timestamp: timestampCell,
      eventType: 'User Access Allowed',
      description: (
        <>
          <Box>Passed Role Access</Box>
          <Box>Control</Box>
        </>
      ),
      status: <Badge label="Approved" variant="success" sx={{ width: '100px' }} />,
      userIdentity: 'Vincent Diep',
      menu: <DataTableMenu />,
    },
    {
      id: 2,
      timestamp: timestampCell,
      eventType: 'User Access Denied',
      description: (
        <>
          <Box display="block">Passed Role Access</Box>
          <Box display="block">Control</Box>
        </>
      ),
      status: <Badge label="Rejected" variant="danger" sx={{ width: '100px' }} />,
      userIdentity: 'Vincent Diep',
      menu: <DataTableMenu />,
    },
    {
      id: 3,
      timestamp: timestampCell,
      eventType: 'User Access Allowed',
      description: (
        <>
          <Box display="block">Passed Role Access</Box>
          <Box display="block">Control</Box>
        </>
      ),
      status: <Badge label="Inactive" variant="secondary" sx={{ width: '100px' }} />,
      userIdentity: 'Vincent Diep',
      menu: <DataTableMenu />,
    },
    {
      id: 4,
      timestamp: timestampCell,
      eventType: 'User Access Allowed',
      description: (
        <>
          <Box>Passed Role Access</Box>
          <Box>Control</Box>
        </>
      ),
      status: <Badge label="Approved" variant="success" sx={{ width: '100px' }} />,
      userIdentity: 'Vincent Diep',
      menu: <DataTableMenu />,
    },
    {
      id: 5,
      timestamp: timestampCell,
      eventType: 'User Access Allowed',
      description: (
        <>
          <Box>Passed Role Access</Box>
          <Box>Control</Box>
        </>
      ),
      status: <Badge label="Approved" variant="success" sx={{ width: '100px' }} />,
      userIdentity: 'Vincent Diep',
      menu: <DataTableMenu />,
    },
  ];

  return (
    <Box backgroundColor="background.base" p="lg">
      <DataTable
        aria-label="Static table"
        height="100%"
        density="spacious"
        scale="xl"
      >
        <DataTableHeader columns={columns}>
          {column => (
            <DataTableColumn
              {...getCellProps(column.key, false)}
              minWidth={column.key !== 'menu' ? 175 : 50}
              width={column.key !== 'menu' ? '19.4%' : 50}
            >
              <Text>{column.name}</Text>
            </DataTableColumn>
          )}
        </DataTableHeader>
        <DataTableBody items={rows}>
          {item => (
            <DataTableRow>
              {columnKey => (
                <DataTableCell
                  {...getCellProps(columnKey, false)}
                >
                  {item[columnKey]}
                </DataTableCell>
              )}
            </DataTableRow>
          )}
        </DataTableBody>
      </DataTable>
    </Box>
  );
};
