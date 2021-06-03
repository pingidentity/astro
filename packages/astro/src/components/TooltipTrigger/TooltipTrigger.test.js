import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent } from '../../utils/testUtils/testWrapper';
import theme from '../../styles/theme';
import {
  Button,
  TooltipTrigger,
  Tooltip,
} from '../../index';

const getComponent = (props = {}) => render((
  <>
    <TooltipTrigger {...props}>
      <Button>Mock Button</Button>
      <Tooltip>Tooltip Content</Tooltip>
    </TooltipTrigger>
  </>
));

test('tooltip doesnt show by default and is rendered when trigger is hovered', () => {
  getComponent();
  const button = screen.getByRole('button');
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

  fireEvent.mouseMove(button);
  fireEvent.mouseEnter(button);
  expect(screen.queryByRole('tooltip')).toBeInTheDocument();
});

test('renders a tooltip when trigger is focused with keyboard', async () => {
  getComponent();
  const button = screen.getByRole('button');
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

  expect(button).not.toHaveFocus();
  expect(button).not.toHaveStyle(`box-shadow: ${theme.shadows.focus}`);

  userEvent.tab();
  expect(button).toHaveFocus();
});

test('renders tooltip by default with isOpen prop', async () => {
  getComponent({ isOpen: true });
  const tooltip = screen.getByRole('tooltip');
  expect(tooltip).toBeInTheDocument();
});
