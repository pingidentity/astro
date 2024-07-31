import { ElementType, ReactNode } from 'react';
import { ThemeUICSSProperties } from 'theme-ui';

import { TestingAttributes } from './shared/test';
import { DOMAttributes, OrientationProps, StyleProps } from './shared';
import { TooltipTriggerProps } from './tooltipTrigger';


export interface TabProps extends StyleProps, DOMAttributes, OrientationProps, TestingAttributes{
    isDisabled?: boolean;
    item: {
        key: string | number;
        props?: {
            icon: ElementType | ReactNode;
            isDisabled: boolean;
            textValue: string;
            tabLineProps?: ThemeUICSSProperties;
            tabLabelProps: object;
            content: object;
            titleAttr: string;
            title: string;
            separator: Element | boolean;
            list: object[],
            tooltipTriggerProps?: TooltipTriggerProps;
        },
        rendered?: string | ReactNode;
    },
    mode?: 'default' | 'tooltip' | 'list' | 'tooltipIsDisabled';
    tooltipTriggerProps?: object;
    title?: string;
    textValue?: string;
    tabLineProps?: object;
    slots?: {
        beforeTab?: ReactNode;
        afterTab?: ReactNode;
      };
 }
