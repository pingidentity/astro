import { TestingAttributes } from './shared/test';
import { BoxProps } from './box';
import { HoverProps } from './shared';

export interface ListItemProps extends BoxProps, HoverProps, TestingAttributes {
    title?: string;
    /**
     * Sets the selected state of the ListItem
     */
    isSelected?: boolean;
}
