import React from 'react';
import AccountIcon from '@pingux/mdi-react/AccountIcon';

import { AstroProvider, OnyxTheme } from '../..';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import { avatarColors } from '../Avatar/constants';
import getColorFromUUID from '../Avatar/getColorFromUuid';

import { getAvatarColor } from './getAvatarColor';
import ItemAvatar from './ItemAvatar';

jest.mock('./getAvatarColor', () => ({
  getAvatarColor: jest.fn((...args) => jest.requireActual('./getAvatarColor').getAvatarColor(...args)),
}));

const defaultProps = {
  icon: AccountIcon,
  title: { name: 'item-avatar-icon' },
};

const withAvatarDefaultColorWarning = (run: () => void) => {
  const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
  run();
  warnSpy.mockRestore();
};

const getComponent = (props = {}) => withAvatarDefaultColorWarning(
  () => render(<ItemAvatar {...defaultProps} {...props} />),
);

const getComponentOnyx = (props = {}) => withAvatarDefaultColorWarning(
  () => render(
    <AstroProvider themeOverrides={[OnyxTheme]}>
      <ItemAvatar {...defaultProps} {...props} />
    </AstroProvider>,
  ),
);

const getIcon = () => screen.getByRole('img', { name: defaultProps.title.name });

const getAvatarElement = () => getIcon().parentElement;

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => <ItemAvatar {...defaultProps} colorId="11111111111" {...props} />,
});

describe('getAvatarColor', () => {
  test('returns a two-tone match for exact two-tone color names', () => {
    expect(getAvatarColor('cyan')).toEqual({ colorName: 'cyan', isTwoTone: true });
    expect(getAvatarColor('lightBlue')).toEqual({ colorName: 'lightBlue', isTwoTone: true });
    expect(getAvatarColor('lightIndigo')).toEqual({ colorName: 'lightIndigo', isTwoTone: true });
  });

  test('hashes colorIds that contain but do not equal a color name', () => {
    expect(getAvatarColor('user-cyan')).toEqual({
      colorName: getColorFromUUID('user-cyan', avatarColors),
    });
    expect(getAvatarColor('11111111111')).toEqual({
      colorName: getColorFromUUID('11111111111', avatarColors),
    });
  });

  test('hashes color names with different casing instead of two-tone matching them', () => {
    expect(getAvatarColor('Cyan')).toEqual({
      colorName: getColorFromUUID('Cyan', avatarColors),
    });
  });

  test('hashes avatarDefaultText when colorId is not provided', () => {
    expect(getAvatarColor(undefined, 'FV')).toEqual({
      colorName: getColorFromUUID('FV', avatarColors),
    });
  });

  test('returns no color when neither colorId nor avatarDefaultText is provided', () => {
    expect(getAvatarColor()).toEqual({ colorName: undefined });
  });
});

describe('ItemAvatar', () => {
  afterEach(() => {
    (getAvatarColor as jest.Mock).mockClear();
  });

  test('resolves the avatar color from colorId and avatarDefaultText', () => {
    getComponent({ colorId: 'cyan', avatarDefaultText: 'FV' });

    expect(getAvatarColor).toHaveBeenCalledWith('cyan', 'FV');
  });

  test('renders the icon inside a square avatar by default', () => {
    getComponent();

    expect(getAvatarElement()).toHaveClass('is-square');
  });

  test('renders a round avatar when isIconRound is true', () => {
    getComponent({ isIconRound: true });

    expect(getAvatarElement()).not.toHaveClass('is-square');
  });

  test('applies the two-tone avatar class for an exact color name', () => {
    getComponentOnyx({ colorId: 'cyan' });

    expect(getAvatarElement()).toHaveClass('is-cyan');
  });

  test('resolves lightBlue as two-tone when colorId is a light compound name', () => {
    getComponentOnyx({ colorId: 'lightBlue' });

    expect(getAvatarColor).toHaveBeenCalledWith('lightBlue', undefined);
    expect(getAvatarColor('lightBlue')).toEqual({ colorName: 'lightBlue', isTwoTone: true });
  });

  test('applies the hashed avatar class for a colorId that is not a color name', () => {
    getComponentOnyx({ colorId: 'user-cyan' });

    expect(getAvatarElement()).toHaveClass(`is-${getColorFromUUID('user-cyan', avatarColors)}`);
  });

  test('renders initials instead of the icon when avatarInitials is provided', () => {
    getComponent({ avatarInitials: 'AB' });

    expect(screen.queryByRole('img', { name: defaultProps.title.name })).not.toBeInTheDocument();
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  test('renders the icon when avatarInitials is an empty string', () => {
    getComponent({ avatarInitials: '' });

    expect(getIcon()).toBeInTheDocument();
  });

  test('renders the avatar default color when no seeds are provided', () => {
    getComponent();

    expect(getAvatarElement()).toHaveClass('is-green');
  });

  test('forwards avatarProps to the avatar element', () => {
    getComponent({ avatarProps: { 'data-testid': 'item-avatar' } });

    expect(screen.getByTestId('item-avatar')).toBeInTheDocument();
  });

  test('keeps the resolved color when avatarProps adds unrelated sx styles', () => {
    getComponentOnyx({ colorId: 'cyan', avatarProps: { sx: { margin: '5px' } } });

    expect(getAvatarElement()).toHaveClass('is-cyan');
  });

  test('applies the avatarProps color override over the resolved color', () => {
    getComponentOnyx({ colorId: 'cyan', avatarProps: { color: 'red' } });

    expect(getAvatarElement()).toHaveClass('is-red');
  });

  test('keeps the default 18px icon size when iconProps are merged', () => {
    getComponentOnyx({ iconProps: { 'data-testid': 'item-avatar-icon' } });

    const icon = screen.getByTestId('item-avatar-icon');

    expect(icon).toBeInTheDocument();
  });
});
