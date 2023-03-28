import React from 'react';
import CreateIcon from 'mdi-react/CreateIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';
import DotsVerticalIcon from 'mdi-react/DotsVerticalIcon';
import PencilIcon from 'mdi-react/PencilIcon';
import PlusIcon from 'mdi-react/PlusIcon';

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

export default {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    docs: {
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
    <Icon icon={CreateIcon} size={args.size} />
  </IconButton>
);

export const WithTooltip = () => (
  <IconButton aria-label="icon button with tooltip" title="Edit">
    <Icon icon={CreateIcon} size="sm" />
  </IconButton>
);
export const Disabled = () => (
  <IconButton aria-label="disabled icon button" isDisabled>
    <Icon icon={CreateIcon} />
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
            <Icon icon={CreateIcon} size="xs" />
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
            <Icon icon={CreateIcon} size="sm" />
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
            <Icon icon={CreateIcon} size="md" />
          </IconButton>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export const CommonlyUsed = () => (
  // please note these are intentionally not mapped for story transparency
  <>
    <Text fontFamily="monospace" mb="md">{"import DeleteIcon from 'mdi-react/DeleteIcon'; "}</Text>
    <Box isRow gap="md" mb="md">
      <IconButton aria-label="delete">
        <Icon icon={DeleteIcon} size="xs" />
      </IconButton>
      <IconButton aria-label="delete">
        <Icon icon={DeleteIcon} size="sm" />
      </IconButton>
      <IconButton aria-label="delete">
        <Icon icon={DeleteIcon} size="md" />
      </IconButton>
    </Box>
    <Box isRow gap="md" mb="xl">
      <IconButton aria-label="delete" variant="inverted">
        <Icon icon={DeleteIcon} size="xs" />
      </IconButton>
      <IconButton aria-label="delete" variant="inverted">
        <Icon icon={DeleteIcon} size="sm" />
      </IconButton>
      <IconButton aria-label="delete" variant="inverted">
        <Icon icon={DeleteIcon} size="md" />
      </IconButton>
    </Box>

    <Text fontFamily="monospace" mb="md">{"import DotsVerticalIcon from 'mdi-react/DotsVerticalIcon'; "}</Text>
    <Box isRow gap="md" mb="md">
      <IconButton aria-label="more options">
        <Icon icon={DotsVerticalIcon} size="xs" />
      </IconButton>
      <IconButton aria-label="more options">
        <Icon icon={DotsVerticalIcon} size="sm" />
      </IconButton>
      <IconButton aria-label="more options">
        <Icon icon={DotsVerticalIcon} size="md" />
      </IconButton>
    </Box>
    <Box isRow gap="md" mb="xl">
      <IconButton aria-label="more options" variant="inverted">
        <Icon icon={DotsVerticalIcon} size="xs" />
      </IconButton>
      <IconButton aria-label="more options" variant="inverted">
        <Icon icon={DotsVerticalIcon} size="sm" />
      </IconButton>
      <IconButton aria-label="more options" variant="inverted">
        <Icon icon={DotsVerticalIcon} size="md" />
      </IconButton>
    </Box>

    <Text fontFamily="monospace" mb="md">{"import PlusIcon from 'mdi-react/PlusIcon'; "}</Text>
    <Box isRow gap="md" mb="md">
      <IconButton aria-label="add">
        <Icon icon={PlusIcon} size="xs" />
      </IconButton>
      <IconButton aria-label="add">
        <Icon icon={PlusIcon} size="sm" />
      </IconButton>
      <IconButton aria-label="add">
        <Icon icon={PlusIcon} size="md" />
      </IconButton>
    </Box>
    <Box isRow gap="md" mb="xl">
      <IconButton aria-label="add" variant="inverted">
        <Icon icon={PlusIcon} size="xs" />
      </IconButton>
      <IconButton aria-label="add" variant="inverted">
        <Icon icon={PlusIcon} size="sm" />
      </IconButton>
      <IconButton aria-label="add" variant="inverted">
        <Icon icon={PlusIcon} size="md" />
      </IconButton>
    </Box>


    <Text fontFamily="monospace" mb="md">{"import PencilIcon from 'mdi-react/PencilIcon'; "}</Text>
    <Box isRow gap="md" mb="md">
      <IconButton aria-label="create">
        <Icon icon={PencilIcon} size="xs" />
      </IconButton>
      <IconButton aria-label="create">
        <Icon icon={PencilIcon} size="sm" />
      </IconButton>
      <IconButton aria-label="create">
        <Icon icon={PencilIcon} size="md" />
      </IconButton>
    </Box>
    <Box isRow gap="md" mb="xl">
      <IconButton aria-label="create" variant="inverted">
        <Icon icon={PencilIcon} size="xs" />
      </IconButton>
      <IconButton aria-label="create" variant="inverted">
        <Icon icon={PencilIcon} size="sm" />
      </IconButton>
      <IconButton aria-label="create" variant="inverted">
        <Icon icon={PencilIcon} size="md" />
      </IconButton>
    </Box>
  </>
);
