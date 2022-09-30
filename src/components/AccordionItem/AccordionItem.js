import React, { forwardRef, useRef, useContext, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import MenuDown from 'mdi-react/MenuDownIcon';
import MenuUp from 'mdi-react/MenuUpIcon';
import { Button as ThemeUIButton } from 'theme-ui';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { useAccordionItem } from '@react-aria/accordion';
import { useButton } from '@react-aria/button';

import { useFocusRing } from '@react-aria/focus';
import { Text, Icon, Box } from '../../index';
import { useStatusClasses } from '../../hooks';
import { AccordionContext } from '../../context/AccordionContext';

const AccordionItem = forwardRef((props, ref) => {
  const { className, item } = props;
  const {
    label,
    children,
    textValue,
    containerProps = {},
    buttonProps = {},
    regionProps = {},
    ...others
  } = item.props;

  const state = useContext(AccordionContext);
  const buttonRef = useRef();
  const {
    buttonProps: accordionButtonProps,
    regionProps: accordionRegionProps,
  } = useAccordionItem(props, state, buttonRef);
  const { hoverProps, isHovered } = useHover(props);
  const { focusProps, isFocusVisible } = useFocusRing();
  const isOpen = state.expandedKeys.has(item.key);
  const isDisabled = state.disabledKeys.has(item.key);

  /* istanbul ignore next */
  useImperativeHandle(ref, () => buttonRef.current);

  const { isPressed, buttonProps: raButtonProps } = useButton(props, buttonRef);

  const { classNames: itemClasses } = useStatusClasses(className, {
    isOpen,
    isDisabled,
    isPressed,
  });

  const { classNames: buttonClasses } = useStatusClasses(null, {
    isHovered,
    isFocused: isFocusVisible,
    isPressed,
  });

  const ariaLabel = props['aria-label'] || item.props.label;

  return (
    <Box variant="accordion.accordion" className={itemClasses} {...others} {...containerProps}>
      <ThemeUIButton
        aria-label={ariaLabel}
        ref={buttonRef}
        sx={{ display: 'flex', px: '0', height: 'unset' }}
        variant="variants.accordion.header"
        className={buttonClasses}
        {...mergeProps(hoverProps, accordionButtonProps, raButtonProps, buttonProps, focusProps)}
      >
        <Text className={buttonClasses} variant="accordion.title">
          {item.props.label}
        </Text>
        <Box as="span" ml="5px">
          <Icon icon={isOpen ? MenuUp : MenuDown} />
        </Box>
      </ThemeUIButton>
      {isOpen &&
        <Box variant="accordion.body" {...accordionRegionProps} {...regionProps} className={itemClasses} >
          {item.rendered}
        </Box>
      }
    </Box>
  );
});

AccordionItem.propTypes = {
  'aria-label': PropTypes.string,
  item: PropTypes.shape({
    key: PropTypes.string,
    rendered: PropTypes.node,
    props: PropTypes.shape({
      label: PropTypes.string,
      children: PropTypes.node,
      textValue: PropTypes.string,
      containerProps: PropTypes.shape({}),
      buttonProps: PropTypes.shape({}),
      regionProps: PropTypes.shape({}),
    }),
  }),
};

AccordionItem.displayName = 'AccordionItem';
export default AccordionItem;
