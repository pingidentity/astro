import { Key, ReactElement } from 'react';
import type { Collection, CollectionChildren, CollectionStateBase, Node } from '@react-types/shared';
import { ThemeUICSSObject } from 'theme-ui';

import { Status } from './item';

export interface MessageItemProps {
  children?: React.ReactNode | string;
  /* Background color */
  bg?: string;
  /* Text color */
  color?: string;
  /* Message icon */
  icon?: React.ElementType;
  /* Hides the message with an animated transition */
  isHidden?: boolean;
  'data-id'?: string;
  status?: Status;
}

export interface MessageItem {
  text?: string;
  node?: React.ReactNode;
  key?: Key;
  props?: MessageItemProps;
  status?: Status;
}
export interface CollectionOptions<T, C extends Collection<Node<T>>> extends Omit<CollectionStateBase<T, C>, 'children'> {
  children?: ReactElement | ReactElement[] | ((item: T) => ReactElement)
}

export interface MessagesProps<T> {
  children: CollectionChildren<T>;
  /* For use with [dynamic collections](https://react-spectrum.adobe.com/react-stately/collections.html#dynamic-collections). */
  items?: MessageItem[];
  /* Callback for clicking the message's close button */
  onClose?: (key: Key) => void;
  sx?: ThemeUICSSObject;
}

export interface CloseButtonProps {
  color?: string;
  onPress?: () => void;
  variant?: string;
  className?: string;
}

export interface MessageProps {
  className?: string;
  item: {
    key?: Key;
    props?: MessageItemProps;
  };
  /* Callback for clicking the message's close button */
  onClose?: (key: Key) => void;
}
