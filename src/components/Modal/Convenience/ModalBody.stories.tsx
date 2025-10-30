import React, { ReactNode } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../../.storybook/storybookDocsLayout';
import {
  Box,
  ModalBody,
  Text,
} from '../../../index';

export default {
  title: 'Components/Modal/Convenience/ModalBody',
  component: ModalBody,
  decorators: [withDesign],
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
