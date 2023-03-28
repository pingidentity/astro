import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import axeTest from '../../utils/testUtils/testAxe';

import ListItem from './ListItem';

const testTitle = 'Test Title';
const TEST_ID = 'ListItem-testid';
const defaultProps = {
  title: testTitle,
};

const getComponent = (props = {}) => render(
  <ListItem {...defaultProps} {...props} data-testid={TEST_ID} />,
);

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent, {
  // ListItem represents list's child without parent
  rules: {
    'aria-required-parent': { enabled: false },
  },
});

describe('ListItem', () => {
  test('renders ListItem component title', () => {
    getComponent();

    const title = screen.getByTestId(TEST_ID);
    expect(title).toBeInTheDocument();
  });

  test('renders ListItem component with selected state', () => {
    getComponent({ isSelected: true });

    const title = screen.getByTestId(TEST_ID);
    expect(title).toHaveClass('is-selected');
  });

  describe('when hovered', () => {
    let onHoverTest;

    beforeEach(() => {
      onHoverTest = jest.fn();
    });

    test('it calls the onHoverChange callback', () => {
      getComponent({ onHoverChange: onHoverTest });

      userEvent.hover(screen.getByTestId(TEST_ID));
      expect(onHoverTest).toHaveBeenCalled();
    });

    test('it calls the onHoverStart callback', () => {
      getComponent({ onHoverStart: onHoverTest });

      userEvent.hover(screen.getByTestId(TEST_ID));
      expect(onHoverTest).toHaveBeenCalled();
    });

    test('it calls the onHoverEnd callback when unhovered', () => {
      getComponent({ onHoverEnd: onHoverTest });

      const listItem = screen.getByTestId(TEST_ID);
      userEvent.hover(listItem);
      userEvent.unhover(listItem);

      expect(onHoverTest).toHaveBeenCalled();
    });
  });
});
