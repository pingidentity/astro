import React from 'react';
import { omit } from 'lodash';
import PropTypes from 'prop-types';
import { ThemeUICSSObject } from 'theme-ui';

import { BoxProps } from '../../types';
import Box from '../Box';

interface BoxSvgProps extends BoxProps {
  viewBox?: string;
  xmlns?: string;
  __themeKey?: string;
  __css?: ThemeUICSSObject;
  children?: React.ReactNode;
}

/** Renders a Box component pre-configured as an `<svg>` element. */
const BoxAsSvg = ({ children, ...props }: BoxSvgProps) => <Box as="svg" {...props}>{children}</Box>;

// These are valid DOM/SVG attributes that should not be inherited by icon elements
// when spread from a parent checkbox component's prop bag.
const OMITTED_PROPS = ['id', 'aria-checked', 'data-testid', 'onFocus'] as const;

interface IconProps {
  isDisabled?: boolean;
}

export const AstroIndeterminateCheckboxIcon = (props: IconProps) => (
  <BoxAsSvg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="checkbox-icon-title"
    data-testid="checkbox-icon-indeterminate"
    {...omit(props, OMITTED_PROPS)}
  >
    <title id="checkbox-icon-title">Indeterminate Checkbox Icon</title>
    <rect x="3.5" y="3.5" width="17" height="17" rx="1.5" id="indeterminate-checkbox-icon-wrapper" />
    <rect x="6.5" y="11" width="11" height="2" fill="white" />
  </BoxAsSvg>
);

AstroIndeterminateCheckboxIcon.propTypes = {
  isDisabled: PropTypes.bool,
};

export const OnyxCheckedIcon = () => (
  <>
    <rect id="checked-bg" width="16" height="16" rx="4" fill="currentColor" />
    <path
      d="M7.10536 11.7932L7.08774 11.8108L2.6879 7.41096L4.12057 5.97829L7.10542 8.96313L11.8794 4.18912L13.3121 5.62179L7.12304 11.8109L7.10536 11.7932Z"
      fill="white"
    />
  </>
);

export const OnyxUncheckedIcon = () => (
  // Dark mode overrides this fill via theme variant CSS on rect[id="unchecked-bg"]
  <rect
    id="unchecked-bg"
    x="0.5"
    y="0.5"
    width="15"
    height="15"
    rx="3.5"
    fill="white"
    stroke="currentColor"
  />
);

export const OnyxIndeterminateCheckboxIcon = (props: IconProps) => (
  <BoxAsSvg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="checkbox-icon-title"
    data-testid="checkbox-icon-indeterminate"
    {...omit(props, OMITTED_PROPS)}
  >
    <title id="checkbox-icon-title">Indeterminate Checkbox Icon</title>
    <rect
      id="indeterminate-checkbox-icon-wrapper"
      width="16"
      height="16"
      rx="4"
      fill="currentColor"
      stroke="currentColor"
    />
    <rect x="4" y="7" width="8" height="2" fill="white" />
  </BoxAsSvg>
);

OnyxIndeterminateCheckboxIcon.propTypes = {
  isDisabled: PropTypes.bool,
};

interface OnyxDefaultCheckboxIconProps {
  isChecked: boolean;
  variant?: string;
  sx?: ThemeUICSSObject;
}

export const OnyxDefaultCheckboxIcon = ({
  isChecked,
  variant,
  sx,
}: OnyxDefaultCheckboxIconProps) => (
  <BoxAsSvg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    __themeKey="forms"
    variant={variant || 'checkbox'}
    sx={sx}
    __css={{ mr: 2, borderRadius: 4, flexShrink: 0 }}
    tabIndex={-1}
  >
    {isChecked ? <OnyxCheckedIcon /> : <OnyxUncheckedIcon />}
  </BoxAsSvg>
);

OnyxDefaultCheckboxIcon.propTypes = {
  isChecked: PropTypes.bool,
  variant: PropTypes.string,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};
