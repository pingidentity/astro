import React from 'react';
import { mount } from 'enzyme';
import { useProgStateful } from '../StateUtils';

/* eslint-disable react/prop-types */
const TestComponent = ({
    count,
}) => {
    const [countVal, setCountVal] = useProgStateful(count, 0);
    const handleClick = () => setCountVal(countVal + 1);

    return (
        <button onClick={handleClick}>{countVal}</button>
    );
};

describe('State Utils', () => {
    it('should update the state when no prop is provided', () => {
        const wrapper = mount(<TestComponent />);
        expect(wrapper.text()).toBe('0');
        wrapper.simulate('click');
        expect(wrapper.text()).toBe('1');
        wrapper.simulate('click');
        expect(wrapper.text()).toBe('2');
    });

    it('should not update the state when a prop is provided', () => {
        const wrapper = mount(<TestComponent count={5} />);
        expect(wrapper.text()).toBe('5');
        wrapper.simulate('click');
        expect(wrapper.text()).toBe('5');
        wrapper.simulate('click');
        expect(wrapper.text()).toBe('5');
    });
});
