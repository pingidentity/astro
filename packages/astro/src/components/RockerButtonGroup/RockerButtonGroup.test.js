import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import RockerButtonGroup, { Item } from './RockerButtonGroup';


const testId = 'testId';
const testButtons = [
  { name: 'And', key: 'And', keyColor: '#640099' },
  { name: 'Or', key: 'Or', keyColor: '#4660A2' },
  { name: 'Maybe?', key: 'Maybe?', keyColor: 'accent.30' },
];
const defaultProps = {
  'data-testid': testId,
  defaultSelectedKey: testButtons[0].name,
};
const getComponent = (props = {}, { buttons = testButtons, renderFn = render } = {}) => renderFn((
  <RockerButtonGroup {...defaultProps} {...props} data-id="test-container">
    {buttons.map(button => (
      <Item
        title={button.name}
        key={button.key}
        keyColor={button.keyColor}
      />
    ))}
  </RockerButtonGroup>
));

test('renders rocker container with buttons', () => {
  getComponent();
  const rockerContainer = document.querySelector("[data-id='test-container']");
  expect(rockerContainer).toBeInTheDocument();
  const buttons = screen.getAllByRole('button');
  expect(buttons).toHaveLength(3);
});

test('buttonGroup is not disabled by default', () => {
  getComponent();
  const rockerContainer = document.querySelector("[data-id='test-container']");
  expect(rockerContainer).not.toBeDisabled();

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

test('rockerButton renders colorKey prop when selected', () => {
  getComponent();
  const buttonColorKey = screen.getByText(testButtons[0].key);
  expect(buttonColorKey).toHaveClass('is-selected');
  expect(buttonColorKey).toHaveStyleRule('background-color', '#640099');
});

test('rockerButton renders defaultSelected prop, only default selected button has selected styling', () => {
  getComponent();
  const buttonSelectedKey = screen.getByText(testButtons[0].key);
  expect(buttonSelectedKey).toHaveStyleRule('background-color', '#640099');

  // unselected buttons should have inactive grey background
  const button1 = screen.getByText(testButtons[1].key);
  expect(button1).toHaveStyleRule('background-color', '#e5e9f8');
  const button2 = screen.getByText(testButtons[2].key);
  expect(button2).toHaveStyleRule('background-color', '#e5e9f8');
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
