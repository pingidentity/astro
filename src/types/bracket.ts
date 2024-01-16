import { TestingAttributes } from './shared/test';
import { DOMAttributes, StyleProps } from './shared';

export interface BracketProps extends StyleProps, DOMAttributes, TestingAttributes {
    /** Whether or not the bracket is the last in a series of brackets. */
    isLast?: boolean;
    /** A prop to set the strokes color. */
    color?: string;
}
