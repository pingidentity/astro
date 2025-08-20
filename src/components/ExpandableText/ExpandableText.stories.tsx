import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { ExpandableText } from '../../index';
import { ExpandableTextProps } from '../../types';

import ExpandableTextReadMe from './ExpandableText.mdx';


export default {
  title: 'Experimental/ ExpandableText',
  component: ExpandableText,
  parameters: {
    docs: {
      page: () => (
        <>
          <ExpandableTextReadMe />
          <DocsLayout />
        </>
      ),
    },
    codesandbox: false,
  },


} as Meta;

export const Default: StoryFn<ExpandableTextProps> = (args: ExpandableTextProps) => (
  <ExpandableText maxLines={5} data-testid="test-field">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
    nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
    dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
    officia deserunt mollit anim id est laborum.
  </ExpandableText>


);
