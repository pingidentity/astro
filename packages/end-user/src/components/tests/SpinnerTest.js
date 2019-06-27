
import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../Spinner';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-spinner',
};
const getComponent = props => shallow(<Spinner {...defaultProps} {...props} />);

describe('Spinner', () => {
    it('renders the Spinner in the default state', () => {
        const wrapper = getComponent();
        const spinner = wrapper.find(`img[data-id="${defaultProps['data-id']}"]`);

        expect(spinner.exists()).toEqual(true);
    });
});
