import React from 'react';
import userEvent from '@testing-library/user-event';

import { PanelHeaderSwitchField } from '../../../index';
import axeTest from '../../../utils/testUtils/testAxe';
import { render, screen } from '../../../utils/testUtils/testWrapper';

const getComponent = (props = {}) => render((
  <PanelHeaderSwitchField {...props} />
));

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('PanelHeaderSwitchField responds to SwitchFiled props', () => {
  const onChange = jest.fn();
  getComponent({ onChange });

  const switchField = screen.getByRole('switch');
  userEvent.click(switchField);

  expect(onChange).toBeCalled();
});
