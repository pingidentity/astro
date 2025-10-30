import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../../.storybook/storybookDocsLayout';
import { useModalState } from '../../../hooks';
import {
  ModalHeader,
} from '../../../index';
import { ModalHeaderProps } from '../../../types/Modal';

export default {
  title: 'Components/Modal/Convenience/ModalHeader',
  component: ModalHeader,
  decorators: [withDesign],
  parameters: {
    docs: {
      page: () => (
        <DocsLayout />
      ),
    },
  },
} as Meta;

export const Default: StoryFn<ModalHeaderProps> = () => {
  const state = useModalState();

  return (
    <ModalHeader
      hasCloseButton
      onClose={state.close}
      title="Continue"
    />
  );
};
