import React from 'react';
import userEvent from '@testing-library/user-event';

import { Link, PageHeader } from '../../index';
import axeTest from '../../utils/testUtils/testAxe';
import { render, screen } from '../../utils/testUtils/testWrapper';

const testId = 'test-header';
const defaultProps = {
  title: 'test-title',
  'data-testid': testId,
};

const getComponent = (props = {}) => render(
  <PageHeader
    {...defaultProps}
    {...props}
  >
    The description of the page. The description of the page. The description of the page. The
    description of the page.The description of the page. The description of the page. The
    description of the page. The description of the page. The description of the page.&nbsp;
    <Link href="https://uilibrary.ping-eng.com/">Learn more</Link>
  </PageHeader>,
);

axeTest(getComponent);

test('renders default PageHeader', () => {
  getComponent();
  const wrapper = screen.getByTestId(testId);
  expect(wrapper).toBeInstanceOf(HTMLDivElement);
  expect(wrapper).toBeInTheDocument();

  const button = screen.getByRole('button');
  expect(button).toBeInstanceOf(HTMLButtonElement);
  expect(button).toBeInTheDocument();

  const link = screen.getByRole('link');
  expect(link).toBeInstanceOf(HTMLAnchorElement);
  expect(link).toBeInTheDocument();

  const title = screen.getByText('test-title');
  expect(title).toBeInstanceOf(HTMLHeadingElement);
  expect(title).toBeInTheDocument();

  expect(wrapper.children.length).toEqual(2);
});

test('button press uses callback', () => {
  const onPress = jest.fn();
  const customButtonProps = { bg: '#000000' };

  getComponent({ buttonProps: { ...customButtonProps, onPress } });
  const button = screen.getByRole('button');
  expect(button).toHaveStyle('background: #000000');

  userEvent.click(button);
  expect(onPress).toHaveBeenCalled();
});
