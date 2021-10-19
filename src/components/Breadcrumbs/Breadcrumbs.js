import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  Fragment,
} from 'react';
import { useBreadcrumbs } from '@react-aria/breadcrumbs';
import PropTypes from 'prop-types';
import { mergeProps } from '@react-aria/utils';
import { Box, Icon } from '../../index';
import BreadcrumbItem from './BreadcrumbItem';

/**
 * Breadcrumbs component wrapping an array of `BreadcrumbItem` elements and icon,
 * which will be rendered between each node, sans last-child
 *
 * Utilizes [useBreadcrumbs](https://react-spectrum.adobe.com/react-aria/useBreadcrumbs.html) from React-Aria.
 * */

const Breadcrumbs = forwardRef((props, ref) => {
  const { children, icon, iconProps, onAction, ...others } = props;
  const { navProps: wrapperProps } = useBreadcrumbs(props);

  const breadcrumbsRef = useRef();

  /* istanbul ignore next */
  useImperativeHandle(ref, () => breadcrumbsRef.current);

  return (
    <Box
      ref={breadcrumbsRef}
      display="flex"
      flexDirection="row"
      alignItems="center"
      sx={{ overflow: 'auto' }}
      {...mergeProps(wrapperProps, others)}
    >
      {children.map((child, idx) => (
        <Fragment key={`fragment-${child.key}`}>
          <BreadcrumbItem
            data-id={child['data-id']}
            isCurrent={idx === children.length - 1}
            onAction={onAction}
            actionKey={child.key}
            {...child.props}
          >
            {child.props.children}
          </BreadcrumbItem>
          {icon && idx !== children.length - 1 && (
            <Icon icon={icon} {...iconProps} />
          )}
        </Fragment>
      ))}
    </Box>
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
