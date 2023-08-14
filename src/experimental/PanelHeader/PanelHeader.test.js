import React from 'react';
import AccountIcon from '@pingux/mdi-react/AccountIcon';

import { PanelHeader, PanelHeaderSwitchField } from '../../index';
import axeTest from '../../utils/testUtils/testAxe';
import { render, screen } from '../../utils/testUtils/testWrapper';

import { PANEL_HEADER_ICON } from './PanelHeader';

const defaultProps = {
  data: {
    text: 'testText',
    subtext: 'testSubtext',
    icon: AccountIcon,
  },
};

const getComponent = (props = {}) => render((
  <PanelHeader {...defaultProps} {...props} />
));

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

describe('PanelHeader', () => {
  test('renders data', () => {
    getComponent();

    const { data: { text, subtext } } = defaultProps;
    screen.getByText(text);
    screen.getByText(subtext);
    screen.getByRole('img', { name: `${text}${PANEL_HEADER_ICON}` });
  });

  test('renders children', () => {
    getComponent({ children: <PanelHeaderSwitchField /> });

    screen.getByRole('switch');
  });
});
