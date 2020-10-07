import React from 'react';
import { mount } from 'enzyme';
import { matchers } from 'jest-emotion';
import HelpHint from './HelpHint';

jest.mock('@tippyjs/react/headless');

// Add the custom matchers provided by 'jest-emotion'
expect.extend(matchers);

const defaultProps = {
    content: <div data-id="test-bubble" />,
    children: 'Test',
};
const getComponent = props => mount(<HelpHint {...defaultProps} {...props} />);

describe('HelpHint', () => {
    it('renders the help hint in the default state', () => {
        const wrapper = getComponent();
        const bubble = wrapper.find('div[data-id="test-bubble"]');
        const spans = wrapper.find('span');

        expect(bubble.exists()).toEqual(true);
        expect(spans.length).toEqual(2);
    });

    it('changes the help hint based on whether it is showing', () => {
        jest.useFakeTimers();
        const callback = jest.fn();
        global.requestAnimationFrame = callback; // eslint-disable-line
        // this simulation works only with the mocked Tippy
        const wrapper = getComponent({
            helpHintProps: ({ isShowing }) => ({ 'data-id': isShowing ? 'showing-hint' : 'hidden-hint' }),
        });
        const reference = wrapper.find('span[data-id="test-reference"]');

        let showing = wrapper.find('div[data-id="showing-hint"]');
        let hidden = wrapper.find('div[data-id="hidden-hint"]');
        expect(showing.exists()).toBeFalsy();
        expect(hidden.exists()).toBeTruthy();

        reference.simulate('mouseover');

        showing = wrapper.find('div[data-id="showing-hint"]');
        hidden = wrapper.find('div[data-id="hidden-hint"]');
        expect(showing.exists()).toBeTruthy();
        expect(hidden.exists()).toBeFalsy();

        reference.simulate('mouseout');
        jest.runAllTimers();
        expect(callback).toBeCalled();

        showing = wrapper.find('div[data-id="showing-hint"]');
        hidden = wrapper.find('div[data-id="hidden-hint"]');
        expect(showing.exists()).toBeFalsy();
        expect(hidden.exists()).toBeTruthy();
    });

    it('renders the help hint without a wrapper', () => {
        const wrapper = getComponent({
            hasNoWrapper: true,
            children: <div>Test</div>,
        });
        const spans = wrapper.find('span');

        expect(spans.length).toEqual(1);
    });
});
