import React from 'react';

import { Button, ButtonBar } from '../../index';
import { ButtonBarProps } from '../../types';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

const testId = 'test-ButtonBar';

const defaultProps: ButtonBarProps = { 'data-testid': testId };

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

const getComponentCustomChildren = (props: ButtonBarProps = {}) => render(
  <ButtonBar {...defaultProps} {...props}>
    <button type="button">custom text</button>
    <button type="button">Also custom text</button>
  </ButtonBar>,
);

const getComponentTextChildren = (props: ButtonBarProps = {}) => render((
  <ButtonBar {...props}>
    custom text
  </ButtonBar>
));

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <ButtonBar {...props} /> });

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
