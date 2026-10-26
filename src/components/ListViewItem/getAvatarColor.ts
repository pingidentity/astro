import { twotoneColorNames } from '../../styles/themes/next-gen/colors/twoTone';
import { avatarColors } from '../Avatar/constants';
import getColorFromUUID from '../Avatar/getColorFromUuid';

export interface AvatarColor {
  colorName?: string;
  isTwoTone?: boolean;
}

export const getAvatarColor = (
  colorId?: string,
  avatarDefaultText?: string,
): AvatarColor => {
  if (colorId && twotoneColorNames.includes(colorId)) {
    return { colorName: colorId, isTwoTone: true };
  }

  const seed = colorId || avatarDefaultText;

  if (seed) {
    return { colorName: getColorFromUUID(seed, avatarColors) };
  }

  return { colorName: undefined };
};
