import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import { useBreadcrumbs } from '@react-aria/breadcrumbs';
import PropTypes from 'prop-types';
import { mergeProps } from '@react-aria/utils';
import { Box, Icon } from '../../index';
import { usePropWarning } from '../../hooks/';
import BreadcrumbItem from './BreadcrumbItem';

/**
 * Breadcrumbs component wrapping an array of `BreadcrumbItem` elements and icon,
 * which will be rendered between each node, sans last-child
 *
 * Utilizes [useBreadcrumbs](https://react-spectrum.adobe.com/react-aria/useBreadcrumbs.html) from React-Aria.
 * */

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
    const isCurrentItem =
      Array.isArray(filteredChildren) && filteredChildren.length > 1
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
      >
        <BreadcrumbItem
          data-id={child['data-id']}
          isCurrent={isCurrentItem}
          onAction={onAction}
          actionKey={child.key}
          variant="text.breadcrumbLink"
          {...child.props}
        >
          {child.props.children}
        </BreadcrumbItem>
        {icon && !isCurrentItem && <Icon aria-hidden="true" icon={icon} mx={5} size={16} {...iconProps} />}
      </Box>
    );
  }, [children.length, filteredChildren, icon, iconProps, onAction]);

  return (
    <nav>
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
