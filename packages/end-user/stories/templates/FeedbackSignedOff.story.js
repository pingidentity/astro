import React from 'react';

import Card from '../../src/components/Card';
import Logo from '../../src/components/Logo';
import IconFeedback from '../../src/components/IconFeedback';
import Button from '../../src/components/Button';

import '../../src/css/styles.scss';

export default {
    title: 'Templates/Feedback/Signed Off',
};

export const Default = () => (
    <Card>
        <Logo src="/ping-logo.svg" />
        <IconFeedback type="success">Signed Off</IconFeedback>
        <Button label="Sign On" />
    </Card>
);
