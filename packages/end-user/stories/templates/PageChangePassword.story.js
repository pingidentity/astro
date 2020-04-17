import React from 'react';

import Branding from '../../src/components/Branding';
import Button from '../../src/components/Button';
import Card from '../../src/components/Card';
import Feedback from '../../src/components/Feedback';
import FloatLabelPasswordInput from '../../src/components/FloatLabelPasswordInput';
import Form from '../../src/components/Form';
import Heading from '../../src/components/Heading';
import Logo from '../../src/components/Logo';
import Page from '../../src/components/Page';
import Requirements from '../../src/components/Requirements';
import Tooltip from '../../src/components/Tooltip';

import logo from '../../src/images/ping-logo.svg';
import '../../src/css/styles.scss';

export default {
    title: 'Templates/Pages/Change Password',
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
            <Heading>Change Password</Heading>
            <Feedback type="alert">Your password has expired. Please create a new one.</Feedback>
            <Form>
                <FloatLabelPasswordInput label="Current Password" id="password" />
                <FloatLabelPasswordInput label="New Password" id="new">
                    <Tooltip>
                        <Heading level={4}>Password Must Have at Least:</Heading>
                        <Requirements
                            requirements={[
                                {
                                    name: '6 characters',
                                    status: 'no',
                                },
                                {
                                    name: '1 UPPERCASE letter',
                                    status: 'yes',
                                },
                                {
                                    name: '1 lowercase letter',
                                    status: 'yes',
                                },
                                {
                                    name: '1 number (0-9)',
                                    status: 'no',
                                },
                            ]}
                        />
                    </Tooltip>
                </FloatLabelPasswordInput>
                <FloatLabelPasswordInput label="Verify New Password" id="verify" />
                <Button label="Save" type={Button.ButtonTypes.PRIMARY} disabled />
            </Form>
        </Card>
    </Page>
);
