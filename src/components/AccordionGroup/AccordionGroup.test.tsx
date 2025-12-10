import React from 'react';
import { Item } from 'react-stately';
import userEvent from '@testing-library/user-event';

import { Box, Button, HelpHint, Menu, OverlayPanel, PopoverMenu, TextField } from '../../index';
import { act, fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import { validHeadingTags } from '../AccordionItem/AccordionItem';
import Text from '../Text';

import AccordionGroup from '.';

const testId = 'test-accordion';
const defaultProps = {
  'data-testid': testId,
};

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <AccordionGroup {...props} /> });

const items = [
  {
    key: 'identityProvider',
    label: 'some label1',
    text: 'empty',
  },
  {
    key: 'identityProvider1',
    label: 'some label2',
    text: 'empty',
  },
];

const selectedAccordionKeys = ['identityProvider', 'identityProvider1'];

const getComponent = (props = {}) => render((
  <AccordionGroup {...defaultProps} {...props}>
    <Item key="first" textValue="Duplicate" data-id="first" label="Accordion item" data-testid="first">
      <Text>Render me!</Text>
    </Item>
    <Item key="second" textValue="Duplicate" data-id="second" label="Accordion item" data-testid="second">
      <Text>Render me!</Text>
    </Item>
    <Item key="third" textValue="Duplicate" data-id="third" label="Accordion item" data-testid="third">
      <TextField
        role="form"
        label="Example Label"
        data-testid="testField"
      />
    </Item>
  </AccordionGroup>
));

const getComponentInOverlayPanel = (props = {}) => render((
  <OverlayPanel isOpen>
    <AccordionGroup {...defaultProps} {...props}>
      <Item key="first" textValue="Duplicate" data-id="first">
        <Text>Render me!</Text>
      </Item>
      <Item key="second" textValue="Duplicate" data-id="second">
        <Text>Render me!</Text>
      </Item>
      <Item key="third" textValue="Duplicate" data-id="third">
        <Text>Render me!</Text>
      </Item>
    </AccordionGroup>
  </OverlayPanel>
));

const getComponentWithInput = (props = {}) => render((
  <AccordionGroup {...defaultProps} {...props}>
    <Item key="first" textValue="Duplicate" data-id="first" label="Accordion item">
      <Text>Render me!</Text>
    </Item>
    <Item key="second" textValue="Duplicate" data-id="second" label="Accordion item">
      <input data-testid="testInput" />
    </Item>
  </AccordionGroup>
));

const getComponentWithPopover = () => render((
  <Box isRow alignItems="center" justifyContent="space-between" width="50%">
    <PopoverMenu>
      <Button data-testid="popoverbutton">Click me</Button>
      <Menu onAction={() => { return false; }}>
        <Item key="edit">Edit</Item>
        <Item key="duplicate">Duplicate</Item>
        <Item key="delete" textValue="delete">
          <Text color="critical.bright">Delete</Text>
        </Item>
      </Menu>
    </PopoverMenu>
    <AccordionGroup
      items={items}
      defaultExpandedKeys={selectedAccordionKeys}
    >
      <Item key={items[0].key} textValue={items[0].label} label={items[0].label}>
        {items[0].text}
      </Item>
      <Item key={items[1].key} textValue={items[1].label} label={items[1].label}>
        {items[1].text}
      </Item>
    </AccordionGroup>
  </Box>
));

const getComponentWithMultipleAccordion = () => render((
  <Box alignItems="center" justifyContent="space-between" width="50%">
    <AccordionGroup
      defaultExpandedKeys={['customConfiguration']}
    >
      <Item
        key="customConfiguration"
        label="connection.configuration"
        regionProps={{ pt: 'sm' }}
        containerProps={{ mb: 0 }}
        textValue="connection.configuration"
      >
        <form data-id="connection-configuration-custom-form">
          <Box>
            <Text>other text</Text>
            <Text>another text</Text>
          </Box>
        </form>
      </Item>
    </AccordionGroup>
    <AccordionGroup
      defaultExpandedKeys={['customConfiguration1']}
    >
      <Item
        key="customConfiguration"
        label="connection.configuration1"
        regionProps={{ pt: 'sm' }}
        containerProps={{ mb: 0 }}
        textValue="connection.configuration1"
      >
        <form data-id="connection-configuration-custom-form">
          <Box>
            <Text>other text1</Text>
            <Text>another text1</Text>
          </Box>
        </form>
      </Item>
    </AccordionGroup>
  </Box>
));

