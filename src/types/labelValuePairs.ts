import { ReactNode } from 'react';

import { TestingAttributes } from './shared/test';
import { BoxProps } from './box';
import { HelpHintProps } from './helpHint';
import { IconProps } from './icon';
import { IconButtonProps } from './iconButton';
import { SkeletonProps } from './skeleton';
import { TextProps } from './text';

export type ValueType = 'COPYABLE' | 'MASKED' | 'ELEMENT';

interface LabelValuePairsSubComponentProps {
  containerProps?: BoxProps & TestingAttributes;
  textProps?: TextProps & TestingAttributes;
  iconProps?: IconProps;
}

export interface LabelValuePairsContainerProps extends BoxProps, TestingAttributes {
  children?: ReactNode;
}
export type LabelValuePairsProps = LabelValuePairsContainerProps;
export type LabelValuePairsRowProps = LabelValuePairsContainerProps;

export interface LabelValuePairsLabelProps extends
  TestingAttributes, Omit<LabelValuePairsSubComponentProps, 'iconProps'> {
  children?: ReactNode;
  helpHint?: ReactNode;
  helpHintProps?: HelpHintProps;
}

export interface LabelValuePairsValueProps extends
  TestingAttributes, LabelValuePairsSubComponentProps {
  children?: ReactNode;
  valueType?: ValueType;
  isLoading?: boolean;
  iconButtonProps?: IconButtonProps;
  skeletonProps?: SkeletonProps;
}

export interface LabelValuePairsSubvalueProps extends TestingAttributes, TextProps {
  children?: ReactNode;
}
