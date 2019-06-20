import React from 'react';
import { shallow } from 'enzyme';
import Card from '../Card';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-Card',
};
const getComponent = props => shallow(<Card {...defaultProps} {...props} />);

describe('Card', () => {
    it('renders the Card in the default state', () => {
        const wrapper = getComponent();
        const card = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(card.exists()).toEqual(true);
    });
});
