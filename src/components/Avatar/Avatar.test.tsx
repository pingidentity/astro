import React from 'react';
import { faker } from '@faker-js/faker';
import { randomUUID } from 'node:crypto';

import { AvatarProps } from '../../types/avatar';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import { avatarColors as colors } from './constants';
import getColorFromUUID from './getColorFromUuid';
import Avatar from '.';

const src = faker.image.lorempicsum.imageUrl(150, 150, false, undefined, '1');

const datatestId = 'avatar-component';

const defaultProps: AvatarProps = {
  src,
  'data-testid': datatestId,
};

const getComponent = (props = {}) => render((
  <Avatar {...defaultProps} {...props} />
));

universalComponentTests({
  renderComponent: (props: AvatarProps) => <Avatar {...defaultProps} {...props} />,
});

test('an avatar is rendered', () => {
  getComponent();
  const img = screen.getByRole('img');
  expect(img).toBeInstanceOf(HTMLImageElement);
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('alt', 'Avatar');
});

test('an avatar is rendered with custom alt', () => {
  getComponent({ alt: 'Custom Alt' });
  const img = screen.getByRole('img');

  expect(img).toHaveAttribute('alt', 'Custom Alt');
});

test('an avatar is rendered with initials', () => {
  const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
  getComponent({ src: undefined, defaultText: 'KL' });
  const avatar = screen.getByText('KL');

  expect(avatar).toBeInTheDocument();
  warnSpy.mockRestore();
});

describe('getColorFromUUID', () => {
  test('returns a consistent color for the same UUID', () => {
    const uuid = '123e4567-e89b-12d3-a456-426614174000';
    const result1 = getColorFromUUID(uuid, colors);
    const result2 = getColorFromUUID(uuid, colors);

    expect(result1).toBe(result2);
  });

  test('returns a color from the provided array', () => {
    const uuid = 'random-id';
    const result = getColorFromUUID(uuid, colors);

    expect(colors).toContain(result);
  });

  test('distributes colors differently for different UUIDs', () => {
    const colorA = getColorFromUUID('id-1', colors);
    const colorB = getColorFromUUID('id-2', colors);

    expect(colorA).not.toBe(colorB);
  });

  test('throws error if color array is empty', () => {
    expect(() => getColorFromUUID('uuid', [])).toThrow('Color array cannot be empty.');
  });

  test('uses the specific color class when color prop is provided', () => {
    getComponent({ color: 'blue', colorId: 'some-id' });
    const avatar = screen.getByTestId(datatestId);

    expect(avatar).toHaveClass('is-blue');
  });

  test('applies a hashed color class from colorId', () => {
    const uuid = '550e8400-e29b-41d4-a716-446655440000';
    getComponent({ colorId: uuid });

    const avatar = screen.getByTestId(datatestId);
    const classList = Array.from(avatar.classList);
    const colorClass = classList.find(cls => cls.startsWith('is-'));

    expect(colorClass).toBeDefined();
    expect(avatar).not.toHaveClass('is-green');
  });

  test('defaults to is-green when no color props are passed', () => {
    getComponent();
    const avatar = screen.getByTestId(datatestId);

    expect(avatar).toHaveClass('is-green');
  });
});

describe('Avatar fallback behavior', () => {
  test('warns in development when no src, color, or colorId is provided', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    getComponent({ src: undefined });

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("No 'src', 'color', or 'colorId' provided"),
    );
    warnSpy.mockRestore();
  });

  test('does not crash when colorId is null', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    getComponent({ src: undefined, colorId: null });
    const avatar = screen.getByTestId(datatestId);
    const classList = Array.from(avatar.classList);
    const colorClass = classList.find(cls => cls.startsWith('is-'));

    expect(colorClass).toBeDefined();
    warnSpy.mockRestore();
  });

  test('two avatars with missing colorId get the same color class', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const { unmount } = render(<Avatar data-testid="avatar-1" />);
    const avatar1 = screen.getByTestId('avatar-1');
    const colorClass1 = Array.from(avatar1.classList).find(cls => cls.startsWith('is-'));
    unmount();

    render(<Avatar data-testid="avatar-2" />);
    const avatar2 = screen.getByTestId('avatar-2');
    const colorClass2 = Array.from(avatar2.classList).find(cls => cls.startsWith('is-'));

    expect(colorClass1).toBe(colorClass2);
    warnSpy.mockRestore();
  });

  test('does not warn when color prop is provided', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    getComponent({ src: undefined, color: 'blue' });

    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});

describe('getColorFromUUID Distribution', () => {
  test('distributes 10,000 UUIDs evenly across 10 colors', () => {
    const iterations = 10000;
    const distribution: Record<string, number> = {};

    colors.forEach(c => {
      distribution[c] = 0;
    });

    for (let i = 0; i < iterations; i += 1) {
      const uuid = randomUUID();
      const selectedColor = getColorFromUUID(uuid, colors);
      distribution[selectedColor] += 1;
    }

    const expectedMean = iterations / colors.length;
    const allowedVariance = 0.15;

    colors.forEach(color => {
      const count = distribution[color];
      expect(count).toBeGreaterThan(expectedMean * (1 - allowedVariance));
      expect(count).toBeLessThan(expectedMean * (1 + allowedVariance));
    });
  });
});

describe('Color Selection Logic', () => {
  const getResolvedId = (colorId, defaultText) => colorId || (defaultText && defaultText !== 'AA' ? defaultText : '_INTERNAL_DEFAULT_ID_');

  test('should use colorId if it is provided', () => {
    expect(getResolvedId('custom-id', 'BB')).toBe('custom-id');
  });

  test('should use defaultText if colorId is missing and text is not "AA"', () => {
    expect(getResolvedId(null, 'BB')).toBe('BB');
  });

  test('should use hardcoded string if colorId is missing and text is "AA"', () => {
    expect(getResolvedId(undefined, 'AA')).toBe('_INTERNAL_DEFAULT_ID_');
  });

  test('should use hardcoded string if both colorId and defaultText are null', () => {
    expect(getResolvedId(null, null)).toBe('_INTERNAL_DEFAULT_ID_');
  });

  test('should use hardcoded string if colorId is missing and defaultText is empty string', () => {
    expect(getResolvedId(null, '')).toBe('_INTERNAL_DEFAULT_ID_');
  });
});
