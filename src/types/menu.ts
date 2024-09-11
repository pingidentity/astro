import { BoxProps } from './box';
import { HoverProps } from './shared';

export interface MenuProps extends BoxProps, HoverProps {
    children?: React.ReactNode;
    title?: string | undefined;
    'aria-label'?: string | undefined;
    isNotFocusedOnHover?: boolean;
    onAction?: (key?: unknown) => void;
    onSelectionChange?: () => void;
    isSelected?: boolean;
    selectionMode?: 'none' | 'single' | 'multiple';
    disabledKeys?: string[]
}
