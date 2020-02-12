import React from 'react';

import Branding from '../../src/components/Branding';
import Card from '../../src/components/Card';
import Heading from '../../src/components/Heading';
import Logo from '../../src/components/Logo';
import Page from '../../src/components/Page';
import Spinner from '../../src/components/Spinner';
import TextBlock from '../../src/components/TextBlock';


import '../../src/css/styles.scss';

export default {
    title: 'Templates/Pages/Signing You On',
};

const branding = {
    logo: '/ping-logo.svg',
    backgroundColor: '#ffffff',
};

export const Default = () => (
    <Page footer="© Copyright 2019 Ping Identity. All rights reserved.">
        <Branding {...branding} />
        <Card>
            <Logo src={branding && branding.logo} />
            <Heading>Signing you on...</Heading>
            <Spinner />
            <TextBlock size="small">You are being signed on.</TextBlock>
        </Card>
    </Page>
);
