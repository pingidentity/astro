import React, { useState } from 'react';
import { Item } from '@react-stately/collections';
import Text from '../Text';
import AccordionGroup from '.';

const itemArray = [
  { key: 't1', label: 'First Accordion', children: <Text>Hi</Text> },
  { key: 't2', label: 'Second Accordion', children: 'Child Renders Here' },
  { key: 't3', label: 'Third Accordion', children: 'Child Renders Here' },
];

const itemArrayDisabled = [
  { key: 't1', label: 'Disabled Accordion', children: <Text>Hi</Text> },
  { key: 't2', label: 'Accordion', children: 'Child Renders Here' },
  { key: 't3', label: 'Disabled Accordion', children: 'Child Renders Here' },
];

export default {
  title: 'Accordion',
  component: AccordionGroup,
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

export const Default = () => {
  return (
    <AccordionGroup >
      <Item key="accordionKey" textValue="accordionKey" label="Accordion Label">
        <Text>Render me!</Text>
      </Item>
    </AccordionGroup>
  );
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
    <AccordionGroup items={itemArray}>
      {item => (
        <Item key={item.key} textValue={item.label} label={item.label}>
          {item.children}
        </Item>
      )}
    </AccordionGroup>
  );
};

export const ControlledExpanded = () => {
  const [expandedKeys, setExpandedKeys] = useState(['t1']);
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
    >
      {item => (
        <Item key={item.key} textValue={item.label} label={item.label}>
          {item.children}
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
    <AccordionGroup defaultExpandedKeys={['t1']} items={itemArray}>
      {item => (
        <Item key={item.key} textValue={item.label} label={item.label}>
          {item.children}
        </Item>
      )}
    </AccordionGroup>
  );
};

export const DisabledItems = () => {
  return (
    /*
      itemArrayDisabled = [
        { key: 't1', label: 'Disabled Accordion', children: <Text>Hi</Text> },
        { key: 't2', label: 'Accordion', children: 'Child Renders Here' },
        { key: 't3', label: 'Disabled Accordion', children: 'Child Renders Here' },
      ];
     */
    <AccordionGroup disabledKeys={['t1', 't3']} items={itemArrayDisabled}>
      {item => (
        <Item key={item.key} textValue={item.label} label={item.label}>
          {item.children}
        </Item>
      )}
    </AccordionGroup>
  );
};
