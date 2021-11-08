import React, { useRef, useState } from 'react';
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

export const ExistingImage = () => {
  const [previewImage, setPreviewImage] = useState('https://picsum.photos/id/1025/200/300');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // When controlling the previewImage yourself, it's important to handle updating the state
  const handleChange = async (e) => {
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
  const handler = async (e) => {
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
