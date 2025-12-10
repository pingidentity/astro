import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Loader } from '../..';
import { flatColorList } from '../../styles/colors';
import type { LoaderProps } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';
import { sizeArgTypes } from '../../utils/docUtils/iconSizeProps';

import LoaderReadme from './Loader.mdx';

export default {
  title: 'Components/Loader',
  component: Loader,
  decorators: [withDesign],
  parameters: {
    docs: {
      page: () => (
        <>
          <LoaderReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: flatColorList.map(([colorName]) => colorName),
      },
    },
    size: {
      ...sizeArgTypes.size,
      description: 'The size of the loader. Sizes can either be a string such as xs, sm, md, etc or numeric size with unit such as 15px. Default size inherits the font size. Numeric value paired with a unit. https://www.w3schools.com/cssref/css_units.asp',
    },
  },
  args: {
    color: 'active',
  },
} as Meta;

export const Default: StoryFn<LoaderProps> = args => (
  <Loader {...args} />
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.loader.default,
  },
};

export const CustomColor: StoryFn<LoaderProps> = args => (
  <Loader {...args} color="neutral.50" />
);

export const CustomSize: StoryFn<LoaderProps> = args => (
  <Loader {...args} size={32} />
);

export const Circular: StoryFn<LoaderProps> = args => (
  <Loader {...args} size={120} isCircle />
);

export const CustomCircular: StoryFn<LoaderProps> = args => (
  <Loader {...args} size="lg" isCircle strokeColor="magenta" />
);
