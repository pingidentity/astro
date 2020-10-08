import React from 'react';
import ModalMenu, { StatelessModalMenu } from './ModalMenu';
import Icon from '@mdi/react';
import {
    mdiUsbFlashDrive, mdiFingerprint, mdiCellphoneIphone, mdiPhone,
    mdiMessageTextOutline, mdiEmailOutline,
} from '@mdi/js';

export default {
    title: 'Components/Inputs/ModalMenu',
    component: StatelessModalMenu,
};

export const Default = () => (
    <ModalMenu
        options={[
            {
                id: 'pingoneAuth',
                label: 'PingOne Authenticator',
                sublabel: 'Use PingOne to recieve push authentications.',
                icon: <Icon path={mdiCellphoneIphone} size={2} color="#3d454d" />,
            },
            {
                id: 'authApp',
                label: 'Authenticator App',
                sublabel: 'Use an authenticator app (like Google) to authenticate.',
                icon: <Icon path={mdiCellphoneIphone} size={2} color="#3d454d" />,
            },
            {
                id: 'email',
                label: 'Email',
                sublabel: 'Receive an email with a passcode to authenticate.',
                icon: <Icon path={mdiEmailOutline} size={2} color="#3d454d" />,
            },
            {
                id: 'text',
                label: 'Text Message',
                sublabel: 'Receive a text message with a passcode to authenticate.',
                icon: <Icon path={mdiMessageTextOutline} size={2} color="#3d454d" />,
            },
            {
                id: 'voice',
                label: 'Voice',
                sublabel: 'Receive a phone call with a passcode to authenticate.',
                icon: <Icon path={mdiPhone} size={2} color="#3d454d" />,
            },
            {
                id: 'biometrics',
                label: 'Biometrics',
                sublabel: 'Use a fingerprint or facial scan to authenticate.',
                icon: <Icon path={mdiFingerprint} size={2} color="#3d454d" />,
            },
            {
                id: 'securityKey',
                label: 'Security Key',
                sublabel: 'Use a security key to authenticate.',
                icon: <Icon path={mdiUsbFlashDrive} size={2} color="#3d454d" />,
            },
        ]}
    />
);
