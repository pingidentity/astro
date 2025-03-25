import { ReactNode } from 'react';

import { BoxProps } from './box';
import { IconProps } from './icon';
import { IconButtonProps } from './iconButton';
import { IconWrapperProps } from './iconWrapper';
import { TextProps } from './text';

interface SharedResponseProps {
    shouldStartAnimation?: boolean,
    animationIndex?: number,
    setAnimationIndex?: (index: number) => void,
}

export interface ResponseTextProps extends SharedResponseProps, TextProps {
    text: string,
    delay?: number,
    isListItem?: boolean
}

export interface ResponseAttachmentProps extends SharedResponseProps {
    wrapperProps?: BoxProps,
    textProps?: TextProps,
    iconProps?: IconProps,
    parentIndex?: number,
    className?: string,
    text: string,
}

export interface ResponseListProps extends SharedResponseProps, BoxProps {
  children: ReactNode[]
  parentIndex?: number,
  delay?: number
}

export interface ResponseProps extends BoxProps{
    containerProps?: BoxProps,
    iconProps?: IconProps,
    textProps?: ResponseTextProps,
    iconWrapperProps?: IconWrapperProps,
    shouldStartAnimation?: boolean,
    delay?: number
}

export interface ResponseToolbarProps extends BoxProps, SharedResponseProps {
    readButtonProps?: IconButtonProps,
    copyButtonProps?: IconButtonProps,
    goodButtonProps?: IconButtonProps,
    badButtonProps?: IconButtonProps,
    rephraseButtonProps?: IconButtonProps,
    containerProps?: BoxProps,
    parentIndex?: number,
    className?: string,
    delay?: number,
    children: ReactNode[],
}

export interface ResponseToolbarIconProps extends IconButtonProps, SharedResponseProps {
    delay?: number,
    parentIndex?: number,
    iconProps?: IconProps,
}
