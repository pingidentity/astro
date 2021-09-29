import React from 'react';
import userEvent from '@testing-library/user-event';
import axeTest from '../../utils/testUtils/testAxe';
import { fireEvent, queryByAttribute, render, screen } from '../../utils/testUtils/testWrapper';
import RockerButtonGroup from './RockerButtonGroup';
import RockerButton from '../RockerButton';


const testId = 'testId';
const testButtons = [
  { name: 'And', key: 'And', selectedStyles: { bg: '#640099' } },
  { name: 'Or', key: 'Or' },
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

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('renders rocker container with buttons', () => {
  getComponent();
  const rockerContainer = queryByAttribute('data-id', document, 'test-container');
  expect(rockerContainer).toBeInTheDocument();
  const buttons = screen.getAllByRole('button');
  expect(buttons).toHaveLength(3);
});

test('buttonGroup is not disabled by default', () => {
  getComponent();
  const rockerContainer = queryByAttribute('data-id', document, 'test-container');
  expect(rockerContainer).toBeEnabled();

  testButtons.forEach((button) => {
    const buttonKey = screen.getByText(button.key);
    expect(buttonKey).not.toHaveClass('is-disabled');
  });
});

test('each button is disabled when isDisabled prop is passed to RockerButtonGroup', () => {
  getComponent({ isDisabled: true });
  testButtons.forEach((button) => {
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
  // FIXME: Keyboard events must fire twice tests - unsure why at this time.
  userEvent.tab();
  userEvent.tab();
  const button0 = screen.getByText(testButtons[0].key);
  expect(button0).toHaveClass('is-selected');
  const button1 = screen.getByText(testButtons[1].key);
  expect(button1).not.toHaveClass('is-selected');

  userEvent.tab();
  userEvent.tab();
  fireEvent.keyDown(screen.getByText(testButtons[0].key), { key: 'ArrowRight', code: 'ArrowRight' });
  fireEvent.keyDown(screen.getByText(testButtons[1].key), { key: 'ArrowRight', code: 'ArrowRight' });
  expect(screen.getByText(testButtons[1].key)).toHaveClass('is-selected');
  expect(screen.getByText(testButtons[0].key)).not.toHaveClass('is-selected');
});
