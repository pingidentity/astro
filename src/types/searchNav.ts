import { Dispatch, Key, MutableRefObject, SetStateAction } from 'react';

import { BoxProps } from './box';
import { ButtonProps } from './button';
import { MenuProps } from './menu';
import { PopoverWrapperProps } from './popoverContainer';
import { PopoverMenuProps } from './popoverMenu';
import { TabProps } from './tab';
import { TextProps } from './text';

type GenericItemType = {
    text: string
    key: Key
}

type StandardCallback = (key: Key) => void;

type KeySetter = Dispatch<SetStateAction<Key>>;

type CallbackOrSetter = StandardCallback | KeySetter;

export interface MoreItemsPopoverProps {
    buttonRef: MutableRefObject<HTMLButtonElement | null>
    items: GenericItemType[],
    moreButtonText?: string
    onOpenChange?: (isOpen: boolean) => void
    popoverButtonProps?: ButtonProps
    popoverMenuProps?: MenuProps
    popoverProps?: PopoverMenuProps
    setSelectedKey: (key: Key) => void
    tabProps?: TabProps
}

export interface SearchNavTabProps {
    className?: string
    item: GenericItemType
    labelProps?: TextProps
    selectedKey?: Key
    setSelectedKey: (key: Key) => void
    tabProps?: TabProps

}

export interface SearchNavProps {
    defaultSelectedKey?: Key
    items: GenericItemType[],
    labelProps?: TextProps
    moreButtonText?: string
    onSelectionChange?: (key?: Key | null) => void,
    popoverButtonProps?: ButtonProps
    popoverMenuProps?: MenuProps
    popoverProps?: PopoverMenuProps
    rowProps?: BoxProps
    selectedKey?: Key,
    setSelectedKey?: CallbackOrSetter
    onOpenChange?: (isOpen: boolean) => void
    tabProps?: TabProps
}
