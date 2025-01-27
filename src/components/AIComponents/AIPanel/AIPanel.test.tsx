import React, { useRef, useState } from 'react';
import DotsIcon from '@pingux/mdi-react/DotsHorizontalIcon';

import { useOverlayPanelState } from '../../../hooks';
import { Box, Button, Icon, IconButton, Item, Menu, OverlayProvider, PopoverMenu, Text } from '../../../index';
import { AIPanelProps } from '../../../types/aiPanel';
import { fireEvent, render, screen } from '../../../utils/testUtils/testWrapper';

import AIPanel from './AIPanel';
import AIPanelHeader from './AIPanelHeader';

const testId = 'test-overlayPanel';
const closeButtonId = 'close-button';
const defaultProps = {
  'data-testid': testId,
};

const slotText = 'slot text';

const AIMenuPopover = () => {
  return (
    <p>{slotText}</p>
  );
};

const Component = (props: {slots?: {menuSlot?: React.ReactNode}}) => {
  const { slots } = props;
  const { state, onClose } = useOverlayPanelState({ transitionDuration: 1000 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const onPanelClose = () => {
    state.close();
    onClose();
  };

  const setIsPanelExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <Box
      sx={{
        maxWidth: state.isOpen ? 'calc(100% - 420px)' : '100%',
        transition: '.4s all ease',
      }}
    >
      <Button
        ref={triggerRef}
        onPress={state.open}
        aria-expanded={state.isOpen}
      >
        Open Panel
      </Button>
      <AIPanel
        triggerRef={triggerRef}
        isExpanded={isExpanded}
        setIsExpanded={setIsPanelExpanded}
        onPanelClose={onPanelClose}
        {...defaultProps}
        state={state}
      >
        <AIPanelHeader
          slots={slots}
          isExpanded={isExpanded}
          setIsExpanded={setIsPanelExpanded}
          onPanelClose={onPanelClose}
        />
        AI Component Children will render here
      </AIPanel>
    </Box>
  );
};

test('AIPanel renders correctly', () => {
  render(<Component />);
  expect(screen.getByText('Open Panel')).toBeInTheDocument();
});

test('AIPanel opens and closes correctly', () => {
  render(<Component />);
  const openButton = screen.getByText('Open Panel');
  fireEvent.click(openButton);
  expect(screen.getByTestId(testId)).toBeInTheDocument();

  const closeButton = screen.getByTestId(closeButtonId);
  fireEvent.click(closeButton);
  expect(screen.queryByTestId(testId)).not.toHaveClass('is-open');
});

test('AIPanel expands and collapses correctly', () => {
  render(<Component />);
  const openButton = screen.getByText('Open Panel');
  fireEvent.click(openButton);
  expect(screen.getByTestId(testId)).toBeInTheDocument();

  const expandButton = screen.getByTestId('expand-button');
  fireEvent.click(expandButton);
  expect(screen.getByTestId(testId)).toHaveClass('is-full');

  fireEvent.click(expandButton);
  expect(screen.getByTestId(testId)).not.toHaveClass('is-full');
});

test('AIPanel menuSlot renders correctly', () => {
  render(<Component slots={{ menuSlot: <AIMenuPopover /> }} />);
  const openButton = screen.getByText('Open Panel');
  fireEvent.click(openButton);
  expect(screen.getByTestId(testId)).toBeInTheDocument();

  const thisSlot = screen.getByText(slotText);
  expect(thisSlot).toBeInTheDocument();
});
