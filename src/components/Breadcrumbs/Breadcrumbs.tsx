import React, {
  forwardRef,
  useCallback,
  useState,
} from 'react';
import { AriaBreadcrumbsProps, BreadcrumbsAria, mergeProps, useBreadcrumbs } from 'react-aria';

import { useGetTheme, useLocalOrForwardRef, usePropWarning } from '../../hooks';
import { Box, Icon } from '../../index';
import { breadCrumbsProps } from '../../types';

import BreadcrumbItem from './BreadcrumbItem';

const Breadcrumbs = forwardRef<HTMLElement, breadCrumbsProps>((props, ref) => {
  const { children, icon, iconProps, onAction, ...others } = props;

  const { breadcrumbIconSize } = useGetTheme();

  // the following filters undefined values passed as a child
  const filteredChildren = Array.isArray(children)
    ? children.filter(child => child)
    : children;

  const { navProps: wrapperProps }: BreadcrumbsAria = useBreadcrumbs(props as AriaBreadcrumbsProps);

  const breadcrumbsRef = useLocalOrForwardRef<HTMLElement>(ref);

  const [hoveredKey, setHoveredKey] = useState<React.Key | null>(null);

  usePropWarning(props, 'disabled', 'isDisabled');

  const createBreadcrumb = useCallback((child, idx?: number) => {
    const isCurrentItem = Array.isArray(filteredChildren) && filteredChildren.length > 1
      ? idx === (React.Children.toArray(children).length - 1)
      : true;

    const handleTooltipHoverChange = (isHovering: boolean) => {
      setHoveredKey(prevKey => {
        if (isHovering) return child.key;
        return prevKey === child.key ? null : prevKey;
      });
    };

    return (
      <React.Fragment key={`li-${child.key}`}>
        <BreadcrumbItem
          actionKey={child.key}
          data-id={child['data-id']}
          isCurrent={isCurrentItem}
          isTooltipOpen={hoveredKey === child.key}
          onAction={onAction}
          onTooltipHoverChange={handleTooltipHoverChange}
          {...child.props}
        >
          {child.props.children}
        </BreadcrumbItem>
        {icon && !isCurrentItem && (
          <Icon
            aria-hidden="true"
            size={breadcrumbIconSize}
            title={{ name: 'Breadcrumb Separator' }}
            {...iconProps}
            color="text.primary"
            icon={icon}
          />
        )}
      </React.Fragment>
    );
  }, [
    (Array.isArray(children) && children.length),
    filteredChildren,
    icon,
    iconProps,
    onAction,
    hoveredKey,
  ]);

  return (
    <Box as="nav" aria-label="Breadcrumb" sx={{ display: 'flex', minWidth: 0, width: '100%' }}>
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
    </Box>
  );
});


Breadcrumbs.displayName = 'Breadcrumbs';

export default Breadcrumbs;
