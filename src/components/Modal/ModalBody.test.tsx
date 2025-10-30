import React from 'react';
import userEvent from '@testing-library/user-event';

import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import ModalBody from './ModalBody';

const defaultProps = {
  children: '',
};
const testId = 'scrollBoxTestId';
const scrollProps = {
  'data-testid': testId,
  'maxHeight': '100px',
};

const getComponent = (props = {}) => render((
  <ModalBody {...defaultProps} {...props} />
));
// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => <ModalBody {...props} />,
});


describe('ModalBody', () => {
  test('rendered', () => {
    getComponent({ children: 'Lorem Ipsum' });
    screen.getByText(/lorem ipsum/i);
  });

  test('children as React node', () => {
    const ChildrenNode = () => <div data-testid="custom-node">Custom Node</div>;
    getComponent({ children: <ChildrenNode /> });

    screen.getByTestId('custom-node');
    screen.getByText(/custom node/i);
  });

  test('isScrollable adds ScrollBox wrapper', () => {
    const ChildrenNode = () => <div data-testid="custom-node">Custom Node</div>;

    getComponent({
      scrollProps,
      isScrollable: true,
      children: <ChildrenNode />,
    });

    const scrollBoxComponent = screen.getByTestId(testId);
    expect(scrollBoxComponent).toBeInTheDocument();
    expect(scrollBoxComponent).toHaveStyle({ maxHeight: '100px' });
  });
});
