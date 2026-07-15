import React, { ReactNode } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';

import DocsLayout from '../../../../.storybook/storybookDocsLayout';
import {
  Box,
  ModalBody,
  Text,
} from '../../../index';

import { modalBodyArgTypes } from './modalBodyAttributes';

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
  argTypes: { ...modalBodyArgTypes },
} satisfies Meta<typeof ModalBody>;

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
