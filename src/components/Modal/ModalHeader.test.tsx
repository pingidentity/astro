import React from 'react';
import userEvent from '@testing-library/user-event';

import { ModalHeaderProps } from '../../types/Modal';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import ModalHeader from './ModalHeader';

const defaultProps = {
  hasCloseButton: true,
};

const getComponent = (props = {}) => render((
  <ModalHeader {...defaultProps} {...props} />
));
// Needs to be added to each components test file
universalComponentTests({
  renderComponent: (props: ModalHeaderProps) => <ModalHeader {...props} />,
});


describe('ModalHeader', () => {
  test('rendered', () => {
    getComponent({ title: 'Lorem Ipsum' });
    screen.getByRole('heading', {
      name: /lorem ipsum/i,
    });

    screen.getByRole('button', {
      name: /close modal window/i,
    });
  });

  test('trigger on close', () => {
    const mockOnClose = jest.fn();
    getComponent({ title: 'Lorem Ipsum', onClose: mockOnClose });

    const closeButton = screen.getByRole('button', {
      name: /close modal window/i,
    });

    userEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('does not render close button', () => {
    getComponent({ title: 'Lorem Ipsum', hasCloseButton: false });

    screen.getByRole('heading', {
      name: /lorem ipsum/i,
    });

    const closeButton = screen.queryByRole('button', {
      name: /close modal window/i,
    });

    expect(closeButton).not.toBeInTheDocument();
  });

  test('custom close button', () => {
    const CustomCloseButton = () => <button type="button">Custom Close</button>;
    getComponent({
      title: 'Lorem Ipsum',
      closeButton: <CustomCloseButton />,
    });
    screen.getByRole('heading', { name: /lorem ipsum/i });
    screen.getByRole('button', { name: /custom close/i });
    expect(screen.getByRole('button', { name: /custom close/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /custom close/i })).toHaveAttribute('type', 'button');
  });

  test('title as React node', () => {
    const TitleNode = () => <div data-testid="custom-node">Custom Node</div>;
    getComponent({ title: <TitleNode /> });

    screen.getByTestId('custom-node');
    screen.getByText(/custom node/i);
  });
});
