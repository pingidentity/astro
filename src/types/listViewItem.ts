import type { ComponentType, ReactNode } from 'react';

import { TestingAttributes } from './shared/test';
import { AvatarProps } from './avatar';
import { BoxProps } from './box';
import { ButtonProps } from './button';
import { IconProps } from './icon';
import { IconButtonProps } from './iconButton';
import { IconWrapperProps } from './iconWrapper';
import { MenuProps } from './menu';
import { HoverProps } from './shared';
import { SwitchFieldProps } from './switchField';

export interface ListViewItemData {
    /** Icon component rendered at the start of the item. */
    icon?: ComponentType;
    image?: {
        src?: string;
        alt?: string;
        'aria-label'?: string;
    };
    text?: string;
    subtext?: string;
    /** Seeds the avatar color when `colorId` is not provided (Onyx theme). */
    avatarDefaultText?: string;
}

export interface ListViewItemSlots {
    leftOfData?: ReactNode;
    rightOfData?: ReactNode;
}

export interface ListViewItemLinkProps {
    href?: string;
    target?: string;
}

export interface ListViewItemProps extends BoxProps, HoverProps, TestingAttributes {
    /** Object with User/Group data. */
    data: ListViewItemData;
    /** Provides a way to insert markup in specified places. */
    slots?: ListViewItemSlots;
    /** Props forwarded to the icon element. */
    iconProps?: IconProps;
    /** Props forwarded to the icon wrapper element. */
    iconWrapperProps?: IconWrapperProps;
    /**
     * Sets the selected state of the ListViewItem
     */
    isSelected?: boolean;
    /** Overrides the hover state; defaults to internal hover tracking. */
    isHovered?: boolean;
    /** When present, provides meta click functionality. */
    linkProps?: ListViewItemLinkProps;
    /** Deterministically derives the avatar color when no explicit color is set. */
    colorId?: string;
    /** Props forwarded to the underlying avatar element (Onyx theme);
    * `children` is managed by the component. */
    avatarProps?: Omit<AvatarProps, 'children'>;
    /** Initials rendered inside the avatar in place of the icon (Onyx theme). */
    avatarInitials?: string;
    /** Renders the icon avatar round instead of square (Onyx theme). */
    isIconRound?: boolean;
    /** Shows a separator border under the item. */
    hasSeparator?: boolean;
    children?: ReactNode;
}

export type ListViewItemEditButtonProps = IconButtonProps

export interface ListViewItemMenuProps extends MenuProps {
    /** Props forwarded to the internal IconButton. */
    iconButtonProps?: IconButtonProps;
}

export interface ListViewItemSwitchFieldProps extends SwitchFieldProps {
    /** Margin-right applied to the field container. */
    mr?: number | string;
}

export interface ListViewItemChartProps extends BoxProps {
    /** Ref-like object pointing at the chart's container element. */
    containerRef?: { current: HTMLElement | null };
    /** Props forwarded to the internal Button. */
    buttonProps?: ButtonProps;
    /** Array of data points rendered by the chart. */
    chartData: Array<{ id: number, fullData: number }>;
    /** Name of the data key in `chartData` to plot. */
    chartDataKey?: string;
    /** Label under chart. */
    chartLabel?: string;
    /** Container width breakpoint to hide content (counter and counter label). */
    tabletBreakPoint?: number;
    /** Container width breakpoint to hide the whole chart. */
    mobileBreakPoint?: number;
    /** Main title of chart. */
    title?: string;
    /** Text inside tooltip. */
    tooltipText?: string;
    /** Number of events. */
    contentCount?: string;
    /** Label under `contentCount`. */
    contentCountLabel?: string;
    /** Text for trend. */
    trend?: string;
    /** Accessible name for the chart region. */
    ariaLabel?: string;
}
