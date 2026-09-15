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

  expect(icon).toHaveStyleRule('width', '18px');
  expect(icon).toHaveStyleRule('height', '18px');
  expect(icon).toHaveAttribute('data-testid', 'panel-header-icon');
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

test('renders image avatars in Onyx', () => {
  getComponentOnyx();
  const image = screen.getByRole('img');

  expect(image.tagName.toLowerCase()).toBe('img');
  expect(image).toHaveAttribute('src', pingImg);
  expect(image).toHaveAttribute('alt', 'Avatar');
});
