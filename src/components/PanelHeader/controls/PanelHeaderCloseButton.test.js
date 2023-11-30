import React from 'react';
import userEvent from '@testing-library/user-event';

import { PanelHeaderCloseButton } from '../../../index';
import { render, screen } from '../../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../../utils/testUtils/universalComponentTest';

const getComponent = (props = {}) => render((
  <PanelHeaderCloseButton {...props} />
));

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <PanelHeaderCloseButton {...props} /> });

test('PanelHeaderCloseButton responds to IconButton props', () => {
  const onPress = jest.fn();
  getComponent({ onPress });

  const button = screen.getByRole('button');
  userEvent.click(button);

  expect(onPress).toBeCalled();
});
