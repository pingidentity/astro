import React from 'react';
import Earth from '@pingux/mdi-react/EarthIcon';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Badge, Button, Icon } from '../..';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

const testId = 'test-separator';

const defaultProps = {
  'data-testid': testId,
  label: 'Test Label',
};

const getComponent = (props = {}) => render(
  <Badge {...defaultProps} {...props} />,
);

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <Badge {...props} /> });

test('renders Badge component', () => {
  getComponent();
  const badge = screen.getByTestId(testId);
  expect(badge).toBeInTheDocument();
});

test('renders children within Badge component', () => {
  const children = (
    <Button />
  );
  getComponent({ children });
  const mockedChildren = screen.getByRole('button');
  expect(mockedChildren).toBeInTheDocument();
});

test('renders Badge component with uppercase', () => {
  const label = 'uppercase';
  const isUppercase = true;

  getComponent({ label, isUppercase });
  expect(screen.queryByText('uppercase')).toHaveStyleRule('text-transform', 'uppercase');
});

test('renders Badge component with custom alignment', () => {
  const align = 'right';

  getComponent({ align });
  expect(screen.getByTestId(testId)).toHaveStyleRule('position', 'absolute');
  expect(screen.getByTestId(testId)).toHaveStyleRule('right', '15px');
});

test('renders Badge component with left slot', () => {
  const slots = {
    leftIcon: <Icon icon={Earth} size={14} data-testid="iconId" />,
  };

  getComponent({ slots });
  expect(screen.getByTestId('iconId')).toBeInTheDocument();
});

test('does not render help hint wiring when helpHint is omitted', () => {
  getComponent();
  const badge = screen.getByTestId(testId);
  expect(badge).not.toHaveAttribute('tabindex');
  expect(badge).not.toHaveAttribute('aria-expanded');
  expect(screen.queryByTestId('badge-help-hint')).not.toBeInTheDocument();
});

test('badge itself becomes the help hint trigger, with no separate trigger element', () => {
  getComponent({ helpHint: 'Hint content' });
  const badge = screen.getByTestId(testId);
  expect(badge).toHaveAttribute('tabindex', '0');
  expect(badge).toHaveAttribute('aria-expanded', 'false');
  expect(screen.queryByTestId('help-hint__button')).not.toBeInTheDocument();
  expect(screen.queryByTestId('badge-help-hint')).not.toBeInTheDocument();
});

test('help hint opens on hover of the badge', async () => {
  getComponent({ helpHint: 'Hint content' });
  const badge = screen.getByTestId(testId);

  await userEvent.hover(badge);

  expect(await screen.findByTestId('badge-help-hint')).toHaveTextContent('Hint content');
});

test('help hint opens on focus of the badge', async () => {
  getComponent({ helpHint: 'Hint content' });

  await userEvent.tab();

  expect(await screen.findByTestId('badge-help-hint')).toBeInTheDocument();
});

test('helpHintProps customize the popover placement and style', async () => {
  getComponent({
    helpHint: 'Hint content',
    helpHintProps: { direction: 'right', isDarkMode: false },
  });

  await userEvent.hover(screen.getByTestId(testId));
  const popover = await screen.findByTestId('popover-container');

  expect(popover).toHaveAttribute('data-popover-placement', 'right');
  expect(popover).not.toHaveClass('is-dark-mode');
  expect(popover).toContainElement(screen.getByTestId('badge-help-hint'));
});

test('help hint popover is dark by default', async () => {
  getComponent({ helpHint: 'Hint content' });

  await userEvent.hover(screen.getByTestId(testId));

  expect(await screen.findByTestId('popover-container')).toHaveClass('is-dark-mode');
});
