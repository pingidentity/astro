import React, { forwardRef, useRef, useContext, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import MenuDown from 'mdi-react/MenuDownIcon';
import MenuUp from 'mdi-react/MenuUpIcon';
import { Button as RButton } from 'rebass';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { useAccordionItem } from '@react-aria/accordion';
import { useButton } from '@react-aria/button';

import { useFocusRing } from '@react-aria/focus';
import { Text, Icon, Box } from '../../index';
import useStatusClasses from '../../hooks/useStatusClasses';
import { AccordionContext } from '../../context/AccordionContext';

const AccordionItem = forwardRef((props, ref) => {
  const { className, item } = props;

  const state = useContext(AccordionContext);
  const buttonRef = useRef();
  const { buttonProps, regionProps } = useAccordionItem(props, state, buttonRef);
  const { hoverProps, isHovered } = useHover(props);
  const { focusProps, isFocusVisible } = useFocusRing();
  const isOpen = state.expandedKeys.has(item.key);
  const isDisabled = state.disabledKeys.has(item.key);

  /* istanbul ignore next */
  useImperativeHandle(ref, () => buttonRef.current);

  const buttonObject = useButton(
    props,
    buttonRef);
  const { isPressed } = buttonObject;

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

  return (
    <Box variant="accordion.accordion" className={itemClasses}>
      <RButton
        ref={buttonRef}
        variant="accordionHeader"
        className={buttonClasses}
        {...mergeProps(hoverProps, focusProps, buttonProps, buttonObject.buttonProps)}
      >
        <Text className={buttonClasses} variant="accordion.accordionTitle">
          {item.props.label}
        </Text>
        <Box as="span" ml="5px">
          <Icon icon={isOpen ? MenuUp : MenuDown} />
        </Box>
      </RButton>
      <Box variant="accordion.accordionBody" {...regionProps}>
        {item.rendered}
      </Box>
    </Box>
  );
});

AccordionItem.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.string,
    rendered: PropTypes.node,
    props: PropTypes.shape({
      label: PropTypes.string,
    }),
  }),
};

AccordionItem.displayName = 'AccordionItem';
export default AccordionItem;
