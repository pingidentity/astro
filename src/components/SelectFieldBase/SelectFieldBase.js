import React, { forwardRef, useMemo } from 'react';
import { HiddenSelect } from 'react-aria';
import MenuDown from '@pingux/mdi-react/MenuDownIcon';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

import { ariaAttributesBasePropTypes, getAriaAttributeProps } from '../../utils/docUtils/ariaAttributes';
import { statusPropTypes } from '../../utils/docUtils/statusProp';
import Box from '../Box';
import Button from '../Button';
import FieldHelperText from '../FieldHelperText';
import Icon from '../Icon';
import Label from '../Label';
import { modes } from '../Label/constants';
import Loader from '../Loader';
import Text from '../Text';

/**
 * Select field (dropdown) that does not rely on native browser or mobile implementations.
 *
 * Utilizes [useSelect](https://react-spectrum.adobe.com/react-aria/useSelect.html) from React Aria
 * and [useSelectState](https://react-spectrum.adobe.com/react-stately/useSelectState.html) from
 * React Stately.
 */
const SelectFieldBase = forwardRef(({
  columnStyleProps,
  defaultText,
  fieldContainerProps,
  fieldControlInputProps,
  fieldControlWrapperProps,
  fieldLabelProps,
  helperText,
  isLoadingInitial,
  label,
  labelMode,
  name,
  overlay,
  placeholder,
  slots,
  state,
  status,
  trigger,
  triggerProps,
  triggerRef,
  valueProps,
  ...others
}, ref) => {
  const { ariaProps } = getAriaAttributeProps(others);

  const helperTextId = useMemo(() => uuid(), []);

  const defaultTrigger = (
    <Box {...fieldControlWrapperProps} variant="forms.input.fieldControlWrapper">
      <Button
        className={fieldControlInputProps.className}
        ref={triggerRef}
        variant="forms.select"
        {...triggerProps}
        {...ariaProps}
        aria-describedby={helperText && helperTextId}
      >
        <Box as="span" variant="forms.select.currentValue" {...valueProps}>
          {/* Use selectedItem.props.value if item text in selectedfield
              should differ from the option text */}
          {
            state.selectedItem
              ? state.selectedItem.rendered
              : <Text variant="placeholder">{labelMode === modes.FLOAT ? '' : placeholder || defaultText}</Text>
          }
        </Box>
        {isLoadingInitial && <Loader variant="loader.withinInput" />}
        <Box as="span" aria-hidden="true" variant="forms.select.arrow">
          <Icon
            icon={MenuDown}
            title={{ name: 'Menu down' }}
            sx={
              state.isOpen
                ? { transform: 'rotate(180deg)' }
                : null
            }
          />
        </Box>
      </Button>
      {slots?.inContainer}
    </Box>
  );

  return (
    <Box ref={ref} variant="forms.input.fieldContainer" {...fieldContainerProps} sx={{ ...columnStyleProps?.sx, ...fieldContainerProps?.sx }}>
      {/* Actual label is applied to the hidden select */}
      <Label {...fieldLabelProps}>{label}</Label>
      <HiddenSelect
        state={state}
        triggerRef={triggerRef}
        label={label}
        name={name}
        isDisabled
      />
      {trigger || defaultTrigger}
      {overlay}
      {
        helperText && (
          <FieldHelperText status={status} id={helperTextId}>
            {helperText}
          </FieldHelperText>
        )
      }
    </Box>
  );
});

SelectFieldBase.propTypes = {
  /** Default text rendered if no option is selected. Deprecated. */
  defaultText: PropTypes.string,
  /** Text rendered below the input. */
  helperText: PropTypes.node,
  /** The label for the select element. */
  label: PropTypes.node,
  /** Determines the textarea status indicator and helper text styling. Eg. float. */
  labelMode: PropTypes.oneOf(Object.values(modes)),
  /** The name for the select element, used when submitting a form. */
  name: PropTypes.string,
  /** Temporary text that occupies the text input when it is empty. */
  placeholder: PropTypes.string,
  /** Determines whether to use column styles. */
  columnStyleProps: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({})]),
  /** Determines props that applied to root container. */
  fieldContainerProps: PropTypes.shape({
    sx: PropTypes.shape({}),
  }),
  /** Determines props that applied to control field. */
  fieldControlInputProps: PropTypes.shape({
    className: PropTypes.string,
  }),
  /** Determines props that applied to label of field. */
  fieldLabelProps: PropTypes.shape({}),
  /** Determines whether elements are loading and whether they haven't already appeared in list. */
  isLoadingInitial: PropTypes.bool,
  /** Container for list with options */
  overlay: PropTypes.node,
  /** State returned by useSelectState */
  state: PropTypes.shape({
    isOpen: PropTypes.bool,
    selectedItem: PropTypes.shape({
      rendered: PropTypes.node,
    }),
  }),
  /** Provides a way to insert markup in specified places. */
  slots: PropTypes.shape({
    /** The given node will be inserted into the field container. */
    inContainer: PropTypes.node,
  }),
  /** Control for interaction with SelectField */
  trigger: PropTypes.node,
  /** Props for the popup trigger element. */
  triggerProps: PropTypes.shape({}),
  /** Determines ref that applied to control */
  triggerRef: PropTypes.shape({}),
  /** Props for the element representing the selected value. */
  valueProps: PropTypes.shape({}),
  ...statusPropTypes,
  ...ariaAttributesBasePropTypes,
};

export default SelectFieldBase;
