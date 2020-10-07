import React from 'react';
import { mount } from 'enzyme';
import { matchers } from 'jest-emotion';
import HelpHint from '.';

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
});
