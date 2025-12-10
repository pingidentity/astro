import React from 'react';
import userEvent from '@testing-library/user-event';

import { PanelHeaderSwitchField } from '../../../index';
import { render, screen } from '../../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../../utils/testUtils/universalComponentTest';

const getComponent = (props = {}) => render((
  <PanelHeaderSwitchField {...props} />
));

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <PanelHeaderSwitchField {...props} /> });

test('PanelHeaderSwitchField responds to SwitchFiled props', () => {
  const onChange = jest.fn();
  getComponent({ onChange });

  const switchField = screen.getByRole('switch');
  userEvent.click(switchField);

  expect(onChange).toBeCalled();
});
