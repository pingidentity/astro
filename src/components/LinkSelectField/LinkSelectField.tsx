import React, { forwardRef } from 'react';
import { VisuallyHidden } from 'react-aria';
import { v4 as uuid } from 'uuid';

import { Box, Button, Icon, Loader, Text } from '../..';
import { useGetTheme, usePropWarning, useSelectField } from '../../hooks';
import { UseSelectFieldProps } from '../../hooks/useSelectField/useSelectField';
import { LinkSelectFieldProps } from '../../types/linkSelectField';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import statuses from '../../utils/devUtils/constants/statuses';
import { getAriaAttributeProps } from '../../utils/docUtils/ariaAttributes';
import { statusDefaultProp } from '../../utils/docUtils/statusProp';
import SelectFieldBase from '../SelectFieldBase';

const displayName = 'LinkSelectField';

const LinkSelectField = forwardRef<HTMLDivElement, LinkSelectFieldProps>((props, ref) => {
  const {
    placeholder,
    isDisabled,
    status,
    helperText,
    hasInlineLoader,
    popoverWidth,
    iconProps,
    triggerProps,
    trigger: triggerProp,
  } = props;
  const { ariaProps } = getAriaAttributeProps(props);
  const {
    themeState: { isOnyx },
    linkSelectFieldWidth,
    linkSelectFieldIcon,
    icons: { MenuDown },
  } = useGetTheme();

  const helperTextId = uuid();

  usePropWarning(props, 'disabled', 'isDisabled');
  const { ...selectFieldProps } = useSelectField(
    {
      listboxStyle: {
        width: popoverWidth || linkSelectFieldWidth,
      },
      ...props,
      // Need this for not applying is-default class
      status: status === statuses.DEFAULT ? null : status,
    } as UseSelectFieldProps<object>,
    ref,
  );
  const {
    fieldControlInputProps,
    isLoadingInitial,
    state,
    triggerProps: raTriggerProps,
    triggerRef,
  } = selectFieldProps;

  const { sx: iconPropsSx, ...restIconProps } = iconProps || {};
  const triggerNode = (
    <Button
      className={fieldControlInputProps.className}
      ref={triggerRef}
      variant="selectLink"
      tabIndex={isDisabled ? -1 : 0}
      {...getPendoID(displayName)}
      {...triggerProps}
      {...raTriggerProps}
      {...ariaProps}
      aria-describedby={helperText ? helperTextId : undefined}
    >
      <Text
        variant="linkSelectFieldLabel"
        className="link-select-field-placeholder"
      >
        {placeholder}
      </Text>
      <Box isRow>
        {hasInlineLoader && isLoadingInitial && (
          <Loader variant="loader.withinInput" />
        )}
        <Box as="span" role="presentation" variant="forms.select.arrow">
          <Icon
            icon={MenuDown}
            sx={{
              ...(state.isOpen ? { transform: 'rotate(180deg)' } : null),
              ...iconPropsSx,
            }}
            {...restIconProps}
            color={isOnyx ? 'font.link' : 'active'}
            size={linkSelectFieldIcon}
            aria-hidden="true"
          />
        </Box>
      </Box>
      <VisuallyHidden aria-live="polite" id={helperTextId}>
        {helperText}
      </VisuallyHidden>
    </Button>
  );
  return (
    <SelectFieldBase
      {...props}
      {...selectFieldProps}
      label={props.label as string | undefined}
      helperText={props.helperText as string | undefined}
      trigger={triggerProp || triggerNode}
    />
  );
});

LinkSelectField.defaultProps = {
  placeholder: 'Select',
  align: 'start',
  direction: 'bottom',
  ...statusDefaultProp,
};

LinkSelectField.displayName = displayName;
export default LinkSelectField;
