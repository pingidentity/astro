import React from 'react';
import userEvent from '@testing-library/user-event';

import { RockerButton, RockerButtonGroup } from '../../index';
import { fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';


const testId = 'testId';
const testButtons = [
  { name: 'And', key: 'And', selectedStyles: { bg: '#640099' } },
  { name: 'Or', key: 'Or', selectedStyles: { bg: 'accent.30' } },
  { name: 'Maybe?', key: 'Maybe?' },
];
const defaultProps = {
  'data-testid': testId,
  defaultSelectedKey: testButtons[0].name,
};
const getComponent = (props = {}, { buttons = testButtons, renderFn = render } = {}) => renderFn((
  <RockerButtonGroup {...defaultProps} {...props} data-id="test-container">
    {buttons.map(button => (
      <RockerButton
        title={button.name}
        key={button.key}
        selectedStyles={button.selectedStyles}
      />
    ))}
  </RockerButtonGroup>
));

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <RockerButtonGroup {...props}>
      <RockerButton
        title={testButtons[0].name}
        key={testButtons[0].key}
        selectedStyles={testButtons[0].selectedStyles}
      />
    </RockerButtonGroup>
  ),
});

test('renders rocker container with buttons', () => {
  getComponent();
  const rockerContainer = screen.getByTestId(testId);
  expect(rockerContainer).toBeInTheDocument();
  const buttons = screen.getAllByRole('button');
  expect(buttons).toHaveLength(3);
});

test('buttonGroup is not disabled by default', () => {
  getComponent();
  const rockerContainer = screen.getByTestId(testId);
  expect(rockerContainer).toBeEnabled();

  testButtons.forEach(button => {
    const buttonKey = screen.getByText(button.key);
    expect(buttonKey).not.toHaveClass('is-disabled');
  });
});

test('rocker button is disabled when its key is included in disabledKeys', () => {
  getComponent({ disabledKeys: testButtons.map(button => button.key) });
  testButtons.forEach(button => {
    const buttonKey = screen.getByText(button.key);
    expect(buttonKey).toHaveClass('is-disabled');
  });
});

test('rockerButton renders selectedStyles prop when selected', () => {
  getComponent();
  const buttonColorKey = screen.getByText(testButtons[0].key);
  expect(buttonColorKey).toHaveClass('is-selected');
});

test('selected button can be changed by keyboard interaction', () => {
  getComponent();
  userEvent.tab();
  const button0 = screen.getByText(testButtons[0].key);
  expect(button0).toHaveClass('is-selected');
  const button1 = screen.getByText(testButtons[1].key);
  expect(button1).not.toHaveClass('is-selected');
  fireEvent.keyDown(screen.getByText(testButtons[0].key), { key: 'ArrowRight', code: 'ArrowRight' });
  expect(screen.getByText(testButtons[1].key)).toHaveClass('is-selected');
  expect(screen.getByText(testButtons[0].key)).not.toHaveClass('is-selected');
});

test('rockerButton renders correct darker bg when selectedStyles prop is passed', () => {
  getComponent();
  const button0 = screen.getByText(testButtons[0].key);
  expect(button0).toHaveClass('is-selected');
  expect(button0).toHaveStyle('background-color: #640099');
  userEvent.hover(button0);
  expect(button0).toHaveClass('is-selected');
  expect(button0).toHaveClass('is-hovered');
  expect(button0).toHaveStyle('background-color: #590089');
  fireEvent.keyDown(button0, { key: 'Enter', code: 13 });
  expect(button0).toHaveClass('is-selected');
  expect(button0).toHaveClass('is-pressed');
  expect(button0).toHaveStyle('background-color: #4d0077');
});

test('rockerButton renders correct bg when selectedStyles prop is css variable', () => {
  getComponent();
  const button1 = screen.getByText(testButtons[1].key);
  fireEvent.keyDown(screen.getByText(testButtons[0].key), { key: 'ArrowRight', code: 'ArrowRight' });
  userEvent.hover(button1);
  expect(button1).toHaveClass('is-selected');
  expect(button1).toHaveClass('is-hovered');
  expect(button1).toHaveStyle('background-color: #364872');
  fireEvent.keyDown(button1, { key: 'Enter', code: 13 });
  expect(button1).toHaveClass('is-selected');
  expect(button1).toHaveClass('is-pressed');
  expect(button1).toHaveStyle('background-color: #2e3e63');
});
