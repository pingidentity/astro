import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import PromptUploadButton from './PromptUploadButton';

const defaultProps = {
  isLoading: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
  value: '',
  uploadButtonContainerProps: {},
};

const getComponent = (props = {}) => render(
  <PromptUploadButton {...defaultProps} {...props} />,
);

test('PromptUploadButton is disabled when value is empty and isLoading is false', () => {
  getComponent();
  const button = screen.getByRole('button', { name: /upload chat/i });
  expect(button).toBeDisabled();
});

test('PromptUploadButton is enabled when value is not empty and isLoading is false', () => {
  getComponent({ value: 'test value' });
  const button = screen.getByRole('button', { name: /upload chat/i });
  expect(button).not.toHaveClass('is-disabled');
});

test('PromptUploadButton is enabled when isLoading is true', () => {
  getComponent({ isLoading: true });
  const button = screen.getByRole('button', { name: /upload chat/i });
  expect(button).not.toHaveClass('is-disabled');
});

test('PromptUploadButton calls onSubmit when clicked and isLoading is false', () => {
  const onSubmit = jest.fn();
  getComponent({ value: 'test value', onSubmit });
  const button = screen.getByRole('button', { name: /upload chat/i });
  fireEvent.click(button);
  expect(onSubmit).toHaveBeenCalled();
});

test('PromptUploadButton calls onCancel when clicked and isLoading is true', () => {
  const onCancel = jest.fn();
  getComponent({ isLoading: true, onCancel });
  const button = screen.getByRole('button', { name: /upload chat/i });
  fireEvent.click(button);
  expect(onCancel).toHaveBeenCalled();
});
