import { ElementType, ReactNode } from 'react';
import { ThemeUICSSProperties } from 'theme-ui';

import { TestingAttributes } from './shared/test';
import { DOMAttributes, OrientationProps, StyleProps } from './shared';


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
        },
        rendered?: string | ReactNode;
    },
    mode?: 'default' | 'tooltip' | 'list';
    tooltipTriggerProps?: object;
    title?: string;
    textValue?: string;
    tabLineProps?: object;
    slots?: {
        beforeTab?: ReactNode;
        afterTab?: ReactNode;
      };
 }
