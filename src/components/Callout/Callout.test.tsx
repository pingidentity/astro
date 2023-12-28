import React from 'react';
import { screen } from '@testing-library/react';

import statuses from '../../utils/devUtils/constants/statuses';
import { render } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import { noticeIcons } from '../Icon/NoticeIcon';

import Callout, { CALLOUT_TEST_ID } from './Callout';

const TEST_TEXT = 'test text';

const testColors = {
  [statuses.DEFAULT]: 'var(--theme-ui-colors-text-secondary)',
  [statuses.ERROR]: 'var(--theme-ui-colors-critical-bright)',
  [statuses.SUCCESS]: 'var(--theme-ui-colors-success-bright)',
  [statuses.WARNING]: 'var(--theme-ui-colors-warning-bright)',
};

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <Callout {...props} /> });

const getComponent = (props = {}) => render((
  <Callout {...props}>{TEST_TEXT}</Callout>
));

describe('Callout', () => {
  test('renders', () => {
    getComponent();

    screen.getByText(TEST_TEXT);
  });

  test('renders the default color', () => {
    getComponent();

    expect(screen.getByTestId(CALLOUT_TEST_ID))
      .toHaveStyle({ 'border-color': testColors[statuses.DEFAULT] });
  });

  test.each([
    [statuses.DEFAULT, testColors[statuses.DEFAULT]],
    [statuses.ERROR, testColors[statuses.ERROR]],
    [statuses.SUCCESS, testColors[statuses.SUCCESS]],
    [statuses.WARNING, testColors[statuses.WARNING]],
  ])('when given status %s it renders Callout with color %s', (status, expected) => {
    getComponent({ status });

    expect(screen.getByTestId(CALLOUT_TEST_ID))
      .toHaveStyle({ 'border-color': expected });
  });

  test.each([
    [statuses.DEFAULT, noticeIcons[statuses.DEFAULT].testid],
    [statuses.ERROR, noticeIcons[statuses.ERROR].testid],
    [statuses.SUCCESS, noticeIcons[statuses.SUCCESS].testid],
    [statuses.WARNING, noticeIcons[statuses.WARNING].testid],
  ])('when given status %s it renders %s', (status, icon) => {
    getComponent({ status });

    screen.getByTestId(icon);
  });
});
