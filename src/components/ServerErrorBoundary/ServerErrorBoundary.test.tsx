import React from 'react';
import AlertCircleOutlineIcon from '@pingux/mdi-react/AlertCircleOutlineIcon';
import userEvent from '@testing-library/user-event';

import { ServerErrorBoundaryProps } from '../../types';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import Text from '../Text/Text';

import ServerErrorBoundary from '.';

const testId = 'test-ServerErrorBoundary';
const serverErrorBoundaryBody = 'Lorem ipsum dolor sit amet';

const defaultProps: ServerErrorBoundaryProps = {
  'data-testid': testId,
  hasServerError: true,
};

const getComponent = (props = {}) => render(
  <ServerErrorBoundary {...defaultProps} {...props}>
    {serverErrorBoundaryBody}
  </ServerErrorBoundary>,
);

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <ServerErrorBoundary {...defaultProps} {...props}>
      <Text>
        {serverErrorBoundaryBody}
      </Text>
    </ServerErrorBoundary>
  ),
});

describe('ServerErrorBoundary component', () => {
  const mockReload = jest.fn();
  const originalLocation = window.location;
  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      value: {
        ...window.location,
        reload: mockReload,
      },
      writable: true,
    });
  });

  afterAll(() => {
    // ✅ Restore the original location object
    window.location = originalLocation;
  });
  test('renders default ServerErrorBoundary component', () => {
    getComponent();
    screen.getByRole('img', {
      name: /alert circle icon/i,
    });
    screen.getByText(/there was a problem loading this page\./i);
    const reloadButton = screen.getByRole('button', {
      name: /reload/i,
    });
    userEvent.click(reloadButton);
    expect(mockReload).toHaveBeenCalled();
  });

  test('renders with hasServerError as false', () => {
    getComponent({ hasServerError: false });
    screen.getByText(serverErrorBoundaryBody);

    expect(screen.queryByRole('button', {
      name: /reload/i,
    })).not.toBeInTheDocument();
  });

  test('renders with custom icon', () => {
    getComponent({
      iconProps: {
        icon: AlertCircleOutlineIcon,
        title: { name: 'Alert Outline Circle Icon' },
      },
    });
    screen.getByRole('img', {
      name: /alert outline circle icon/i,
    });
  });

  test('renders with custom text and link properties', () => {
    const mockOnReload = jest.fn();
    getComponent({
      text: 'Loading Problem',
      buttonProps: {
        onPress: mockOnReload,
        children: 'Reload',
      },
    });
    screen.getByText(/loading problem/i);

    userEvent.click(screen.getByRole('button', {
      name: /reload/i,
    }));

    expect(mockOnReload).toHaveBeenCalled();
  });
});
