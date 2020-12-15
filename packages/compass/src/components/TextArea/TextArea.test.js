import React from 'react';
import { mount } from 'enzyme';
import TextArea from './TextArea';

const defaultProps = {
    'data-id': 'test-textarea',
};
const getComponent = props => mount(<TextArea {...defaultProps} {...props} />);

describe('TextArea', () => {
    it('renders the TextArea in the default state', () => {
        const wrapper = getComponent({});
        const textarea = wrapper.find(`span[data-id="${defaultProps['data-id']}"]`);

        expect(textarea.exists()).toEqual(true);
    });

    it('fires the onValueChange callback', () => {
        const callback = jest.fn();
        const wrapper = getComponent({ onValueChange: value => callback(value) });
        const textarea = wrapper.find(`span[data-id="${defaultProps['data-id']}"] textarea`);

        expect(callback).not.toBeCalled();
        textarea.simulate('change', { target: { value: 'newvalue' } });
        expect(callback).toBeCalledWith('newvalue');
    });
});
