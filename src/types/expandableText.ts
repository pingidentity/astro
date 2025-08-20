import React from 'react';

import { TestingAttributes } from './shared/test';
import { ButtonProps } from './button';
import { TextProps } from './text';

export interface ExpandableTextProps extends TestingAttributes, TextProps {
    maxLines: number;
    className?: string;
    children?: React.ReactNode;
    buttonProps?: ButtonProps;
}
