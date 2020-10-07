import React from 'react';
import { mount } from 'enzyme';

import Spinner from './Spinner';

const defaultProps = {
    'data-id': 'test-spinner',
};
const getComponent = props => mount(<Spinner {...defaultProps} {...props} />);

describe('Spinner', () => {
    it('renders the spinner in the default state', () => {
        const wrapper = getComponent({});
        const spinner = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(spinner.exists()).toEqual(true);
    });

    it('renders a centered spinner', () => {
        const wrapper = getComponent({ isCentered: true });
        const spinner = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(spinner).toHaveStyleRule('top', '50%');
    });
});
