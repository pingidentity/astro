import React from 'react';
import CreateIcon from '@pingux/mdi-react/CreateIcon';
import DeleteIcon from '@pingux/mdi-react/DeleteIcon';
import DotsVerticalIcon from '@pingux/mdi-react/DotsVerticalIcon';
import PencilIcon from '@pingux/mdi-react/PencilIcon';
import PlusIcon from '@pingux/mdi-react/PlusIcon';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Box,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Text,
} from '../../index';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks.js';

import IconButtonReadme from './IconButton.mdx';

export default {
  title: 'Components/IconButton',
  component: IconButton,
  decorators: [withDesign],
  parameters: {
    docs: {
      page: () => (
        <>
          <IconButtonReadme />
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
      defaultValue: CreateIcon,
      description: 'The icon to render. List of icons at https://materialdesignicons.com/',
    },
    title: {
      control: {
        type: 'text',
      },
    },
    'aria-label': {
      control: {
        type: 'text',
      },
    },
    isDisabled: {},
    variant: {
      control: {
        type: 'select',
        options: ['base', 'inverted', 'invertedSquare', 'square'],
      },
      defaultValue: 'base',
    },
    size: {
      control: {
        type: 'select',
        options: ['xs', 'sm', 'md'],
      },
      defaultValue: 'sm',
    },
  },
};

export const Default = args => (
  <IconButton aria-label="default icon button" {...args}>
    <Icon icon={CreateIcon} size={args.size} title={{ name: 'Create Icon' }} />
  </IconButton>
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.iconButton.default,
  },
};

export const WithTooltip = () => (
  <IconButton aria-label="icon button with tooltip" title="Edit">
    <Icon icon={CreateIcon} size="sm" title={{ name: 'Create Icon' }} />
  </IconButton>
);
export const Disabled = () => (
  <IconButton aria-label="disabled icon button" isDisabled>
    <Icon icon={CreateIcon} title={{ name: 'Create Icon' }} />
  </IconButton>
);


