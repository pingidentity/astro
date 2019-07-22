import React from 'react';
import { shallow } from 'enzyme';
import TextStyle from './TextStyle';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-textstyle',
};
const getComponent = props => shallow(<TextStyle {...defaultProps} {...props} />);

describe('TextStyle', () => {
    it('renders the TextStyle in the default state', () => {
        const wrapper = getComponent();
        const textstyle = wrapper.find(`span[data-id="${defaultProps['data-id']}"]`);

        expect(textstyle.exists()).toEqual(true);
    });
});
