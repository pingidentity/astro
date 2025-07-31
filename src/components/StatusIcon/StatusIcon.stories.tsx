import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Box,
  RockerButton,
  RockerButtonGroup,
  StatusIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Text,
} from '../..';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';
import { statusIcon } from '../../utils/devUtils/constants/statuses';

import StatusIconReadme from './StatusIcon.mdx';

export default {
  title: 'Components/StatusIcon',
  component: StatusIcon,
  decorators: [withDesign],
  parameters: {
    docs: {
      page: () => (
        <>
          <StatusIconReadme />
          <DocsLayout />
        </>
      ),
    },
    codesandbox: {
      mapComponent: {
        '@pingux/astro': [
          'RockerButton',
          'RockerButtonGroup',
          'StatusIcon',
          'Table',
          'TableBody',
          'TableCell',
          'TableRow',
          'Text',
        ],
      },
    },
  },
} as Meta;

const sx = {
  tableHead: {
    justifyContent: 'center',
  },
  tableCell: {
    alignItems: 'center',
  },
};

export const Default: StoryFn = ({ ...args }) => {
  return (
    <Table width="500px">
      <TableHead>
        <TableRow key="head">
          <TableCell isHeading />
          <TableCell isHeading sx={sx.tableHead}>
            <Text>Normal</Text>
          </TableCell>
          <TableCell isHeading sx={sx.tableHead}>
            <Box>
              <Text>Selected</Text>
              <Text>(in button)</Text>
            </Box>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody sx={{ border: 'unset' }}>
        <TableRow {...{ sx: { borderBottom: 'none !important' } }}>
          <TableCell>
            <Text>
              Critical
            </Text>
          </TableCell>
          <TableCell sx={sx.tableCell}>
            <StatusIcon {...args} status={statusIcon.CRITICAL} />
          </TableCell>
          <TableCell sx={sx.tableCell}>
            <Text>
              <StatusIcon {...args} status={statusIcon.CRITICAL} isSelected />
            </Text>
          </TableCell>
        </TableRow>
        <TableRow {...{ sx: { borderBottom: 'none !important' } }}>
          <TableCell>
            <Text>
              Major
            </Text>
          </TableCell>
          <TableCell sx={sx.tableCell}>
            <StatusIcon {...args} status={statusIcon.MAJOR} />
          </TableCell>
          <TableCell sx={sx.tableCell}>
            <Text>
              <StatusIcon {...args} status={statusIcon.MAJOR} isSelected />
            </Text>
          </TableCell>
        </TableRow>
        <TableRow {...{ sx: { borderBottom: 'none !important' } }}>
          <TableCell>
            <Text>
              Minor
            </Text>
          </TableCell>
          <TableCell sx={sx.tableCell}>
            <StatusIcon {...args} status={statusIcon.MINOR} />
          </TableCell>
          <TableCell sx={sx.tableCell}>
            <Text>
              <StatusIcon {...args} status={statusIcon.MINOR} isSelected />
            </Text>
          </TableCell>
        </TableRow>
        <TableRow {...{ sx: { borderBottom: 'none !important' } }}>
          <TableCell>
            <Text>
              Warning Neutral
            </Text>
          </TableCell>
          <TableCell sx={sx.tableCell}>
            <StatusIcon {...args} status={statusIcon.WARNING_NEUTRAL} />
          </TableCell>
          <TableCell sx={sx.tableCell}>
            <Text>
              <StatusIcon {...args} status={statusIcon.WARNING_NEUTRAL} isSelected />
            </Text>
          </TableCell>
        </TableRow>
        <TableRow {...{ sx: { borderBottom: 'none !important' } }}>
          <TableCell>
            <Text>
              Info
            </Text>
          </TableCell>
          <TableCell sx={sx.tableCell}>
            <StatusIcon {...args} status={statusIcon.INFO} />
          </TableCell>
          <TableCell sx={sx.tableCell}>
            <Text>
              <StatusIcon {...args} status={statusIcon.INFO} isSelected />
            </Text>
          </TableCell>
        </TableRow>
        <TableRow {...{ sx: { borderBottom: 'none !important' } }}>
          <TableCell>
            <Text>
              Warning
            </Text>
          </TableCell>
          <TableCell sx={sx.tableCell}>
            <StatusIcon {...args} status={statusIcon.WARNING} />
          </TableCell>
          <TableCell sx={sx.tableCell}>
            <Text>
              <StatusIcon {...args} status={statusIcon.WARNING} isSelected />
            </Text>
          </TableCell>
        </TableRow>
        <TableRow {...{ sx: { borderBottom: 'none !important' } }}>
          <TableCell>
            <Text>
              Fatal
            </Text>
          </TableCell>
          <TableCell sx={sx.tableCell}>
            <StatusIcon {...args} status={statusIcon.FATAL} />
          </TableCell>
          <TableCell sx={sx.tableCell}>
            <Text>
              <StatusIcon {...args} status={statusIcon.FATAL} isSelected />
            </Text>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.statusIcon.onyx,
  },
};

export const InRockerButton: StoryFn = ({ ...args }) => {
  return (
    <RockerButtonGroup {...args} defaultSelectedKeys={['all']}>
      <RockerButton name="all" key="all">
        Show All
      </RockerButton>
      <RockerButton name="critical" key="critical">
        <StatusIcon status={statusIcon.CRITICAL} />
        0 Criticals
      </RockerButton>
      <RockerButton name="major" key="major">
        <StatusIcon status={statusIcon.MAJOR} />
        0 Majors
      </RockerButton>
      <RockerButton name="minor" key="minor">
        <StatusIcon status={statusIcon.MINOR} />
        0 Minors
      </RockerButton>
      <RockerButton name="warning" key="warning">
        <StatusIcon status={statusIcon.WARNING} />
        0 Warnings
      </RockerButton>
    </RockerButtonGroup>
  );
};

InRockerButton.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.statusIcon.inRockerButton,
  },
};
