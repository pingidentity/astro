import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { RequirementsList } from '../../index';
import { RequirementsListProps } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';

import RequirementsListReadme from './RequirementsList.mdx';

export default {
  title: 'Components/RequirementsList',
  component: RequirementsList,
  decorators: [withDesign],
  parameters: {
    docs: {
      page: () => (
        <>
          <RequirementsListReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    requirements: {
      control: {
        type: 'object',
      },
      description: 'Requirements and their status.',
    },
  },
  args: {
    requirements: [
      { 'name': 'Requirement 1', 'status': 'default' },
      { 'name': 'Requirement 2', 'status': 'warning' },
      { 'name': 'Requirement 3', 'status': 'error' },
      { 'name': 'Requirement 4', 'status': 'success' },
    ],
  },
} as Meta;

export const Default: StoryFn<RequirementsListProps> = (
  { label, requirements }: RequirementsListProps,
) => (
  <RequirementsList label={label} requirements={requirements} />
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.requirementsList.default,
  },
};

export const Password: StoryFn = () => (
  <RequirementsList
    label="Password Requirements"
    requirements={[
      {
        name: '6 characters',
        status: 'default',
      },
      {
        name: '1 UPPERCASE letter',
        status: 'success',
      },
      {
        name: '1 lowercase letter',
        status: 'success',
      },
      {
        name: '1 number',
        status: 'error',
      },
      {
        name: 'Password Strength',
        status: 'warning',
      },
    ]}
  />
);
