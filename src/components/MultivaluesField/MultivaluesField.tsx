import React, { forwardRef } from 'react';

import { MultivaluesFieldProps } from '../../types/MultivaluesField';
import { statusDefaultProp } from '../../utils/docUtils/statusProp';

import CondensedMultivaluesField from './CondensedMultivaluesField';
import DefaultMultivaluesField from './DefaultMultivaluesField';

const displayName = 'MultivaluesField';

// No cast on the forwardRef result: a type assertion makes the react-docgen
// analyzer fail to extract the props table, which breaks the Storybook docs
// controls (argTypes lose their types and options).
const MultivaluesField = forwardRef<HTMLDivElement, MultivaluesFieldProps>((props, ref) => {
  const Component = props.mode === 'condensed' ? CondensedMultivaluesField : DefaultMultivaluesField;
  return <Component ref={ref} {...(props as object)} />;
});

MultivaluesField.defaultProps = {
  direction: 'bottom',
  isReadOnly: false,
  scrollBoxProps: { maxHeight: 300 },
  ...statusDefaultProp,
};

MultivaluesField.displayName = displayName;
export default MultivaluesField;
