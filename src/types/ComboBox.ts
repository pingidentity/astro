import React, { Key, ReactNode } from 'react';
import type { AriaButtonProps } from 'react-aria';
import type { MenuTriggerAction } from '@react-types/combobox';

import { ContainerProps, ControlProps } from '../hooks/useField/useField';

import { BoxProps } from './box';
import { Status } from './item';
import { Axis, loadingState } from './shared';

export interface ComboBoxInputProps extends Omit<BoxProps, 'children' | 'direction'> {
  containerProps?: Omit<ContainerProps, 'sx'> & { sx?: Record<string, unknown> };
  controlProps?: ControlProps;
  hasAutoFocus?: boolean;
  helperText?: ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  inputRef?: React.RefObject<HTMLInputElement>;
  inputWrapperRef?: React.RefObject<HTMLDivElement>;
  isDisabled?: boolean;
  isOpen?: boolean;
  isReadOnly?: boolean;
  label?: ReactNode;
  labelProps?: React.DOMAttributes<HTMLElement>;
  loadingState?: loadingState;
  menuTrigger?: MenuTriggerAction;
  onInputChange?: (value: string) => void;
  onLoadMore?: () => void;
  onOpenChange?: (isOpen: boolean, menuTrigger?: MenuTriggerAction) => void;
  onSelectionChange?(key: Key | null): void;
  triggerProps?: AriaButtonProps;
  triggerRef?: React.RefObject<HTMLButtonElement>;
  wrapperProps?: Omit<BoxProps, 'sx'> & { sx?: Record<string, unknown> };
  /** Determines any status related styling. */
  status?: Status;
}
