import { BoxProps } from './box';
import { CardProps } from './card';
import { IconProps } from './icon';
import { TextProps } from './text';

export interface SuggestionProps extends CardProps{
    iconProps?: IconProps,
    textProps?: TextProps,
    text: string,
    isFullScreen?: boolean
}

export interface SuggestionsProps extends BoxProps {
    isFullScreen?: boolean
}
