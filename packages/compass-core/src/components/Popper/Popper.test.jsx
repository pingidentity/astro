import React, { Fragment, useRef } from 'react';
import { mount } from 'enzyme';
import Popper, { usePopper } from './Popper';

jest.mock('react-portal');

const FnPopper = () => {
    const popper = useRef(null);
    const getPopper = () => popper.current;

    const reference = useRef(null);
    const getReference = () => reference.current;

    usePopper(getReference, getPopper, 'bottom');

    return (
        <Fragment>
            <div ref={popper}><div data-id="content">POPPER</div></div>
            <div ref={reference}>REFERENCE</div>
        </Fragment>
    );
};

const SamplePopper = () => {
    const reference = useRef(null);
    const getReference = () => reference.current;

    return (
        <Fragment>
            <div ref={reference}>
                <Popper getReference={getReference}>
                    <div data-id="content">Content</div>
                </Popper>
            </div>
        </Fragment>
    );
};

const defaultProps = {
    'data-id': 'test-Popper',
    children: 'Test',
    getReference: () => ({}),
};
const getComponent = props => mount(<Popper {...defaultProps} {...props} />);

describe('Popper', () => {
    it('renders the Popper in the default state', () => {
        const wrapper = getComponent();
        const component = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(component.exists()).toEqual(true);
    });

    it('renders a popper with getReference as a function', () => {
        const wrapper = mount(<SamplePopper />);

        expect(wrapper.find('div[data-id="content"]').exists()).toBeTruthy();
    });

    it('renders a popper with getPopper and getReference as functions', () => {
        const wrapper = mount(<FnPopper />);

        expect(wrapper.find('div[data-id="content"]').exists()).toBeTruthy();
    });

    it('default renders with a portal', () => {
        const wrapper = getComponent();

        expect(wrapper.find('Portal').exists()).toBe(true);
    });
    it('renders without a portal with hasNoPortal prop', () => {
        const wrapper = getComponent({ hasNoPortal: true });

        expect(wrapper.find('Portal').exists()).toBe(false);
    });
});
