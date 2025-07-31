import React from 'react';
import { render, screen } from '@testing-library/react';

import { statusIcon } from '../../utils/devUtils/constants/statuses';

import StatusIcon, { StatusIconProps } from './StatusIcon';

const testId = 'test-icon';
const defaultProps: StatusIconProps = {
  'data-testid': testId,
};

const getComponent = (props = {}) => render((
  <StatusIcon {...defaultProps} {...props} />
));

describe('StatusIcon', () => {
  test('renders', () => {
    getComponent();

    screen.getByTestId(testId);
  });

  test.each([
    [statusIcon.DEFAULT, 'default'],
    [statusIcon.CRITICAL, 'critical'],
    [statusIcon.MAJOR, 'major'],
    [statusIcon.MINOR, 'minor'],
    [statusIcon.WARNING, 'warning'],
    [statusIcon.INFO, 'info'],
    [statusIcon.WARNING_NEUTRAL, 'warningNeutral'],
    [statusIcon.FATAL, 'fatal'],
  ])('when given status %s it renders icon with %s', (status, icon) => {
    getComponent({ status, 'data-testid': icon });
    screen.getByTestId(icon);
  });
});
