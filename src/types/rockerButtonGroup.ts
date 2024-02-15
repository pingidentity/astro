import { TabListProps } from '@react-stately/tabs';

import { TestingAttributes } from './shared/test';
import { BoxProps } from './box';

export interface RockerButtonGroupProps extends BoxProps, TestingAttributes {
  /** The default button key to be selected. (uncontrolled) */
  defaultSelectedKey?: string;
  /** The button key that is currently selected. (controlled) */
  selectedKey?: string;
  /** Which keys should be disabled. */
  disabledKeys?: string[];
  /** Handler that is called when the selected button has changed. */
  onSelectionChange?: (key: string) => void;
  tabListProps?: TabListProps<object>;
}
