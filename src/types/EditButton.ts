import { IconSize as IconSizeType } from './shared/style';
import { IconButtonProps } from './iconButton';

export interface EditButtonProps extends Omit<IconButtonProps, 'size'> {
    /** Determines the icon size */
    size?: IconSizeType;
}
