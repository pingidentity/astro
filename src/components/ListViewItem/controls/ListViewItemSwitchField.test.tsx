import React from 'react';
import userEvent from '@testing-library/user-event';

import { ListViewItemSwitchField } from '../../..';
import { ListViewItemSwitchFieldProps } from '../../../types';
import { render, screen } from '../../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../../utils/testUtils/universalComponentTest';

const getComponent = (props: Partial<ListViewItemSwitchFieldProps> = {}) => render((
  <ListViewItemSwitchField {...props} />
));

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: (props: Partial<ListViewItemSwitchFieldProps>) => (
    <ListViewItemSwitchField {...props} />
  ),
});

test('ListViewItemSwitchField responds to SwitchFiled props', async () => {
  const onChange = jest.fn();
  getComponent({ onChange });

  const switchField = screen.getByRole('switch');
  await userEvent.click(switchField);

  expect(onChange).toBeCalled();
});
