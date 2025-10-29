import React from 'react';
import userEvent from '@testing-library/user-event';

import { ModalFooterProps } from '../../types/Modal';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import ModalFooter from './ModalFooter';

const defaultProps = {
  children: '',
};

const getComponent = (props = {}) => render((
  <ModalFooter {...defaultProps} {...props} />
));
// Needs to be added to each components test file
universalComponentTests({
  renderComponent: (props: ModalFooterProps) => <ModalFooter {...props} />,
});


describe('ModalFooter', () => {
  test('rendered', () => {
    getComponent({ children: 'ModalFooter' });
    screen.getByText(/modalfooter/i);
  });

  test('onSubmit and onCancel are called when buttons are clicked', async () => {
    const onSubmit = jest.fn();
    const onCancel = jest.fn();
    getComponent({ onSubmit, onCancel });

    const saveButton = screen.getByRole('button', { name: /save/i });
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await userEvent.click(saveButton);
    await userEvent.click(cancelButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  test('does not render buttons when children are provided', () => {
    getComponent({ children: <div>Custom Footer</div> });

    expect(screen.getByText(/custom footer/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /save/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /cancel/i })).not.toBeInTheDocument();
  });

  test('primaryButtonText and secondaryButtonText props change button text', () => {
    getComponent({ primaryButtonText: 'Submit', secondaryButtonText: 'Dismiss' });

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument();
  });
});
