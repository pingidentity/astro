import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { useHover, usePress } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { useFocusRing } from '@react-aria/focus';
import { Box, Icon, Text } from '../../index';
import { useStatusClasses, useNavBarPress } from '../../hooks';
import { useNavBarContext } from '../../context/NavBarContext';

const NavBarItem = forwardRef((props, ref) => {
  const {
    icon,
    text,
    className,
    id: key,
    onPress: onPressCallback,
    ...others
  } = props;

  const navItemRef = useRef();

  /* istanbul ignore next */
  useImperativeHandle(ref, () => navItemRef.current);

  const { hoverProps, isHovered } = useHover({});

  const {
    focusProps: focusWithinProps,
  } = useFocusRing({ within: true });

  const { focusProps, isFocusVisible } = useFocusRing();

  const state = useNavBarContext();

  const isSelected = state.selectedKey.includes(key);

  const { onNavPress } = useNavBarPress({ key, onPressCallback }, state);

  const { pressProps, isPressed } = usePress({ ref: navItemRef, onPress: onNavPress });

  const mergedProps = mergeProps(
    pressProps,
    hoverProps,
    focusWithinProps,
    focusProps,
    others,
  );

  const { classNames } = useStatusClasses(className, {
    isPressed,
    isHovered,
    isSelected,
    isFocused: isFocusVisible,
  });

  return (
    <Box
      id={key}
      variant="accordion.accordionGridNavItem"
      isRow
      className={classNames}
      ref={navItemRef}
      {...mergedProps}
      sx={{
        maxHeight: '30px',
      }}
    >
      <Box
        isRow
        sx={{
          alignItems: 'center',
        }}
      >
        {icon &&
          <Icon
            icon={icon}
            size={20}
            sx={{
              mr: '10px',
              color: 'white',
              fill: 'white',
            }}
          />
        }
        <Text
          variant="navBarHeaderText"
        >
          {text}
        </Text>
      </Box>
    </Box>
  );
});

NavBarItem.propTypes = {
  /**  Handler that is called when the press is released over the target. */
  onPress: PropTypes.func,
  /** The icon to render in between each node. */
  icon: PropTypes.elementType,
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id: PropTypes.string,
  /** Text that will render within the component */
  text: PropTypes.string,
};

export default NavBarItem;
