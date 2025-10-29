import { ReactNode } from 'react';

import { TestingAttributes } from './shared/test';
import { BoxProps } from './box';
import { DOMAttributes, StyleProps } from './shared';

export interface TableProps extends BoxProps, TestingAttributes, DOMAttributes { }

export interface TableChildrenProp extends StyleProps, TestingAttributes {
    children: ReactNode;
}

export type TableBodyProps = TableChildrenProp

export type TableCaptionProps = TableChildrenProp;

export type TableHeadProps = TableChildrenProp;

export type TableRowProps = TableChildrenProp;

export interface TableCellProps extends StyleProps, DOMAttributes, TestingAttributes {
    /** Determines whether or not the html rendered is a th or td element. */
    isHeading?: boolean
}
