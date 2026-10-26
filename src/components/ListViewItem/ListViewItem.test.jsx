import React from 'react';
import AccountIcon from '@pingux/mdi-react/AccountIcon';
import { act } from '@testing-library/react';

import {
  AstroProvider,
  ListViewItem,
  ListViewItemSwitchField,
  OnyxDarkTheme,
  OnyxTheme,
} from '../..';
import { pingImg } from '../../utils/devUtils/constants/images';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import { avatarColors } from '../Avatar/constants';
import getColorFromUUID from '../Avatar/getColorFromUuid';

import { LIST_ITEM_ICON } from './ListViewItem';

jest.mock('./getAvatarColor', () => ({
  getAvatarColor: jest.fn((...args) => jest.requireActual('./getAvatarColor').getAvatarColor(...args)),
}));

import { getAvatarColor } from './getAvatarColor';

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

const getComponentOnyx = (theme = OnyxTheme, props = {}) => render((
  <AstroProvider themeOverrides={[theme]}>
    <ListViewItem {...defaultProps} {...props} />
  </AstroProvider>
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

const getListItemIcon = () => screen.getByRole('img', { name: `${defaultProps.data.text}${LIST_ITEM_ICON}` });

const getListItemAvatar = () => getListItemIcon().parentElement;

describe('ListViewItem', () => {
  afterEach(() => {
    getAvatarColor.mockClear();
  });

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

  test.each([
    ['Onyx light', OnyxTheme],
    ['Onyx dark', OnyxDarkTheme],
  ])('renders an 18px icon inside a square avatar in %s ListViewItem', (_, theme) => {
    getComponentOnyx(theme, { colorId: 'user-cyan' });

    const icon = getListItemIcon();
    const avatar = getListItemAvatar();

    expect(avatar).toHaveClass('is-square');
    expect(icon).toBeInTheDocument();
    expect(getAvatarColor).toHaveBeenCalledWith('user-cyan', undefined);
  });

  test('renders a round avatar when isIconRound is true', () => {
    getComponentOnyx(OnyxTheme, { colorId: '11111111111', isIconRound: true });

    expect(getListItemAvatar()).not.toHaveClass('is-square');
  });

  test('renders the two-tone avatar class for an exact color name', () => {
    getComponentOnyx(OnyxTheme, { colorId: 'green' });

    expect(getListItemAvatar()).toHaveClass('is-green');
    expect(getListItemAvatar()).not.toHaveClass('is-orange');
    expect(getAvatarColor).toHaveBeenCalledWith('green', undefined);
  });

  test('resolves lightBlue as two-tone when colorId is a light compound name', () => {
    getComponentOnyx(OnyxTheme, { colorId: 'lightBlue' });

    expect(getAvatarColor).toHaveBeenCalledWith('lightBlue', undefined);
    expect(getAvatarColor('lightBlue')).toEqual({ colorName: 'lightBlue', isTwoTone: true });
  });

  test('renders the hashed avatar class for a colorId that is not a color name', () => {
    getComponentOnyx(OnyxTheme, { colorId: 'user-cyan' });

    expect(getListItemAvatar()).toHaveClass('is-pink');
  });

  test('seeds avatar color interpolation from data.avatarDefaultText', () => {
    getComponentOnyx(OnyxTheme, {
      data: {
        text: 'testText',
        subtext: 'testSubtext',
        icon: AccountIcon,
        image: defaultProps.data.image,
        avatarDefaultText: 'FV',
      },
    });

    expect(getListItemAvatar()).toHaveClass('is-yellow');
  });

  test('renders the avatar default color when no colorId or avatarDefaultText is provided', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

    getComponentOnyx(OnyxTheme, {
      data: {
        text: 'testText',
        subtext: 'testSubtext',
        icon: AccountIcon,
        image: defaultProps.data.image,
      },
    });

    expect(getListItemAvatar()).toHaveClass('is-green');
    warnSpy.mockRestore();
  });

  test('no longer falls back to others.id for avatar color', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

    getComponentOnyx(OnyxTheme, {
      id: 'some-id',
      data: {
        text: 'testText',
        subtext: 'testSubtext',
        icon: AccountIcon,
        image: defaultProps.data.image,
      },
    });

    const hashedIdColor = getColorFromUUID('some-id', avatarColors);

    expect(getListItemAvatar()).toHaveClass('is-green');
    expect(getListItemAvatar()).not.toHaveClass(`is-${hashedIdColor}`);
    warnSpy.mockRestore();
  });

  test('renders avatarInitials instead of the icon when both are provided', () => {
    getComponentOnyx(OnyxTheme, { colorId: '11111111111', avatarInitials: 'JD' });

    expect(screen.queryByRole('img', { name: `${defaultProps.data.text}${LIST_ITEM_ICON}` })).not.toBeInTheDocument();
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  test('renders the icon when avatarInitials is an empty string', () => {
    getComponentOnyx(OnyxTheme, { colorId: '11111111111', avatarInitials: '' });

    expect(getListItemIcon()).toBeInTheDocument();
  });

  test('renders an initials avatar when no icon is provided', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

    getComponentOnyx(OnyxTheme, {
      data: {
        text: 'testText',
        subtext: 'testSubtext',
      },
      avatarInitials: 'JD',
    });

    expect(screen.getByText('JD')).toBeInTheDocument();
    warnSpy.mockRestore();
  });

  test('renders an avatar when no icon is provided but data.avatarDefaultText is', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

    getComponentOnyx(OnyxTheme, {
      data: {
        text: 'testText',
        subtext: 'testSubtext',
        avatarDefaultText: 'FV',
      },
    });

    expect(screen.getByText('FV')).toBeInTheDocument();
    warnSpy.mockRestore();
  });

  test('renders no avatar when no icon, no image, and no seeds are provided', () => {
    getComponentOnyx(OnyxTheme, {
      data: {
        text: 'testText',
        subtext: 'testSubtext',
      },
    });

    expect(screen.queryByText('AA')).not.toBeInTheDocument();
    expect(document.querySelector('.is-square')).not.toBeInTheDocument();
  });

  test('renders the image and ignores avatarInitials on the image path', () => {
    getComponentOnyx(OnyxTheme, {
      data: {
        text: 'testText',
        subtext: 'testSubtext',
        image: {
          src: pingImg,
          alt: 'avatar',
          'aria-label': 'avatar',
        },
      },
      avatarInitials: 'JD',
    });
    act(() => {
      fallbackImageObj.onImageLoad();
    });

    const image = screen.getByRole('img');

    expect(image.tagName.toLowerCase()).toBe('img');
    expect(image).toHaveAttribute('src', pingImg);
    expect(image).toHaveAttribute('alt', 'avatar');
    expect(image).toHaveAttribute('aria-label', 'avatar');
    expect(screen.queryByText('JD')).not.toBeInTheDocument();
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
