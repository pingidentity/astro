import React from 'react';
import { shallow } from 'enzyme';
import Feedback from './Feedback';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-feedback',
};
const getComponent = props => shallow(<Feedback {...defaultProps} {...props} />);

describe('Feedback', () => {
    it('renders the Feedback in the default state', () => {
        const wrapper = getComponent();
        const feedback = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(feedback.exists()).toEqual(true);
    });

    it('renders the Feedback with the error state', () => {
        const wrapper = getComponent({
            type: 'error',
        });
        const feedback = wrapper.find('.feedback--error');

        expect(feedback.exists()).toEqual(true);
    });

    it('renders the Feedback with the alert state', () => {
        const wrapper = getComponent({
            type: 'alert',
        });
        const feedback = wrapper.find('.feedback--alert');

        expect(feedback.exists()).toEqual(true);
    });

    it('renders the Feedback with the success state', () => {
        const wrapper = getComponent({
            type: 'success',
        });
        const feedback = wrapper.find('.feedback--success');

        expect(feedback.exists()).toEqual(true);
    });
});
