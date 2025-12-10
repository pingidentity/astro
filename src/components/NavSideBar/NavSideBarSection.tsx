import React, { Children, forwardRef } from 'react';
import { useFocusManager } from '@react-aria/focus';
import { useKeyboard } from '@react-aria/interactions';

import { useNavBarContext } from '../../context/NavBarContext';
import { Box } from '../../index';
import { NavSideBarSectionItemProps, NavSideBarSectionProps } from '../../types';

import NavSideBarSectionHeader from './NavSideBarSectionHeader';

const NavSideBarSection = forwardRef<HTMLUListElement, NavSideBarSectionProps>((props, ref) => {
  const {
    children,
    title,
    icon,
    id,
    onKeyDown: onKeyDownProp,
    headerProps,
    ...others
  } = props;

  const navBarState = useNavBarContext();
  const { isAutoСollapsible, expandedKeys, setExpandedKeys } = navBarState;
  const isExpanded = expandedKeys.includes(id);

  const firstChildKey = Array.isArray(children) && children.length && children[0].key !== undefined
    ? children[0].key
    : null;

  const lastChildKey = Array.isArray(children)
    && children.length && children[children.length - 1].key !== undefined
    ? children[children.length - 1].key
    : null;

  const onExpandedChange = isOpen => {
    let newArray;
    if (isOpen) {
      newArray = isAutoСollapsible ? [id] : [...expandedKeys, id];
    } else {
      newArray = expandedKeys.filter(thisKey => thisKey !== id);
    }
    setExpandedKeys(newArray);
  };

  const focusManager = useFocusManager();
  const onKeyDown = (e, childKey) => {
    switch (e.which) {
      case 37:
      case 38:
        if (firstChildKey && childKey !== firstChildKey) {
          focusManager.focusPrevious();
        }
        e.preventDefault();
        break;
      case 39:
      case 40:
        if (lastChildKey && childKey !== lastChildKey) {
          focusManager.focusNext();
        }
        e.preventDefault();
        break;
      case 27:
        onExpandedChange(false);
        break;
      case 32:
        if (childKey && e.target?.href) {
          e.target.click();
        }
        break;
      default:
        break;
    }
    if (onKeyDownProp) {
      onKeyDownProp(e);
    }
  };

  const { keyboardProps } = useKeyboard({
    onKeyDown: e => {
      onKeyDown(e, undefined);
      e.continuePropagation();
    },
  });

  const expendedBoxId = `expanded-container-${id}`;

  return (
    <>
      <NavSideBarSectionHeader
        items={children}
        id={id}
        aria-controls={isExpanded ? expendedBoxId : undefined}
        icon={icon}
        {...keyboardProps}
        onExpandedChange={onExpandedChange}
        {...headerProps}
      >
        {title}
      </NavSideBarSectionHeader>
      {isExpanded && (
        <Box id={expendedBoxId} role="region">
          <Box
            as="ul"
            ref={ref}
            variant={navBarState.navStyles.navBarSectionList}
            {...others}
          >
            {
              Children.map(children, (child: React.ReactNode) => (
                <Box as="li" variant={navBarState.navStyles.navBarItemHeaderListItem}>
                  {React.isValidElement(child)
                    ? React.cloneElement(child as React.ReactElement<NavSideBarSectionItemProps>, {
                      onKeyDown,
                      id: child.key as string,
                    }) : child}
                </Box>
              ))
            }
          </Box>
        </Box>
      )}
    </>
  );
});


export default NavSideBarSection;
