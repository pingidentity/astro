import React, {
  ElementType,
  forwardRef,
  Fragment,
  RefObject,
  useCallback,
  useMemo,
} from 'react';
import { AriaBreadcrumbItemProps, BreadcrumbItemAria, mergeProps, useBreadcrumbItem } from 'react-aria';
import { omit } from 'lodash/object';

import { useLocalOrForwardRef, usePropWarning } from '../../hooks';
import {
  Box,
  Button,
  IconButton,
  Link,
  Text,
} from '../../index';
import { breadCrumbItemProps, FocusableElement } from '../../types';

export const ELEMENT_TYPE = {
  BUTTON: 'Button',
  ICON_BUTTON: 'IconButton',
  TEXT: 'Text',
  LINK: 'Link',
  FRAGMENT: 'Fragment',
};

const BreadcrumbItem = forwardRef<HTMLElement, breadCrumbItemProps>((props, ref) => {
  const {
    children,
    elementType,
    onAction,
    actionKey,
    isCurrent,
    ...others
  } = props;

  const itemRef = useLocalOrForwardRef<HTMLElement>(ref);

  usePropWarning(props, 'disabled', 'isDisabled');

  const { itemProps }: BreadcrumbItemAria = useBreadcrumbItem(
    { ...props } as AriaBreadcrumbItemProps,
    itemRef as RefObject<FocusableElement>);

  const BreadcrumbItemElementType = useMemo(() => {
    if (isCurrent) return Text;

    switch (elementType) {
      case ELEMENT_TYPE.BUTTON:
        return Button;
      case ELEMENT_TYPE.ICON_BUTTON:
        return IconButton;
      case ELEMENT_TYPE.TEXT:
        return Text;
      case ELEMENT_TYPE.LINK:
        return Link;
      case ELEMENT_TYPE.FRAGMENT:
        return Fragment;
      default:
        return elementType;
    }
  }, [elementType, isCurrent]) as ElementType;

  const onPressHandler = useCallback(() => {
    if (onAction) {
      onAction(actionKey);
    }
  }, [onAction, actionKey]);

  const elementsWithOnPressProp: unknown[] = ['Button', 'IconButton', 'Link'];

  const elementProps = useMemo(() => {
    const elementTypeProps = { ...mergeProps(itemProps, others) };
    if (elementsWithOnPressProp.includes(elementType)) {
      elementTypeProps.onPress = onPressHandler;
    }
    if (isCurrent) {
      elementTypeProps.className = elementTypeProps.className
        ? `${elementTypeProps.className} is-current`
        : 'is-current';

      Reflect.deleteProperty(elementTypeProps, 'onPress');
      Reflect.deleteProperty(elementTypeProps, 'href');
    }
    return omit(elementTypeProps, 'onClick', 'onKeyDown', 'onKeyUp');
  }, [elementType, itemProps, others, onPressHandler, isCurrent, elementsWithOnPressProp]);

  const elementVariantProps = elementType !== ELEMENT_TYPE.FRAGMENT && {
    variant: elementType === ELEMENT_TYPE.LINK ? 'variants.breadcrumb.link' : '',
    ref: itemRef,
    ...elementProps,
    role: isCurrent ? 'text' : 'link',
  };

  return (
    <Box
      as="li"
      className={isCurrent ? 'is-current' : ''}
      variant="variants.breadcrumb.containerLi"
    >
      <BreadcrumbItemElementType {...elementVariantProps}>
        {children}
      </BreadcrumbItemElementType>
    </Box>
  );
});

BreadcrumbItem.defaultProps = {
  elementType: 'Link',
};

BreadcrumbItem.displayName = 'BreadcrumbItem';

export default BreadcrumbItem;
