import React, { forwardRef } from 'react';
import { useFocusManager } from '@react-aria/focus';
import { useKeyboard } from '@react-aria/interactions';

import { Box, Button, Link, Separator, Text } from '../..';
import { useNavBarContext } from '../../context/NavBarContext';
import { useMountTransition, useStatusClasses } from '../../hooks';
import { NavBarSectionProps, PrimaryItemProps, SectionItemProps } from '../../types/navBar';

import NavBarItemBody from './NavBarItemBody';
import NavBarItemHeader from './NavBarItemHeader';

/**
 * Composed component that creates a group
 * with title, and separator options.
 *
 */

const NavBarSection = forwardRef<HTMLUListElement, NavBarSectionProps<object>>(
  ({ hasSeparator, title, items, onKeyDown, ...others }, ref) => {
    let childrenItems;
    if (Array.isArray(items)) {
      childrenItems = items?.filter(item => item.children || item.href);
    }

    const state = useNavBarContext();

    return (
      <>
        {hasSeparator && (
          <Separator variant="separator.navBarSeparator" />
        )}
        {title && <Text variant="variants.navBar.subtitle" mt={hasSeparator ? '0' : undefined}>{title}</Text>}
        <ul
          ref={ref}
          style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}
          {...others}
        >
          {childrenItems && childrenItems.map(item => (
            <Box as="li" key={item.key} variant={state.navStyles.navBarItemHeaderListItem}>
              {!item.children && item.href
                ? (
                  <PrimaryItem
                    key={item.key}
                    item={item}
                  />
                )
                : (
                  <SectionItem
                    key={item.key}
                    item={item}
                    onKeyDown={onKeyDown}
                  />
                )}
            </Box>
          ))}
        </ul>
      </>
    );
  });

const SectionItem = ({ item, onKeyDown: onKeyDownProp }: SectionItemProps<object>) => {
  const { key, children, ...others } = item!;

  const navBarState = useNavBarContext();
  const { isAutoСollapsible, expandedKeys, setExpandedKeys } = navBarState;
  const isExpanded = expandedKeys.includes(key);

  const firstChildKey = children && children.length ? children[0].key : null;

  const lastChildKey = children && children.length ? children[children.length - 1].key : null;

  const onExpandedChange = isOpen => {
    let newArray;
    if (isOpen) {
      newArray = isAutoСollapsible ? [key] : [...expandedKeys, key];
    } else {
      newArray = expandedKeys.filter(thiskey => thiskey !== key);
    }
    setExpandedKeys(newArray);
  };

  const focusManager = useFocusManager();
  const onKeyDown = (e, childKey) => {
    switch (e.which) {
      case 39:
      case 40:
        if (childKey !== lastChildKey) {
          focusManager.focusNext();
        }
        e.preventDefault();
        break;
      case 37:
      case 38:
        if (childKey !== firstChildKey) {
          focusManager.focusPrevious();
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

  const isTransitioning = useMountTransition(isExpanded, 300);

  const { classNames } = useStatusClasses('', {
    isTransitioning,
    isExpanded,
  });

  return (
    <>
      <Button
        variant={navBarState.navStyles.sectionItem}
        onPress={() => onExpandedChange(!isExpanded)}
        {...keyboardProps}
        {...others}
      >
        <NavBarItemHeader item={item!} />
      </Button>
      {(isExpanded || isTransitioning)
        && (
          <NavBarItemBody
            item={item}
            onKeyDown={onKeyDown}
            className={classNames}
            isExpanded={expandedKeys.includes(key)}
            isTransitioning={isTransitioning}
          />
        )}
    </>
  );
};

const PrimaryItem = ({ item }: PrimaryItemProps) => {
  const state = useNavBarContext();
  return (
    <Link
      variant={state.navStyles.primaryItem}
      href={item && item.href}
      target="_blank"
    >
      <NavBarItemHeader item={item} />
    </Link>
  );
};

NavBarSection.defaultProps = {
  hasSeparator: false,
};

export default NavBarSection;
