import React, { useState } from 'react';

import { AstroProvider, Box, NextGenTheme } from '../../..';
import { booleanArg } from '../../../utils/docUtils/docArgTypes';

import PromptInput from './PromptInput';

export default {
  title: 'Ai Components/Prompt Input',
  component: PromptInput,
  argTypes: {
    isLoading: {
      ...booleanArg,
    },
  },
};

export const Default = args => {
  const [value, setValue] = useState('');
  const [attachments, setAttachments] = useState([]);

  const onFileChange = files => {
    console.log(files);
    setAttachments(files);
  };

  const onCancel = event => {
    console.log(event);
  };

  const onSubmit = event => {
    console.log(event);
    console.log(attachments);
  };

  return (
    <AstroProvider themeOverrides={[NextGenTheme]}>
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
    </AstroProvider>
  );
};
