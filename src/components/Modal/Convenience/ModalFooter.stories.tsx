import React from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';

import DocsLayout from '../../../../.storybook/storybookDocsLayout';
import { useModalState } from '../../../hooks';
import {
  ModalFooter,
} from '../../../index';
import { ModalFooterProps } from '../../../types/Modal';

export default {
  title: 'Components/Modal/Convenience/ModalFooter',
  component: ModalFooter,
  parameters: {
    docs: {
      page: () => (
        <DocsLayout />
      ),
    },
  },
} as Meta;

export const Default: StoryFn<ModalFooterProps> = () => {
  const state = useModalState();

  return (
    <ModalFooter onSubmit={state.close} onCancel={state.close} />

  );
};
