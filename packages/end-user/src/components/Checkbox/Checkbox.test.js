import React from 'react';
import { mount } from 'enzyme';
import { render, screen } from '@testing-library/react';
import Checkbox, { statuses } from './Checkbox';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'checkbox',
};

const getComponent = props => mount(<Checkbox {...defaultProps} {...props} />);
const renderComponent = props => render(<Checkbox {...defaultProps} {...props} />);

describe('Checkbox', () => {
    it('renders the Checkbox in the default state', () => {
        const wrapper = getComponent();
        const checkbox = wrapper.find(`label[data-id="${defaultProps['data-id']}"]`);

        expect(checkbox.exists()).toEqual(true);
    });

    it('calls the onChange', () => {
        const testCallback = jest.fn();

        const wrapper = getComponent({ onChange: testCallback });
        const checkbox = wrapper.find(`label[data-id="${defaultProps['data-id']}"]`);

        expect(checkbox.exists()).toEqual(true);
        expect(testCallback).not.toHaveBeenCalled();

        wrapper.find('.checkbox__input').first().simulate('change');

        expect(testCallback).toHaveBeenCalled();
    });

    it('does not display the label with Markdown when hasMarkdown prop is false', () => {
        renderComponent({ label: '# Markdown!' });
        const heading = screen.queryByRole('heading');
        expect(heading).not.toBeInTheDocument();
    });

    it('displays the label with Markdown when hasMarkdown prop is true', () => {
        renderComponent({ hasMarkdown: true, label: '# Markdown!' });
        const heading = screen.queryByRole('heading');
        expect(heading).toBeInTheDocument();
    });

    it('displays the error status and message', () => {
        const fieldMessage = 'error';
        renderComponent({ status: statuses.ERROR, fieldMessage });

        const status = screen.getByRole('status');
        expect(status).toHaveClass('field-message--error');
        expect(status).toBeInTheDocument();
        expect(status).toHaveTextContent(fieldMessage);
    });
});
