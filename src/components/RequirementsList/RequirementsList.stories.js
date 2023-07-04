import React from 'react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { RequirementsList } from '../../index';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks.js';

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
      defaultValue: [
        { name: 'requirement 1', status: 'default' },
        { name: 'requirement 2', status: 'warning' },
        { name: 'requirement 3', status: 'error' },
        { name: 'requirement 4', status: 'success' },
      ],
      description: 'Requirements and their status.',
    },
  },
};

export const Default = ({ label, requirements }) => (
  <RequirementsList label={label} requirements={requirements} />
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.requirementsList.default,
  },
};

export const Password = () => (
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
