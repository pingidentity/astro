import React, { forwardRef } from 'react';
import { VisuallyHidden } from 'react-aria';
import MenuDown from 'mdi-react/MenuDownIcon';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

import { Box, Button, Icon, Loader, Text } from '../..';
import { usePropWarning, useSelectField } from '../../hooks';
import statuses from '../../utils/devUtils/constants/statuses';
import { ariaAttributesBasePropTypes, getAriaAttributeProps } from '../../utils/devUtils/props/ariaAttributes';
import { inputFieldAttributesBasePropTypes } from '../../utils/devUtils/props/fieldAttributes';
import SelectFieldBase from '../SelectFieldBase';

/**
 * Select field (dropdown) that does not rely on native browser or mobile implementations.
 *
 * Utilizes [useSelect](https://react-spectrum.adobe.com/react-aria/useSelect.html) from React Aria
 * and [useSelectState](https://react-spectrum.adobe.com/react-stately/useSelectState.html) from
 * React Stately.
 */
const LinkSelectField = forwardRef((props, ref) => {
  const { placeholder, isDisabled, status, helperText } = props;
  const { ariaProps } = getAriaAttributeProps(props);

  const helperTextId = uuid();

  usePropWarning(props, 'disabled', 'isDisabled');
  const { ...selectFieldProps } = useSelectField({
    listboxStyle: {
      width: '10em',
    },
    ...props,
    // Need this for not applying is-default class
    status: status === statuses.DEFAULT ? null : status,
  }, ref);
  const {
    fieldControlInputProps,
    isLoadingInitial,
    state,
    triggerProps,
    triggerRef,
  } = selectFieldProps;

  const trigger = (
    <Button
      className={fieldControlInputProps.className}
      ref={triggerRef}
      variant="link"
      tabIndex={isDisabled ? -1 : 0}
      {...triggerProps}
      {...ariaProps}
      aria-describedby={helperText && helperTextId}
    >
      <Text variant="label" color="active">{placeholder}</Text>
      <Box isRow>
        {isLoadingInitial && <Loader variant="loader.withinInput" />}
        <Box as="span" aria-hidden="true" variant="forms.select.arrow">
          <Icon
            icon={MenuDown}
            sx={
              state.isOpen
                ? { transform: 'rotate(180deg)' }
                : null
            }
          />
        </Box>
      </Box>
      <VisuallyHidden aria-live="polite" id={helperTextId}>{helperText}</VisuallyHidden>
    </Button>
  );

  return (
    <SelectFieldBase
      {...props}
      {...selectFieldProps}
      trigger={trigger}
    />
  );
});

LinkSelectField.propTypes = {
  /** Alignment of the popover menu relative to the trigger. */
  align: PropTypes.oneOf(['start', 'end', 'middle']),
  /** Where the popover menu opens relative to its trigger. */
  direction: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /** The initial selected key in the collection (uncontrolled). */
  defaultSelectedKey: PropTypes.string,
  /** Array of keys to disable within the options list. */
  disabledKeys: PropTypes.arrayOf(PropTypes.string),
  /** Whether the collection allows empty selection. */
  hasNoEmptySelection: PropTypes.bool,
  /** Whether the field has a status indicator. */
  hasNoStatusIndicator: PropTypes.bool,
  /** Text rendered below the input. */
  helperText: PropTypes.node,
  /** If present this prop will cause a help hint to render in the label of the field. */
  hintText: PropTypes.string,
  /** Sets the default open state of the menu. */
  isDefaultOpen: PropTypes.bool,
  /** Whether the input is disabled. */
  isDisabled: PropTypes.bool,
  /** Whether the items are currently loading. */
  isLoading: PropTypes.bool,
  /** @ignore Whether the menu should automatically flip direction when space is limited. */
  isNotFlippable: PropTypes.bool,
  /** Sets the open state of the menu. */
  isOpen: PropTypes.bool,
  /** @ignore Whether the input can be selected but not changed by the user. */
  isReadOnly: PropTypes.bool,
  /** Whether user input is required on the input before form submission. */
  isRequired: PropTypes.bool,
  /**
   * *For performance reasons, use this prop instead of Array.map when iteratively rendering Items*.
   * For use with [dynamic collections](https://react-spectrum.adobe.com/react-stately/collections.html#dynamic-collections).
   */
  items: PropTypes.arrayOf(PropTypes.shape({})),
  /** The label for the select element. */
  label: PropTypes.node,
  /** The name for the select element, used when submitting a form. */
  name: PropTypes.string,
  /** Temporary text that occupies the text input when it is empty. */
  placeholder: PropTypes.string,
  /** The currently selected key in the collection (controlled). */
  selectedKey: PropTypes.string,
  /** Determines the type of label applied to the component. */
  status: PropTypes.oneOf(Object.values(statuses)),
  /**
   * Handler that is called when more items should be loaded, e.g. while scrolling near the bottom.
   *
   * () => any
   */
  onLoadMore: PropTypes.func,
  /**
   * Method that is called when the open state of the menu changes.
   *
   * (isOpen: boolean) => void
   */
  onOpenChange: PropTypes.func,
  /**
   * Handler that is called when the selection changes.
   *
   * (key: Key) => any
   */
  onSelectionChange: PropTypes.func,
  ...inputFieldAttributesBasePropTypes,
  ...ariaAttributesBasePropTypes,
};

LinkSelectField.defaultProps = {
  placeholder: 'Select',
  status: statuses.DEFAULT,
  align: 'start',
  direction: 'bottom',
};

LinkSelectField.displayName = 'LinkSelectField';
export default LinkSelectField;
