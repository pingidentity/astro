import React from 'react';
import DeviceSelector, {
    DeviceSelectorDescription as Description,
    DeviceSelectorTitle as Title,
    DeviceSelectorOption,
} from './DeviceSelector';
import Icon from '@mdi/react';
import {
    mdiCellphoneIphone,
} from '@mdi/js';
import TextBlock from '../TextBlock';

export default {
    title: 'Components/Inputs/DeviceSelector',
    component: DeviceSelector,
};

export const Default = () => {
    return (
        <DeviceSelector>
            <DeviceSelectorOption
                icon={<Icon path={mdiCellphoneIphone} size="32px" color="#3d454d" />}
                controls={<TextBlock>Test</TextBlock>}
            >
                <Title>iPhone</Title>
                <Description>Test Description</Description>
            </DeviceSelectorOption>

            <DeviceSelectorOption
                icon={<Icon path={mdiCellphoneIphone} size="32px" color="#3d454d" />}
                controls={<TextBlock>Test</TextBlock>}
            >
                <Title>iPhone</Title>
                <Description>Test Description</Description>
            </DeviceSelectorOption>
        </DeviceSelector>
    );
};