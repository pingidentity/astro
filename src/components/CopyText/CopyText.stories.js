import React from 'react';
import Link from '../Link';
import Text from '../Text';
import CopyText from './CopyText';

export default {
  title: 'CopyText',
  component: CopyText,
  argTypes: {
    mode: {
      control: 'none',
    },
  },
};

export const Default = args => (
  <CopyText {...args}>
    <Text>Here is a value</Text>
  </CopyText>
);

export const WithLink = args => (
  <CopyText {...args} mode="link">
    <Link href="https://a.url.com">https://a.url.com</Link>
  </CopyText>
);

export const WithChangedCopiedValue = args => (
  <CopyText {...args} textToCopy="Here is a copied value">
    <Text>Here is a value</Text>
  </CopyText>
);
