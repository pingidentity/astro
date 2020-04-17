import React from 'react';

import Branding from '../../src/components/Branding';
import Card from '../../src/components/Card';
import Checkbox from '../../src/components/Checkbox';
import Button from '../../src/components/Button';
import Logo from '../../src/components/Logo';
import Page from '../../src/components/Page';
import FloatLabelTextInput from '../../src/components/FloatLabelTextInput';
import FloatLabelPasswordInput from '../../src/components/FloatLabelPasswordInput';
import Form from '../../src/components/Form';

import logo from '../../src/images/ping-logo.svg';
import '../../src/css/styles.scss';

export default {
    title: 'Templates/Pages/Sign On',
};

const branding = {
    logo,
    backgroundColor: '#ffffff',
};

export const Default = () => (
    <Page footer="© Copyright 2019 Ping Identity. All rights reserved.">
        <Branding {...branding} />
        <Card>
            <Logo src={branding && branding.logo} />
            <Form>
                <FloatLabelTextInput label="Username" id="username" />
                <FloatLabelPasswordInput label="Password" id="password" />
                <div>
                    <Checkbox label="Remember me" />
                </div>
                <Button label="Sign On" type={Button.ButtonTypes.PRIMARY} />
            </Form>
        </Card>
    </Page>
);
