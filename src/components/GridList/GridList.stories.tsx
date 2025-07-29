import React, { useRef, useState } from 'react';
import { Item, Key } from 'react-stately';
import MinusIcon from '@pingux/mdi-react/MinusIcon';
import PlusIcon from '@pingux/mdi-react/PlusIcon';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Box, GridList, Icon, IconButton, Menu, OverlayProvider, PopoverMenu, Text,
  TextField } from '../../index';

import GridListReadme from './GridList.mdx';
import { gridListArgTypes } from './gridListAttributes';

export default {
  title: 'Components/GridList',
  component: GridList,
  argTypes: {
    ...gridListArgTypes,
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
      page: () => (
        <>
          <GridListReadme />
          <DocsLayout />
        </>
      ),
    },
  },

};

const items = [
  { name: 'rhino', key: 'rhino' },
  { name: 'lion', key: 'lion' },
  { name: 'zebra', key: 'zebra' },
];

const ExampleComponent = ({ label }: {label: string, key: Key}) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box isRow sx={{ alignItems: 'center' }} gap="sm">
      <TextField aria-label={label} ref={ref} defaultValue={label} data-testid={`${label}-text-field`} />
      <Box isRow sx={{ alignItems: 'center' }} gap="md">
        <IconButton aria-label="delete row">
          <Icon icon={MinusIcon} title={{ name: 'delete icon' }} />
        </IconButton>
        <IconButton aria-label="add row">
          <Icon icon={PlusIcon} title={{ name: 'add icon' }} />
        </IconButton>
        <OverlayProvider>
          <PopoverMenu isOpen={isOpen} onOpenChange={setIsOpen}>
            <IconButton aria-label="more options" variant="inverted">
              <Icon icon={MinusIcon} size="md" title={{ name: 'Dots Vertical Icon' }} />
            </IconButton>
            <Menu>
              <Item key="edit">Edit</Item>
              <Item key="duplicate">Duplicate</Item>
              <Item key="delete" textValue="delete">
                <Text color="critical.bright">
                  Delete
                </Text>
              </Item>
            </Menu>
          </PopoverMenu>
        </OverlayProvider>
      </Box>
    </Box>
  );
};

export const Default = args => {
  return (
    <GridList items={items} isReorderable keyboardNavigationBehavior="tab" {...args}>
      {item => (
        <Item textValue={item.name} key={item.name} data-id={item.name}>
          <ExampleComponent
            label={item.name}
            key={item.name}
          />
        </Item>
      )}
    </GridList>
  );
};
