import React from 'react';
import { mount } from 'enzyme';
import Multivalues from './Multivalues';

window.__DEV__ = true;

const defaultProps = {};
const getComponent = (props) =>
    mount(<Multivalues {...defaultProps} {...props} />);

describe('Multivalues', () => {
    it('renders Multivalues in the default state', () => {
        const wrapper = getComponent();
        const multivalues = wrapper.find('Select');

        expect(multivalues.exists()).toEqual(true);
    });
});
