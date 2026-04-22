import React, { ReactNode } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';

import DocsLayout from '../../../../.storybook/storybookDocsLayout';
import {
  Box,
  ModalBody,
  Text,
} from '../../../index';

export default {
  title: 'Components/Modal/Convenience/ModalBody',
  component: ModalBody,
  parameters: {
    docs: {
      page: () => (
        <DocsLayout />
      ),
    },
  },
} as Meta;

export const Default: StoryFn<{
  children?: ReactNode;
}> = () => {
  return (
    <ModalBody>
      <Box>
        <Text>
          Do you want to continue with this action that you&lsquo;re performing?
        </Text>
      </Box>
    </ModalBody>
  );
};
