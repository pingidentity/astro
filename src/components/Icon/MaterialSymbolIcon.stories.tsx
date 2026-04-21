import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Box,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Text,
} from '../../index';
import { IconProps } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';
import { sizeArgTypes } from '../../utils/docUtils/iconSizeProps';

export default {
  title: 'Components/MaterialSymbolIcon',
  component: Icon,
  parameters: {
    docs: {
      page: () => (
        <>
          {/* <IconReadme /> */}
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    icon: {
      control: {
        type: 'text',
      },
      description: 'The font icon to render. List of font icons at https://marella.github.io/material-symbols/demo/',
    },
    ...sizeArgTypes,
  },
  args: {
    icon: 'disabled_by_default',
    className: 'material-symbols-outlined',
    size: 'md',
  },
} as Meta;

export const Default: StoryFn<IconProps> = (args: IconProps) => (
  <Icon {...args} icon="search" title={{ name: 'Search Icon' }} />
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.icon.default,
  },
};

const rowHeadings = [
  'Size', 'Code Example', 'Icon Example',
];

export const Sizes: StoryFn = () => (
  <Table>
    <TableHead>
      <TableRow key="head">
        {rowHeadings.map(head => (
          <TableCell isHeading key={head}>
            {head}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody sx={{ borderBottom: 'unset' }}>
      <TableRow height="80px" bg="transparent !important">
        <TableCell justifyContent="center">
          <Text>XXS | 9px</Text>
        </TableCell>
        <TableCell>
          <Text fontFamily="monospace">{'<Icon  icon="search" size="xxs"/>'}</Text>
        </TableCell>
        <TableCell justifyContent="center">
          <Icon icon="search" title={{ name: 'Search Icon' }} size="xxs" />
        </TableCell>
      </TableRow>
      <TableRow height="80px" bg="transparent !important">
        <TableCell justifyContent="center">
          <Text>XS | 15px</Text>
        </TableCell>
        <TableCell>
          <Text fontFamily="monospace">{'<Icon  icon="search" size="xs"/>'}</Text>
        </TableCell>
        <TableCell justifyContent="center">
          <Icon icon="search" size="xs" title={{ name: 'Search Icon' }} />
        </TableCell>
      </TableRow>
      <TableRow height="80px" bg="transparent !important">
        <TableCell justifyContent="center">
          <Text>SM | 20px</Text>
        </TableCell>
        <TableCell>
          <Text fontFamily="monospace">{'<Icon  icon="search" size="sm"/>'}</Text>
        </TableCell>
        <TableCell justifyContent="center">
          <Icon icon="search" size="sm" title={{ name: 'Search Icon' }} />
        </TableCell>
      </TableRow>
      <TableRow height="80px" bg="transparent !important">
        <TableCell justifyContent="center">
          <Text>MD | 25px</Text>
        </TableCell>
        <TableCell>
          <Text fontFamily="monospace">{'<Icon  icon="search" size="md"/>'}</Text>
        </TableCell>
        <TableCell justifyContent="center">
          <Icon icon="search" size="md" title={{ name: 'Search Icon' }} />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export const CommonlyUsed: StoryFn = () => (
  <>
    <Box isRow gap="md" mb="xs">
      <Icon
        icon="account_circle"
        color="accent.40"
        size="sm"
        title={{ name: 'Account Icon' }}
        hasFill
      />
    </Box>
    <Box isRow gap="md" mb="xs">
      <Icon icon="groups" color="accent.40" size="sm" title={{ name: 'Account Group Icon' }} hasFill />
    </Box>
    <Box isRow gap="md" mb="xs">
      <Icon icon="lock" color="accent.40" size="sm" title={{ name: 'Lock Icon' }} hasFill />
    </Box>
    <Box isRow gap="md" mb="xs">
      <Icon icon="search" color="accent.40" size="sm" title={{ name: 'Search Icon' }} hasFill />
    </Box>
    <Box isRow gap="md" mb="xs">
      <Icon icon="notifications" color="accent.40" size="sm" title={{ name: 'Notification Icon' }} hasFill />
    </Box>
  </>
);
