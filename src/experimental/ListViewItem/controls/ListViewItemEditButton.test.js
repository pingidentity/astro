import React from 'react';
import userEvent from '@testing-library/user-event';

import axeTest from '../../../utils/testUtils/testAxe';
import { render, screen } from '../../../utils/testUtils/testWrapper';

import ListViewItemEditButton from './ListViewItemEditButton';

const getComponent = (props = {}) => render((
  <ListViewItemEditButton {...props} />
));

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('ListViewItemEditButton responds to IconButton props', () => {
  const onPress = jest.fn();
  getComponent({ onPress });

  const button = screen.getByRole('button');
  userEvent.click(button);

  expect(onPress).toBeCalled();
});
