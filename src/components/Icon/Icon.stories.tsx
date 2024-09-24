import React from 'react';
import AccountGroupIcon from '@pingux/mdi-react/AccountGroupIcon';
import AccountIcon from '@pingux/mdi-react/AccountIcon';
import LockIcon from '@pingux/mdi-react/LockIcon';
import SearchIcon from '@pingux/mdi-react/SearchIcon';
import TagIcon from '@pingux/mdi-react/TagIcon';
import { Meta, StoryFn } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { v4 as uuid } from 'uuid';

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
import { flatColorList } from '../../styles/colors';
import { IconProps, SVGComponentProps } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';
import { sizeArgTypes } from '../../utils/docUtils/iconSizeProps';

import IconReadme from './Icon.mdx';

export default {
  title: 'Components/Icon',
  component: Icon,
  decorators: [withDesign],
  parameters: {
    docs: {
      page: () => (
        <>
          <IconReadme />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    icon: {
      control: {
        type: 'none',
      },
      description: 'The icon to render. List of icons at https://materialdesignicons.com/',
    },
    ...sizeArgTypes,
    color: {
      control: {
        type: 'select',
        options: flatColorList.map(([colorName]: [string]) => colorName),
      },
    },
  },
  args: {
    color: 'active',
    icon: SearchIcon,
    size: 'sm',
  },
} as Meta;

export const Default: StoryFn<IconProps> = (args: IconProps) => (
  <Icon {...args} title={{ name: 'Search Icon' }} />
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.icon.default,
  },
};

export const SVGIcons: StoryFn = () => {
  // SVGR can used to convert .svg files to components instead of doing this manually
  const SVGComponent: React.FC<SVGComponentProps> = props => {
    const id = uuid();
    const title = 'User Icon';

    return (
      <svg viewBox="0 0 24 24" {...props} aria-labelledby={id}>
        <title id={id}>{title}</title>
        <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
      </svg>
    );
  };
  return <Icon icon={SVGComponent} color="active" size="sm" />;
};


const rowHeadings = [
  'SVG Size', 'Code Example', 'Icon Example',
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
      <TableRow height="45px" bg="transparent !important">
        <TableCell>
          <Text>XXS | 9px</Text>
        </TableCell>
        <TableCell>
          <Text fontFamily="monospace">{'<Icon icon={SearchIcon}/> size="xxs"/>'}</Text>
        </TableCell>
        <TableCell>
          <Icon icon={SearchIcon} size="xxs" title={{ name: 'Search Icon' }} />
        </TableCell>
      </TableRow>
      <TableRow height="45px" bg="transparent !important">
        <TableCell>
          <Text>XS | 15px</Text>
        </TableCell>
        <TableCell>
          <Text fontFamily="monospace">{'<Icon icon={SearchIcon}/> size="xs"/>'}</Text>
        </TableCell>
        <TableCell>
          <Icon icon={SearchIcon} size="xs" title={{ name: 'Search Icon' }} />
        </TableCell>
      </TableRow>
      <TableRow height="45px" bg="transparent !important">
        <TableCell>
          <Text>SM | 20px</Text>
        </TableCell>
        <TableCell>
          <Text fontFamily="monospace">{'<Icon icon={SearchIcon}/> size="sm"/>'}</Text>
        </TableCell>
        <TableCell>
          <Icon icon={SearchIcon} size="sm" title={{ name: 'Search Icon' }} />
        </TableCell>
      </TableRow>
      <TableRow height="45px" bg="transparent !important">
        <TableCell>
          <Text>MD | 25px</Text>
        </TableCell>
        <TableCell>
          <Text fontFamily="monospace">{'<Icon icon={SearchIcon}/> size="md"/>'}</Text>
        </TableCell>
        <TableCell>
          <Icon icon={SearchIcon} size="md" title={{ name: 'Search Icon' }} />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);


export const CommonlyUsed: StoryFn = () => (
  <>
    <Box isRow gap="md" mb="xs">
      <Icon icon={AccountIcon} color="accent.40" size="sm" title={{ name: 'Account Icon' }} />
      <Text fontFamily="monospace">{"import AccountIcon from '@pingux/mdi-react/AccountIcon'; "}</Text>
    </Box>
    <Box isRow gap="md" mb="xs">
      <Icon icon={AccountGroupIcon} color="accent.40" size="sm" title={{ name: 'Account Group Icon' }} />
      <Text fontFamily="monospace">{"import AccountGroupIcon from '@pingux/mdi-react/AccountGroupIcon'; "}</Text>
    </Box>
    <Box isRow gap="md" mb="xs">
      <Icon icon={LockIcon} color="accent.40" size="sm" title={{ name: 'Lock Icon' }} />
      <Text fontFamily="monospace">{"import LockIcon from '@pingux/mdi-react/LockIcon'; "}</Text>
    </Box>
    <Box isRow gap="md" mb="xs">
      <Icon icon={SearchIcon} color="accent.40" size="sm" title={{ name: 'Search Icon' }} />
      <Text fontFamily="monospace">{"import SearchIcon from '@pingux/mdi-react/SearchIcon'; "}</Text>
    </Box>
    <Box isRow gap="md" mb="xs">
      <Icon icon={TagIcon} color="accent.40" size="sm" title={{ name: 'Tag Icon' }} />
      <Text fontFamily="monospace">{"import TagIcon from '@pingux/mdi-react/TagIcon'; "}</Text>
    </Box>
  </>
);
