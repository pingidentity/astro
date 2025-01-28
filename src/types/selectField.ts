import { UseSelectFieldProps, UseSelectFieldReturnProps } from '../hooks/useSelectField/useSelectField';

import { SharedFieldProps } from './shared/fieldProps';
import { Status } from './item';
import { StyleProps } from './shared';

export interface SelectFieldProps<T> extends Omit<StyleProps, 'direction'>, UseSelectFieldProps<T>{
  status?: Status;
  slots?: {
      leftOfData?: React.ReactNode,
      inContainer?: React.ReactNode,
  }
  'data-testid'?: string;
  hintText?: string;
}

export interface SelectFieldBaseProps extends UseSelectFieldReturnProps<object>, SharedFieldProps {
  slots?: {
    inContainer?: React.ReactNode;
    leftOfData?: React.ReactNode;
  };
  name?: string;
  placeholder?: string;
  trigger?: React.ReactNode;
  defaultText?: string;
  selectProps?: Record<string, unknown>;
  isDisabled?: boolean;
}
