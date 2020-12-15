import React from 'react';
import { shallow } from 'enzyme';
import DeviceSelector, { DeviceSelectorOption } from './DeviceSelector';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-deviceselector',
};
const getComponent = props => shallow(<DeviceSelector {...defaultProps} {...props} />);

describe('DeviceSelector', () => {
    it('renders the DeviceSelector in the default state', () => {
        const wrapper = getComponent();
        const deviceselector = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(deviceselector.exists()).toEqual(true);
    });
    it('renders a DeviceSelector row', () => {
        const wrapper = getComponent({
            children: (
                <DeviceSelectorOption>
                    Test content...
                </DeviceSelectorOption>
            ),
        });
        const deviceselector = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);
        expect(deviceselector.exists()).toEqual(true);
        expect(deviceselector.find(DeviceSelectorOption).exists()).toEqual(true);
    });
});
