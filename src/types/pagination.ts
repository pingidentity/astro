import { ReactNode } from 'react';

import { ButtonProps } from './button';
import { PopoverMenuProps } from './popoverMenu';

type PaginationState = {
    currentPageIndex: number,
    firstRenderedIndex: number,
    isFirstIndex: boolean,
    isLastIndex: boolean,
    lastRenderedIndex: number,
    offsetCount: number,
    offsetOptions: number[],
    popoverButtonString: string,
    setOffsetCount: (keys?: object) => void,
    totalCount: number,
}

export type PaginationContextState = {
    firstRenderedIndex: number,
    lastRenderedIndex: number,
    offsetCount: number,
    totalCount: number,
    currentPageIndex: number,
}

export interface PaginationContextProps {
    paginationState: PaginationContextState
    setPaginationState?: (paginationState: PaginationContextState) => void
}

export interface PaginationProviderProps {
    children: ReactNode
}

export interface PaginationProps {
    currentPageIndex?: number,
    nextButtonProps?: ButtonProps,
    offsetMenuProps?: object,
    offsetCount?: number,
    offsetOptions?: number[],
    onOffsetCountChange?: (index: number) => void,
    onPageIndexChange?: (index: number) => void,
    previousButtonProps?: ButtonProps,
    setCurrentPageIndex?: () => void,
    totalCount: number,
}

export interface RangeSelectPopoverProps extends PopoverMenuProps {
    buttonProps?: ButtonProps,
    state: PaginationState,
}
