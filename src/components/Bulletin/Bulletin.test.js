import React from 'react';
import { screen } from '@testing-library/react';

import statuses from '../../utils/devUtils/constants/statuses';
import { render } from '../../utils/testUtils/testWrapper';
import { noticeIcons } from '../Icon/NoticeIcon';
import Bulletin, { BULLETIN_TEST_ID } from './Bulletin';

const TEST_TEXT = 'test text';

const testColors = {
  [statuses.DEFAULT]: 'var(--theme-ui-colors-text-secondary)',
  [statuses.ERROR]: 'var(--theme-ui-colors-critical-bright)',
  [statuses.SUCCESS]: 'var(--theme-ui-colors-success-bright)',
  [statuses.WARNING]: 'var(--theme-ui-colors-warning-bright)',
};

const getComponent = (props = {}) => render((
  <Bulletin {...props} >{TEST_TEXT}</Bulletin>
));

describe('Bulletin', () => {
  test('renders', () => {
    getComponent();

    screen.getByText(TEST_TEXT);
  });

  test('renders the default color', () => {
    getComponent();

    expect(screen.getByTestId(BULLETIN_TEST_ID))
      .toHaveStyle({ 'border-color': testColors[statuses.DEFAULT] });
  });

  test.each([
    [statuses.DEFAULT, testColors[statuses.DEFAULT]],
    [statuses.ERROR, testColors[statuses.ERROR]],
    [statuses.SUCCESS, testColors[statuses.SUCCESS]],
    [statuses.WARNING, testColors[statuses.WARNING]],
  ])('when given status %s it renders Bulletin with color %s', (status, expected) => {
    getComponent({ status });

    expect(screen.getByTestId(BULLETIN_TEST_ID))
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
