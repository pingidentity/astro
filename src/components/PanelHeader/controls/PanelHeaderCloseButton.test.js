import React from 'react';
import userEvent from '@testing-library/user-event';

import { PanelHeaderCloseButton } from '../../../index';
import axeTest from '../../../utils/testUtils/testAxe';
import { render, screen } from '../../../utils/testUtils/testWrapper';

const getComponent = (props = {}) => render((
  <PanelHeaderCloseButton {...props} />
));

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('PanelHeaderCloseButton responds to IconButton props', () => {
  const onPress = jest.fn();
  getComponent({ onPress });

  const button = screen.getByRole('button');
  userEvent.click(button);

  expect(onPress).toBeCalled();
});
