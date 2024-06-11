import React from 'react';

import { TestingAttributes } from './shared/test';
import { Status } from './item';
import { TextProps } from './text';

export interface FieldHelperTextProps extends TestingAttributes, TextProps {
    className?: string;
    children?: React.ReactNode;
    status?: Status;
}