const getComponentWithSlot = props => render((
  <AccordionGroup {...defaultProps} {...props}>
    <Item key="first" textValue="Duplicate" data-id="first" label="Accordion item" slots={props.slots}>
      <Text>Render me!</Text>
    </Item>
  </AccordionGroup>
));

test('button press uses callback', () => {
  const onPress = jest.fn();
  getComponent({ onExpandedChange: onPress });
  const buttons = screen.getAllByRole('button');
  const selectedItem = buttons[0];
  expect(selectedItem).not.toHaveClass('is-pressed');
  expect(onPress).not.toHaveBeenCalled();

  // Hold down the button to see pressed styles
  fireEvent.mouseDown(selectedItem);
  fireEvent.mouseUp(selectedItem);
  expect(onPress).toHaveBeenCalled();
});

test('toggle accordion on mouse click', () => {
  getComponent();
  const buttons = screen.getAllByRole('button');
  const selectedItem = buttons[0];
  expect(selectedItem).toHaveAttribute('aria-expanded', 'false');
  userEvent.click(selectedItem);
  expect(selectedItem).toHaveAttribute('aria-expanded', 'true');
  userEvent.click(selectedItem);
  expect(selectedItem).toHaveAttribute('aria-expanded', 'false');
});

test('allows users to open and close accordion item with enter / space key', () => {
  getComponent();
  const buttons = screen.getAllByRole('button');
  const selectedItem = buttons[0];
  expect(selectedItem).toHaveAttribute('aria-expanded', 'false');
  act(() => { selectedItem.focus(); });
  expect(selectedItem).toHaveFocus();

  fireEvent.keyDown(selectedItem, { key: 'Enter' });
  fireEvent.keyUp(selectedItem, { key: 'Enter' });
  expect(selectedItem).toHaveAttribute('aria-expanded', 'true');

  fireEvent.keyDown(selectedItem, { key: 'Enter' });
  fireEvent.keyUp(selectedItem, { key: 'Enter' });
  expect(selectedItem).toHaveAttribute('aria-expanded', 'false');
});

test('allows users to naviagte accordion headers through arrow keys', () => {
  getComponent();
  const buttons = screen.getAllByRole('button');
  const [firstItem, secondItem, thirdItem] = buttons;
  act(() => { firstItem.focus(); });

  expect(firstItem).toHaveFocus();
  fireEvent.keyDown(firstItem, { key: 'ArrowUp' });
  expect(firstItem).toHaveFocus();
  fireEvent.keyDown(firstItem, { key: 'ArrowDown' });
  expect(secondItem).toHaveFocus();
  fireEvent.keyDown(secondItem, { key: 'ArrowDown' });
  expect(thirdItem).toHaveFocus();
  fireEvent.keyDown(thirdItem, { key: 'ArrowDown' });
  expect(thirdItem).toHaveFocus();
  fireEvent.keyDown(thirdItem, { key: 'ArrowUp' });
  expect(secondItem).toHaveFocus();
});

test('allows users to navigate accordion headers through the tab key', () => {
  getComponent();
  const buttons = screen.getAllByRole('button');
  const [firstItem, secondItem, thirdItem] = buttons;
  userEvent.tab();
  expect(firstItem).toHaveFocus();
  userEvent.tab();
  expect(secondItem).toHaveFocus();
  userEvent.tab({ shift: true });
  expect(firstItem).toHaveFocus();
  userEvent.tab();
  expect(secondItem).toHaveFocus();
  userEvent.tab();
  expect(thirdItem).toHaveFocus();
  userEvent.tab();
  expect(firstItem).not.toHaveFocus();
  expect(secondItem).not.toHaveFocus();
  expect(thirdItem).not.toHaveFocus();
  userEvent.tab({ shift: true });
  expect(thirdItem).toHaveFocus();
});

test('disabled keys prop disables an accordion item', () => {
  getComponent({ disabledKeys: ['first'] });
  const button = screen.getByTestId('first');
  expect(button).toHaveClass('is-disabled');
});

test('default expanded keys expands an accordion item', () => {
  getComponent({ defaultExpandedKeys: ['first'] });
  const buttons = screen.getAllByRole('button');
  const selectedItem = buttons[0];
  expect(selectedItem).toHaveAttribute('aria-expanded', 'true');
});

test('expanded keys expands an accordion item', () => {
  getComponent({ expandedKeys: ['first'] });
  const buttons = screen.getAllByRole('button');
  const selectedItem = buttons[0];
  expect(selectedItem).toHaveAttribute('aria-expanded', 'true');
});

