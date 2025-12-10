import React from 'react';
import { screen } from '@testing-library/react';

import statuses from '../../utils/devUtils/constants/statuses';
import { render } from '../../utils/testUtils/testWrapper';

import { NoticeIcon, noticeIcons } from './NoticeIcon';

const getComponent = (props = {}) => render((
  <NoticeIcon {...props} />
));

describe('NoticeIcon', () => {
  test('renders', () => {
    getComponent();

    screen.getByTestId(noticeIcons[statuses.DEFAULT].testid);
  });

  test.each([
    [statuses.DEFAULT, noticeIcons[statuses.DEFAULT].testid],
    [statuses.ERROR, noticeIcons[statuses.ERROR].testid],
    [statuses.SUCCESS, noticeIcons[statuses.SUCCESS].testid],
    [statuses.WARNING, noticeIcons[statuses.WARNING].testid],
  ])('when given status %s it renders icon with %s', (status, icon) => {
    getComponent({ status });

    screen.getByTestId(icon);
  });
});
