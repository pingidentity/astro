import React, { forwardRef, RefObject, useMemo } from 'react';
import { v4 as uuid } from 'uuid';

import useGetTheme from '../../hooks/useGetTheme';
import { FocusableElement } from '../../types';
import { SelectFieldBaseProps } from '../../types/selectField';
import { modes } from '../../utils/devUtils/constants/labelModes';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import { getAriaAttributeProps } from '../../utils/docUtils/ariaAttributes';
import Box from '../Box';
import Button from '../Button';
import FieldHelperText from '../FieldHelperText';
import Icon from '../Icon';
import Label from '../Label';
import Loader from '../Loader';
import Text from '../Text';

import { HiddenSelect } from './HiddenSelect';

/**
 * Select field (dropdown) that does not rely on native browser or mobile implementations.
 *
 * Utilizes [useSelect](https://react-spectrum.adobe.com/react-aria/useSelect.html) from React Aria
 * and [useSelectState](https://react-spectrum.adobe.com/react-stately/useSelectState.html) from
 * React Stately.
 */
const SelectFieldBase = forwardRef<HTMLSelectElement, SelectFieldBaseProps>((
  props, ref) => {
  const {
    columnStyleProps,
    defaultText,
    fieldContainerProps,
    fieldControlInputProps,
    fieldControlWrapperProps,
    fieldLabelProps,
    helperText,
    isLoadingInitial,
    isDisabled,
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
    selectProps,
    ...others
  } = props;
  const { ariaProps } = getAriaAttributeProps(others);

  const { icons } = useGetTheme();
  const {
    MenuDown,
    MenuUp,
  } = icons;

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
        {slots?.leftOfData}
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
            icon={state.isOpen ? MenuUp : MenuDown}
            title={{ name: 'Menu down' }}
            size="md"
          />
        </Box>
      </Button>
      {slots?.inContainer}
    </Box>
  );

  return (
    <Box
      ref={ref}
      variant="forms.input.fieldContainer"
      {...getPendoID('SelectField')}
      {...fieldContainerProps}
      sx={{ ...columnStyleProps?.sx, ...fieldContainerProps?.sx }}
    >
      {/* Actual label is applied to the hidden select */}
      <Label {...fieldLabelProps}>{label}</Label>
      <HiddenSelect
        state={state}
        triggerRef={triggerRef as RefObject<FocusableElement>}
        label={label}
        name={name}
        isDisabled={isDisabled}
        {...selectProps}
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


export default SelectFieldBase;
