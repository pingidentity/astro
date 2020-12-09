import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { useLabel } from '@react-aria/label';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';

import useStatusClasses from '../../hooks/useStatusClasses';
import statuses from '../../utils/devUtils/constants/statuses';
import Box from '../Box';
import FieldHelperText from '../FieldHelperText';
import Label from '../Label';

/**
 * General wrapper for a label + control. A control is any form element that is supported by
 * a label. This may include an `input`, `select`, `textarea`, etc.
 *
 * **NOTE: It's recommended to use the appropriate `<Type>Field` component as opposed to a**
 * ** normal `Field`.**
 */
const Field = forwardRef((props, ref) => {
  const {
    afterContent,
    className,
    controlProps,
    hasWrappedLabel,
    helperText,
    isDisabled,
    isRequired,
    label,
    labelProps,
    render,
    status,
    ...others
  } = props;

  const fieldRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => fieldRef.current);
  const {
    labelProps: raLabelProps,
    fieldProps: raFieldProps,
  } = useLabel({ ...props, ...controlProps });
  const { isFocusVisible, focusProps } = useFocusRing();
  const { isHovered, hoverProps } = useHover(props);
  const { classNames } = useStatusClasses(className, {
    isFocused: isFocusVisible,
    isHovered,
    isDisabled,
    [`is-${status}`]: true, // Will generate 'is-default', 'is-error', etc.
  });
  const renderProps = {
    ref: fieldRef,
    className: classNames,
    ...controlProps,
    disabled: isDisabled,
    required: isRequired,
    ...mergeProps(focusProps, hoverProps, raFieldProps),
  };
  const finalLabelProps = {
    className: classNames,
    isRequired,
    ...labelProps,
    ...raLabelProps,
  };

  if (hasWrappedLabel) {
    return (
      <Box {...others}>
        <Label {...finalLabelProps}>
          {render(renderProps)}
          {label}
        </Label>
        {
          helperText &&
          <FieldHelperText status={status}>
            {helperText}
          </FieldHelperText>
        }
        {afterContent}
      </Box>
    );
  }

  return (
    <Box {...others}>
      <Label {...finalLabelProps}>
        {label}
      </Label>
      {render(renderProps)}
      {
        helperText &&
        <FieldHelperText status={status}>
          {helperText}
        </FieldHelperText>
      }
      {afterContent}
    </Box>
  );
});

Field.propTypes = {
  /** Content to render after the control. */
  afterContent: PropTypes.node,
  /** The props passed along to the control. */
  controlProps: PropTypes.shape({
    id: PropTypes.string,
  }),
  /** Whether the control is wrapped in the label or is separately linked. */
  hasWrappedLabel: PropTypes.bool,
  /** Text to display after the control. Useful for error messages or other info. */
  helperText: PropTypes.node,
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id: PropTypes.string,
  /** Whether or not the field is disabled. */
  isDisabled: PropTypes.bool,
  /** Whether or not the field is required. */
  isRequired: PropTypes.bool,
  /** The content to display as the label. */
  label: PropTypes.node,
  /** The props passed along to the label. */
  labelProps: PropTypes.shape({}),
  /** Render prop function to handle displaying the associated control for the label. */
  render: PropTypes.func.isRequired,
  /** Determines the status indicator and helper text styling. */
  status: PropTypes.oneOf(Object.values(statuses)),
};

Field.defaultProps = {
  controlProps: {
    id: null, // Id set to override the top-level `id` prop when passed to `useLabel`
  },
  isDisabled: false,
  isRequired: false,
  status: statuses.DEFAULT,
};

Field.displayName = 'Field';

export { default as isEmpty } from 'lodash/isEmpty';
export default Field;
