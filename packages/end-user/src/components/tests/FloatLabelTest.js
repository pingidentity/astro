import React from 'react';
import { shallow } from 'enzyme';
import FloatLabel from '../FloatLabel';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-floatlabel',
};
const getComponent = props => shallow(<FloatLabel {...defaultProps} {...props} />);

describe('FloatLabel', () => {
    it('renders the FloatLabel in the default state', () => {
        const wrapper = getComponent();
        const floatlabel = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(floatlabel.exists()).toEqual(true);
    });

    it('displays the proper label text', () => {
        const wrapper = getComponent({
            label: 'Foo',
        });
        const floatlabel = wrapper.find('.float-label__label');

        expect(floatlabel.text()).toEqual('Foo');
    });
});
