import React, { useMemo } from 'react';
import faker from 'faker';
import { ImageUploadField, OverlayProvider } from '../../index';
import statuses from '../../utils/devUtils/constants/statuses';

export default {
  title: 'Form/ImageUploadField',
  component: ImageUploadField,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    defaultPreviewImage: {
      control: {
        type: 'text',
      },
    },
    fileTypes: {
      control: {
        type: 'array',
      },
      defaultValue: ['image'],
    },
    helperText: {
      control: {
        type: 'text',
      },
    },
    label: {
      control: {
        type: 'text',
      },
      defaultValue: 'Upload Image',
    },
    onChange: {
      control: {
        type: 'none',
      },
    },
    onRemove: {
      control: {
        type: 'none',
      },
    },
    previewHeight: {
      control: {
        type: 'number',
      },
      defaultValue: 50,
    },
    previewWidth: {
      control: {
        type: 'number',
      },
      defaultValue: 50,
    },
    status: {
      control: {
        type: 'select',
        options: statuses,
      },
      defaultValue: statuses.DEFAULT,
    },
  },
};

export const Default = (args) => {
  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
    <OverlayProvider>
      <ImageUploadField {...args} />
    </OverlayProvider>
  );
};

export const WithCustomPreview = () => {
  const defaultCustomPreview = useMemo(
    () => faker.image.imageUrl(150, 150, 'animals'),
    [],
  );

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
    <OverlayProvider>
      <ImageUploadField
        defaultPreviewImage={defaultCustomPreview}
        previewHeight={150}
        previewWidth={150}
      />
    </OverlayProvider>
  );
};
