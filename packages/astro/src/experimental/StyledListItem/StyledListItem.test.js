import React from 'react';
import AccountIcon from '@pingux/mdi-react/AccountIcon';

import { ListItemSwitchField } from '../../index';
import axeTest from '../../utils/testUtils/testAxe';
import { render, screen } from '../../utils/testUtils/testWrapper';

import StyledListItem, { LIST_ITEM_ICON } from './StyledListItem';

const defaultProps = {
  details: {
    text: 'testText',
    subtext: 'testSubtext',
    icon: AccountIcon,
  },
};

const getComponent = (props = {}) => render((
  <StyledListItem {...defaultProps} {...props} />
));

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

const TEST_TEXT = 'test text';

describe('StyledListItem', () => {
  test('renders details', () => {
    getComponent();

    const { details: { text, subtext } } = defaultProps;
    screen.getByText(text);
    screen.getByText(subtext);
    screen.getByRole('img', { name: `${text}${LIST_ITEM_ICON}` });
  });

  test('renders children', () => {
    getComponent({ children: <ListItemSwitchField /> });

    screen.getByRole('switch');
  });

  test('renders rightOfDetails slot', () => {
    getComponent({ slots: {
      rightOfDetails: <div>{TEST_TEXT}</div>,
    } });

    screen.getByText(TEST_TEXT);
  });

  describe('when there is a leftOfDetails slot', () => {
    test('renders leftOfDetails slot', () => {
      getComponent({ slots: {
        leftOfDetails: <div>{TEST_TEXT}</div>,
      } });

      screen.getByText(TEST_TEXT);
    });

    test('it dose not render an icon', () => {
      getComponent({ slots: {
        leftOfDetails: <div>{TEST_TEXT}</div>,
      } });

      const { details: { text } } = defaultProps;

      expect(screen.queryByTitle({ id: `${text}-list-item-icon`, name: text })).not.toBeInTheDocument();
    });
  });
});
