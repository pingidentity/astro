import React, { useRef, useState } from 'react';
import { Image, ImageUploadField, OverlayProvider } from '../../index';
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

export const ComponentAsDefaultImage = () => (
  // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
  // readers when an overlay opens.
  <OverlayProvider>
    <ImageUploadField
      label="Upload Image with component as default image"
      previewHeight={150}
      previewWidth={150}
      defaultPreviewImage={
        <Image src="data:image/png;base64,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" />
      }
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
