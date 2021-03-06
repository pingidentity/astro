import React, { useCallback, useState } from 'react';
import { ColorField, OverlayProvider } from '../../index';
import statuses from '../../utils/devUtils/constants/statuses';

export default {
  title: 'Form/ColorField',
  component: ColorField,
  parameters: {
    docs: {
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
    status: {
      control: {
        type: 'select',
        options: statuses,
      },
      defaultValue: statuses.DEFAULT,
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
      defaultValue: { sx: { marginLeft: 50 } },
    },
    controlProps: {
      control: {
        type: 'none',
      },
    },
    labelProps: {
      control: {
        type: 'none',
      },
    },
  },
};

export const Default = (args) => {
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
