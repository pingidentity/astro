import React from 'react';
import { OverlayTriggerState } from 'react-stately';
import { render, screen } from '@testing-library/react';

import { PopoverProps } from '../../types';
import Box from '../Box';

import Popover from './Popover';

const mockState = (isOpen: boolean): OverlayTriggerState => ({
  isOpen,
  close: jest.fn(),
  open: jest.fn(),
  toggle: jest.fn(),
  setOpen: jest.fn(),
});

const triggerRef = React.createRef<HTMLButtonElement>();

const defaultProps: PopoverProps = {
  'data-testid': 'popover',
  state: mockState(true),
  triggerRef,
};

const getComponent = (props = {}) => render((
  <Popover {...defaultProps} {...props}>
    <Box data-testid="popover-children">I am in a popover</Box>
  </Popover>
));

describe('Popover', () => {
  test('does not render when isOpen is false', () => {
    getComponent({ state: mockState(false) });
    expect(screen.queryByTestId('popover')).not.toBeInTheDocument();
  });

  test('renders when isOpen is true', () => {
    getComponent({ state: mockState(true) });
    expect(screen.getByTestId('popover')).toBeInTheDocument();
    expect(screen.getByTestId('popover-children')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    getComponent({ state: mockState(true), className: 'custom-class' });
    expect(screen.getByTestId('popover')).toHaveClass('custom-class');
  });

  test('applies custom width', () => {
    getComponent({ state: mockState(true), width: 300 });
    expect(screen.getByTestId('popover')).toHaveStyle({ width: '300px' });
  });

  test('renders underlay and DismissButton when isNonModal is false', () => {
    getComponent({ state: mockState(true), isNonModal: false });
    expect(screen.getByTestId('popover').parentElement?.querySelector('div')).toBeTruthy();
    expect(screen.getByTestId('popover')).toBeInTheDocument();
  });
});
