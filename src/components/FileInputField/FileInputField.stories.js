import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Box, FileInputField } from '../../index';
import statuses from '../../utils/devUtils/constants/statuses';
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributeBaseArgTypes } from '../../utils/docUtils/fieldAttributes';
import { statusArgTypes } from '../../utils/docUtils/statusProp';

import FileInputFieldReadme from './FileInputField.mdx';

export default {
  title: 'Form/FileInputField',
  component: FileInputField,
  parameters: {
    docs: {
      page: () => (
        <>
          <FileInputFieldReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
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
    defaultButtonText: {
      control: {
        type: 'text',
      },
    },
    isMultiple: {
      control: {
        type: 'boolean',
      },
    },
    isLoading: {
      control: {
        type: 'boolean',
      },
    },
    isDisabled: {
      control: {
        type: 'boolean',
      },
    },
    fileList: {
      control: {
        type: 'none',
      },
    },
    defaultFileList: {
      control: {
        type: 'none',
      },
    },
    textProps: {
      control: {
        type: 'none',
      },
    },
    ...statusArgTypes,
    ...ariaAttributeBaseArgTypes,
    ...inputFieldAttributeBaseArgTypes,
  },
  args: {
    label: 'Field Label',
    'aria-label': 'File Input Field',
  },
};

const fitContentWidthSx = { width: 'fit-content' };

export const Default = args => (
  <FileInputField sx={fitContentWidthSx} {...args} />
);

export const CustomButtonText = args => (
  <FileInputField
    {...args}
    defaultButtonText="Original Button Name"
    label="Custom Button Text"
    sx={fitContentWidthSx}
  />
);

export const ControlledState = args => {
  const [userFiles, setUserFiles] = useState([]);
  const [error, setError] = useState();

  const handleFileSelect = (event, files) => {
    // this is approximate conversion just for an example
    const uploadedFileSizeMb = files[0].size / 1e6;
    if (uploadedFileSizeMb > 2) {
      setError('Only files under 2 MB can be uploaded.');
    } else {
      setUserFiles([
        {
          id: uuidv4(),
          name: files[0].name,
          downloadLink: 'link for testing purposes',
        },
      ]);
      setError(null);
    }
  };

  // you would want to handle this differently in case you have multiple files
  const handleFileRemove = () => {
    setUserFiles([]);
    setError(null);
  };

  return (
    <FileInputField
      {...args}
      label="Controlled State With limit on file size upload below 2 mb"
      onFileSelect={handleFileSelect}
      onRemove={handleFileRemove}
      fileList={userFiles}
      sx={fitContentWidthSx}
      status={error && statuses.ERROR}
      helperText={error}
      isMultiple
    />
  );
};

export const DefaultFileListUncontrolled = () => (
  <FileInputField
    defaultFileList={[
      {
        id: 'test-id1',
        name: 'PingId Mobile (Android)',
        downloadLink:
          'https://download.pingidentity.com/public/PingID/android/PingID.apk',
      },
      {
        id: 'test-id2',
        name: 'PingId Desktop (macOS)',
        downloadLink:
          'https://downloads.pingidentity.com/pingid/mac-client/PingID.pkg',
      },
      {
        id: 'test-id3',
        name: 'PingId Desktop (Windows)',
        downloadLink:
          'https://download.pingidentity.com/public/PingID/PingID_1.7.2.zip',
      },
    ]}
    isMultiple
    label="Uncontrolled File List with default files"
    sx={fitContentWidthSx}
  />
);

export const ErrorStatusSingleFile = args => (
  <FileInputField
    {...args}
    defaultFileList={[
      {
        id: 'test-id3',
        name: 'PingId Desktop (Windows)',
        downloadLink:
          'https://download.pingidentity.com/public/PingID/PingID_1.7.2.zip',
        status: statuses.ERROR,
      },
    ]}
    label="Error Status Single File"
    sx={fitContentWidthSx}
    helperText="There is an error"
    status={statuses.ERROR}
  />
);

export const ErrorWithMultipleFiles = args => (
  <FileInputField
    {...args}
    defaultFileList={[
      {
        id: 'test-id3',
        name: 'PingId Desktop (Windows)',
        downloadLink:
          'https://download.pingidentity.com/public/PingID/PingID_1.7.2.zip',
        status: statuses.ERROR,
      },
      {
        id: 'test-id2',
        name: 'PingId Desktop (macOS)',
        downloadLink:
          'https://downloads.pingidentity.com/pingid/mac-client/PingID.pkg',
      },
    ]}
    label="Error Status With Multiple Files but without a red border"
    sx={fitContentWidthSx}
    helperText="There is an error but helperText text will be default since no status passed"
    isMultiple
  />
);

export const WithCustomWidth = args => {
  const textSx = {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  };

  return (
    <Box width={200}>
      <FileInputField
        {...args}
        defaultButtonText="Long Long Button Text With A Lot of Words In It"
        defaultFileList={[
          {
            id: 'test-id1',
            name: 'Really Long File Name That Cant Fit',
            downloadLink:
              'https://download.pingidentity.com/public/PingID/android/PingID.apk',
          },
        ]}
        label="Custom Width"
        textProps={{ sx: textSx }}
        isMultiple
      />
    </Box>
  );
};

export const WithFileTypePdfAndImage = () => {
  const fileTypes = ['application/pdf', 'image/*'];
  const [error, setError] = useState();

  const handleFileSelect = (event, files) => {
    const uploadedFileType = files[0].type;

    const isValidFileType = fileTypes.some(fileType => uploadedFileType.search(fileType) !== -1);
    if (isValidFileType) {
      setError(null);
    } else {
      setError('Not a valid File Type. Only PDF and Image files are allowed.');
    }
  };

  return (
    <FileInputField
      label="With File Type"
      sx={fitContentWidthSx}
      fileTypes={fileTypes}
      onFileSelect={handleFileSelect}
      onRemove={() => setError(null)}
      status={error && statuses.ERROR}
      helperText={error}
    />
  );
};
