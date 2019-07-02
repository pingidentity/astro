
import React from 'react';
import { shallow } from 'enzyme';
import Heading from '../Heading';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-heading',
};
const getComponent = props => shallow(<Heading {...defaultProps} {...props} />);

describe('Heading', () => {
    it('renders the Heading in the default state', () => {
        const wrapper = getComponent();
        const heading = wrapper.find(`h1[data-id="${defaultProps['data-id']}"]`);

        expect(heading.exists()).toEqual(true);
    });

    it('renders the Heading in the H4 state', () => {
        const wrapper = getComponent({
            level: 4,
        });
        const heading = wrapper.find(`h4[data-id="${defaultProps['data-id']}"]`);

        expect(heading.exists()).toEqual(true);
    });
});
