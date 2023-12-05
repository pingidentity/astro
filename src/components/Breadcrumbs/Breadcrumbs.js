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
      <React.Fragment key={`li-${child.key}`}>
        <BreadcrumbItem
          actionKey={child.key}
          data-id={child['data-id']}
          isCurrent={isCurrentItem}
          onAction={onAction}
          {...child.props}
        >
          {child.props.children}
        </BreadcrumbItem>
        {icon && !isCurrentItem && (
        <Icon
          aria-hidden="true"
          icon={icon}
          mx={5}
          size="xs"
          title={{ name: 'Breadcrumb Separator' }}
          {...iconProps}
        />
        )}
      </React.Fragment>
    );
  }, [children.length, filteredChildren, icon, iconProps, onAction]);

  return (
    <nav aria-label="Breadcrumb">
      <Box
        as="ol"
        isRow
        ref={breadcrumbsRef}
        variant="variants.breadcrumb.containerOl"
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
