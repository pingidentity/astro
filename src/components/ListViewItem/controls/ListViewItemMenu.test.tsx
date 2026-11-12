import React from 'react';
import userEvent from '@testing-library/user-event';

import { Item, ListViewItemMenu } from '../../..';
import { ListViewItemMenuProps } from '../../../types';
import { render, screen } from '../../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../../utils/testUtils/universalComponentTest';

const getComponent = (props: Partial<ListViewItemMenuProps> = {}) => render((
  <ListViewItemMenu {...props}>
    <Item>testItem</Item>
  </ListViewItemMenu>
));

// Needs to be added to each components test file
universalComponentTests({ renderComponent: (props: Partial<ListViewItemMenuProps>) => (
  <ListViewItemMenu {...props}>
    <Item>testItem</Item>
  </ListViewItemMenu>
) });

test('ListViewItemMenu responds to Menu props', async () => {
  const onAction = jest.fn();
  getComponent({ onAction });

  const menuTrigger = screen.getByRole('button', { name: 'more' });
  await userEvent.click(menuTrigger);

  const menuItem = screen.getByRole('menuitem', { name: 'testItem' });
  await userEvent.click(menuItem);

  expect(onAction).toBeCalled();
});
