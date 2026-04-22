import React from 'react';
import { Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title } from '@storybook/addon-docs/blocks';

const DocsLayout = () => {
  return (
    <>
      <Title />
      <Subtitle />
      <Description />
      <Primary />
      <Controls />

      <Stories includePrimary={false} />
    </>
  );
};

export default DocsLayout;
