import React, { FC, ReactNode } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ThemeUICSSObject } from 'theme-ui';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Box,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Text,
} from '../../index';
import { SxObject } from '../../types';

import TextReadme from './Text.mdx';

export default {
  title: 'Components/Text',
  component: Text,
  parameters: {
    docs: {
      page: () => (
        <>
          <TextReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    variant: {
      control: {
        type: 'none',
      },
      description: 'Text variant.',
    },
    children: {
      control: {
        type: 'none',
      },
      description: 'Text value.',
    },
    color: {
      control: {
        type: 'none',
      },
      description: 'Text color.',
    },
    bg: {
      control: {
        type: 'none',
      },
      description: 'Background color.',
    },
  },
} as Meta;

const sx: SxObject = {
  cell: {
    wordWrap: 'break-word',
    wordBreak: 'break-word',
  },
  tableBody: {
    borderBottom: 'unset',
  },
};

const TableHeading: FC<{ title: string }> = ({ title }) => (
  <TableHead>
    <TableRow key="head">
      <TableCell sx={sx.cell} isHeading width="30%">
        {title}
      </TableCell>
      <TableCell sx={sx.cell} isHeading width="30%">
        Weight
      </TableCell>
      <TableCell sx={sx.cell} isHeading width="30%">
        Size
      </TableCell>
      <TableCell sx={sx.cell} isHeading>
        Example
      </TableCell>
    </TableRow>
  </TableHead>
);

type TableDataValue = {
  weight: string,
  fontSize: string,
  example: ReactNode,
}

type TableDataProps = {
  key?: string | undefined,
  variant: string,
  value: TableDataValue
}

const TableData: FC<TableDataProps> = ({ variant, value }) => (
  <TableRow sx={{ backgroundColor: 'transparent !important', alignItems: 'center' }}>
    <TableCell sx={sx.cell} width="30%"><Text>{variant}</Text></TableCell>
    <TableCell sx={sx.cell} width="30%"><Text>{value.weight}</Text></TableCell>
    <TableCell sx={sx.cell} width="30%"><Text>{value.fontSize}</Text></TableCell>
    <TableCell sx={sx.cell}><Text>{value.example}</Text></TableCell>
  </TableRow>
);

export const Default: StoryFn = () => {
  const fontSizes = {
    xx: '23px (xx)',
    lg: '17px (lg)',
    md: '15px (md)',
    sm: '13px (sm)',
    xs: '11px (xs)',
  };
  const fontWeights = {
    '-1': '300 (-1)',
    '0': '400 (0)',
    '1': '500 (1)',
    '3': '700 (3)',
  };
  const headingVariants = {
    H1: {
      weight: fontWeights[3],
      fontSize: fontSizes.xx,
      example: (<Text variant="H1" as="h1">{'<Text variant="H1" as="H1"/>'}</Text>),
    },
    H2: {
      weight: fontWeights[3],
      fontSize: fontSizes.lg,
      example: (<Text variant="H2" as="h2">{'<Text variant="H2" as="H2"/>'}</Text>),
    },
    H3: {
      weight: fontWeights[3],
      fontSize: fontSizes.md,
      example: (<Text variant="H3" as="h3">{'<Text variant="H3" as="H3"/>'}</Text>),
    },
    H4: {
      weight: fontWeights[3],
      fontSize: fontSizes.sm,
      example: (<Text variant="H4" as="h4">{'<Text variant="H4" as="H4"/>'}</Text>),
    },
  };
  const baseAndSubtitleVariants = {
    'Base (default variant of Text)': {
      weight: fontWeights[0],
      fontSize: fontSizes.md,
      color: 'text.primary',
      example: (<Text variant="base" fontWeight="0">{'<Text variant="base"/>'}</Text>),
    },
    Subtitle: {
      weight: fontWeights[0],
      fontSize: fontSizes.sm,
      color: 'text.secondary',
      example: (<Text variant="subtitle">{'<Text variant="subtitle"/>'}</Text>),
    },
  };
  const largeVariants = {
    Bold: {
      weight: fontWeights[3],
      fontSize: fontSizes.lg,
      example: (<Text fontSize="lg" fontWeight="3">{'<Text fontSize="lg" fontWeight="3">'}</Text>),
    },
    Medium: {
      weight: fontWeights[1],
      fontSize: fontSizes.lg,
      example: (<Text fontSize="lg" fontWeight="1">{'<Text fontSize="lg" fontWeight="1">'}</Text>),
    },
    Regular: {
      weight: fontWeights[0],
      fontSize: fontSizes.lg,
      example: (<Text fontSize="lg" fontWeight="0">{'<Text fontSize="lg" fontWeight="0">'}</Text>),
    },
  };
  const mediumVariants = {
    Bold: {
      weight: fontWeights[3],
      fontSize: fontSizes.md,
      example: (<Text fontSize="md" fontWeight="3">{'<Text fontSize="md" fontWeight="3">'}</Text>),
    },
    Medium: {
      weight: fontWeights[1],
      fontSize: fontSizes.md,
      example: (<Text fontSize="md" fontWeight="1">{'<Text fontSize="md" fontWeight="1">'}</Text>),
    },
    Regular: {
      weight: fontWeights[0],
      fontSize: fontSizes.md,
      example: (<Text fontSize="md" fontWeight="0">{'<Text fontSize="md" fontWeight="0">'}</Text>),
    },
    Light: {
      weight: fontWeights[-1],
      fontSize: fontSizes.md,
      example: (<Text fontSize="md" fontWeight="-1">{'<Text fontSize="md" fontWeight="-1">'}</Text>),
    },
  };
  const smallVariants = {
    Bold: {
      weight: fontWeights[3],
      fontSize: fontSizes.sm,
      example: (<Text fontSize="sm" fontWeight="3">{'<Text fontSize="sm" fontWeight="3">'}</Text>),
    },
    Medium: {
      weight: fontWeights[1],
      fontSize: fontSizes.sm,
      example: (<Text fontSize="sm" fontWeight="1">{'<Text fontSize="sm" fontWeight="1">'}</Text>),
    },
    Regular: {
      weight: fontWeights[0],
      fontSize: fontSizes.sm,
      example: (<Text fontSize="sm" fontWeight="0">{'<Text fontSize="sm" fontWeight="0">'}</Text>),

    },
    Light: {
      weight: fontWeights[-1],
      fontSize: fontSizes.sm,
      example: (<Text fontSize="sm" fontWeight="-1">{'<Text fontSize="sm" fontWeight="-1">'}</Text>),

    },
  };
  const xsmallVariants = {
    Bold: {
      weight: fontWeights[3],
      fontSize: fontSizes.xs,
      example: (<Text fontSize="xs" fontWeight="3">{'<Text fontSize="xs" fontWeight="3">'}</Text>),
    },
    Medium: {
      weight: fontWeights[1],
      fontSize: fontSizes.xs,
      example: (<Text fontSize="xs" fontWeight="1">{'<Text fontSize="xs" fontWeight="1">'}</Text>),
    },
    Regular: {
      weight: fontWeights[0],
      fontSize: fontSizes.xs,
      example: (<Text fontSize="xs" fontWeight="0">{'<Text fontSize="xs" fontWeight="0">'}</Text>),
    },
    Light: {
      weight: fontWeights[-1],
      fontSize: fontSizes.xs,
      example: (<Text fontSize="xs" fontWeight="-1">{'<Text fontSize="xs" fontWeight="-1">'}</Text>),
    },
  };

  return (
    <>
      <Table mb="xx">
        <TableHeading title="Heading" />
        <TableBody sx={sx.tableBody}>
          {Object.entries(headingVariants).map(([key, value]) => (
            <TableData variant={key} value={value} key={key} />
          ),
          )}
        </TableBody>
      </Table>

      <Table mb="xx">
        <TableHead>
          <TableRow key="head">
            <TableCell sx={sx.cell} isHeading width="60%">
              Base and Subtitle
            </TableCell>
            <TableCell sx={sx.cell} isHeading width="20%">
              Weight
            </TableCell>
            <TableCell sx={sx.cell} isHeading width="30%">
              Size
            </TableCell>
            <TableCell sx={sx.cell} isHeading width="40%">
              Color
            </TableCell>
            <TableCell sx={sx.cell} isHeading>
              Example
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={sx.tableBody}>
          {Object.entries(baseAndSubtitleVariants).map(([key, value]) => (
            <TableRow sx={{ backgroundColor: 'transparent !important' }} key={key}>
              <TableCell sx={sx.cell} width="60%"><Text>{key}</Text></TableCell>
              <TableCell sx={sx.cell} width="20%"><Text>{value.weight}</Text></TableCell>
              <TableCell sx={sx.cell} width="30%"><Text>{value.fontSize}</Text></TableCell>
              <TableCell sx={sx.cell} width="40%"><Text>{value.color}</Text></TableCell>
              <TableCell sx={sx.cell}>{value.example}</TableCell>
            </TableRow>
          ),
          )}
        </TableBody>
      </Table>

      <Table mb="xx">
        <TableHeading title="Large" />
        <TableBody sx={sx.tableBody}>
          {Object.entries(largeVariants).map(([key, value]) => (
            <TableData variant={key} value={value} key={key} />
          ),
          )}
        </TableBody>
      </Table>

      <Table mb="xx">
        <TableHeading title="Medium" />
        <TableBody sx={sx.tableBody}>
          {Object.entries(mediumVariants).map(([key, value]) => (
            <TableData variant={key} value={value} key={key} />
          ),
          )}
        </TableBody>
      </Table>

      <Table mb="xx">
        <TableHeading title="Small" />
        <TableBody sx={sx.tableBody}>
          {Object.entries(smallVariants).map(([key, value]) => (
            <TableData variant={key} value={value} key={key} />
          ),
          )}
        </TableBody>
      </Table>

      <Table mb="xx">
        <TableHeading title="XSmall" />
        <TableBody sx={sx.tableBody}>
          {Object.entries(xsmallVariants).map(([key, value]) => (
            <TableData variant={key} value={value} key={key} />
          ),
          )}
        </TableBody>
      </Table>
    </>
  );
};

export const CustomWidth: StoryFn = () => (
  <Box width={200}>
    <Text p="xl">
      superlongtextinonelinewithnowhitespacessoitcanbelongerthatanywidth
    </Text>
  </Box>
);

export const CustomStyle: StoryFn = () => {
  const textProps: ThemeUICSSObject = {
    fontFamily: 'times',
    fontSize: 'md',
    fontWeight: 900,
    lineHeight: '2em',
    letterSpacing: '5px',
    textAlign: 'right',
    fontStyle: 'italic',
  };

  const loremText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.';

  return (
    <Box p="xx" gap="md">
      <Text variant="title">
        The Text component allows typography style props to be passed in
        directly.
      </Text>
      <Text {...textProps}>{loremText}</Text>
      <Separator />
      <Text variant="title">
        Typography styles can also be passed in through the sx prop for the same
        result.
      </Text>
      <Text sx={textProps}>{loremText}</Text>
    </Box>
  );
};

CustomStyle.argTypes = {
  variant: {
    control: {
      type: 'none',
    },
  },
  children: {
    control: {
      type: 'none',
    },
  },
  color: {
    control: {
      type: 'none',
    },
  },
  bg: {
    control: {
      type: 'none',
    },
  },
  tabPanelProps: {
    control: {
      type: 'none',
    },
  },
};
