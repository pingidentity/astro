import React from 'react';
import Text from '../components/Text';
import scale from './spacing';
import { Table, TableHead, TableRow, TableBody, TableCell, Separator } from '..';


export default {
  title: 'Design/Spacing',
};

const tableBodyStyles = {
  border: 'unset',
};

const tableRowStyles = {
  backgroundColor: 'transparent !important',
};

export const Spacing = () => {
  return (
    <>
      <Text variant="sectionTitle">Spacing</Text>
      <Separator mb="sm" />
      <Table width="75%">
        <TableHead>
          <TableRow sx={tableRowStyles} key="head">
            <TableCell isHeading key="name">
              Token
            </TableCell>
            <TableCell isHeading key="value">
              Size
            </TableCell>
          </TableRow>
        </TableHead>
        {Object.entries(scale).map(([key, value]) =>
            (
              <TableBody sx={tableBodyStyles} key={key}>
                <TableRow sx={tableRowStyles}>
                  <TableCell bg="white" >{key}</TableCell>
                  <TableCell bg="white">{value}px</TableCell>
                </TableRow>
              </TableBody>
            ),
          )}
      </Table>
    </>
  );
};
