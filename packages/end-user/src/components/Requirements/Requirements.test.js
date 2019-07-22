import React from 'react';
import { shallow } from 'enzyme';
import Requirements from './Requirements';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-requirements',
};
const getComponent = props => shallow(<Requirements {...defaultProps} {...props} />);

describe('Requirements', () => {
    it('renders the Requirements in the default state', () => {
        const wrapper = getComponent();
        const requirements = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(requirements.exists()).toEqual(true);
    });

    it('renders the Requirements in the list', () => {
        const wrapper = getComponent({
            requirements: [
                {
                    status: 'yes',
                    name: 'Foo',
                },
                {
                    status: 'no',
                    name: 'Bar',
                },
            ],
        });
        const requirements = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(requirements.children().length).toEqual(2);
    });
});
