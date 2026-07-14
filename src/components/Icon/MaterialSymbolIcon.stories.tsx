import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { useGetTheme } from '../../hooks';
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
import { IconSize } from '../../types/shared/style';
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
      control: { type: 'text' },
      description: 'The font icon to render. List of font icons at https://marella.github.io/material-symbols/demo/',
      table: {
        type: { summary: 'string' },
      },
    },
    ...sizeArgTypes,
  },
  args: {
    icon: 'search',
    size: 'md',
    title: { name: 'Search Icon' },
  },
} satisfies Meta<typeof Icon>;

export const Default: StoryFn<IconProps> = (args: IconProps) => (
  <Icon {...args} />
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.icon.default,
  },
};

const iconSizes = ['xxs', 'xs', 'sm', 'md'] as const;
const iconNumericSizes = [
  'icon-50', 'icon-100', 'icon-200', 'icon-300',
  'icon-400', 'icon-500', 'icon-600', 'icon-700', 'icon-800', 'icon-900',
] as const;
const rowHeadings = ['Size', 'Code Example', 'Icon Example'];

const SizeRow = ({ size, px }: { size: string; px: string }) => (
  <TableRow key={size} height="80px" bg="transparent !important">
    <TableCell justifyContent="center">
      <Text>{`${size.toUpperCase()} | ${px}`}</Text>
    </TableCell>
    <TableCell>
      <Text fontFamily="monospace">{`<Icon icon="search" size="${size}" />`}</Text>
    </TableCell>
    <TableCell justifyContent="center">
      <Icon icon="search" size={size as IconSize} title={{ name: 'Search Icon' }} />
    </TableCell>
  </TableRow>
);

export const Sizes: StoryFn = () => {
  const theme = useGetTheme();
  const tShirtRows = Object.entries(theme.tShirtSizes)
    .filter(([size]) => (iconSizes as readonly string[]).includes(size));
  const numericRows = Object.entries(theme.tShirtSizes)
    .filter(([size]) => (iconNumericSizes as readonly string[]).includes(size));
  return (
    <Table>
      <TableHead>
        <TableRow key="head">
          {rowHeadings.map(head => (
            <TableCell isHeading key={head}>{head}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody sx={{ borderBottom: 'unset' }}>
        {tShirtRows.map(([size, px]) => <SizeRow key={size} size={size} px={px as string} />)}
        {numericRows.map(([size, px]) => <SizeRow key={size} size={size} px={px as string} />)}
      </TableBody>
    </Table>
  );
};

const allSizes = [...iconSizes, ...iconNumericSizes];
Sizes.parameters = {
  docs: {
    source: {
      code: allSizes.map(size => `<Icon icon="search" size="${size}" title={{ name: 'Search Icon' }} />`).join('\n'),
    },
  },
};

const commonIcons = [
  { icon: 'account_circle', title: 'Account Icon' },
  { icon: 'groups', title: 'Account Group Icon' },
  { icon: 'lock', title: 'Lock Icon' },
  { icon: 'search', title: 'Search Icon' },
  { icon: 'notifications', title: 'Notification Icon' },
];

export const CommonlyUsed: StoryFn = () => (
  <>
    {commonIcons.map(({ icon, title }) => (
      <Box key={icon} isRow gap="md" mb="xs">
        <Icon icon={icon} size="md" title={{ name: title }} hasFill />
      </Box>
    ))}
  </>
);

CommonlyUsed.parameters = {
  docs: {
    source: {
      code: commonIcons.map(({ icon, title }) => `<Icon icon="${icon}" size="md" title={{ name: '${title}' }} hasFill />`).join('\n'),
    },
  },
};
