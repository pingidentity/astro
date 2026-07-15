import React from 'react';
import AccountGroupIcon from '@pingux/mdi-react/AccountGroupIcon';
import AccountIcon from '@pingux/mdi-react/AccountIcon';
import LockIcon from '@pingux/mdi-react/LockIcon';
import SearchIcon from '@pingux/mdi-react/SearchIcon';
import TagIcon from '@pingux/mdi-react/TagIcon';
import { Meta, StoryFn } from '@storybook/react-vite';
import { v4 as uuid } from 'uuid';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import useGetTheme from '../../hooks/useGetTheme';
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
  parameters: {
    docs: {
      page: () => (
        <>
          <IconReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    icon: {
      control: false,
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
} satisfies Meta<typeof Icon>;

export const Default: StoryFn<IconProps> = (args: IconProps) => {
  const { themeState: { isOnyx } } = useGetTheme();
  const iconColor = isOnyx ? 'common.dark' : args.color;

  return (
    <Icon {...args} title={{ name: 'Search Icon' }} color={iconColor} />
  );
};

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.icon.default,
  },
};

export const SVGIcons: StoryFn = args => {
  // SVGR can used to convert .svg files to components instead of doing this manually
  const { themeState: { isOnyx } } = useGetTheme();
  const iconColor = isOnyx ? 'common.dark' : args.color;

  const SVGComponent: React.FC<SVGComponentProps> = props => {
    const id = uuid();
    const title = 'User Icon';

    return (
      <svg viewBox="0 0 24 24" {...props} aria-labelledby={id}>
        <title id={id}>{title}</title>
        <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
      </svg>
    );
  };
  return <Icon {...args} icon={SVGComponent} color={iconColor} size="sm" />;
};

const rowHeadings = [
  'SVG Size', 'Code Example', 'Icon Example',
];

export const Sizes: StoryFn = () => {
  const { themeState: { isOnyx } } = useGetTheme();
  return (
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
        {isOnyx ? (
          <>
            <TableRow bg="transparent !important">
              <TableCell>
                <Text>10px (50) xxs</Text>
              </TableCell>
              <TableCell>
                <Text fontFamily="monospace">{'<Icon icon={SearchIcon} size="xxs"/>'}</Text>
              </TableCell>
              <TableCell>
                <Icon icon={SearchIcon} size="xxs" title={{ name: 'Search Icon' }} />
              </TableCell>
            </TableRow>
            <TableRow bg="transparent !important">
              <TableCell>
                <Text>14px (100) xs</Text>
              </TableCell>
              <TableCell>
                <Text fontFamily="monospace">{'<Icon icon={SearchIcon} size="xs"/>'}</Text>
              </TableCell>
              <TableCell>
                <Icon icon={SearchIcon} size="xs" title={{ name: 'Search Icon' }} />
              </TableCell>
            </TableRow>
            <TableRow bg="transparent !important">
              <TableCell>
                <Text>18px (200) sm</Text>
              </TableCell>
              <TableCell>
                <Text fontFamily="monospace">{'<Icon icon={SearchIcon} size="sm"/>'}</Text>
              </TableCell>
              <TableCell>
                <Icon icon={SearchIcon} size="sm" title={{ name: 'Search Icon' }} />
              </TableCell>
            </TableRow>
            <TableRow bg="transparent !important">
              <TableCell>
                <Text>24px (300) md</Text>
              </TableCell>
              <TableCell>
                <Text fontFamily="monospace">{'<Icon icon={SearchIcon} size="md"/>'}</Text>
              </TableCell>
              <TableCell>
                <Icon icon={SearchIcon} size="md" title={{ name: 'Search Icon' }} />
              </TableCell>
            </TableRow>
            <TableRow bg="transparent !important">
              <TableCell>
                <Text>36px (400)</Text>
              </TableCell>
              <TableCell>
                <Text fontFamily="monospace">{'<Icon icon={SearchIcon} size="icon-400"/>'}</Text>
              </TableCell>
              <TableCell>
                <Icon icon={SearchIcon} size="icon-400" title={{ name: 'Search Icon' }} />
              </TableCell>
            </TableRow>
            <TableRow bg="transparent !important">
              <TableCell>
                <Text>48px (500)</Text>
              </TableCell>
              <TableCell>
                <Text fontFamily="monospace">{'<Icon icon={SearchIcon} size="icon-500"/>'}</Text>
              </TableCell>
              <TableCell>
                <Icon icon={SearchIcon} size="icon-500" title={{ name: 'Search Icon' }} />
              </TableCell>
            </TableRow>
            <TableRow bg="transparent !important">
              <TableCell>
                <Text>60px (600)</Text>
              </TableCell>
              <TableCell>
                <Text fontFamily="monospace">{'<Icon icon={SearchIcon} size="icon-600"/>'}</Text>
              </TableCell>
              <TableCell>
                <Icon icon={SearchIcon} size="icon-600" title={{ name: 'Search Icon' }} />
              </TableCell>
            </TableRow>
            <TableRow bg="transparent !important">
              <TableCell>
                <Text>72px (700)</Text>
              </TableCell>
              <TableCell>
                <Text fontFamily="monospace">{'<Icon icon={SearchIcon} size="icon-700"/>'}</Text>
              </TableCell>
              <TableCell>
                <Icon icon={SearchIcon} size="icon-700" title={{ name: 'Search Icon' }} />
              </TableCell>
            </TableRow>
            <TableRow bg="transparent !important">
              <TableCell>
                <Text>84px (800)</Text>
              </TableCell>
              <TableCell>
                <Text fontFamily="monospace">{'<Icon icon={SearchIcon} size="icon-800"/>'}</Text>
              </TableCell>
              <TableCell>
                <Icon icon={SearchIcon} size="icon-800" title={{ name: 'Search Icon' }} />
              </TableCell>
            </TableRow>
            <TableRow bg="transparent !important">
              <TableCell>
                <Text>96px (900)</Text>
              </TableCell>
              <TableCell>
                <Text fontFamily="monospace">{'<Icon icon={SearchIcon} size="icon-900"/>'}</Text>
              </TableCell>
              <TableCell>
                <Icon icon={SearchIcon} size="icon-900" title={{ name: 'Search Icon' }} />
              </TableCell>
            </TableRow>
          </>
        ) : (
          <>
            <TableRow bg="transparent !important">
              <TableCell>
                <Text>XXS | 9px</Text>
              </TableCell>
              <TableCell>
                <Text fontFamily="monospace">{'<Icon icon={SearchIcon} size="xxs"/>'}</Text>
              </TableCell>
              <TableCell>
                <Icon icon={SearchIcon} size="xxs" title={{ name: 'Search Icon' }} />
              </TableCell>
            </TableRow>
            <TableRow bg="transparent !important">
              <TableCell>
                <Text>XS | 15px</Text>
              </TableCell>
              <TableCell>
                <Text fontFamily="monospace">{'<Icon icon={SearchIcon} size="xs"/>'}</Text>
              </TableCell>
              <TableCell>
                <Icon icon={SearchIcon} size="xs" title={{ name: 'Search Icon' }} />
              </TableCell>
            </TableRow>
            <TableRow bg="transparent !important">
              <TableCell>
                <Text>SM | 20px</Text>
              </TableCell>
              <TableCell>
                <Text fontFamily="monospace">{'<Icon icon={SearchIcon} size="sm"/>'}</Text>
              </TableCell>
              <TableCell>
                <Icon icon={SearchIcon} size="sm" title={{ name: 'Search Icon' }} />
              </TableCell>
            </TableRow>
            <TableRow bg="transparent !important">
              <TableCell>
                <Text>MD | 25px</Text>
              </TableCell>
              <TableCell>
                <Text fontFamily="monospace">{'<Icon icon={SearchIcon} size="md"/>'}</Text>
              </TableCell>
              <TableCell>
                <Icon icon={SearchIcon} size="md" title={{ name: 'Search Icon' }} />
              </TableCell>
            </TableRow>
          </>
        )}
      </TableBody>
    </Table>
  );
};

export const CommonlyUsed: StoryFn = () => {
  const { themeState: { isOnyx } } = useGetTheme();
  const iconColor = isOnyx ? 'common.dark' : 'accent.40';

  return (
    <>
      <Box isRow gap="md" mb="xs">
        <Icon icon={AccountIcon} color={iconColor} size="sm" title={{ name: 'Account Icon' }} />
        <Text fontFamily="monospace">{"import AccountIcon from '@pingux/mdi-react/AccountIcon'; "}</Text>
      </Box>
      <Box isRow gap="md" mb="xs">
        <Icon icon={AccountGroupIcon} color={iconColor} size="sm" title={{ name: 'Account Group Icon' }} />
        <Text fontFamily="monospace">{"import AccountGroupIcon from '@pingux/mdi-react/AccountGroupIcon'; "}</Text>
      </Box>
      <Box isRow gap="md" mb="xs">
        <Icon icon={LockIcon} color={iconColor} size="sm" title={{ name: 'Lock Icon' }} />
        <Text fontFamily="monospace">{"import LockIcon from '@pingux/mdi-react/LockIcon'; "}</Text>
      </Box>
      <Box isRow gap="md" mb="xs">
        <Icon icon={SearchIcon} color={iconColor} size="sm" title={{ name: 'Search Icon' }} />
        <Text fontFamily="monospace">{"import SearchIcon from '@pingux/mdi-react/SearchIcon'; "}</Text>
      </Box>
      <Box isRow gap="md" mb="xs">
        <Icon icon={TagIcon} color={iconColor} size="sm" title={{ name: 'Tag Icon' }} />
        <Text fontFamily="monospace">{"import TagIcon from '@pingux/mdi-react/TagIcon'; "}</Text>
      </Box>
    </>
  );
};
