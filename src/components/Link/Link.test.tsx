import React from 'react';
import userEvent from '@testing-library/user-event';

import { LinkProps } from '../../types';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import Link from '.';

const testId = 'test-link';
const defaultProps: LinkProps = {
  'data-testid': testId,
  children: 'This is a link',
};
const getComponent = (props = {}) => render(<Link {...defaultProps} {...props} />);

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <Link {...defaultProps} {...props} /> });


test('a link is rendered', () => {
  getComponent();
  const link = screen.getByTestId(testId);
  expect(link).toBeInstanceOf(HTMLAnchorElement);
  expect(link).toBeInTheDocument();
});

test('link shows hover status', () => {
  // Needs href to have a tabindex
  getComponent();
  const link = screen.getByTestId(testId);
  expect(link).not.toHaveClass('is-hovered');
  userEvent.hover(link);
  expect(link).toHaveClass('is-hovered');
  userEvent.unhover(link);
});

test('link shows focus status', () => {
  // Needs href to have a tabindex
  getComponent({ href: 'blah' });
  const link = screen.getByTestId(testId);
  expect(link).not.toHaveFocus();
  userEvent.tab();
  expect(link).toHaveFocus();
  expect(link).toHaveClass('is-focused');
  userEvent.tab();
  expect(link).not.toHaveFocus();
  expect(link).not.toHaveClass('is-focused');
});

test('link shows disabled status', () => {
  // Needs href to have a tabindex
  getComponent({ href: 'blah', isDisabled: true });
  const link = screen.getByTestId(testId);
  expect(link).toHaveClass('is-disabled');
});

test('link removes onPointer events when isSafariCompatible', () => {
  const onPointerEvents = jest.fn();

  getComponent({ href: 'blah', isSafariCompatible: true, onPointerDown: () => onPointerEvents, onPointerUp: () => onPointerEvents });
  const link = screen.getByTestId(testId);
  userEvent.click(link);
  expect(onPointerEvents).not.toHaveBeenCalled();
});
