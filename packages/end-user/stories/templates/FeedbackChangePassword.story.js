import React from 'react';

import Card from '../../src/components/Card';
import Logo from '../../src/components/Logo';
import Heading from '../../src/components/Heading';
import Button from '../../src/components/Button';
import Form from '../../src/components/Form';
import Tooltip from '../../src/components/Tooltip';
import Requirements from '../../src/components/Requirements';
import FloatLabelPasswordInput from '../../src/components/FloatLabelPasswordInput';
import IconFeedback from '../../src/components/IconFeedback';

import logo from '../../src/images/ping-logo.svg';
import '../../src/css/styles.scss';

export default {
    title: 'Templates/Feedback/Change Password',
};

export const Basic = () => (
    <Card>
        <Logo src={logo} />
        <Heading>Change Password</Heading>
        <Form>
            <FloatLabelPasswordInput label="New Password" id="newPwD4" defaultValue="eightPassword" success>
                <Tooltip>
                    <Heading level={4}>Minimum Password Requirements:</Heading>
                    <Requirements
                        requirements={[
                            {
                                name: '8 characters',
                                status: 'yes',
                            },
                            {
                                name: 'At least 1 special character',
                                status: 'no',
                            },
                            {
                                name: '1 UPPERCASE Character',
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
            <FloatLabelPasswordInput label="Verify New Password" id="verifyPwd4" defaultValue="eightPassword" success />
            <Button label="Save" type={Button.ButtonTypes.PRIMARY} />
        </Form>
    </Card>
);

export const Success = () => (
    <Card>
        <Logo src={logo} />
        <IconFeedback type="success" medium>Password Changed</IconFeedback>
        <Button label="Continue" type={Button.ButtonTypes.SECONDARY} />
    </Card>
);
