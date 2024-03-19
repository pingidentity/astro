import React from 'react';
import userEvent from '@testing-library/user-event';

import { Modal, OverlayProvider } from '../../../index';
import { ModalProps } from '../../../types/Modal';
import { render, screen } from '../../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../../utils/testUtils/universalComponentTest';

// For testing the modal alone
const getComponent = (props: ModalProps = {}) => render((
  <OverlayProvider>
    <Modal {...props} />
  </OverlayProvider>
));

// **********
// Unit tests
// **********

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <Modal {...props} /> });

test('default modal', () => {
  getComponent();
  expect(screen.queryByRole('dialog')).toBeInTheDocument();
  expect(screen.queryByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  // Close button not rendered by default
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('should spread undocumented props to the container element', () => {
  getComponent({ 'data-testid': 'test' });
  const container = screen.queryByTestId('test');
  const modal = screen.getByRole('dialog');
  expect(container).toContainElement(modal);
  expect(modal).not.toHaveAttribute('data-testid', 'test');
});

test('should spread container props to the container element even if documented', () => {
  getComponent({ containerProps: { 'data-testid': 'test' } });
  const container = screen.queryByTestId('test');
  const modal = screen.getByRole('dialog');
  expect(container).toContainElement(modal);
  expect(modal).not.toHaveAttribute('data-testid', 'test');
});

test('should spread content props to the modal dialog even if undocumented', () => {
  getComponent({ contentProps: { 'data-testid': 'test' } });
  const modal = screen.getByRole('dialog');
  expect(modal).toHaveAttribute('data-testid', 'test');
});

test('should display title for modal', () => {
  const title = 'my title';
  getComponent({ title });
  expect(screen.queryByText(title)).toBeInTheDocument();
});

test('should hide the modal if clicked outside when isDismissable is true', () => {
  const onClose = jest.fn();
  getComponent({ isOpen: true, onClose, isDismissable: true });
  expect(screen.queryByRole('dialog')).toBeInTheDocument();
  expect(onClose).not.toHaveBeenCalled();

  userEvent.click(document.body);
  expect(onClose).toHaveBeenCalledTimes(1);
});

test('should not hide the modal if clicked outside when isDismissable is false', () => {
  const onClose = jest.fn();
  getComponent({ isOpen: true, onClose });
  expect(screen.queryByRole('dialog')).toBeInTheDocument();
  expect(onClose).not.toHaveBeenCalled();

  userEvent.click(document.body);
  expect(onClose).not.toHaveBeenCalledTimes(1);
});

test('should hide the overlay when clicking outside if shouldCloseOnInteractOutside returns true', () => {
  const onClose = jest.fn();
  const shouldCloseOnInteractOutside = target => target === document.body;
  getComponent({ isOpen: true, isDismissable: true, onClose, shouldCloseOnInteractOutside });
  expect(onClose).not.toHaveBeenCalled();

  userEvent.click(document.body);
  expect(onClose).toHaveBeenCalledTimes(1);
});

test('should not hide the overlay when clicking outside if shouldCloseOnInteractOutside returns false', () => {
  const onClose = jest.fn();
  const shouldCloseOnInteractOutside = target => target !== document.body;
  getComponent({ isOpen: true, isDismissable: true, onClose, shouldCloseOnInteractOutside });
  expect(onClose).not.toHaveBeenCalled();

  userEvent.click(document.body);
  expect(onClose).not.toHaveBeenCalledTimes(1);
});

test('should hide the overlay when pressing the escape key', () => {
  const onClose = jest.fn();
  // isDismissable does not need to be true here
  getComponent({ isOpen: true, onClose });
  const modal = screen.getByRole('dialog');
  expect(onClose).not.toHaveBeenCalled();

  userEvent.type(modal, '{esc}');
  expect(onClose).toHaveBeenCalledTimes(1);
});

test('should only hide the top-most overlay', () => {
  const onCloseFirst = jest.fn();
  const onCloseSecond = jest.fn();
  getComponent({ isOpen: true, onClose: onCloseFirst, isDismissable: true });
  const { unmount } = getComponent({ isOpen: true, onClose: onCloseSecond, isDismissable: true });

  userEvent.click(document.body);
  expect(onCloseSecond).toHaveBeenCalledTimes(1);
  expect(onCloseFirst).not.toHaveBeenCalled();

  unmount();

  userEvent.click(document.body);
  expect(onCloseFirst).toHaveBeenCalledTimes(1);
});

test('should render a close button if hasCloseButton is true', () => {
  getComponent({ hasCloseButton: true });
  expect(screen.queryByRole('button')).toBeInTheDocument();
});

test('should render a custom close button if hasCloseButton is true and custom button is provided', () => {
  const MyButton = () => <div data-testid="test" />;
  getComponent({ hasCloseButton: true, closeButton: <MyButton /> });
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
  expect(screen.queryByTestId('test')).toBeInTheDocument();
});

test('shouldn\'t auto focus the first tabbable element', () => {
  getComponent({ hasCloseButton: true });
  const button = screen.queryByRole('button');
  expect(button).not.toHaveFocus();
});

test('should auto focus the first tabbable element if "hasAutoFocus" is true', () => {
  getComponent({ hasCloseButton: true, hasAutoFocus: true });
  const button = screen.queryByRole('button');
  expect(button).toHaveFocus();
});

test('should render sizes correctly with passed size prop', () => {
  const { unmount: xsUnmount } = getComponent({ size: 'extra-small' });
  const xsModal = screen.getByRole('dialog');
  expect(xsModal).toHaveClass('is-extra-small');
  xsUnmount();

  const { unmount: sUnmount } = getComponent({ size: 'small' });
  const sModal = screen.getByRole('dialog');
  expect(sModal).toHaveClass('is-small');
  sUnmount();

  const { unmount: mUnmount } = getComponent({ size: 'medium' });
  const mModal = screen.getByRole('dialog');
  expect(mModal).toHaveClass('is-medium');
  mUnmount();

  const { unmount: lUnmount } = getComponent({ size: 'large' });
  const lModal = screen.getByRole('dialog');
  expect(lModal).toHaveClass('is-large');
  lUnmount();

  getComponent({ size: 'full' });
  const fModal = screen.getByRole('dialog');
  expect(fModal).toHaveClass('is-full');
});
