import { BoxProps } from './box';
import { IconProps, IconTypeExtended } from './icon';

export interface IconWrapperProps {
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
