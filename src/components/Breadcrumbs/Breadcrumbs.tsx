import React, {
  forwardRef,
  useCallback,
} from 'react';
import { AriaBreadcrumbsProps, BreadcrumbsAria, mergeProps, useBreadcrumbs } from 'react-aria';

import { useLocalOrForwardRef, usePropWarning } from '../../hooks';
import { Box, Icon } from '../../index';
import { breadCrumbsProps } from '../../types';

import BreadcrumbItem from './BreadcrumbItem';

const Breadcrumbs = forwardRef<HTMLElement, breadCrumbsProps>((props, ref) => {
  const { children, icon, iconProps, onAction, ...others } = props;

  // the following filters undefined values passed as a child
  const filteredChildren = Array.isArray(children)
    ? children.filter(child => child)
    : children;

  const { navProps: wrapperProps }: BreadcrumbsAria = useBreadcrumbs(props as AriaBreadcrumbsProps);

  const breadcrumbsRef = useLocalOrForwardRef<HTMLElement>(ref);

  usePropWarning(props, 'disabled', 'isDisabled');

  const createBreadcrumb = useCallback((child, idx?: number) => {
    const isCurrentItem = Array.isArray(filteredChildren) && filteredChildren.length > 1
      ? idx === (React.Children.toArray(children).length - 1)
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
            mx={5}
            size="xs"
            title={{ name: 'Breadcrumb Separator' }}
            {...iconProps}
            icon={icon}
          />
        )}
      </React.Fragment>
    );
  }, [(Array.isArray(children) && children.length), filteredChildren, icon, iconProps, onAction]);

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


Breadcrumbs.displayName = 'Breadcrumbs';

export default Breadcrumbs;
