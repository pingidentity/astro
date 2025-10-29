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

interface SharedWrapperProps {
    stateIndex: number,
    isTopLevel?: boolean
}

interface SharedParentProps {
    children: ReactNode[]
    parentIndex?: number,
    delay?: number
}

interface SharedTextProps extends TextProps {
    isListItem?: boolean,
    parentIndex?: number,
    delay?: number,
}

export interface ResponseTextProps extends SharedResponseProps, TextProps, SharedTextProps {
    text: string,
}

export interface ResponseAttachmentProps extends SharedResponseProps {
    wrapperProps?: BoxProps,
    textProps?: TextProps,
    iconProps?: IconProps,
    parentIndex?: number,
    className?: string,
    text: string,
}

export interface ResponseListProps extends SharedResponseProps, Omit<BoxProps, 'children'>, SharedParentProps {

}

export interface ResponseProps extends BoxProps{
    containerProps?: BoxProps,
    iconProps?: IconProps,
    textProps?: ResponseTextProps,
    iconWrapperProps?: IconWrapperProps,
    shouldStartAnimation?: boolean,
    children: ReactNode,
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

export interface MarkdownListWrapperProps extends ResponseListProps, SharedWrapperProps {}

export interface MarkdownTextWrapperProps extends SharedWrapperProps,
SharedTextProps, SharedResponseProps {
    children: ReactNode[] | string[],
    parentIndex?: number,
}

export interface MarkdownTextContainerProps extends SharedResponseProps, SharedParentProps {
    className?: string,
    as?: string | React.ReactNode | React.ElementType,
    isListItem?: boolean
}

export interface MarkdownWrapperProps extends BoxProps, SharedWrapperProps, SharedResponseProps {
    parentIndex?: number
}

export type MarkdownContainerProps = BoxProps

export interface ResponseListItemProps extends SharedParentProps, SharedResponseProps {
    as?: string | React.ReactNode | React.ElementType,
}

export interface ResponseMarkdownContextValue {
    delay?: number
    stateIndex: number
    setAnimationIndex?: (key: number) => void
  }
