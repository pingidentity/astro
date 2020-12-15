import React, {
  forwardRef,
  createContext,
  useContext,
  useRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import { useRadio } from '@react-aria/radio';
import useStatusClasses from '../../hooks/useStatusClasses';
import Box from '../Box';
import Field from '../Field';
import Radio from '../Radio';

export const RadioContext = createContext();

/**
 * Basic radio input wrapped in a label.
 * Built on top of the [Radio from Rebass Forms](https://rebassjs.org/forms/radio) and uses the
 * available [props from Rebass](https://rebassjs.org/props/).
 * Utilizes [React Aria](https://react-spectrum.adobe.com/react-aria/useRadioGroup.html).
 */
const RadioField = forwardRef((props, ref) => {
  const {
    className,
    checkedContent,
    children,
    controlProps,
    labelProps,
    sx, // eslint-disable-line
    ...others
  } = props;

  const radioFieldRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => radioFieldRef.current);
  const state = useContext(RadioContext);
  const { isDisabled } = state;
  const { inputProps: raInputProps } = useRadio(
    { isDisabled, ...props, ...controlProps }, state, radioFieldRef,
  );
  const { checked: isChecked } = raInputProps;
  const { classNames } = useStatusClasses(className, {
    isDisabled,
    isChecked,
  });

  return (
    <Field
      ref={radioFieldRef}
      className={classNames}
      isDisabled={isDisabled}
      labelProps={{
        variant: 'forms.label.radio',
        ...labelProps,
      }}
      hasWrappedLabel
      label={children}
      controlProps={{
        ...controlProps,
        ...raInputProps,
      }}
      render={renderProps => <Radio {...renderProps} />}
      afterContent={isChecked && checkedContent && (
        <Box variant="boxes.radioCheckedContent">
          {checkedContent}
        </Box>
      )}
      {...others}
    />
  );
});

RadioField.propTypes = {
  /** Content to display when the radio is checked. */
  checkedContent: PropTypes.node,
  /** The label for the Radio. Accepts any renderable node. */
  children: PropTypes.node,
  /** Props object passed directly to the radio control. */
  controlProps: PropTypes.shape({
    /** The value of the radio button, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#Value). */
    value: PropTypes.string,
    /** Whether the Radio is required. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required). */
    isRequired: PropTypes.bool,
    /** Whether the Radio can be interacted with but cannot have its selection state changed. */
    isReadOnly: PropTypes.bool,
    /**
     * Whether the radio button is disabled or not. Shows that a selection exists, but is not
     * available in that circumstance.
    */
    isDisabled: PropTypes.bool,
    /** Whether the element should receive focus on render. */
    autoFocus: PropTypes.bool,
    /** Handler that is called when the element receives focus. */
    onFocus: PropTypes.func,
    /** Handler that is called when the element loses focus. */
    onBlur: PropTypes.func,
    /** Handler that is called when the element's focus status changes. */
    onFocusChange: PropTypes.func,
    /** Handler that is called when a key is pressed. */
    onKeyDown: PropTypes.func,
    /** Handler that is called when a key is released. */
    onKeyUp: PropTypes.func,
    /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
    id: PropTypes.string,
    /** Defines a string value that labels the current element. */
    'aria-label': PropTypes.string,
    /** Identifies the element (or elements) that labels the current element. */
    'aria-labelledby': PropTypes.string,
    /** Identifies the element (or elements) that describes the object. */
    'aria-describedby': PropTypes.string,
    /**
     * Identifies the element (or elements) that provide a detailed, extended description for the
     * object.
    */
    'aria-details': PropTypes.string,
  }),
  /** Whether the radio and label are disabled. */
  isDisabled: PropTypes.bool,
  /** Props to pass to the label */
  labelProps: PropTypes.shape({}),
  /** The value attribute for the input, should be unique within a group */
  value: PropTypes.string,
};

RadioField.defaultProps = {
  controlProps: {},
  labelProps: {},
};

RadioField.displayName = 'RadioField';

export default RadioField;
