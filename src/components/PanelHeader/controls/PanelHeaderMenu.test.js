import React from 'react';
import userEvent from '@testing-library/user-event';

import { Item, PanelHeaderMenu } from '../../../index';
import { render, screen } from '../../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../../utils/testUtils/universalComponentTest';

const getComponent = (props = {}) => render((
  <PanelHeaderMenu {...props}>
    <Item>testItem</Item>
  </PanelHeaderMenu>
));

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <PanelHeaderMenu {...props}>
      <Item>testItem</Item>
    </PanelHeaderMenu>
  ),
});

test('PanelHeaderMenu responds to Menu props', () => {
  const onAction = jest.fn();
  getComponent({ onAction });

  const menuTrigger = screen.getByRole('button', { name: 'more' });
  userEvent.click(menuTrigger);

  const menuItem = screen.getByRole('menuitem', { name: 'testItem' });
  userEvent.click(menuItem);

  expect(onAction).toBeCalled();
});
