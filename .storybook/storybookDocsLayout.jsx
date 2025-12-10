import React from 'react';
import {
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

const DocsLayout = () => {
  return (
    <>
      <Subtitle />
      <Description />
      <Primary />
      <ArgsTable story={PRIMARY_STORY} />
      <Stories />
    </>
  );
};

export default DocsLayout;
