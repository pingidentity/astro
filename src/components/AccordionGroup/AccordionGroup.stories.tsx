import React, { Key, ReactNode, useState } from 'react';
import { Item } from 'react-stately';
import { Meta } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  AccordionGroup,
  Badge,
  Box,
  Button,
  HelpHint,
  Text,
  TextField,
} from '../../index';
import ItemProps from '../../types/item';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';
import { validHeadingTags } from '../AccordionItem/AccordionItem';

import AccordionReadme from './AccordionGroup';

const itemArray = [
  { key: 't1', label: 'First Accordion', children: <Button sx={{ width: 'fit-content' }}>Secondary Button</Button> },
  { key: 't2', label: 'Second Accordion', children: <Text variant="base" lineHeight={1.2}>Content for the second section. Content for the second section. Content for the second section. Content for the second section. Content for the second section. Content for the second section. Content for the second section. Content for the second section.</Text> },
  { key: 't3', label: 'Third Accordion', children: <TextField /> },
];

const itemArrayDisabled = [
  { key: 't1', label: 'Accordion Disabled', children: <Text>Hi</Text> },
  { key: 't2', label: 'Accordion Active', children: <Text>Hi</Text> },
  { key: 't3', label: 'Accordion Disabled', children: <Text>Hi</Text> },
];

export default {
  title: 'Components/AccordionGroup',
  component: AccordionGroup,
  decorators: [withDesign],
  parameters: {
    actions: {
      argTypesRegex: '^on.*',
    },
    docs: {
      page: () => (
        <>
          <AccordionReadme />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    id: {
      control: {
        type: 'text',
      },
    },
    disabledKeys: {
      description: 'The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with. Array of keys.',
    },
    defaultExpandedKeys: {},
    expandedKeys: {
      control: {
        type: 'none',
      },
    },
    items: {
      control: {
        type: 'none',
      },
    },
    labelHeadingTag: {
      control: 'radio',
      options: validHeadingTags,
    },
  },
} as Meta;

export const Default = args => {
  return (
    <AccordionGroup labelHeadingTag="h3" {...args}>
      <Item key="accordionKey" textValue="accordionKey" label="Accordion Label" data-id="accordionItem">
        <Text>Render me!</Text>
      </Item>
    </AccordionGroup>
  );
};

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.accordionGroup.default,
  },
};

export const DifferentLevels = () => {
  return (
    <>
      <AccordionGroup labelHeadingTag="h3">
        <Item key="accordionLabelH3Key" textValue="accordionLabelH3Key" label="Accordion Label H3" data-id="accordionItem">
          <Text>Render me!</Text>
        </Item>
      </AccordionGroup>
      <AccordionGroup labelHeadingTag="h2">
        <Item key="accordionLabelH2Key" textValue="accordionLabelH2Key" label="Accordion Label H2" data-id="accordionItem">
          <Text>Render me!</Text>
        </Item>
      </AccordionGroup>
    </>
  );
};

DifferentLevels.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.accordionGroup.differentLevels,
  },
};

export const Multiple = () => {
  return (
    /*
     * itemArray = [
     *   { key: 't1', label: 'First Accordion', children: <Text>Hi</Text> },
     *   { key: 't2', label: 'Second Accordion', children: 'Child Renders Here' },
     *   { key: 't3', label: 'Third Accordion', children: 'Child Renders Here' },
     * ];
     */
    <AccordionGroup
      defaultExpandedKeys={['t2']}
      items={itemArray}
      labelHeadingTag="h3"
    >
      {item => (
        <Item
          key={(item as ItemProps<Key>).key}
          textValue={(item as ItemProps<string>).label?.toString()}
          label={(item as ItemProps<string>).label}
        >
          {(item as ItemProps<ReactNode>).children}
        </Item>
      )}
    </AccordionGroup>
  );
};

Multiple.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.accordionGroup.multiple,
  },
};

