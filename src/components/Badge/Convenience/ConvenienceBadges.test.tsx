import React from 'react';
import { render, screen } from '@testing-library/react';

import {
  DefaultBadge,
  ErrorCalloutBadge,
  InfoCalloutBadge,
  SuccessCalloutBadge,
  WarningCalloutBadge,
} from '../../..';
import { BadgeConvenienceProps } from '../../../types';
import axeTest from '../../../utils/testUtils/testAxe';

const testId = 'test-separator';

const defaultProps: Partial<BadgeConvenienceProps> = {
  'data-testid': testId,
  label: 'Test Label',
};

const getDefaultBadgeComponent = (props: Partial<BadgeConvenienceProps> = {}) => render(
  <DefaultBadge {...defaultProps} {...props} />,
);

const getErrorCalloutBadgeComponent = (props: Partial<BadgeConvenienceProps> = {}) => render(
  <ErrorCalloutBadge {...defaultProps} {...props} />,
);

const getInfoCalloutBadgeComponent = (props: Partial<BadgeConvenienceProps> = {}) => render(
  <InfoCalloutBadge {...defaultProps} {...props} />,
);

const getSuccessCalloutBadgeComponent = (props: Partial<BadgeConvenienceProps> = {}) => render(
  <SuccessCalloutBadge {...defaultProps} {...props} />,
);

const getWarningCalloutBadgeComponent = (props: Partial<BadgeConvenienceProps> = {}) => render(
  <WarningCalloutBadge {...defaultProps} {...props} />,
);

// Need to be added to each test file to test accessibility using axe.
axeTest(getDefaultBadgeComponent);
axeTest(getErrorCalloutBadgeComponent);
axeTest(getInfoCalloutBadgeComponent);
axeTest(getSuccessCalloutBadgeComponent);
axeTest(getWarningCalloutBadgeComponent);

test('renders DefaultBadge component', () => {
  getDefaultBadgeComponent();
  const badge = screen.getByTestId(testId);
  expect(badge).toBeInTheDocument();
});

test('renders ErrorCalloutBadge component', () => {
  getErrorCalloutBadgeComponent();
  const badge = screen.getByTestId(testId);
  expect(badge).toBeInTheDocument();
});

test('renders InfoCalloutBadge component', () => {
  getInfoCalloutBadgeComponent();
  const badge = screen.getByTestId(testId);
  expect(badge).toBeInTheDocument();
});

test('renders SuccessCalloutBadge component', () => {
  getSuccessCalloutBadgeComponent();
  const badge = screen.getByTestId(testId);
  expect(badge).toBeInTheDocument();
});

test('renders WarningCalloutBadge component', () => {
  getWarningCalloutBadgeComponent();
  const badge = screen.getByTestId(testId);
  expect(badge).toBeInTheDocument();
});
