import React, { useRef, useState } from 'react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Image,
  ImageUploadField,
  OverlayProvider,
} from '../../index';
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributeBaseArgTypes } from '../../utils/docUtils/fieldAttributes';
import { statusArgTypes } from '../../utils/docUtils/statusProp';

import ImageUploadFieldReadme from './ImageUploadField.mdx';

export default {
  title: 'Form/ImageUploadField',
  component: ImageUploadField,
  parameters: {
    docs: {
      page: () => (
        <>
          <ImageUploadFieldReadme />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    previewImage: {
      control: {
        type: 'text',
      },
    },
    defaultPreviewImage: {
      control: {
        type: 'text',
      },
    },
    fileTypes: {
      control: {
        type: 'array',
      },
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
    },
    previewWidth: {
      control: {
        type: 'number',
      },
    },
    ...statusArgTypes,
    ...ariaAttributeBaseArgTypes,
    ...inputFieldAttributeBaseArgTypes,
  },
  args: {
    fileTypes: ['image'],
    label: 'Upload Image',
    previewHeight: 50,
    previewWidth: 50,
  },
};

export const Default = args => {
  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
    <OverlayProvider>
      <ImageUploadField {...args} />
    </OverlayProvider>
  );
};

export const CustomDefaultImage = () => (
  // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
  // readers when an overlay opens.
  <OverlayProvider>
    <ImageUploadField
      label="Upload Image"
      defaultPreviewImage="https://picsum.photos/id/1056/200/300"
      previewHeight={150}
      previewWidth={150}
    />
  </OverlayProvider>
);

export const CustomItemText = () => (
  // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
  // readers when an overlay opens.
  <OverlayProvider>
    <ImageUploadField
      label="Upload Image"
      previewHeight={150}
      previewWidth={150}
      uploadItemText="Custom Upload String"
      removeItemText="Custom Remove String"
    />
  </OverlayProvider>
);

export const ComponentAsDefaultImage = () => (
  // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
  // readers when an overlay opens.
  <OverlayProvider>
    <ImageUploadField
      label="Upload Image with component as default image"
      previewHeight={150}
      previewWidth={150}
      defaultPreviewImage={
        <Image alt="uploaded file preview" src="data:image/png;base64,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" />
      }
    />
  </OverlayProvider>
);

export const ExistingImage = () => {
  const [previewImage, setPreviewImage] = useState('https://picsum.photos/id/1025/200/300');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // When controlling the previewImage yourself, it's important to handle updating the state
  const handleChange = async e => {
    // Clear errors
    setError(undefined);
    // Turn on loading indicator
    setIsLoading(true);

    // Handle setting the preview image
    const files = e.target?.files[0];
    const reader = new FileReader();
    reader.onload = ({ target: { result } }) => {
      setPreviewImage(result);
    };

    try {
      // Simulate a successful async server call
      await new Promise(resolve => setTimeout(resolve, 3000));
      // Trigger the preview image callback
      reader.readAsDataURL(files);
    } catch (_error) {
      setPreviewImage(undefined);
      setError('There was an error...');
    }

    // Unset loading indicator
    setIsLoading(false);
  };

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
    <OverlayProvider>
      <ImageUploadField
        label="Upload Image"
        isLoading={isLoading}
        onChange={handleChange}
        previewImage={previewImage}
        previewHeight={150}
        previewWidth={150}
        status={error ? 'error' : 'default'}
        helperText={error}
      />
    </OverlayProvider>
  );
};

export const ErrorOnUpload = () => {
  const [shouldError, setShouldError] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const errorRef = useRef(shouldError);

  // When controlling the previewImage yourself, it's important to handle updating the state
  const handler = async e => {
    // Clear errors
    setError(undefined);
    // Turn on loading indicator
    setIsLoading(true);

    // Handle setting the preview image
    const files = e.target?.files[0];
    const reader = new FileReader();
    reader.onload = ({ target: { result } }) => {
      setPreviewImage(result);
    };

    try {
      // Swap between success and error
      await new Promise((resolve, reject) => setTimeout(errorRef.current ? reject : resolve, 3000));
      // Trigger the preview image callback
      reader.readAsDataURL(files);
    } catch (_error) {
      setPreviewImage(null);
      setError('There was an error...');
    }

    // Unset loading indicator
    setIsLoading(false);
    errorRef.current = !shouldError;
    setShouldError(current => !current);
  };

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
    <OverlayProvider>
      <ImageUploadField
        label="Upload Image"
        isLoading={isLoading}
        onChange={handler}
        previewImage={previewImage}
        previewHeight={150}
        previewWidth={150}
        status={error ? 'error' : 'default'}
        helperText={error}
      />
    </OverlayProvider>
  );
};

export const CustomizePopoverMenu = args => {
  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
    <OverlayProvider>
      <ImageUploadField {...args} popoverMenuProps={{ align: 'start' }} />
    </OverlayProvider>
  );
};
