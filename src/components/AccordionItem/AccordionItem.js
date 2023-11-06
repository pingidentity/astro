import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { mergeProps, useButton } from 'react-aria';
import MenuDown from '@pingux/mdi-react/MenuDownIcon';
import MenuUp from '@pingux/mdi-react/MenuUpIcon';
import { useAccordionItem } from '@react-aria/accordion';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import PropTypes from 'prop-types';
import { Button as ThemeUIButton } from 'theme-ui';

import { AccordionContext } from '../../context/AccordionContext';
import { useStatusClasses } from '../../hooks';
import { Box, Icon, Text } from '../../index';
import { hoveredState } from '../AccordionGroup/Accordion.styles';

export const validHeadingTags = ['h1', 'h2', 'h3', 'h4'];

const AccordionItem = forwardRef((props, ref) => {
  const { className, item, labelHeadingTag } = props;
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

  const ariaLabel = props['aria-label'];

  const isValidHeadingTag = validHeadingTags.includes(labelHeadingTag?.toLowerCase());

  const validLabelHeadingTag = isValidHeadingTag
    ? labelHeadingTag?.toLowerCase()
    : 'span';

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
        <Text
          as={validLabelHeadingTag}
          className={buttonClasses}
          variant={validLabelHeadingTag}
          sx={hoveredState}
        >
          {item.props.label}
        </Text>
        <Box as="span" ml="5px">
          <Icon icon={isOpen ? MenuUp : MenuDown} title={{ name: isOpen ? 'Menu Up Icon' : 'Menu Down Icon' }} />
        </Box>
      </ThemeUIButton>
      {isOpen
        && (
          <Box variant="accordion.body" {...accordionRegionProps} {...regionProps} className={itemClasses}>
            {item.rendered}
          </Box>
        )}
    </Box>
  );
});

AccordionItem.propTypes = {
  'aria-label': PropTypes.string,
  labelHeadingTag: PropTypes.oneOf([
    ...validHeadingTags,
    ...validHeadingTags.map(heading => heading.toUpperCase()),
  ]),
  item: PropTypes.shape({
    key: PropTypes.string,
    rendered: PropTypes.node,
    props: PropTypes.shape({
      label: PropTypes.node,
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
