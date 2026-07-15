import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { useGetTheme, useModalState } from '../../hooks';
import {
  Box,
  Button,
  ComboBoxField,
  Item,
  Menu,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  OverlayProvider,
  PopoverMenu,
  RadioField,
  RadioGroupField,
  SearchField,
  SelectField,
  Text,
} from '../../index';
import { ModalProps } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';

import ModalReadme from './Modal.mdx';
import { modalArgTypes } from './modalAttributes';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: {
      page: () => (
        <>
          <ModalReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: { ...modalArgTypes },
  args: {
    hasCloseButton: true,
    hasAutoFocus: true,
  },
} satisfies Meta<typeof Modal>;


const items = [
  { key: 'apple', name: 'Apple' },
  { key: 'banana', name: 'Banana' },
  { key: 'blueberry', name: 'Blueberry' },
];

export const Default: StoryFn<ModalProps> = args => {
  const state = useModalState();

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
    <OverlayProvider>
      <Button onPress={state.open} aria-label="Open modal" tabIndex={state.isOpen ? -1 : 0}>
        Open Modal
      </Button>
      {
        (state.isOpen || state.isTransitioning) && (
          <Modal
            {...args}
            isOpen={state.isOpen}
            onClose={state.close}
          >
            <ModalHeader
              hasCloseButton
              onClose={state.close}
              title="Continue"
            />
            <ModalBody>
              <Box>
                <Text>
                  Do you want to continue with this action that you&lsquo;re performing?
                </Text>
              </Box>
            </ModalBody>
            <ModalFooter onSubmit={state.close} onCancel={state.close} primaryButtonText="Continue" />
          </Modal>
        )
      }
    </OverlayProvider>
  );
};

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.modal.default,
  },
};

export const LargeContent: StoryFn<ModalProps> = args => {
  const state = useModalState();

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
    <OverlayProvider>
      <Button onPress={state.open} aria-label="Open modal" tabIndex={state.isOpen ? -1 : 0}>
        Open Modal
      </Button>
      {state.isOpen && (
        <Modal
          {...args}
          isOpen={state.isOpen}
          onClose={state.close}
        >
          <ModalHeader
            hasCloseButton
            onClose={state.close}
            title="Lorem Ipsum"
          />
          <ModalBody>
            <Box gap="lg">
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
              <Text>
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
              <Text>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </Text>
              <Text>
                Nisi ut aliquip ex ea commodo consequat.
              </Text>
              <Text>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
              </Text>
              <Text>
                Eu fugiat nulla pariatur.
              </Text>
              <Text>
                Excepteur sint occaecat cupidatat non proident.
              </Text>
              <Text>
                Sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
              <Text>
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
              <Text>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </Text>
              <Text>
                Nisi ut aliquip ex ea commodo consequat.
              </Text>
              <Text>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
              </Text>
              <Text>
                Eu fugiat nulla pariatur.
              </Text>
              <Text>
                Excepteur sint occaecat cupidatat non proident.
              </Text>
              <Text>
                Sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
              <Text>
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
              <Text>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </Text>
              <Text>
                Nisi ut aliquip ex ea commodo consequat.
              </Text>
              <Text>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter onSubmit={state.close} onCancel={state.close} />
        </Modal>
      )}
    </OverlayProvider>
  );
};

export const LargeContentWithScroll: StoryFn<ModalProps> = args => {
  const state = useModalState();

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
    <OverlayProvider>
      <Button onPress={state.open} aria-label="Open modal" tabIndex={state.isOpen ? -1 : 0}>
        Open Modal
      </Button>
      {state.isOpen && (
        <Modal
          {...args}
          isOpen={state.isOpen}
          onClose={state.close}
        >
          <ModalHeader
            hasCloseButton
            onClose={state.close}
            title="Lorem Ipsum"
          />
          <ModalBody
            isScrollable
            scrollProps={{
              maxHeight: '400px',
            }}
          >
            <Box gap="lg" pr="lg">
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
              <Text>
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
              <Text>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </Text>
              <Text>
                Nisi ut aliquip ex ea commodo consequat.
              </Text>
              <Text>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
              </Text>
              <Text>
                Eu fugiat nulla pariatur.
              </Text>
              <Text>
                Excepteur sint occaecat cupidatat non proident.
              </Text>
              <Text>
                Sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
              <Text>
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
              <Text>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </Text>
              <Text>
                Nisi ut aliquip ex ea commodo consequat.
              </Text>
              <Text>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
              </Text>
              <Text>
                Eu fugiat nulla pariatur.
              </Text>
              <Text>
                Excepteur sint occaecat cupidatat non proident.
              </Text>
              <Text>
                Sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
              <Text>
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
              <Text>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </Text>
              <Text>
                Nisi ut aliquip ex ea commodo consequat.
              </Text>
              <Text>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter onSubmit={state.close} onCancel={state.close} />
        </Modal>
      )}
    </OverlayProvider>
  );
};

