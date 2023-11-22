import React, { useRef } from 'react';
import userEvent from '@testing-library/user-event';

import { Button, OverlayPanel, OverlayProvider } from '../..';
import { render, screen } from '../../utils/testUtils/testWrapper';
import useOverlayPanelState from '../useOverlayPanelState/useOverlayPanelState';

const overlayTestId = 'overlay-test';
const buttonTestId = 'button-test';
const closeButtonTestId = 'close-button-test';

const defaultOverlayProps = {
  'data-testid': overlayTestId,
};

const defaultButtonProps = {
  'data-testid': buttonTestId,
};

const defaultCloseButtonProps = {
  'data-testid': closeButtonTestId,
};

const ControlledWithTransition = () => {
  const { state, onClose } = useOverlayPanelState();
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay is open.
    <OverlayProvider>
      <Button
        ref={triggerRef}
        onPress={state.open}
        aria-expanded={state.isOpen}
        {...defaultButtonProps}
      >
        Open Panel
      </Button>
      {(state.isOpen || state.isTransitioning)
        && (
          <OverlayPanel
            isOpen={state.isOpen}
            isTransitioning={state.isTransitioning}
            state={state}
            triggerRef={triggerRef}
            {...defaultOverlayProps}
          >
            <div>
              <Button
                onPress={() => { onClose(state, triggerRef); }}
                aria-expanded={state.isOpen}
                {...defaultCloseButtonProps}
              >
                Close Panel
              </Button>
              <p padding-top="md">
                {JSON.stringify(state.isOpen)}
              </p>
            </div>
          </OverlayPanel>
        )}
    </OverlayProvider>
  );
};

test('default return', () => {
  render(<ControlledWithTransition />);
  const button = screen.getByTestId(buttonTestId);
  userEvent.click(button);
  expect(screen.getByTestId(overlayTestId)).toHaveClass('is-transitioning');
  userEvent.click(button);
  expect(screen.getByTestId(overlayTestId)).toHaveClass('is-transitioning');
  setTimeout(() => {
    expect(screen.getByTestId(overlayTestId)).not.toHaveClass('is-transitioning');
  }, 501);
});
