import React from 'react';
import userEvent from '@testing-library/user-event';

import { useModalState } from '../../../hooks';
import { Button, Modal, OverlayProvider } from '../../../index';
import { fireEvent, render, screen } from '../../../utils/testUtils/testWrapper';

// For testing the connection between the state hook, the trigger, and the modal itself
/* eslint-disable react/prop-types */
const ComposedComponent = props => {
  const { defaultState, modalProps } = props;
  const state = useModalState(defaultState);

  return (
    <>
      <Button onPress={state.open} />

      {
        state.isOpen
        && (
          <OverlayProvider>
            <Modal
              isOpen={state.isOpen}
              onClose={state.close}
              isDismissable
              hasCloseButton
              {...modalProps}
            />
          </OverlayProvider>
        )
      }
    </>
  );
};

const ComposedComponentWithTransition = props => {
  const { defaultState, modalProps } = props;
  const state = useModalState(defaultState);

  return (
    <>
      <Button onPress={state.open} />
      {
        (state.isOpen || state.isTransitioning)
        && (
          <OverlayProvider>
            <Modal
              isOpen={state.isOpen}
              onClose={state.close}
              isDismissable
              hasCloseButton
              state={state}
              {...modalProps}
            />
          </OverlayProvider>
        )
      }
    </>
  );
};
const getComposedComponent = (defaultState = {}, modalProps = {}) => (
  render(<ComposedComponent defaultState={defaultState} modalProps={modalProps} />)
);
const getComposedComponentWithTransition = (defaultState = {}, modalProps = {}) => (
  render(<ComposedComponentWithTransition defaultState={defaultState} modalProps={modalProps} />)
);

test('clicking the trigger should open the modal', () => {
  getComposedComponent();
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  // Open it with the button trigger
  userEvent.click(screen.getByRole('button'));
  expect(screen.queryByRole('dialog')).toBeInTheDocument();
});

test('keyboard interaction with the trigger should open the modal', () => {
  getComposedComponent();
  const button = screen.getByRole('button');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  // Open it with the button trigger
  fireEvent.keyDown(button, { key: 'Enter', code: 13 });
  fireEvent.keyUp(button, { key: 'Enter', code: 13 });
  expect(screen.queryByRole('dialog')).toBeInTheDocument();
});

test('close button should close the modal', () => {
  getComposedComponent({ isDefaultOpen: true });

  // Target the close button
  userEvent.click(screen.queryAllByRole('button')[0]);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('keyboard interactions on the close button should close the modal', () => {
  getComposedComponent({ isDefaultOpen: true });

  // Target the close button
  fireEvent.keyDown(screen.queryAllByRole('button')[0], { key: 'Enter', code: 13 });
  fireEvent.keyUp(screen.queryAllByRole('button')[0], { key: 'Enter', code: 13 });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('assign aria-hidden to elements outside the modal when the modal is opened', () => {
  getComposedComponent();
  const button = screen.getByRole('button');
  const buttonParent = button.closest('div');

  expect(buttonParent).not.toHaveAttribute('aria-hidden');

  // Open the modal
  userEvent.click(screen.getByRole('button'));
  expect(buttonParent).toHaveAttribute('aria-hidden');
});

test('is-transitioining class is applied', () => {
  getComposedComponentWithTransition();

  userEvent.click(screen.getByRole('button'));

  expect(screen.getByRole('dialog')).toHaveClass('is-transitioning');
});
