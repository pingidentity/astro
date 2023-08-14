import React from 'react';
import userEvent from '@testing-library/user-event';

import { Item, PanelHeaderMenu } from '../../../index';
import axeTest from '../../../utils/testUtils/testAxe';
import { render, screen } from '../../../utils/testUtils/testWrapper';

const getComponent = (props = {}) => render((
  <PanelHeaderMenu {...props}>
    <Item>testItem</Item>
  </PanelHeaderMenu>
));

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('PanelHeaderMenu responds to Menu props', async () => {
  const onAction = jest.fn();
  getComponent({ onAction });

  const menuTrigger = screen.getByRole('button', { name: 'more' });
  await userEvent.click(menuTrigger);

  const menuItem = screen.getByRole('menuitem', { name: 'testItem' });
  await userEvent.click(menuItem);

  expect(onAction).toBeCalled();
});