export const WithInputField: StoryFn<ModalProps> = () => {
  const state = useModalState();
  const { themeState: { isOnyx } } = useGetTheme();

  const [value, setValue] = useState('');

  return (
    <OverlayProvider>
      <Button onPress={state.open} aria-label="Open modal">
        Open Modal
      </Button>
      {state.isOpen && (
        <Modal
          isOpen={state.isOpen}
          onClose={state.close}
          hasAutoFocus
        >
          <ModalBody>
            <Box gap="lg" pt={isOnyx ? '' : 'lg'}>
              <Text>Lorem ipsum dolor sit amet consectetur</Text>
              <SelectField label="Select an option">
                <Item>Red</Item>
                <Item>Green</Item>
                <Item>Blue</Item>
              </SelectField>
              <RadioGroupField label="Pick an option" name="options" defaultValue="option1">
                <RadioField
                  label="Option 1"
                  value="option1"
                  data-testid="option1"
                />
                <RadioField
                  label="Option 2"
                  value="option2"
                  data-testid="option2"
                />
                <RadioField
                  label="Option 3"
                  value="option3"
                  data-testid="option3"
                />
              </RadioGroupField>

              <SearchField
                mode="autocomplete"
                defaultItems={items}
                value={value}
                onChange={val => {
                  setValue(val);
                }}
                aria-label="Search Groups"
                placeholder="Search"
                onSubmit={text => alert(text)}
                onClear={() => { setValue(''); }}
              >
                {item => (
                  <Item key={item.key} textValue={item.name}>
                    {item.name}
                  </Item>
                )}
              </SearchField>
            </Box>
          </ModalBody>
          <ModalFooter onSubmit={state.close} onCancel={state.close} />
        </Modal>
      )}
    </OverlayProvider>
  );
};

WithInputField.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'aria-hidden-focus', enabled: false }],
    },
  },
};

export const WithPopoverMenu: StoryFn<ModalProps> = () => {
  const state = useModalState();
  return (
    <OverlayProvider>
      <Button onPress={state.open} aria-label="Open modal">
        Open Modal
      </Button>
      {state.isOpen && (
        <Modal
          isOpen={state.isOpen}
          onClose={state.close}
        >
          <ModalBody>
            <Box gap="lg">
              <Text>Lorem ipsum dolor sit amet consectetur</Text>
              <PopoverMenu>
                <Button>Click me</Button>
                <Menu onAction={() => console.log('on action')}>
                  <Item key="edit">Edit</Item>
                  <Item key="duplicate">Duplicate</Item>
                  <Item key="delete" textValue="delete">
                    <Text color="critical.bright">
                      Delete
                    </Text>
                  </Item>
                </Menu>
              </PopoverMenu>
            </Box>
          </ModalBody>
        </Modal>
      )}
    </OverlayProvider>
  );
};

export const WithComboBoxField: StoryFn<ModalProps> = () => {
  const state = useModalState();

  return (
    <OverlayProvider>
      <Button onPress={state.open} aria-label="Open modal">
        Open Modal
      </Button>
      {state.isOpen && (
        <Modal
          isOpen={state.isOpen}
          onClose={state.close}
        >
          <ModalBody>
            <Box gap="lg">
              <Text>Lorem ipsum dolor sit amet consectetur</Text>
              <ComboBoxField items={items} label="ComboBox Label" placeholder="Select an item">
                {item => <Item key={item.name} data-id={item.name}>{item.name}</Item>}
              </ComboBoxField>
            </Box>
          </ModalBody>
        </Modal>
      )}
    </OverlayProvider>
  );
};


export const WithNotFullPage: StoryFn<ModalProps> = args => {
  const state = useModalState();

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
    <OverlayProvider>
      <Button onPress={state.open} aria-label="Open modal" tabIndex={state.isOpen ? -1 : 0}>
        Open Modal
      </Button>
      {
        (state.isOpen || state.isTransitioning) && (
          <Modal
            {...args}
            isOpen={state.isOpen}
            onClose={state.close}
            isNotFullPage
          >
            <ModalHeader
              hasCloseButton
              onClose={state.close}
              title="Continue"
            />
            <ModalBody>
              <Box>
                <Text>
                  Do you want to continue with this action that you&lsquo;re performing?
                </Text>
              </Box>
            </ModalBody>
            <ModalFooter onSubmit={state.close} onCancel={state.close} primaryButtonText="Continue" />
          </Modal>
        )
      }
    </OverlayProvider>
  );
};
