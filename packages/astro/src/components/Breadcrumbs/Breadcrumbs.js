import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import { mergeProps, useBreadcrumbs } from 'react-aria';
import PropTypes from 'prop-types';

import { usePropWarning } from '../../hooks';
import { Box, Icon } from '../../index';

import BreadcrumbItem from './BreadcrumbItem';

const Breadcrumbs = forwardRef((props, ref) => {
  const { children, icon, iconProps, onAction, ...others } = props;
  // the following filters undefined values passed as a child
  const filteredChildren = Array.isArray(children)
    ? children.filter(child => child)
    : children;
  const { navProps: wrapperProps } = useBreadcrumbs(props);

  const breadcrumbsRef = useRef();

  usePropWarning(props, 'disabled', 'isDisabled');
  /* istanbul ignore next */
  useImperativeHandle(ref, () => breadcrumbsRef.current);
  const createBreadcrumb = useCallback((child, idx) => {
    const isCurrentItem = Array.isArray(filteredChildren) && filteredChildren.length > 1
      ? idx === children.length - 1
      : true;

    return (
      <Box
        isRow
        sx={{
          alignItems: 'center',
          minHeight: 42,
        }}
        as="li"
        key={`li-${child.key}`}
        variant="variants.breadcrumb.containerLi"
      >
        <BreadcrumbItem
          data-id={child['data-id']}
          isCurrent={isCurrentItem}
          onAction={onAction}
          actionKey={child.key}
          variant="variants.breadcrumb.link"
          {...child.props}
        >
          {child.props.children}
        </BreadcrumbItem>
        {icon && !isCurrentItem && <Icon aria-hidden="true" icon={icon} mx={5} size="xs" {...iconProps} />}
      </Box>
    );
  }, [children.length, filteredChildren, icon, iconProps, onAction]);

  return (
    <nav aria-label="Breadcrumb">
      <Box
        ref={breadcrumbsRef}
        isRow
        sx={{ paddingInlineStart: 'unset' }}
        as="ol"
        {...mergeProps(wrapperProps, others)}
      >
        {Array.isArray(filteredChildren)
          ? filteredChildren.map(createBreadcrumb)
          : createBreadcrumb(children)}
      </Box>
    </nav>
  );
});

Breadcrumbs.propTypes = {
  /** The icon to render in between each node. */
  icon: PropTypes.elementType,
  /** Props object passed along to the Icon component. */
  iconProps: PropTypes.shape({}),
  /** Whether the Breadcrumbs are disabled. */
  isDisabled: PropTypes.bool,
  /** Defines a string value that labels the current element. */
  'aria-label': PropTypes.string,
  /** Called when an item is acted upon (usually selection via press). */
  /** (key: Key) => void. */
  onAction: PropTypes.func,
};

Breadcrumbs.displayName = 'Breadcrumbs';

export default Breadcrumbs;
