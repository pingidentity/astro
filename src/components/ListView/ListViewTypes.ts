import { Key } from 'react';

import { IconWrapperProps } from '../..';

export interface ExampleItemProps {
  key: Key,
  name: string,
  textValue?: string,
  subtext?: string,
  id: string | number,
  hasSeparator?: boolean,
  icon?: React.ElementType,
  iconWrapperProps?: IconWrapperProps
}
