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
    className?: string
}

export interface ResponseListProps extends SharedResponseProps, BoxProps {
  children: ReactNode[]
  parentIndex?: number,
  delay?: number
}

export interface ResponseProps {
    containerProps?: BoxProps,
    iconProps?: IconProps,
    textProps?: ResponseTextProps,
    iconWrapperProps?: IconWrapperProps,
    shouldStartAnimation?: boolean,
    children: ReactNode[],
    delay?: number
}

export interface ResponseToolbarProps extends SharedResponseProps {
    readButtonProps?: IconButtonProps,
    copyButtonProps?: IconButtonProps,
    goodButtonProps?: IconButtonProps,
    badButtonProps?: IconButtonProps,
    rephraseButtonProps?: IconButtonProps,
    containerProps?: BoxProps,
    parentIndex?: number,
    className?: string
}
