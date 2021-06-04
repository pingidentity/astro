import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent } from '../../utils/testUtils/testWrapper';
import IconButton from '.';

const iconTestId = 'test-icon';
const EditIcon = props => (
  <svg data-testid={iconTestId} viewBox="0 0 24 24" {...props}>
    <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
  </svg>
);

const testId = 'test-button';
const defaultProps = {
  'data-testid': testId,
  icon: EditIcon,
};
const getComponent = (props = {}) => render((
  <IconButton {...defaultProps} {...props} />
));

test('default icon button', () => {
  getComponent();
  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('data-testid', testId);
  expect(button).toBeInstanceOf(HTMLDivElement);
  expect(button).toHaveAttribute('tabindex', '0');
  expect(button).toBeInTheDocument();
});

test('iconProps size prop changes button size', () => {
  const props = {
    size: '22px',
  };
  getComponent(props);
  const button = screen.getByRole('button');
  expect(button).toHaveStyleRule('width', props.size);
});

test('icon button hover', () => {
  getComponent();
  const button = screen.getByRole('button');
  expect(button).not.toHaveClass('is-hovered');
  userEvent.hover(button);
  expect(button).toHaveClass('is-hovered');
  userEvent.unhover(button);
  expect(button).not.toHaveClass('is-hovered');
});

test('icon button press', () => {
  const onPress = jest.fn();
  getComponent({ onPress });
  const button = screen.getByRole('button');
  expect(onPress).not.toHaveBeenCalled();

  // Hold down the button to see pressed styles
  fireEvent.mouseDown(button);
  expect(button).toHaveClass('is-pressed');

  // Finish the click to fire the event handler
  fireEvent.mouseUp(button);
  expect(button).not.toHaveClass('is-pressed');
  expect(onPress).toHaveBeenCalledTimes(1);
});

test('keyboard icon button press', () => {
  const onPress = jest.fn();
  getComponent({ onPress });
  const button = screen.getByRole('button');
  expect(onPress).not.toHaveBeenCalled();

  fireEvent.keyDown(button, { key: 'Enter', code: 13 });
  expect(button).toHaveClass('is-pressed');

  fireEvent.keyUp(button, { key: 'Enter', code: 13 });
  expect(button).not.toHaveClass('is-pressed');
  expect(onPress).toHaveBeenCalledTimes(1);
});

test('button focus', () => {
  getComponent();
  const button = screen.getByRole('button');
  expect(button).not.toHaveFocus();
  expect(button).not.toHaveClass('is-focused');

  userEvent.tab();
  expect(button).toHaveFocus();
  expect(button).toHaveClass('is-focused');
});
