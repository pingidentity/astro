import React from 'react';

import { StatusIcon, Table, TableBody, TableCell, TableRow, Text } from '../../..';
import { statusIcon } from '../../../utils/devUtils/constants/statuses';

const NextGenStatusIcon = () => {
  return (
    <Table>
      <TableBody sx={{ border: 'unset' }}>
        <TableRow height="45px" bg="transparent !important" {...{ sx: { borderBottom: 'none !important' } }}>
          <TableCell>
            <Text>
              Critical
            </Text>
          </TableCell>
          <TableCell>
            <StatusIcon status={statusIcon.CRITICAL} />
          </TableCell>
          <TableCell>
            <Text>
              <StatusIcon status={statusIcon.CRITICAL} isSelected />
            </Text>
          </TableCell>
        </TableRow>
        <TableRow height="45px" bg="transparent !important" {...{ sx: { borderBottom: 'none !important' } }}>
          <TableCell>
            <Text>
              Major
            </Text>
          </TableCell>
          <TableCell>
            <StatusIcon status={statusIcon.MAJOR} />
          </TableCell>
          <TableCell>
            <Text>
              <StatusIcon status={statusIcon.MAJOR} isSelected />
            </Text>
          </TableCell>
        </TableRow>
        <TableRow height="45px" bg="transparent !important" {...{ sx: { borderBottom: 'none !important' } }}>
          <TableCell>
            <Text>
              Minor
            </Text>
          </TableCell>
          <TableCell>
            <StatusIcon status={statusIcon.MINOR} />
          </TableCell>
          <TableCell>
            <Text>
              <StatusIcon status={statusIcon.MINOR} isSelected />
            </Text>
          </TableCell>
        </TableRow>
        <TableRow height="45px" bg="transparent !important" {...{ sx: { borderBottom: 'none !important' } }}>
          <TableCell>
            <Text>
              Warning Neutral
            </Text>
          </TableCell>
          <TableCell>
            <StatusIcon status={statusIcon.WARNING_NEUTRAL} />
          </TableCell>
          <TableCell>
            <Text>
              <StatusIcon status={statusIcon.WARNING_NEUTRAL} isSelected />
            </Text>
          </TableCell>
        </TableRow>
        <TableRow height="45px" bg="transparent !important" {...{ sx: { borderBottom: 'none !important' } }}>
          <TableCell>
            <Text>
              Info
            </Text>
          </TableCell>
          <TableCell>
            <StatusIcon status={statusIcon.INFO} />
          </TableCell>
          <TableCell>
            <Text>
              <StatusIcon status={statusIcon.INFO} isSelected />
            </Text>
          </TableCell>
        </TableRow>
        <TableRow height="45px" bg="transparent !important" {...{ sx: { borderBottom: 'none !important' } }}>
          <TableCell>
            <Text>
              Warning
            </Text>
          </TableCell>
          <TableCell>
            <StatusIcon status={statusIcon.WARNING} />
          </TableCell>
          <TableCell>
            <Text>
              <StatusIcon status={statusIcon.WARNING} isSelected />
            </Text>
          </TableCell>
        </TableRow>
        <TableRow height="45px" bg="transparent !important" {...{ sx: { borderBottom: 'none !important' } }}>
          <TableCell>
            <Text>
              Fatal
            </Text>
          </TableCell>
          <TableCell>
            <StatusIcon status={statusIcon.FATAL} />
          </TableCell>
          <TableCell>
            <Text>
              <StatusIcon status={statusIcon.FATAL} isSelected />
            </Text>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};


export default NextGenStatusIcon;
