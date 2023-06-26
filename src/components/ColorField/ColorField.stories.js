import React, { useCallback, useState } from 'react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { ColorField, OverlayProvider } from '../../index';
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
      defaultValue: 'Color Field',
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
      defaultValue: { sx: { width: 40, height: 30 } },
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
};

export const Default = args => {
  const [color, setColor] = useState('rgba(127, 0, 127, 1)');
  const handleChange = useCallback(({ rgb }) => {
    const { r, b, g, a } = rgb;
    setColor(`rgba(${r}, ${g}, ${b}, ${a})`);
  }, []);

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
    <OverlayProvider>
      <ColorField value={color} {...args} onChange={handleChange} />
    </OverlayProvider>
  );
};
