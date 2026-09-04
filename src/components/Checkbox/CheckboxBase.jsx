import React, { forwardRef } from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { omit } from 'lodash';
import PropTypes from 'prop-types';
import { Checkbox as ThemeUICheckbox } from 'theme-ui';

import useGetTheme from '../../hooks/useGetTheme';
import Box from '../Box';

import { AstroIndeterminateCheckboxIcon, OnyxDefaultCheckboxIcon, OnyxIndeterminateCheckboxIcon } from './CheckboxIcons';

const VISUALLY_HIDDEN_INPUT_STYLE = {
  position: 'absolute',
  opacity: 0,
  width: 1,
  height: 1,
  overflow: 'hidden',
};

// Props from react-aria/useField that must not reach a native <input>
const NON_DOM_PROPS = [
  'isIndeterminate',
  'isFocused',
  'isDisabled',
  'isReadOnly',
  'isRequired',
  'defaultSelected',
  '__css',
  '__themeKey',
  'variant',
  'tabIndex',
  'sx',
  'mr',
  'opacity',
];

// ─── Astro theme: original ThemeUI implementation ────────────────────────────

const AstroDefaultCheckbox = forwardRef((props, ref) => (
  <ThemeUICheckbox
    ref={ref}
    __css={{ top: 0, left: 0 }}
    {...props}
  />
));

const AstroIndeterminateCheckbox = forwardRef((props, ref) => {
  /* eslint-disable no-param-reassign */
  if (ref?.current) ref.current.indeterminate = true;

  return (
    <>
      <VisuallyHidden>
        <AstroDefaultCheckbox ref={ref} {...props} />
      </VisuallyHidden>
      <Box
        as={AstroIndeterminateCheckboxIcon}
        variant="variants.box.indeterminateCheckboxIcon"
        mr={2}
        {...props}
        opacity={1}
        tabIndex={-1}
      />
    </>
  );
});

// ─── Onyx theme: Figma SVG implementation ────────────────────────────────────

const OnyxDefaultCheckbox = forwardRef(({
  checked,
  defaultChecked,
  sx,
  variant,
  children,
  ...props
}, ref) => {
  const isChecked = checked !== undefined ? checked : (defaultChecked ?? false);
  const inputProps = omit(props, NON_DOM_PROPS);

  return (
    <>
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        style={VISUALLY_HIDDEN_INPUT_STYLE}
        {...inputProps}
      />
      <OnyxDefaultCheckboxIcon isChecked={isChecked} variant={variant} sx={sx} />
      {children}
    </>
  );
});

/* eslint-disable react/boolean-prop-naming */
OnyxDefaultCheckbox.propTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
  variant: PropTypes.string,
  children: PropTypes.node,
};
/* eslint-enable react/boolean-prop-naming */

/**
 * Renders a visually hidden default checkbox since the Theme UI checkbox does not support
 * indeterminism. This allows us to have the necessary ARIA attributes and visual presentation.
 */
const OnyxIndeterminateCheckbox = forwardRef((props, ref) => {
  /* eslint-disable no-param-reassign */
  if (ref?.current) ref.current.indeterminate = true;

  return (
    <>
      <input
        ref={ref}
        type="checkbox"
        style={VISUALLY_HIDDEN_INPUT_STYLE}
        {...omit(props, [...NON_DOM_PROPS, 'isIndeterminate'])}
      />
      <Box
        as={OnyxIndeterminateCheckboxIcon}
        variant="variants.box.indeterminateCheckboxIcon"
        mr={2}
        {...props}
        tabIndex={-1}
      />
    </>
  );
});

// ─── CheckboxBase: delegates to Onyx or Astro implementation ─────────────────

const CheckboxBase = forwardRef((props, ref) => {
  const { themeState: { isOnyx } } = useGetTheme();

  if (isOnyx) {
    return props.isIndeterminate
      ? <OnyxIndeterminateCheckbox ref={ref} {...props} />
      : <OnyxDefaultCheckbox ref={ref} {...props} />;
  }

  return props.isIndeterminate
    ? <AstroIndeterminateCheckbox ref={ref} {...props} />
    : <AstroDefaultCheckbox ref={ref} {...props} />;
});

CheckboxBase.propTypes = {
  isIndeterminate: PropTypes.bool,
};

export default CheckboxBase;
