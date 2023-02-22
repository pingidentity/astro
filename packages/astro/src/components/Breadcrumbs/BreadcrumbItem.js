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
import { Button, IconButton, Link, Text } from '../../index';

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
      case 'Button':
        return Button;
      case 'IconButton':
        return IconButton;
      case 'Text':
        return Text;
      case 'Link':
        return Link;
      case 'Fragment':
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

  const elementProps = useMemo(() => {
    const elementTypeProps = { ...mergeProps(itemProps, others) };
    if (ElementType.propTypes?.onPress) {
      elementTypeProps.onPress = onPressHandler;
    }
    if (isCurrent) {
      elementTypeProps.className = elementTypeProps.className
        ? `${elementTypeProps.className} is-current`
        : 'is-current';
    }
    return omit(elementTypeProps, 'onClick', 'onKeyDown', 'onKeyUp');
  }, [elementType, itemProps, others, onPressHandler]);

  return React.cloneElement(
    <ElementType />,
    {
      ...elementProps,
      ref,
    },
    children,
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
