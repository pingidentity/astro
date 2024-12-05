import React, { useState } from 'react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Box, EditButton, Text } from '../../index';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';
import { iconButtonArgTypes } from '../IconButton/iconButtonAttributes';

import { IconSize } from './EditButton';
import EditButtonReadme from './EditButton.mdx';

const { variant, ...other } = iconButtonArgTypes;

export default {
  title: 'components/IconButton/Convenience/EditButton',
  component: EditButton,
  decorators: [withDesign],
  parameters: {
    docs: {
      page: () => (
        <>
          <EditButtonReadme />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    ...other,
    size: {
      control: {
        type: 'select',
        options: Object.keys(IconSize),
      },
      description: `The size of the icon container.
        T-shirt sizing is recommended and can be passed to the size prop as "sm" , "md" and "lg"
        rendering 10, 15, and 20 pixel svg containers.`,
    },
  },
};

export const Default = args => (
  <EditButton
    {...args}
    aria-label="edit"
  />
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.editButton.default,
  },
};

export const WithSizeProp = args => (
  <EditButton
    {...args}
    size="lg"
    aria-label="edit"
  />
);

export const WithButtonProp = args => {
  const [text, setText] = useState('I am a Text');
  return (
    <Box
      isRow
      alignItems="center"
    >
      <Text>{text}</Text>
      <EditButton
        {...args}
        mx="sm"
        aria-label="edit"
        onPress={() => setText('I am a changed Text')}
      />
    </Box>
  );
};
