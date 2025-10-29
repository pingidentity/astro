import React from 'react';
import userEvent from '@testing-library/user-event';

import { Link, PageHeader } from '../../index';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

const testId = 'test-header';
const defaultProps = {
  title: 'test-title',
  'data-testid': testId,
  buttonProps: { onPress: jest.fn() },
};

const getComponent = (props = defaultProps) => render(
  <PageHeader
    {...props}
  >
    The description of the page. The description of the page. The description of the page. The
    description of the page.The description of the page. The description of the page. The
    description of the page. The description of the page. The description of the page.&nbsp;
    <Link href="https://uilibrary.ping-eng.com/">Learn more</Link>
  </PageHeader>,
);

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <PageHeader title="Title of the Page" {...props}>some test  </PageHeader>
  ),
});

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

test('when there are no buttonProps, it does not render a button', () => {
  getComponent({ title: 'test-title' });

  const button = screen.queryByRole('button');
  expect(button).not.toBeInTheDocument();
});

test('when the button is pressed, it calls the onPress callback', () => {
  const onPress = jest.fn();
  const customButtonProps = { bg: '#000000' };

  getComponent({ buttonProps: { ...customButtonProps, onPress } });
  const button = screen.getByRole('button');
  expect(button).toHaveStyle('background: #000000');

  userEvent.click(button);
  expect(onPress).toHaveBeenCalled();
});
