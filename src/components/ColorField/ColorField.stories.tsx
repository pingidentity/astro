import React, { useCallback, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { ColorField, OverlayProvider } from '../../index';
import { ColorFieldProps, CustomColorProps } from '../../types';
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributeBaseArgTypes } from '../../utils/docUtils/fieldAttributes';
import { statusArgTypes } from '../../utils/docUtils/statusProp';

import ColorFieldReadme from './ColorField.mdx';

export default {
  title: 'Form/ColorField',
  component: ColorField,
  parameters: {
    docs: {
      page: () => (
        <>
          <ColorFieldReadme />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    value: {
      control: {
        type: 'text',
      },
    },
    label: {
      control: {
        type: 'text',
      },
    },
    helperText: {
      control: {
        type: 'text',
      },
    },
    buttonProps: {
      control: {
        type: 'none',
      },
    },
    containerProps: {
      control: {
        type: 'none',
      },
    },
    ...statusArgTypes,
    ...ariaAttributeBaseArgTypes,
    ...inputFieldAttributeBaseArgTypes,
  },
  args: {
    label: 'Color Field',
    buttonProps: { sx: { width: 40, height: 30 } },
  },
} as Meta;

export const Default: StoryFn<ColorFieldProps> = (args: ColorFieldProps) => {
  const [color, setColor] = useState('rgba(127, 0, 127, 1)');

  const handleChange = useCallback((colorVal: CustomColorProps) => {
    if (typeof colorVal === 'string') {
      setColor(colorVal);
    } else if (colorVal.rgb) {
      const { rgb } = colorVal;
      const { r, b, g, a } = rgb;
      setColor(`rgba(${r}, ${g}, ${b}, ${a})`);
    }
  }, []);

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
    <OverlayProvider>
      <ColorField {...args} value={color} onChange={handleChange} />
    </OverlayProvider>
  );
};

export const DetailedButtonPreview: StoryFn<ColorFieldProps> = (args: ColorFieldProps) => {
  const [color, setColor] = useState('rgba(127, 0, 127, 1)');

  const handleChange = useCallback((colorVal: CustomColorProps) => {
    if (typeof colorVal === 'string') {
      setColor(colorVal);
    } else if (colorVal.rgb) {
      const { rgb } = colorVal;
      const { r, b, g, a } = rgb;
      setColor(`rgba(${r}, ${g}, ${b}, ${a})`);
    }
  }, []);

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
    <OverlayProvider>
      <ColorField {...args} value={color} onChange={handleChange} mode="detailed-button-preview" />
    </OverlayProvider>
  );
};
