import React from 'react';
import { shallow } from 'enzyme';
import Tooltip from '../Tooltip';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-tooltip',
};
const getComponent = props => shallow(<Tooltip {...defaultProps} {...props} />);

describe('Tooltip', () => {
    it('renders the Tooltip in the default state', () => {
        const wrapper = getComponent();
        const tooltip = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(tooltip.exists()).toEqual(true);
    });
});
