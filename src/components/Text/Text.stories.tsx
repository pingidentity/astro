import React, { FC, ReactNode } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';
import { ThemeUICSSObject } from 'theme-ui';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  AstroProvider,
  Box,
  OnyxTheme,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Text,
} from '../../index';
import { SxObject, TextProps } from '../../types';

import TextReadme from './Text.mdx';
import { textArgTypes } from './textAttributes';

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
  argTypes: textArgTypes as unknown as Meta<typeof Text>['argTypes'],
} satisfies Meta<typeof Text>;

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

export const Default: StoryFn<TextProps> = () => {
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

export const Onyx: StoryFn<TextProps> = () => {
  const fontSizesOnyx = {
    xxx: '33.8px (xxx)',
    xl: '22.5px (xl)',
    lg: '18.8px (lg)',
    md: '15px (md)',
    sm: '12px (sm)',
    xs: '11px (xs)',
    h2: '26.3px (h2)',
  };
  const fontWeightsOnyx = {
    '-1': '300 (-1)',
    '0': '400 (0)',
    '1': '500 (1)',
    '2': '600 (2)',
    '3': '700 (3)',
  };
  const headingVariants = {
    H1: {
      weight: fontWeightsOnyx[2],
      fontSize: fontSizesOnyx.xxx,
      example: (<Text variant="H1" as="h1">{'<Text variant="H1" as="H1"/>'}</Text>),
    },
    H2: {
      weight: fontWeightsOnyx[2],
      fontSize: fontSizesOnyx.h2,
      example: (<Text variant="H2" as="h2">{'<Text variant="H2" as="H2"/>'}</Text>),
    },
    H3: {
      weight: fontWeightsOnyx[2],
      fontSize: fontSizesOnyx.xl,
      example: (<Text variant="H3" as="h3">{'<Text variant="H3" as="H3"/>'}</Text>),
    },
    H4: {
      weight: fontWeightsOnyx[2],
      fontSize: fontSizesOnyx.lg,
      example: (<Text variant="H4" as="h4">{'<Text variant="H4" as="H4"/>'}</Text>),
    },
    H5: {
      weight: fontWeightsOnyx[2],
      fontSize: fontSizesOnyx.md,
      example: (<Text variant="H5" as="h5">{'<Text variant="H5" as="H5"/>'}</Text>),
    },
    H6: {
      weight: fontWeightsOnyx[0],
      fontSize: fontSizesOnyx.sm,
      example: (<Text variant="H6" as="h6">{'<Text variant="H6" as="H6"/>'}</Text>),
    },
  };
  const baseAndSubtitleVariants = {
    'Base (default variant of Text)': {
      weight: fontWeightsOnyx[0],
      fontSize: fontSizesOnyx.md,
      color: 'text.primary',
      example: (<Text variant="base" fontWeight="0">{'<Text variant="base"/>'}</Text>),
    },
    Subtitle: {
      weight: fontWeightsOnyx[0],
      fontSize: fontSizesOnyx.sm,
      color: 'text.secondary',
      example: (<Text variant="subtitle">{'<Text variant="subtitle"/>'}</Text>),
    },
  };
  const largeVariants = {
    Bold: {
      weight: fontWeightsOnyx[3],
      fontSize: fontSizesOnyx.lg,
      example: (<Text fontSize="lg" fontWeight="3">{'<Text fontSize="lg" fontWeight="3">'}</Text>),
    },
    Semibold: {
      weight: fontWeightsOnyx[2],
      fontSize: fontSizesOnyx.lg,
      example: (<Text fontSize="lg" fontWeight="2">{'<Text fontSize="lg" fontWeight="2">'}</Text>),
    },
    Regular: {
      weight: fontWeightsOnyx[0],
      fontSize: fontSizesOnyx.lg,
      example: (<Text fontSize="lg" fontWeight="0">{'<Text fontSize="lg" fontWeight="0">'}</Text>),
    },
    Light: {
      weight: fontWeightsOnyx[-1],
      fontSize: fontSizesOnyx.lg,
      example: (<Text fontSize="lg" fontWeight="0">{'<Text fontSize="lg" fontWeight="0">'}</Text>),
    },
  };
  const mediumVariants = {
    Bold: {
      weight: fontWeightsOnyx[3],
      fontSize: fontSizesOnyx.md,
      example: (<Text fontSize="md" fontWeight="3">{'<Text fontSize="md" fontWeight="3">'}</Text>),
    },
    Semibold: {
      weight: fontWeightsOnyx[2],
      fontSize: fontSizesOnyx.md,
      example: (<Text fontSize="md" fontWeight="2">{'<Text fontSize="md" fontWeight="2">'}</Text>),
    },
    Regular: {
      weight: fontWeightsOnyx[0],
      fontSize: fontSizesOnyx.md,
      example: (<Text fontSize="md" fontWeight="0">{'<Text fontSize="md" fontWeight="0">'}</Text>),
    },
    Light: {
      weight: fontWeightsOnyx[-1],
      fontSize: fontSizesOnyx.md,
      example: (<Text fontSize="md" fontWeight="-1">{'<Text fontSize="md" fontWeight="-1">'}</Text>),
    },
  };
  const smallVariants = {
    Bold: {
      weight: fontWeightsOnyx[3],
      fontSize: fontSizesOnyx.sm,
      example: (<Text fontSize="sm" fontWeight="3">{'<Text fontSize="sm" fontWeight="3">'}</Text>),
    },
    Semibold: {
      weight: fontWeightsOnyx[2],
      fontSize: fontSizesOnyx.sm,
      example: (<Text fontSize="sm" fontWeight="2">{'<Text fontSize="sm" fontWeight="2">'}</Text>),
    },
    Regular: {
      weight: fontWeightsOnyx[0],
      fontSize: fontSizesOnyx.sm,
      example: (<Text fontSize="sm" fontWeight="0">{'<Text fontSize="sm" fontWeight="0">'}</Text>),

    },
    Light: {
      weight: fontWeightsOnyx[-1],
      fontSize: fontSizesOnyx.sm,
      example: (<Text fontSize="sm" fontWeight="-1">{'<Text fontSize="sm" fontWeight="-1">'}</Text>),

    },
  };
  const xsmallVariants = {
    Bold: {
      weight: fontWeightsOnyx[3],
      fontSize: fontSizesOnyx.xs,
      example: (<Text fontSize="xs" fontWeight="3">{'<Text fontSize="xs" fontWeight="3">'}</Text>),
    },
    Semibold: {
      weight: fontWeightsOnyx[2],
      fontSize: fontSizesOnyx.xs,
      example: (<Text fontSize="xs" fontWeight="2">{'<Text fontSize="xs" fontWeight="2">'}</Text>),
    },
    Regular: {
      weight: fontWeightsOnyx[0],
      fontSize: fontSizesOnyx.xs,
      example: (<Text fontSize="xs" fontWeight="0">{'<Text fontSize="xs" fontWeight="0">'}</Text>),
    },
    Light: {
      weight: fontWeightsOnyx[-1],
      fontSize: fontSizesOnyx.xs,
      example: (<Text fontSize="xs" fontWeight="-1">{'<Text fontSize="xs" fontWeight="-1">'}</Text>),
    },
  };

  return (
    < >
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

Default.parameters = {
  codesandbox: false,
};

export const CustomWidth: StoryFn = args => (
  <Box width={200}>
    <Text p="xl" {...args}>
      superlongtextinonelinewithnowhitespacessoitcanbelongerthatanywidth
    </Text>
  </Box>
);

export const CustomStyle: StoryFn = args => {
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
      <Text {...args} variant="title">
        The Text component allows typography style props to be passed in
        directly.
      </Text>
      <Text {...textProps}>{loremText}</Text>
      <Separator />
      <Text {...args} variant="title">
        Typography styles can also be passed in through the sx prop for the same
        result.
      </Text>
      <Text sx={textProps}>{loremText}</Text>
    </Box>
  );
};

CustomStyle.argTypes = {
  variant: {
    control: false,
  },
  children: {
    control: false,
  },
  color: {
    control: false,
  },
  bg: {
    control: false,
  },
  tabPanelProps: {
    control: false,
  },
};
