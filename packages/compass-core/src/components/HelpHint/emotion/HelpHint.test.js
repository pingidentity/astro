import React from 'react';
import { mount } from 'enzyme';
import HelpHint from './HelpHint';

jest.mock('@tippyjs/react/headless');

const defaultProps = {
    content: <div data-id="test-bubble" />,
    children: 'Test',
};
const getComponent = props => mount(<HelpHint {...defaultProps} {...props} />);

describe('HelpHint (Emotion)', () => {
    it('renders the help hint in the default state', () => {
        const wrapper = getComponent();
        const bubble = wrapper.find('div[data-id="test-bubble"]');
        const spans = wrapper.find('span');

        expect(bubble.exists()).toEqual(true);
        expect(spans.length).toEqual(2);
    });

    it('renders the help hint with a border', () => {
        const wrapper = getComponent({ borderColor: 'red' });
        const hint = wrapper.find('div[data-id="test-rendered"] div div').first();

        expect(hint).toHaveStyleRule('border-color', 'red');
    });

    it('changes the css for the help hint when it is showing', () => {
        const wrapper = getComponent();
        const reference = wrapper.find('span[data-id="test-reference"]');

        reference.simulate('mouseover');

        const hint = wrapper.find('div[data-id="test-rendered"] div').first();

        expect(hint).toHaveStyleRule('opacity', '1');
    });
});
