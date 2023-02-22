import React from 'react';

import RequirementsList from '.';

export default {
  title: 'Components/RequirementsList',
  component: RequirementsList,
  argTypes: {
    requirements: {
      control: {
        type: 'object',
      },
      defaultValue: [
        { 'name': 'requirement 1', 'status': 'default' },
        { 'name': 'requirement 2', 'status': 'warning' },
        { 'name': 'requirement 3', 'status': 'error' },
        { 'name': 'requirement 4', 'status': 'success' },
      ],
      description: 'Requirements and their status.',
    },
  },
};

export const Default = ({ label, requirements }) => (
  <RequirementsList label={label} requirements={requirements} />
);

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