export const ControlledExpanded = () => {
  const [expandedKeys, setExpandedKeys] = useState(['t3']);

  return (
    /*
     * itemArray = [
     *   { key: 't1', label: 'First Accordion', children: <Text>Hi</Text> },
     *   { key: 't2', label: 'Second Accordion', children: 'Child Renders Here' },
     *   { key: 't3', label: 'Third Accordion', children: 'Child Renders Here' },
     * ];
     *
     * Console Warning: "Cannot update a component (`Unknown`)...`"
     * when using controlledExpanded prop is expected
     * and related to a known issue within React Stately.
     */
    <AccordionGroup
      onExpandedChange={setExpandedKeys}
      expandedKeys={expandedKeys}
      items={itemArray}
      labelHeadingTag="h3"
    >
      {item => (
        <Item
          key={(item as ItemProps<Key>).key}
          textValue={(item as ItemProps<string>).label?.toString()}
          label={(item as ItemProps<string>).label}
        >
          {(item as ItemProps<ReactNode>).children}
        </Item>
      )}
    </AccordionGroup>
  );
};

export const UncontrolledExpanded = () => {
  return (
    /*
     * itemArray = [
     *   { key: 't1', label: 'First Accordion', children: <Text>Hi</Text> },
     *   { key: 't2', label: 'Second Accordion', children: 'Child Renders Here' },
     *   { key: 't3', label: 'Third Accordion', children: 'Child Renders Here' },
     * ];
     */
    <AccordionGroup defaultExpandedKeys={['t1']} items={itemArray} labelHeadingTag="h3">
      {item => (
        <Item
          key={(item as ItemProps<Key>).key}
          textValue={(item as ItemProps<string>).label?.toString()}
          label={(item as ItemProps<string>).label}
        >
          {(item as ItemProps<ReactNode>).children}
        </Item>
      )}
    </AccordionGroup>
  );
};

export const DisabledState = () => {
  return (
    /*
      itemArrayDisabled = [
        { key: 't1', label: 'Accordion Disabled', children: <Text>Hi</Text> },
        { key: 't2', label: 'Accordion Active', children: <Text>Hi</Text> },
        { key: 't3', label: 'Accordion Disabled', children: <Text>Hi</Text> },
      ];
     */
    <AccordionGroup disabledKeys={['t1', 't3']} items={itemArrayDisabled} labelHeadingTag="h3">
      {item => (
        <Item
          key={(item as ItemProps<Key>).key}
          textValue={(item as ItemProps<string>).label?.toString()}
          label={(item as ItemProps<string>).label}
        >
          {(item as ItemProps<ReactNode>).children}
        </Item>
      )}
    </AccordionGroup>
  );
};

DisabledState.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.accordionGroup.disabledState,
  },
};

export const CustomPresentation = () => {
  return (
    /*
      itemArrayDisabled = [
        { key: 't1', label: 'Disabled Accordion', children: <Text>Hi</Text> },
        { key: 't2', label: 'Accordion', children: 'Child Renders Here' },
        { key: 't3', label: 'Disabled Accordion', children: 'Child Renders Here' },
      ];
     */
    <AccordionGroup items={itemArrayDisabled} labelHeadingTag="h3">
      {item => (
        <Item
          key={(item as ItemProps<Key>).key}
          textValue={(item as ItemProps<string>).label?.toString()}
          label={(item as ItemProps<string>).label}
          buttonProps={{ bg: (item as ItemProps<object>).key === 't2' ? 'darkseagreen' : 'skyblue' }}
          regionProps={{ bg: 'mistyrose' }}
          containerProps={{ bg: 'lavender' }}
        >
          {(item as ItemProps<ReactNode>).children}
        </Item>
      )}
    </AccordionGroup>
  );
};

CustomPresentation.parameters = {
  docs: {
    description: {
      story: 'In addition to customizing the theme, prop objects can be passed to certain elements. This allows for simple customization in a pinch. See the source code below for an example.',
    },
  },
};

export const LabelWithBadge = args => {
  return (
    <AccordionGroup {...args} labelHeadingTag="h4">
      <Item
        key="accordionKey"
        textValue="accordionKey"
        label={(
          <Box isRow alignItems="center">
            Accordion Label
            <Box isRow gap="5px" ml="5px">
              <Badge label="Label" sx={{ height: '21px' }} />
            </Box>
          </Box>
        )}
        data-id="accordionItem"
      >
        <Text>Render me!</Text>
      </Item>
    </AccordionGroup>
  );
};

export const AccordionWithSlot = args => {
  return (
    <AccordionGroup labelHeadingTag="h3" {...args}>
      <Item
        key="accordionKey"
        textValue="accordionKey"
        label="Accordion Label"
        data-id="accordionItem"
        slots={{ postHeading: <HelpHint> Text of the popover right here...</HelpHint> }}
      >
        <Text>Render me!</Text>
      </Item>
    </AccordionGroup>
  );
};
