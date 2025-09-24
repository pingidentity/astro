import React from 'react';
import AccountIcon from '@pingux/mdi-react/AccountIcon';
import { act } from '@testing-library/react';

import { PanelHeader, PanelHeaderSwitchField } from '../../index';
import { pingImg } from '../../utils/devUtils/constants/images';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import { PANEL_HEADER_ICON } from './PanelHeader';

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
  <PanelHeader {...defaultProps} {...props} />
));

let fallbackImageObj = null;
jest.mock('../../hooks/useFallbackImage', () => props => {
  fallbackImageObj = { ...props };
  return [];
});

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <PanelHeader {...defaultProps} {...props} /> });

describe('PanelHeader', () => {
  test('renders data', () => {
    getComponent();

    const { data: { text, subtext } } = defaultProps;
    screen.getByText(text);
    screen.getByText(subtext);
    screen.getByRole('img', { name: `${text}${PANEL_HEADER_ICON}` });
  });

  test('renders children', () => {
    getComponent({ children: <PanelHeaderSwitchField /> });

    screen.getByRole('switch');
  });
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

test('renders rightOfData slot', () => {
  const TEST_TEXT = 'test text';

  getComponent({ slots: {
    rightOfData: <div>{TEST_TEXT}</div>,
  } });

  screen.getByText(TEST_TEXT);
});