export const Sizes = () => (
  <Table>
    <TableHead>
      <TableRow key="head">
        <TableCell isHeading width="40%">Icon & Button Size</TableCell>
        <TableCell isHeading>Code Example</TableCell>
        <TableCell isHeading>Icon Example</TableCell>
      </TableRow>
    </TableHead>
    <TableBody sx={{ borderBottom: 'unset' }}>
      <TableRow bg="transparent !important">
        <TableCell width="40%">
          <Text>XS | 21px</Text>
        </TableCell>
        <TableCell>
          <Text fontFamily="monospace">
            {' '}
            {"<IconButton aria-label='create button' variant='inverted'/>"}
          </Text>
          <Text fontFamily="monospace">{"<Icon icon={CreateIcon} size='xs'/>"}</Text>
          <Text fontFamily="monospace">{'</IconButton>'}</Text>
        </TableCell>
        <TableCell>
          <IconButton aria-label="create button" variant="inverted" sx={{ width: 'unset' }}>
            <Icon icon={CreateIcon} size="xs" title={{ name: 'Create Icon' }} />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow bg="transparent !important">
        <TableCell width="40%">
          <Text>SM | 26px</Text>
        </TableCell>
        <TableCell>
          <Text fontFamily="monospace">
            {' '}
            {"<IconButton aria-label='create button' variant='inverted'/>"}
          </Text>
          <Text fontFamily="monospace">{"<Icon icon={CreateIcon} size='sm'/>"}</Text>
          <Text fontFamily="monospace">{'</IconButton>'}</Text>
        </TableCell>
        <TableCell>
          <IconButton aria-label="create button" variant="inverted" sx={{ width: 'unset' }}>
            <Icon icon={CreateIcon} size="sm" title={{ name: 'Create Icon' }} />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow bg="transparent !important">
        <TableCell width="40%">
          <Text>MD | 31px</Text>
        </TableCell>
        <TableCell>
          <Text fontFamily="monospace">
            {' '}
            {"<IconButton aria-label='create button' variant='inverted'/>"}
          </Text>
          <Text fontFamily="monospace">{"<Icon icon={CreateIcon} size='md'/>"}</Text>
          <Text fontFamily="monospace">{'</IconButton>'}</Text>
        </TableCell>
        <TableCell>
          <IconButton aria-label="create button" variant="inverted" sx={{ width: 'unset' }}>
            <Icon icon={CreateIcon} size="md" title={{ name: 'Create Icon' }} />
          </IconButton>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export const CommonlyUsed = () => (
  // please note these are intentionally not mapped for story transparency
  <>
    <Text fontFamily="monospace" mb="md">{"import DeleteIcon from '@pingux/mdi-react/DeleteIcon'; "}</Text>
    <Box isRow gap="md" mb="md">
      <IconButton aria-label="delete">
        <Icon icon={DeleteIcon} size="xs" title={{ name: 'Delete Icon' }} />
      </IconButton>
      <IconButton aria-label="delete">
        <Icon icon={DeleteIcon} size="sm" title={{ name: 'Delete Icon' }} />
      </IconButton>
      <IconButton aria-label="delete">
        <Icon icon={DeleteIcon} size="md" title={{ name: 'Delete Icon' }} />
      </IconButton>
    </Box>
    <Box isRow gap="md" mb="xl">
      <IconButton aria-label="delete" variant="inverted">
        <Icon icon={DeleteIcon} size="xs" title={{ name: 'Delete Icon' }} />
      </IconButton>
      <IconButton aria-label="delete" variant="inverted">
        <Icon icon={DeleteIcon} size="sm" title={{ name: 'Delete Icon' }} />
      </IconButton>
      <IconButton aria-label="delete" variant="inverted">
        <Icon icon={DeleteIcon} size="md" title={{ name: 'Delete Icon' }} />
      </IconButton>
    </Box>

    <Text fontFamily="monospace" mb="md">{"import DotsVerticalIcon from '@pingux/mdi-react/DotsVerticalIcon'; "}</Text>
    <Box isRow gap="md" mb="md">
      <IconButton aria-label="more options">
        <Icon icon={DotsVerticalIcon} size="xs" title={{ name: 'Dots Vertical Icon' }} />
      </IconButton>
      <IconButton aria-label="more options">
        <Icon icon={DotsVerticalIcon} size="sm" title={{ name: 'Dots Vertical Icon' }} />
      </IconButton>
      <IconButton aria-label="more options">
        <Icon icon={DotsVerticalIcon} size="md" title={{ name: 'Dots Vertical Icon' }} />
      </IconButton>
    </Box>
    <Box isRow gap="md" mb="xl">
      <IconButton aria-label="more options" variant="inverted">
        <Icon icon={DotsVerticalIcon} size="xs" title={{ name: 'Dots Vertical Icon' }} />
      </IconButton>
      <IconButton aria-label="more options" variant="inverted">
        <Icon icon={DotsVerticalIcon} size="sm" title={{ name: 'Dots Vertical Icon' }} />
      </IconButton>
      <IconButton aria-label="more options" variant="inverted">
        <Icon icon={DotsVerticalIcon} size="md" title={{ name: 'Dots Vertical Icon' }} />
      </IconButton>
    </Box>

    <Text fontFamily="monospace" mb="md">{"import PlusIcon from '@pingux/mdi-react/PlusIcon'; "}</Text>
    <Box isRow gap="md" mb="md">
      <IconButton aria-label="add">
        <Icon icon={PlusIcon} size="xs" title={{ name: 'Plus Icon' }} />
      </IconButton>
      <IconButton aria-label="add">
        <Icon icon={PlusIcon} size="sm" title={{ name: 'Plus Icon' }} />
      </IconButton>
      <IconButton aria-label="add">
        <Icon icon={PlusIcon} size="md" title={{ name: 'Plus Icon' }} />
      </IconButton>
    </Box>
    <Box isRow gap="md" mb="xl">
      <IconButton aria-label="add" variant="inverted">
        <Icon icon={PlusIcon} size="xs" title={{ name: 'Plus Icon' }} />
      </IconButton>
      <IconButton aria-label="add" variant="inverted">
        <Icon icon={PlusIcon} size="sm" title={{ name: 'Plus Icon' }} />
      </IconButton>
      <IconButton aria-label="add" variant="inverted">
        <Icon icon={PlusIcon} size="md" title={{ name: 'Plus Icon' }} />
      </IconButton>
    </Box>


    <Text fontFamily="monospace" mb="md">{"import PencilIcon from '@pingux/mdi-react/PencilIcon'; "}</Text>
    <Box isRow gap="md" mb="md">
      <IconButton aria-label="create">
        <Icon icon={PencilIcon} size="xs" title={{ name: 'Pencil Icon' }} />
      </IconButton>
      <IconButton aria-label="create">
        <Icon icon={PencilIcon} size="sm" title={{ name: 'Pencil Icon' }} />
      </IconButton>
      <IconButton aria-label="create">
        <Icon icon={PencilIcon} size="md" title={{ name: 'Pencil Icon' }} />
      </IconButton>
    </Box>
    <Box isRow gap="md" mb="xl">
      <IconButton aria-label="create" variant="inverted">
        <Icon icon={PencilIcon} size="xs" title={{ name: 'Pencil Icon' }} />
      </IconButton>
      <IconButton aria-label="create" variant="inverted">
        <Icon icon={PencilIcon} size="sm" title={{ name: 'Pencil Icon' }} />
      </IconButton>
      <IconButton aria-label="create" variant="inverted">
        <Icon icon={PencilIcon} size="md" title={{ name: 'Pencil Icon' }} />
      </IconButton>
    </Box>
  </>
);
