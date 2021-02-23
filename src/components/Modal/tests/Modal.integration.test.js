import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent } from '../../../utils/testUtils/testWrapper';
import Modal, { OverlayProvider } from '../Modal';
import { useModalState } from '../../../hooks';
import Button from '../../Button';

// For testing the connection between the state hook, the trigger, and the modal itself
/* eslint-disable react/prop-types */
const ComposedComponent = (props) => {
  const { defaultState, modalProps } = props;
  const state = useModalState(defaultState);

  return (
    <>
      <Button onPress={state.open} />

      {
        state.isOpen &&
        <OverlayProvider>
          <Modal
            isOpen={state.isOpen}
            onClose={state.close}
            isDismissable
            hasCloseButton
            {...modalProps}
          />
        </OverlayProvider>
      }
    </>
  );
};
const getComposedComponent = (defaultState, modalProps) => (
  render(<ComposedComponent defaultState={defaultState} modalProps={modalProps} />)
);

test('clicking the trigger should open the modal', () => {
  getComposedComponent();
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  // Open it with the button trigger
  userEvent.click(screen.queryByRole('button'));
  expect(screen.queryByRole('dialog')).toBeInTheDocument();
});

test('keyboard interaction with the trigger should open the modal', () => {
  getComposedComponent();
  const button = screen.queryByRole('button');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  // Open it with the button trigger
  fireEvent.keyDown(button, { key: 'Enter', code: 13 });
  fireEvent.keyUp(button, { key: 'Enter', code: 13 });
  expect(screen.queryByRole('dialog')).toBeInTheDocument();
});

test('close button should close the modal', () => {
  getComposedComponent({ isDefaultOpen: true });

  // Target the close button
  userEvent.click(screen.queryAllByRole('button')[1]);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('keyboard interactions on the close button should close the modal', () => {
  getComposedComponent({ isDefaultOpen: true });

  // Target the close button
  fireEvent.keyDown(screen.queryAllByRole('button')[1], { key: 'Enter', code: 13 });
  fireEvent.keyUp(screen.queryAllByRole('button')[1], { key: 'Enter', code: 13 });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
