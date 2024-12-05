import { BoxProps } from './box';
import { IconProps, IconTypeExtended } from './icon';
import { StyleProps } from './shared';

export interface IconWrapperProps extends StyleProps {
    icon?: IconTypeExtended,
    iconProps?: IconProps,
    wrapperProps?: BoxProps,
    color?: string,
    size: string,
    className?: string,
    isCircle?: boolean,
    title: {
        name: string,
        id?: string
    },
}
