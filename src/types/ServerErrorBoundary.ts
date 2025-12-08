import React from 'react';

import { TestingAttributes } from './shared/test';
import { StyleProps } from './shared';
import { ButtonProps, IconProps } from '.';

export interface ServerErrorBoundaryProps
    extends StyleProps,
    TestingAttributes{
    hasServerError: boolean;
    iconProps?: IconProps;
    buttonProps?: ButtonProps;
    text?: React.ReactNode;
    children?: React.ReactNode;
    renderElement?: React.ReactNode;
}
