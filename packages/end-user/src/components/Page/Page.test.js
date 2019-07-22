
import React from 'react';
import { shallow } from 'enzyme';
import Page from './Page';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-page',
};
const getComponent = props => shallow(<Page {...defaultProps} {...props} />);

describe('Page', () => {
    it('renders the Page in the default state', () => {
        const wrapper = getComponent();
        const page = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(page.exists()).toEqual(true);
    });

    it('renders the Page footer if provided', () => {
        const wrapper = getComponent({
            footer: (<div><p>Test Footer</p></div>),
        });
        const page = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(page.exists()).toEqual(true);
        expect(wrapper.find(`div[data-id="${defaultProps['data-id']}"] .page__footer`).exists()).toEqual(true);
    });
});
