import React from 'react';
import userEvent from '@testing-library/user-event';

import { ListViewItemSwitchField } from '../../..';
import { render, screen } from '../../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../../utils/testUtils/universalComponentTest';

const getComponent = (props = {}) => render((
  <ListViewItemSwitchField {...props} />
));

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <ListViewItemSwitchField {...props} /> });

test('ListViewItemSwitchField responds to SwitchFiled props', () => {
  const onChange = jest.fn();
  getComponent({ onChange });

  const switchField = screen.getByRole('switch');
  userEvent.click(switchField);

  expect(onChange).toBeCalled();
});
