import React from 'react';

import { ControlProps } from '../hooks/useField/useField';

import { TestingAttributes } from './shared/test';
import { Alignment, Axis } from './shared';
import { ButtonProps, LabelProps, Status } from '.';

export type RGBProps = {
  r: number,
  g: number,
  b: number,
  a: number,
}

export type HSLProps = {
  h: number,
  s: number,
  l: number,
  a: number,
}

export type CustomColorProps = string | {
  hex: string,
  rgb: RGBProps,
  hsl: HSLProps,
}

export interface ColorFieldProps extends TestingAttributes {
  /** Alignment of the popover menu relative to the trigger. */
  align?: Alignment,
  /** Where the popover menu opens relative to its trigger. */
  direction?: Axis,
  /** Text to display after the Color Field button. Useful for errors or other info. */
  helperText?: React.ReactNode,
  /** The content to display as the label. */
  label?: React.ReactNode,
  /** Pass a function to call every time the color is changed. [React Color onChange](https://casesandberg.github.io/react-color/#api-onChange)
   *
   * (color, event) => void;
   */
  onChange?: (color: CustomColorProps, event: React.ChangeEvent) => void | undefined;
  /** Color controls what color is active on the color picker. */
  value?: React.InputHTMLAttributes<HTMLInputElement>['value'],
  /** Props object that is spread into the Button element. */
  buttonProps?: ButtonProps,
  status?: Status,
  controlProps?: ControlProps,
  labelProps?: LabelProps
  mode?: string
}

export interface ColorFieldPreviewButtonProps extends ButtonProps {
  isOpen: boolean,
  bg: string,
  label: string | React.ReactNode,
  colorValue?: string
}
