import { TabListProps } from '@react-stately/tabs';

import { TestingAttributes } from './shared/test';
import { BoxProps } from './box';

export interface RockerButtonGroupProps extends BoxProps, TestingAttributes {
  /** The default button key to be selected. (uncontrolled) (deprecated) */
  defaultSelectedKey?: string;
  /** The default button keys to be selected. (uncontrolled) */
  defaultSelectedKeys?: string[];
  /** The button key that is currently selected. (controlled) (deprecated) */
  selectedKey?: string;
  /** The button key that is currently selected. (controlled) */
  selectedKeys?: string[];
  /** Which keys should be disabled. */
  disabledKeys?: string[];
  /** Handler that is called when the selected button has changed. */
  onSelectionChange?: (key: string | string[]) => void;
  tabListProps?: TabListProps<object>;
}
