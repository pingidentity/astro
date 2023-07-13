import React from 'react';

import axeTest from '../../utils/testUtils/testAxe';
import { render, screen } from '../../utils/testUtils/testWrapper';

import SaveBar from '.';

const testId = 'test-SaveBar';

const saveButtonProps = { key: 'save button', text: 'Save', onPress: () => alert('Save button pressed') };
const cancelButtonProps = { key: 'cancel button', text: 'Cancel', onPress: () => alert('Cancel button pressed') };
const refreshButtonProps = { key: 'refresh button', text: 'Refresh', onPress: () => alert('Refresh button pressed') };

const defaultProps = { 'data-testid': testId, saveButtonProps, cancelButtonProps };

const getComponent = (props = {}) => render((
  <SaveBar {...defaultProps} {...props} />
));

const getComponentCustomChildren = (props = {}) => render((
  <SaveBar {...defaultProps} {...props}>
    <button>custom text</button>
    <button>Also custom text</button>
  </SaveBar>
));

const getComponentTextChildren = (props = {}) => render((
  <SaveBar {...props}>
    custom text
  </SaveBar>
));

axeTest(getComponent);

afterEach(() => {
  jest.resetAllMocks();
});

test('SaveBar does render', () => {
  getComponent({});
  const element = screen.getByTestId(testId);
  expect(element).toBeInTheDocument();
});

test('renders save and cancel buttons', () => {
  getComponent();

  const saveButton = screen.getByText(saveButtonProps.text);
  expect(saveButton).toBeInTheDocument();

  const cancelButton = screen.getByText(cancelButtonProps.text);
  expect(cancelButton).toBeInTheDocument();
});

test('renders all three buttons', () => {
  getComponent({ refreshButtonProps });

  const saveButton = screen.getByText(saveButtonProps.text);
  expect(saveButton).toBeInTheDocument();

  const refreshButton = screen.getByText(refreshButtonProps.text);
  expect(refreshButton).toBeInTheDocument();

  const cancelButton = screen.getByText(cancelButtonProps.text);
  expect(cancelButton).toBeInTheDocument();
});

test('renders custom children', () => {
  getComponentCustomChildren();
  const firstButton = screen.getByText('custom text');
  const secondButton = screen.getByText('Also custom text');

  expect(firstButton).toBeInTheDocument();
  expect(secondButton).toBeInTheDocument();
});

test('renders custom text', () => {
  getComponentTextChildren();
  const firstText = screen.getByText('custom text');

  expect(firstText).toBeInTheDocument();
});

test('isJustifiedRight reverses order of button', () => {
  getComponent({ isJustifiedRight: true });
  const buttons = screen.getAllByRole('button');
  expect(buttons[0]).toHaveAttribute('data-id', 'cancel-button');
});