test('input recives focus in expanded accordion item when click', () => {
  getComponentWithInput({ expandedKeys: ['second'] });
  const input = screen.getByTestId('testInput');
  expect(input).not.toHaveFocus();
  userEvent.click(input);
  expect(input).toHaveFocus();
});

test('able to click a textfield that is the rendered child of an accordion', () => {
  getComponent({ expandedKeys: ['third'] });
  const field = screen.getByTestId('testField');
  const input = screen.getByRole('form');
  userEvent.click(input);
  userEvent.type(input, 'banana');
  expect(field).toHaveClass('has-focus-within');
});

test('Item accepts a data-id and the data-id can be found in the DOM', () => {
  getComponent();
  const buttons = screen.getAllByText('Accordion item');
  const selectedItem = buttons[0];
  const { parentElement } = selectedItem;
  expect(parentElement).toHaveAttribute('data-key', 'first');
});

test('items do not automatically expand if wrapped in an open OverlayPanel', () => {
  getComponentInOverlayPanel();
  const buttons = screen.getAllByRole('button');
  const selectedItem = buttons[0];
  expect(selectedItem).not.toHaveAttribute('aria-expanded', 'true');
});

test('accordion is compatible with another component that uses an overlay', () => {
  getComponentWithPopover();
  const buttons = screen.getAllByRole('button');
  const popoverButton = screen.getByTestId('popoverbutton');
  userEvent.click(popoverButton);
  const selectedItem = buttons[0];
  expect(selectedItem).toHaveAttribute('aria-expanded', 'true');
  userEvent.click(selectedItem);
  expect(selectedItem).toHaveAttribute('aria-expanded', 'false');
  userEvent.click(selectedItem);
  expect(selectedItem).toHaveAttribute('aria-expanded', 'true');
});

test('accordion works if there are multiple, controlled on the same implementation', () => {
  getComponentWithMultipleAccordion();
  const buttons = screen.getAllByRole('button');
  const selectedItem = buttons[0];
  const secondSelectedItem = buttons[1];
  expect(selectedItem).toHaveAttribute('aria-expanded', 'true');
  userEvent.click(selectedItem);
  expect(selectedItem).toHaveAttribute('aria-expanded', 'false');
  userEvent.click(selectedItem);
  expect(selectedItem).toHaveAttribute('aria-expanded', 'true');
  expect(secondSelectedItem).toHaveAttribute('aria-expanded', 'false');
  userEvent.click(secondSelectedItem);
  expect(secondSelectedItem).toHaveAttribute('aria-expanded', 'true');
  userEvent.click(secondSelectedItem);
  expect(secondSelectedItem).toHaveAttribute('aria-expanded', 'false');
});

// get the last char of heading tag and convert to number, 'h1' => 1
const getLabelHeadingLevel = labelHeading => Number(labelHeading.slice(-1));

test('when labelHeadingTag is h1, the label is rendered as an h1 tag', () => {
  const h1Tag = validHeadingTags[0];
  getComponent({ labelHeadingTag: h1Tag });

  screen.getAllByRole('heading', { level: getLabelHeadingLevel(h1Tag) });
});

test('when labelHeadingTag is h2, the label is rendered as an h2 tag', () => {
  const h2Tag = validHeadingTags[1];
  getComponent({ labelHeadingTag: h2Tag });

  screen.getAllByRole('heading', { level: getLabelHeadingLevel(h2Tag) });
});

test('when labelHeadingTag is h3, the label is rendered as an h3 tag', () => {
  const h3Tag = validHeadingTags[2];
  getComponent({ labelHeadingTag: h3Tag });

  screen.getAllByRole('heading', { level: getLabelHeadingLevel(h3Tag) });
});

test('when labelHeadingTag is h4, the label is rendered as an h4 tag', () => {
  const h4Tag = validHeadingTags[3];
  getComponent({ labelHeadingTag: h4Tag });

  screen.getAllByRole('heading', { level: getLabelHeadingLevel(h4Tag) });
});

test('when labelHeadingTag is uppercase, the label is rendered', () => {
  const h4Tag = validHeadingTags[3].toUpperCase();
  getComponent({ labelHeadingTag: h4Tag });

  screen.getAllByRole('heading', { level: getLabelHeadingLevel(h4Tag) });
});

test('renders Accordion component with slot', () => {
  getComponentWithSlot({ slots: { postHeading: <HelpHint data-testid="helpHint">Text of the popover right here...</HelpHint> } });
  expect(screen.getByTestId('helpHint')).toBeInTheDocument();
});
