import React from 'react';
import Link from '.';
import { htmlElements } from '../../utils/devUtils/constants/htmlElements';
import variants from '../../styles/variants/links';

export default {
  title: 'Link',
  component: Link,
  argTypes: {
    href: {
      control: {
        type: 'text',
      },
      defaultValue: 'https://uilibrary.ping-eng.com/',
    },
    isDisabled: {},
    as: {
      control: {
        type: 'none',
        options: htmlElements,
      },
      defaultValue: 'a',
    },
    target: {
      control: {
        type: 'none',
      },
      defaultValue: '_blank',
    },
    variant: {
      control: {
        type: 'select',
        options: Object.keys(variants),
      },
    },
  },
};

export const Default = ({ ...args }) => (
  <div>
    <Link {...args}>A link</Link> to your favorite website.
  </div>
);
