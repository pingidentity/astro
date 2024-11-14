import React, { forwardRef } from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { omit } from 'lodash';
import PropTypes from 'prop-types';
import { Checkbox as ThemeUICheckbox } from 'theme-ui';

import { active, neutral } from '../../styles/colors';
import Box from '../Box';

/**
 * Checkbox component from Theme UI, renders a visually hidden input + svg icons for the
 * checked and unchecked states.
 */
const DefaultCheckbox = forwardRef((props, ref) => (
  <ThemeUICheckbox
    ref={ref}
    __css={{ top: 0, left: 0 }}
    {...props}
  />
));

const IndeterminateCheckboxIcon = props => {
  const color = props.disabled ? neutral[80] : active;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="checkbox-icon-title"
      data-testid="checkbox-icon-indeterminate"
      {...omit(props, 'id', 'aria-checked', 'data-testid')}
    >
      <title id="checkbox-icon-title">Indeterminate Checkbox Icon</title>
      <rect x="3.5" y="3.5" width="17" height="17" rx="1.5" fill={color} stroke={color} />
      <rect x="6.5" y="11" width="11" height="2" fill="white" />
    </svg>
  );
};

IndeterminateCheckboxIcon.propTypes = {
  // eslint-disable-next-line react/boolean-prop-naming
  disabled: PropTypes.bool,
};

/**
 * Renders a visually hidden default checkbox since the Theme UI checkbox does not support
 * indeterminism. This allows us to have the necessary ARIA attributes and visual presentation.
 */
const IndeterminateCheckbox = forwardRef((props, ref) => {
  /* eslint-disable no-param-reassign */
  if (ref?.current) ref.current.indeterminate = true;
  return (
    <>
      <VisuallyHidden>
        <DefaultCheckbox ref={ref} {...props} />
      </VisuallyHidden>
      <Box
        as={IndeterminateCheckboxIcon}
        mr={2}
        {...props}
        opacity={1}
      />
    </>
  );
});

const CheckboxBase = forwardRef((props, ref) => {
  /* eslint-disable react/prop-types */
  return props.isIndeterminate
    ? <IndeterminateCheckbox ref={ref} {...props} />
    : <DefaultCheckbox ref={ref} {...props} />;
});

export default CheckboxBase;
