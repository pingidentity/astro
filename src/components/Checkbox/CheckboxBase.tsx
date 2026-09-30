import React, { forwardRef, ReactNode } from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { omit } from 'lodash';
import { Checkbox as ThemeUICheckbox, ThemeUICSSObject } from 'theme-ui';

import useGetTheme from '../../hooks/useGetTheme';
import { BoxProps, CheckboxBaseProps, CheckboxProps } from '../../types';
import Box from '../Box';

import {
  AstroIndeterminateCheckboxIcon,
  OnyxDefaultCheckboxIcon,
  OnyxIndeterminateCheckboxIcon,
} from './CheckboxIcons';

const VISUALLY_HIDDEN_INPUT_STYLE = {
  position: 'absolute',
  opacity: 0,
  width: 1,
  height: 1,
  overflow: 'hidden',
} as const;

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
] as const;

// ─── Astro theme: original ThemeUI implementation ────────────────────────────

// theme-ui's CheckboxProps name is aliased to avoid clashing with our own.
type ThemeUICheckboxProps = React.ComponentProps<typeof ThemeUICheckbox>;

/**
 * Internal props for AstroDefaultCheckbox. theme-ui's exported CheckboxProps
 * omits the internal `__css`/`__themeKey` keys this component needs to receive.
 */
interface AstroDefaultCheckboxProps extends BoxProps {
  __themeKey?: string;
  __css?: ThemeUICSSObject;
  children?: ReactNode;
}

const AstroDefaultCheckbox = forwardRef<HTMLInputElement, AstroDefaultCheckboxProps>(
  (props, ref) => (
    <ThemeUICheckbox
      ref={ref}
      {...({ __css: { top: 0, left: 0 }, ...props } as ThemeUICheckboxProps)}
    />
  ),
);

const AstroIndeterminateCheckbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  /* eslint-disable no-param-reassign */
  if (ref && typeof ref !== 'function' && ref.current) ref.current.indeterminate = true;

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

const OnyxDefaultCheckbox = forwardRef<HTMLInputElement, CheckboxProps>(({
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
        {...(inputProps as React.ComponentProps<'input'>)}
      />
      <OnyxDefaultCheckboxIcon isChecked={isChecked} variant={variant} sx={sx} />
      {children}
    </>
  );
});

/**
 * Renders a visually hidden default checkbox since the Theme UI checkbox does not support
 * indeterminism. This allows us to have the necessary ARIA attributes and visual presentation.
 */
const OnyxIndeterminateCheckbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  /* eslint-disable no-param-reassign */
  if (ref && typeof ref !== 'function' && ref.current) ref.current.indeterminate = true;

  return (
    <>
      <input
        ref={ref}
        type="checkbox"
        style={VISUALLY_HIDDEN_INPUT_STYLE}
        {...(omit(props, [...NON_DOM_PROPS, 'isIndeterminate']) as React.ComponentProps<'input'>)}
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

const CheckboxBase = forwardRef<HTMLInputElement, CheckboxBaseProps>((props, ref) => {
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

export default CheckboxBase;
