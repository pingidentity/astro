import React from 'react';
import ModalMenu, { StatelessModalMenu } from './ModalMenu';

export default {
    title: 'Components/Inputs/ModalMenu',
    component: StatelessModalMenu,
};

export const Default = () => (
    <ModalMenu
        options={[
            {
                id: 'first',
                label: 'SMS',
                sublabel: '+972 3xx-xxx-x03',
                icon: 'mobile',
                selected: true,
            },
            {
                id: 'second',
                label: 'Email',
                sublabel: 'adxxxx@pingidentity.com',
                icon: 'email',
            },
        ]}
    />
);
