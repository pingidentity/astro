import React, { useRef } from 'react';
import { useFocusManager } from '@react-aria/focus';
import { useKeyboard } from '@react-aria/interactions';
import PropTypes from 'prop-types';

import { Box, Button, Separator, Text } from '../../';
import { useNavBarContext } from '../../context/NavBarContext';
import NavBarItemBody from './NavBarItemBody';
import NavBarItemHeader from './NavBarItemHeader';

/**
 * Composed component that creates a group
 * with title, and separator options.
 *
 */

const NavBarSection = ({ hasSeparator, title, items, ...others }) => {
  const ref = useRef();

  const childrenItems = items.filter(item => item.children);

  return (
    <>
      {title && <Text variant="text.navBarSubtitle">{title}</Text>}
      <ul
        ref={ref}
        style={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
        }}
        {...others}
      >
        {childrenItems.map(item => (
          <li key={item.key}>
            <SectionItem
              key={item.key}
              item={item}
            />
          </li>
        ))}
      </ul>
      {hasSeparator && (
        <Box
          sx={{ pl: '15px', pr: '15px', my: '10px', mt: '15px', mb: '15px' }}
        >
          <Separator variant="separator.navBarSeparator" />
        </Box>
      )}
    </>
  );
};

const SectionItem = ({ item }) => {
  const { key, children, ...others } = item;
  const headerButtonRef = useRef();

  const navBarState = useNavBarContext();
  const { expandedKeys, setExpandedKeys } = navBarState;
  const isExpanded = expandedKeys?.has(key);

  const firstChildKey = children.length ? children[0].key : null;
  const lastChildKey = children.length ? children[children.length - 1].key : null;

  const onExpandedChange = (isOpen) => {
    if (isOpen) {
      expandedKeys.add(key);
    } else {
      expandedKeys.delete(key);
    }

    setExpandedKeys(new Set(expandedKeys));
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
        headerButtonRef.current.focus();
        break;
      case 32:
        if (childKey && e.target?.href) {
          e.target.click();
        }
        break;
      default:
        break;
    }
  };

  const { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      onKeyDown(e);
      e.continuePropagation();
    },
  });

  return (
    <>
      <Button
        ref={headerButtonRef}
        variant="navBarSectionButton"
        onPress={() => onExpandedChange(!isExpanded)}
        {...keyboardProps}
        {...others}
      >
        <NavBarItemHeader item={item} />
      </Button>
      {isExpanded &&
        <NavBarItemBody
          item={item}
          onKeyDown={onKeyDown}
        />
      }
    </>
  );
};

NavBarSection.defaultProps = {
  hasSeparator: false,
};

NavBarSection.propTypes = {
  /** If true, a separator will render at the end of the section */
  hasSeparator: PropTypes.bool,
  /** If present, this string will render at the top of the section */
  title: PropTypes.string,
  /**
   * *For performance reasons, use this prop instead of Array.map when iteratively rendering Items*.
   * For use with [dynamic collections](https://react-spectrum.adobe.com/react-stately/collections.html#dynamic-collections).
  */
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

SectionItem.propTypes = {
  item: PropTypes.shape({ key: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
    'aria-label': PropTypes.string }),
  state: PropTypes.shape({
    collection: PropTypes.shape({}),
    selectedKey: PropTypes.string,
    setSelectedKey: PropTypes.func,
    selectionManager: PropTypes.shape({
      focusedKey: PropTypes.string,
      setFocusedKey: PropTypes.func,
    }),
  }),
  menuProps: PropTypes.shape({}),
};

export default NavBarSection;
