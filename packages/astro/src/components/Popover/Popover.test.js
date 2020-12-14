import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popover from './Popover';
import Button from '../Button/Button';
import Link from '../Link/Link';

const defaultProps = {
  content: <Link>Click Me!</Link>,
};

const getComponent = () => render((
  <>
    <Popover {...defaultProps}>
      <Button>Mock Button</Button>
    </Popover>
  </>
));

// NOTE: We must use waitFor to assert the async DOM changes that occur
test('renders a popover when target is clicked', async () => {
  getComponent();
  const button = screen.getByRole('button');
  await waitFor(() => userEvent.click(button));
  const popover = screen.getByRole('tooltip');
  expect(popover).toBeInTheDocument();
});

test('it does not render a popover when the target is not clicked', () => {
  getComponent();
  const popover = screen.queryByRole('tooltip');
  expect(popover).not.toBeInTheDocument();
});

test('renders content in the popover', async () => {
  getComponent();
  const button = screen.getByRole('button');
  await waitFor(() => userEvent.click(button));
  const link = screen.getByRole('link');
  expect(link).toBeInTheDocument();
});
