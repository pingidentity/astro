import React from 'react';
import { mount } from 'enzyme';
import AutoGrid from './AutoGrid';

const defaultProps = {
    'data-id': 'test-grid',
    children: [
        <div key="1">One</div>,
        <div key="2">Two</div>,
        <div key="3">Three</div>,
    ],
    minWidth: 200,
};

const getComponent = props => mount(<AutoGrid {...defaultProps} {...props} />);

describe('AutoGrid', () => {
    it('renders a grid', () => {
        const wrapper = getComponent();

        expect(wrapper.find('div[data-id="test-grid"]').exists()).toBeTruthy();
    });
});
