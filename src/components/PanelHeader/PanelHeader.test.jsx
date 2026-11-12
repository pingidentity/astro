import React from 'react';
import AccountIcon from '@pingux/mdi-react/AccountIcon';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  AstroProvider,
  OnyxDarkTheme,
  OnyxTheme,
  PanelHeader,
  PanelHeaderSwitchField,
} from '../../index';
import { pingImg } from '../../utils/devUtils/constants/images';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import { getAvatarColor } from '../ListViewItem/getAvatarColor';
import { PANEL_HEADER_ICON } from './PanelHeader';

jest.mock('../ListViewItem/getAvatarColor', () => ({
  getAvatarColor: jest.fn((...args) => jest.requireActual('../ListViewItem/getAvatarColor').getAvatarColor(...args)),
}));

beforeEach(() => {
  getAvatarColor.mockImplementation((...args) => jest
    .requireActual('../ListViewItem/getAvatarColor')
    .getAvatarColor(...args));
});

afterEach(() => {
  getAvatarColor.mockClear();
});

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
const getComponentOnyx = (props = {}, theme = OnyxTheme) => render((
  <AstroProvider themeOverrides={[theme]}>
    <PanelHeader {...defaultProps} {...props} />
  </AstroProvider>
));


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

  describe('isCopyable', () => {
    const originalClipboard = { ...global.navigator.clipboard };

    beforeEach(() => {
      const mockClipboard = {
        writeText: jest.fn(),
      };
      Object.defineProperty(window, 'navigator', {
        value: {
          clipboard: mockClipboard,
        },
        configurable: true,
      });
    });

    afterEach(() => {
      Object.defineProperty(window, 'navigator', {
        value: {
          clipboard: originalClipboard,
        },
        configurable: true,
      });
      jest.resetAllMocks();
    });

    test('renders copy button when isCopyable is true and subtext is present', () => {
      render(<PanelHeader {...defaultProps} isCopyable />);
      expect(screen.getByRole('button', { name: 'copy to clipboard' })).toBeInTheDocument();
    });

    test('does not render copy button when isCopyable is omitted and subtext is present', () => {
      render(<PanelHeader {...defaultProps} />);
      expect(screen.queryByRole('button', { name: 'copy to clipboard' })).not.toBeInTheDocument();
    });

    test('does not render copy button when isCopyable is false and subtext is present', () => {
      render(<PanelHeader {...defaultProps} isCopyable={false} />);
      expect(screen.queryByRole('button', { name: 'copy to clipboard' })).not.toBeInTheDocument();
    });

    test('does not render copy button when isCopyable is true and subtext is absent', () => {
      const propsWithoutSubtext = {
        data: {
          text: 'testText',
        },
      };
      render(<PanelHeader {...propsWithoutSubtext} isCopyable />);
      expect(screen.queryByRole('button', { name: 'copy to clipboard' })).not.toBeInTheDocument();
    });

    test('clicking copy button calls navigator.clipboard.writeText with the subtext value', async () => {
      render(<PanelHeader {...defaultProps} isCopyable />);
      const copyButton = screen.getByRole('button', { name: 'copy to clipboard' });
      await act(async () => userEvent.click(copyButton));
      expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(defaultProps.data.subtext);
    });
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

test('renders leftOfData slot', () => {
  const TEST_TEXT = 'test text';

  getComponent({ slots: {
    leftOfData: <div>{TEST_TEXT}</div>,
  } });

  screen.getByText(TEST_TEXT);
});

const getPanelHeaderIcon = () => screen.getByRole('img', { name: `${defaultProps.data.text}${PANEL_HEADER_ICON}` });

const getPanelHeaderAvatar = () => getPanelHeaderIcon().parentElement;

test.each([
  ['Onyx light', OnyxTheme],
  ['Onyx dark', OnyxDarkTheme],
])('renders an 18px icon in %s PanelHeader avatars', (_, theme) => {
  getComponentOnyx({
    data: {
      text: 'testText',
      icon: AccountIcon,
      avatarDefaultText: 'AA',
    },
    avatarProps: { color: 'green' },
    iconProps: { 'data-testid': 'panel-header-icon' },
  }, theme);

  const icon = screen.getByRole('img', { name: `${defaultProps.data.text}${PANEL_HEADER_ICON}` });
  const avatar = icon.parentElement;

  expect(avatar).toHaveClass('is-square');
  expect(icon).toBeInTheDocument();
  expect(icon).toHaveAttribute('data-testid', 'panel-header-icon');
  expect(getAvatarColor).toHaveBeenCalledWith(undefined, 'AA');
});

test('forwards iconProps to the Onyx avatar icon', () => {
  getComponentOnyx({
    data: {
      text: 'testText',
      icon: AccountIcon,
    },
    avatarProps: { color: 'green' },
    iconProps: { 'aria-label': 'custom panel icon' },
  });

  expect(screen.getByLabelText('custom panel icon')).toBeInTheDocument();
});

test('renders a round avatar when isIconRound is true', () => {
  getComponentOnyx({
    data: {
      text: 'testText',
      icon: AccountIcon,
      avatarDefaultText: 'FV',
    },
    isIconRound: true,
  });

  expect(getPanelHeaderAvatar()).not.toHaveClass('is-square');
});

test('renders the two-tone avatar class for an exact color name', () => {
  getComponentOnyx({
    data: {
      text: 'testText',
      icon: AccountIcon,
      avatarDefaultText: 'FV',
    },
    colorId: 'green',
  });

  expect(getPanelHeaderAvatar()).toHaveClass('is-green');
  expect(getPanelHeaderAvatar()).not.toHaveClass('is-orange');
  expect(getAvatarColor).toHaveBeenCalledWith('green', 'FV');
});

test('resolves lightBlue as two-tone when colorId is a light compound name', () => {
  getComponentOnyx({
    data: {
      text: 'testText',
      icon: AccountIcon,
      avatarDefaultText: 'FV',
    },
    colorId: 'lightBlue',
  });

  expect(getAvatarColor).toHaveBeenCalledWith('lightBlue', 'FV');
  expect(getAvatarColor('lightBlue')).toEqual({ colorName: 'lightBlue', isTwoTone: true });
});

test('renders the hashed avatar class for a colorId that is not a color name', () => {
  getComponentOnyx({
    data: {
      text: 'testText',
      icon: AccountIcon,
      avatarDefaultText: 'FV',
    },
    colorId: 'user-cyan',
  });

  expect(getPanelHeaderAvatar()).toHaveClass('is-pink');
});

test('seeds avatar color interpolation from data.avatarDefaultText', () => {
  getComponentOnyx({
    data: {
      text: 'testText',
      icon: AccountIcon,
      avatarDefaultText: 'FV',
    },
  });

  expect(getPanelHeaderAvatar()).toHaveClass('is-yellow');
});

test('renders the avatar default color when no colorId or avatarDefaultText is provided', () => {
  const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

  getComponentOnyx({
    data: {
      text: 'testText',
      icon: AccountIcon,
    },
  });

  expect(getPanelHeaderAvatar()).toHaveClass('is-green');
  warnSpy.mockRestore();
});

test('renders avatarInitials instead of the icon when both are provided', () => {
  getComponentOnyx({
    data: {
      text: 'testText',
      icon: AccountIcon,
      avatarDefaultText: 'FV',
    },
    avatarInitials: 'FV',
  });

  expect(screen.queryByRole('img', { name: `${defaultProps.data.text}${PANEL_HEADER_ICON}` })).not.toBeInTheDocument();
  expect(screen.getByText('FV')).toBeInTheDocument();
});

test('renders the icon when avatarInitials is an empty string', () => {
  getComponentOnyx({
    data: {
      text: 'testText',
      icon: AccountIcon,
      avatarDefaultText: 'FV',
    },
    avatarInitials: '',
  });

  expect(getPanelHeaderIcon()).toBeInTheDocument();
});

test('renders a square no-icon avatar under Onyx', () => {
  getComponentOnyx({
    data: {
      text: 'testText',
      avatarDefaultText: 'FV',
    },
  });

  const initials = screen.getByText('FV');

  expect(initials).toHaveClass('is-square');
});

test('renders an initials avatar when no icon is provided', () => {
  getComponentOnyx({
    data: {
      text: 'testText',
      avatarDefaultText: 'FV',
    },
    avatarInitials: 'JD',
  });

  expect(screen.getByText('JD')).toBeInTheDocument();
});

test('renders image avatars in Onyx', () => {
  getComponentOnyx();
  act(() => {
    fallbackImageObj.onImageLoad();
  });

  const image = screen.getByRole('img');

  expect(image.tagName.toLowerCase()).toBe('img');
  expect(image).toHaveAttribute('src', pingImg);
  expect(image).toHaveAttribute('alt', 'avatar');
  expect(image).toHaveAttribute('aria-label', 'avatar');
});

test('renders the image and ignores avatarInitials on the image path in Onyx', () => {
  getComponentOnyx({
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
