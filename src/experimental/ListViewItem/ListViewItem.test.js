import React from 'react';
import AccountIcon from '@pingux/mdi-react/AccountIcon';

import { ListViewItem, ListViewItemSwitchField } from '../../index';
import axeTest from '../../utils/testUtils/testAxe';
import { render, screen } from '../../utils/testUtils/testWrapper';

import { LIST_ITEM_ICON } from './ListViewItem';

const defaultProps = {
  data: {
    text: 'testText',
    subtext: 'testSubtext',
    icon: AccountIcon,
  },
};

const getComponent = (props = {}) => render((
  <ListViewItem {...defaultProps} {...props} />
));

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

const TEST_TEXT = 'test text';

describe('ListViewItem', () => {
  test('renders data', () => {
    getComponent();

    const { data: { text, subtext } } = defaultProps;
    screen.getByText(text);
    screen.getByText(subtext);
    screen.getByRole('img', { name: `${text}${LIST_ITEM_ICON}` });
  });

  test('renders children', () => {
    getComponent({ children: <ListViewItemSwitchField /> });

    screen.getByRole('switch');
  });

  test('renders rightOfData slot', () => {
    getComponent({ slots: {
      rightOfData: <div>{TEST_TEXT}</div>,
    } });

    screen.getByText(TEST_TEXT);
  });

  describe('when there is a leftOfData slot', () => {
    test('renders leftOfData slot', () => {
      getComponent({ slots: {
        leftOfData: <div>{TEST_TEXT}</div>,
      } });

      screen.getByText(TEST_TEXT);
    });

    test('it dose not render an icon', () => {
      getComponent({ slots: {
        leftOfData: <div>{TEST_TEXT}</div>,
      } });

      const { data: { text } } = defaultProps;

      expect(screen.queryByTitle({ id: `${text}-list-item-icon`, name: text })).not.toBeInTheDocument();
    });
  });
});
