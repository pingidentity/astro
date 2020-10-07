import React from 'react';
import { mount } from 'enzyme';
import { useTransition, useToggleTransition } from '../AnimationUtils';

const TestComponent = ({ isOn }) => { // eslint-disable-line
    const { isShowing, isRendered } = useTransition(isOn, 0);

    return isRendered ? (
        <div data-id={isShowing ? 'show-test' : 'hide-test'}>hello</div>
    ) : null;
};

const TestToggleComponent = ({ isOn }) => { // eslint-disable-line
    const { isShowing, isRendered } = useToggleTransition(isOn, 0);

    return (
        <>
            {isRendered.on ? <div data-id={isShowing.on ? 'show-test-on' : 'hide-test-on'}>hello</div> : null}
            {isRendered.off ? <div data-id={isShowing.off ? 'show-test-off' : 'hide-test-off'}>hello</div> : null}
        </>
    );
};

describe('AnimationUtils', () => {
    it('should render each step in the lifecycle', () => {
        jest.useFakeTimers();
        const wrapper = mount(<TestComponent />);

        expect(wrapper.find('div').exists()).toBeFalsy();

        wrapper.setProps({ isOn: true });
        expect(wrapper.find('div[data-id="hide-test"]').exists()).toBeTruthy();

        wrapper.update();
        expect(wrapper.find('div[data-id="show-test"]').exists()).toBeTruthy();

        wrapper.setProps({ isOn: false });
        expect(wrapper.find('div[data-id="hide-test"]').exists()).toBeTruthy();

        jest.runAllTimers();

        wrapper.update();
        expect(wrapper.find('div').exists()).toBeFalsy();
    });

    it('should cancel removing the element', () => {
        jest.useFakeTimers();
        const wrapper = mount(<TestComponent isOn interval={1000} />);

        expect(wrapper.find('div[data-id="show-test"]').exists()).toBeTruthy();

        wrapper.setProps({ isOn: false });
        wrapper.update();

        wrapper.setProps({ isOn: true });
        wrapper.update();

        jest.runAllTimers();

        expect(wrapper.find('div').exists()).toBeTruthy();
    });

    it('should render each step in the toggling lifecycle', () => {
        jest.useFakeTimers();
        const wrapper = mount(<TestToggleComponent />);

        expect(wrapper.find('div[data-id="show-test-off"]').exists()).toBeTruthy();
        expect(wrapper.find('div[data-id="hide-test-on"]').exists()).toBeFalsy();
        expect(wrapper.find('div[data-id="show-test-on"]').exists()).toBeFalsy();

        wrapper.setProps({ isOn: true });
        expect(wrapper.find('div[data-id="hide-test-on"]').exists()).toBeTruthy();
        expect(wrapper.find('div[data-id="hide-test-off"]').exists()).toBeTruthy();

        wrapper.update();
        expect(wrapper.find('div[data-id="show-test-on"]').exists()).toBeTruthy();

        jest.runAllTimers();
        wrapper.update();
        expect(wrapper.find('div[data-id="show-test-off"]').exists()).toBeFalsy();
        expect(wrapper.find('div[data-id="hide-test-off"]').exists()).toBeFalsy();

        wrapper.setProps({ isOn: false });
        expect(wrapper.find('div[data-id="hide-test-on"]').exists()).toBeTruthy();
        expect(wrapper.find('div[data-id="hide-test-off"]').exists()).toBeTruthy();

        jest.runAllTimers();

        wrapper.update();
        expect(wrapper.find('div[data-id="hide-test-on"]').exists()).toBeFalsy();
        expect(wrapper.find('div[data-id="show-test-on"]').exists()).toBeFalsy();
    });
});
