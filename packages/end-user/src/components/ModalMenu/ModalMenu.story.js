import React from 'react';
import ModalMenu from './ModalMenu';

export default {
    title: 'Components/Inputs/ModalMenu',
    component: ModalMenu,
};

export const Default = () => (
    <ModalMenu
        options={[
            {
                id: 'sms',
                label: 'SMS',
                sublabel: '+972 3xx-xxx-x03',
                icon: 'sms',
                selected: true,
            },
            {
                id: 'email',
                label: 'Email',
                sublabel: 'adxxxx@pingidentity.com',
                icon: 'email',
            },
        ]}
    />
);
