import React from 'react';
import AccountIcon from '@pingux/mdi-react/AccountIcon';
import { act } from '@testing-library/react';

import { ListViewItem, ListViewItemSwitchField } from '../..';
import { pingImg } from '../../utils/devUtils/constants/images';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import { LIST_ITEM_ICON } from './ListViewItem';

const defaultProps = {
  data: {
    text: 'testText',
    subtext: 'testSubtext',
    icon: AccountIcon,
    image: {
      src: pingImg,
      alt: 'avatar',
      'aria-label': 'avatar',
    },
  },
};

const getComponent = (props = {}) => render((
  <ListViewItem {...defaultProps} {...props} />
));

let fallbackImageObj = null;
jest.mock('../../hooks/useFallbackImage', () => props => {
  fallbackImageObj = { ...props };
  return [];
});

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => <ListViewItem {...defaultProps} {...props} />,
});

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

  test('renders icon if both icon and image are passed', () => {
    getComponent();

    const icon = screen.getByRole('img');

    expect(icon).not.toHaveAttribute('src', pingImg);
    expect(icon.tagName.toLowerCase()).toBe('svg');
    expect(icon.tagName.toLowerCase()).not.toBe('img');
  });

  test('renders image', () => {
    delete defaultProps.data.icon;

    getComponent();
    act(() => {
      fallbackImageObj.onImageLoad();
    });

    const image = screen.getByRole('img');

    expect(image.tagName.toLowerCase()).toBe('img');
    expect(image).toHaveAttribute('src', pingImg);
    expect(image).toHaveAttribute('alt', 'avatar');
    expect(image).toHaveAttribute('aria-label', 'avatar');
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
