import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { useLabel } from '@react-aria/label';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';

import useStatusClasses from '../../hooks/useStatusClasses';
import Box from '../Box';
import Label from '../Label';

/**
 * General wrapper for a label + control. A control is any form element that is supported by
 * a label. This may include an `input`, `select`, `textarea`, etc.
 */
const Field = forwardRef((props, ref) => {
  const {
    className,
    label,
    labelProps,
    controlProps,
    render,
    afterContent,
    hasWrappedLabel,
    isDisabled,
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
  });
  const renderProps = {
    ref: fieldRef,
    className: classNames,
    ...controlProps,
    disabled: isDisabled,
    ...mergeProps(focusProps, hoverProps, raFieldProps),
  };

  if (hasWrappedLabel) {
    return (
      <Box {...others}>
        <Label className={classNames} {...labelProps} {...raLabelProps}>
          {render(renderProps)}
          {label}
        </Label>
        {afterContent}
      </Box>
    );
  }

  return (
    <Box {...others}>
      <Label className={classNames} {...labelProps} {...raLabelProps}>{label}</Label>
      {render(renderProps)}
      {afterContent}
    </Box>
  );
});

Field.propTypes = {
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id: PropTypes.string,
  /** The content to display as the label. */
  label: PropTypes.node,
  /** The props passed along to the label. */
  labelProps: PropTypes.shape({}),
  /** The props passed along to the control. */
  controlProps: PropTypes.shape({
    id: PropTypes.string,
  }),
  /** Render prop function to handle displaying the associated control for the label. */
  render: PropTypes.func.isRequired,
  /** Content to render after the control. */
  afterContent: PropTypes.node,
  /** Whether the control is wrapped in the label or is separately linked. */
  hasWrappedLabel: PropTypes.bool,
  /** Whether or not the field is disabled */
  isDisabled: PropTypes.bool,
};

Field.defaultProps = {
  isDisabled: false,
  controlProps: {
    id: null, // Id set to override the top-level `id` prop when passed to `useLabel`
  },
};

Field.displayName = 'Field';

export default Field;
