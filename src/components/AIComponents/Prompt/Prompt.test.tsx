import React from 'react';

import { Text } from '../../../index';
import { render, screen } from '../../../utils/testUtils/testWrapper';

import Prompt from './Prompt';

const defaultProps = {
  placeholder: 'Enter your prompt...',
  label: 'Prompt',
};

const getComponent = (props = {}) => render(
  <Prompt {...defaultProps} {...props}>
    <Text>Did my number of registrations go up or down in the last month?</Text>
  </Prompt>,
);

test('Prompt component renders correctly', () => {
  getComponent();
  expect(screen.getByText('Did my number of registrations go up or down in the last month?')).toBeInTheDocument();
});
