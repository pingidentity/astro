import React, {
  forwardRef,
  Fragment,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { mergeProps, useBreadcrumbItem } from 'react-aria';
import { omit } from 'lodash/object';
import PropTypes from 'prop-types';

import { usePropWarning } from '../../hooks';
import {
  Box,
  Button,
  IconButton,
  Link,
  Text,
} from '../../index';

export const ELEMENT_TYPE = {
  BUTTON: 'Button',
  ICON_BUTTON: 'IconButton',
  TEXT: 'Text',
  LINK: 'Link',
  FRAGMENT: 'Fragment',
};

const BreadcrumbItem = forwardRef((props, ref) => {
  const {
    children,
    elementType,
    onAction,
    actionKey,
    isCurrent,
    ...others
  } = props;

  const itemRef = useRef();

  usePropWarning(props, 'disabled', 'isDisabled');
  /* istanbul ignore next */
  useImperativeHandle(ref, () => itemRef.current);

  const { itemProps } = useBreadcrumbItem({ ...props }, itemRef);

  const ElementType = useMemo(() => {
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
  }, [elementType]);

  const onPressHandler = useCallback(() => {
    if (onAction) {
      onAction(actionKey);
    }
  }, [onAction, actionKey]);

  const elementsWithOnPressProp = ['Button', 'IconButton', 'Link'];

  const elementProps = useMemo(() => {
    const elementTypeProps = { ...mergeProps(itemProps, others) };
    if (elementsWithOnPressProp.includes(elementType)) {
      elementTypeProps.onPress = onPressHandler;
    }
    if (isCurrent) {
      elementTypeProps.className = elementTypeProps.className
        ? `${elementTypeProps.className} is-current`
        : 'is-current';
    }
    return omit(elementTypeProps, 'onClick', 'onKeyDown', 'onKeyUp');
  }, [elementType, itemProps, others, onPressHandler]);

  const elementVariantProps = elementType !== ELEMENT_TYPE.FRAGMENT && {
    variant: elementType === ELEMENT_TYPE.LINK ? 'variants.breadcrumb.link' : '',
    ref: itemRef,
    ...elementProps,
  };

  return (
    <Box
      as="li"
      className={isCurrent && 'is-current'}
      variant="variants.breadcrumb.containerLi"
    >
      <ElementType {...elementVariantProps}>
        {children}
      </ElementType>
    </Box>
  );
});

BreadcrumbItem.propTypes = {
  actionKey: PropTypes.string,
  /** Whether the breadcrumb item represents the current page. */
  isCurrent: PropTypes.bool,
  /** The HTML element used to render the breadcrumb link, e.g. 'a', or 'span'.
   * Also can be passed 'Button', 'Icon', 'IconButton', 'Text' - will be used
   * appropriate component from Astro library.
   * */
  elementType: PropTypes.elementType,
  /** Whether the breadcrumb item is disabled. */
  isDisabled: PropTypes.bool,
  onAction: PropTypes.func,
};

BreadcrumbItem.defaultProps = {
  elementType: 'Link',
};

BreadcrumbItem.displayName = 'BreadcrumbItem';

export default BreadcrumbItem;
