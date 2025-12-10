import React from 'react';

import { Link, Text } from '../..';
import type { CopyrightTextProps } from '../../types';

const CopyrightText = (props:CopyrightTextProps) => {
  const { children, linkProps, ...others } = props;

  const year = new Date().getFullYear();

  return (
    <Text variant="text.copyRightText" {...others}>
      Copyright &copy;
      {` ${year} `}
      {linkProps && (
        <Link href="#" variant="copyRightLink" {...linkProps} />
      )}
      {children}
      . All rights reserved.
    </Text>
  );
};

export default CopyrightText;
