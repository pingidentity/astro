import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import PopOutMenu from './PopOutMenu';

const defaultProps = {
    'data-testid': 'test-popout-menu',
    'data-id': 'test-popout-menu',
    title: 'Test',
    children: <div>Child</div>,
};
const getComponent = props => render(<PopOutMenu {...defaultProps} {...props} />);

describe('PopOutMenu', () => {
    it('renders the popout menu in the default state', () => {
        const children = <div>Child</div>;
        getComponent({ children });
        const trigger = screen.getByText(defaultProps.title);

        expect(trigger).toBeInTheDocument();
        expect(trigger).toHaveAttribute('data-id', defaultProps['data-id']);
        expect(screen.queryByText('Child')).not.toBeInTheDocument();
        fireEvent.click(trigger);
        expect(screen.queryByText('Child')).toBeInTheDocument();
    });

    it('renders children when isOpen is true', () => {
        const children = <div>Child</div>;
        getComponent({ children, isOpen: true });
        expect(screen.queryByText('Child')).toBeInTheDocument();
    });

    it('renders trigger component with isOpen prop', () => {
        // eslint-disable-next-line react/prop-types
        const Trigger = ({ isOpen }) => <div data-testid="trigger">{isOpen ? 'open' : 'closed'}</div>;
        getComponent({ title: <Trigger /> });
        const trigger = screen.getByTestId('trigger');
        fireEvent.click(trigger);

        expect(trigger).toBeInTheDocument();
        expect(trigger).toHaveTextContent('open');
    });

    it('allows child to call onClose via render prop', () => {
        // eslint-disable-next-line react/prop-types
        const children = ({ onClose }) => <button onClick={onClose}>Close</button>;
        getComponent({ children });
        const trigger = screen.getByText(defaultProps.title);

        fireEvent.click(trigger);
        expect(screen.queryByText('Close')).toBeInTheDocument();
        fireEvent.click(screen.queryByText('Close'));
        expect(screen.queryByText('Close')).not.toBeInTheDocument();
    });

    it('invokes the onOpen callback properly when opened', () => {
        const onOpen = jest.fn();
        getComponent({ onOpen });
        const trigger = screen.getByText(defaultProps.title);

        expect(onOpen).toHaveBeenCalledTimes(0);
        fireEvent.click(trigger);
        expect(onOpen).toHaveBeenCalledTimes(1);
    });

    it('invokes the onClose callback properly when closed', () => {
        const onClose = jest.fn();
        getComponent({ isChecked: true, onClose });
        const trigger = screen.getByText(defaultProps.title);

        expect(onClose).toHaveBeenCalledTimes(0);
        fireEvent.click(trigger);
        fireEvent.click(trigger);
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
