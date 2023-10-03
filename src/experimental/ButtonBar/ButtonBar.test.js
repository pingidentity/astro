import React from 'react';

import { Button, ButtonBar } from '../..';
import axeTest from '../../utils/testUtils/testAxe';
import { render, screen } from '../../utils/testUtils/testWrapper';

const testId = 'test-ButtonBar';

const defaultProps = { 'data-testid': testId };

const getComponent = (props = {}) => render(
  <ButtonBar {...defaultProps} {...props}>
    <Button
      variant="primary"
      data-id="save-button"
      onPress={() => alert('Save button pressed')}
    >
      Save
    </Button>
    <Button
      variant="link"
      data-id="cancel-button"
      onPress={() => alert('Cancel button pressed')}
    >
      Cancel
    </Button>
  </ButtonBar>,
);

const getComponentCustomChildren = (props = {}) => render(
  <ButtonBar {...defaultProps} {...props}>
    <button>custom text</button>
    <button>Also custom text</button>
  </ButtonBar>,
);

const getComponentTextChildren = (props = {}) => render((
  <ButtonBar {...props}>
    custom text
  </ButtonBar>
));

axeTest(getComponent);

afterEach(() => {
  jest.resetAllMocks();
});

test('ButtonBar does render', () => {
  getComponent({});
  const element = screen.getByTestId(testId);
  expect(element).toBeInTheDocument();
});

test('renders child save and cancel buttons', () => {
  getComponent();

  const saveButton = screen.getByText('Save');
  expect(saveButton).toBeInTheDocument();

  const cancelButton = screen.getByText('Cancel');
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

test('justify-content right when align prop set to right', () => {
  getComponent({ align: 'right' });
  const element = screen.getByTestId(testId);

  expect(element).toHaveStyleRule('justify-content', 'right');
});

test('justify-content left when align prop is set to left', () => {
  getComponent({ align: 'left' });
  const element = screen.getByTestId(testId);

  expect(element).toHaveStyleRule('justify-content', 'left');
});

test('justify-content left when align prop is excluded', () => {
  getComponent();
  const element = screen.getByTestId(testId);

  expect(element).toHaveStyleRule('justify-content', 'left');
});

test('an error is thrown when align has invalid prop value', () => {
  expect(() => getComponent({ align: 'rihgt' })).toThrow('Failed prop type');
});
