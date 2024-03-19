import { RefObject } from 'react';

import { TestingAttributes } from './shared/test';
import { IconProps } from './icon';
import { IconButtonProps } from './iconButton';
import { FocusableElement, HoverProps } from './shared';
import { TooltipTriggerProps } from './tooltipTrigger';

export interface TooltipWrapperProps {
    children?: React.ReactNode;
    isOpen?: boolean;
    tooltip?: string;
    targetRef?: RefObject<HTMLDivElement | FocusableElement>
}

export interface CopyTextProps extends HoverProps, TestingAttributes {
    children?: React.ReactNode;
    mode?: 'text' | 'link' | 'nonClickableContent';
    textToCopy?: string;
    tooltipText?: string;
    tooltipProps?: TooltipTriggerProps;
    wrapperProps?: TooltipWrapperProps;
    iconButtonProps?: Omit<IconButtonProps, 'onPress'>
}

export interface CopyButtonProps {
    iconProps?: IconProps,
    onPress?: () => void
}
