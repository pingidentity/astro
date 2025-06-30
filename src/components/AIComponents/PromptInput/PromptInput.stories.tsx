import React, { useState } from 'react';
import { Meta } from '@storybook/react';

import DocsLayout from '../../../../.storybook/storybookDocsLayout';
import { Box } from '../../..';
import { booleanArg } from '../../../utils/docUtils/docArgTypes';

import PromptInput from './PromptInput';
import PromptInputReadMe from './PromptInputReadMe.mdx';

export default {
  title: 'Ai Components/Prompt Input',
  component: PromptInput,
  parameters: {
    docs: {
      page: () => (
        <>
          <PromptInputReadMe />
          <DocsLayout />
        </>
      ),
    },
    codesandbox: false,
  },
  argTypes: {
    isLoading: {
      ...booleanArg,
    },
    isUploadButtonHidden: {
      ...booleanArg,
    },
  },
} as Meta;

export const Default = args => {
  const [value, setValue] = useState('');
  const [, setAttachments] = useState([]);

  const onFileChange = files => {
    setAttachments(files);
  };

  const onCancel = event => {
    console.log(event);
  };

  const onSubmit = () => {
    console.log('submit');
    setValue('');
  };

  return (
    <Box maxWidth="768px">
      <PromptInput
        {...args}
        placeholder="Enter a prompt here"
        onChange={e => setValue((e.target as HTMLInputElement).value)}
        value={value}
        aria-label="test"
        onFileChange={onFileChange}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </Box>
  );
};
