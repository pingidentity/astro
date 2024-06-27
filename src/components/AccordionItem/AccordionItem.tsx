import React, { useContext, useRef } from 'react';
import { mergeProps, useButton } from 'react-aria';
import MenuDown from '@pingux/mdi-react/MenuDownIcon';
import MenuUp from '@pingux/mdi-react/MenuUpIcon';
import { AccordionItemAriaProps, useAccordionItem } from '@react-aria/accordion';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { TreeState } from '@react-stately/tree';
import type { Node } from '@react-types/shared';
import { Button as ThemeUIButton } from 'theme-ui';

import { AccordionContext } from '../../context/AccordionContext';
import { useStatusClasses } from '../../hooks';
import { Box, Icon, Text } from '../../index';
import { hoveredState } from '../AccordionGroup/Accordion.styles';

export const validHeadingTags = ['h1', 'h2', 'h3', 'h4'];

interface AccordionItemProps<T> {
  item: Node<T>,
  className?: string,
  labelHeadingTag: string,
  'aria-label'?: string,
  'data-id'?: string,
  children: React.ReactNode,
  buttonProps?: object,
  slots?: {
    postHeading: React.ReactNode,
  },
}

const AccordionItem = (props: AccordionItemProps<object>) => {
  const { className, item, labelHeadingTag } = props;
  const {
    containerProps = {},
    buttonProps = {},
    regionProps = {},
    ...others
  } = item.props;

  const state = useContext(AccordionContext) as TreeState<object>;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const {
    buttonProps: accordionButtonProps,
    regionProps: accordionRegionProps,
  } = useAccordionItem(
    props as AccordionItemAriaProps<object>,
    state,
    buttonRef);
  const { focusProps, isFocusVisible } = useFocusRing();
  const isOpen = state.expandedKeys.has(item.key);
  const isDisabled = state.disabledKeys.has(item.key);
  const { hoverProps, isHovered } = useHover({ isDisabled });

  /* istanbul ignore next */

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
      <Box isRow>
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
        {item.props.slots?.postHeading
          && (
            item.props.slots?.postHeading
          )}
      </Box>
      {isOpen
        && (
          <Box variant="accordion.body" {...accordionRegionProps} {...regionProps} className={itemClasses}>
            {item.rendered}
          </Box>
        )}
    </Box>
  );
};

AccordionItem.displayName = 'AccordionItem';
export default AccordionItem;
