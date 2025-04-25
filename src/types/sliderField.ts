import React, { ReactNode, RefObject } from 'react';
import { SliderState } from 'react-stately';
import type { PressEvent } from '@react-types/shared';
import { ThemeUICSSObject } from 'theme-ui';

import { BoxProps } from './box';
import { FieldHelperTextProps } from './fieldHelperText';
import { InputProps } from './input';
import { Status } from './item';
import { LabelProps } from './label';
import { TextProps } from './text';

export type NumberOrNumberPair = number | [number, number];

export interface SliderThumbProps {
    className?: string;
    index: number;
    inputProps?: InputProps;
    isHorizontal?: boolean;
    isVertical?: boolean;
    name?: string;
    onFocus?: (e: React.FocusEvent) => void;
    onFocusChange?: (isFocused: boolean) => void;
    onPress?: (e: PressEvent) => void;
    state: SliderState;
    thumbProps?: object;
    trackRef: RefObject<Element>;
}

export interface SliderLabelContainerProps {
    displayValue?: ReactNode,
    label?: ReactNode,
    labelProps?: LabelProps,
    isDisplayValueHidden?: boolean,
    outputProps?: TextProps,
    className?: string
}

export interface SliderActiveTrackProps {
    className?: string,
    isHorizontal?: boolean,
    isMultiThumb?: boolean,
    isVertical?: boolean,
    state: SliderState,
    sx?: ThemeUICSSObject | object,
}

export interface SliderFieldProps {
    activeTrackProps?: BoxProps
    autoFocus?: boolean;
    className?: string;
    defaultValue?: NumberOrNumberPair;
    displayValue?: string;
    formatOptions?: Intl.NumberFormatOptions;
    helperText?: string;
    helperTextProps?: FieldHelperTextProps;
    isDisabled?: boolean;
    isDisplayValueHidden?: boolean;
    isMultiThumb?: boolean;
    label?: ReactNode;
    labelProps?: LabelProps;
    maxValue?: number;
    minValue?: number;
    name?: string;
    onBlur?: () => void;
    onChange?: (value: NumberOrNumberPair) => void;
    onChangeEnd?: (event: React.KeyboardEvent) => void;
    onFocus?: () => void;
    onFocusChange?: (isFocused: boolean) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    onKeyUp?: (event: React.KeyboardEvent) => void;
    orientation?: 'vertical' | 'horizontal';
    outputProps?: TextProps;
    size?: string;
    status?: Status;
    step?: number;
    sx?: ThemeUICSSObject | object;
    trackProps?: BoxProps;
    thumbProps?: object;
    value?: NumberOrNumberPair;
    wrapperProps?: BoxProps
}

export interface UseSliderFieldProps extends SliderFieldProps {
    trackRef: RefObject<Element>;
}
