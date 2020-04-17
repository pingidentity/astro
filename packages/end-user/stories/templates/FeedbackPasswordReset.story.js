import React from 'react';

import Card from '../../src/components/Card';
import Logo from '../../src/components/Logo';
import Heading from '../../src/components/Heading';
import Button from '../../src/components/Button';
import TextBlock from '../../src/components/TextBlock';
import Form from '../../src/components/Form';
import Feedback from '../../src/components/Feedback';
import FloatLabelTextInput from '../../src/components/FloatLabelTextInput';

import logo from '../../src/images/ping-logo.svg';
import '../../src/css/styles.scss';

export default {
    title: 'Templates/Feedback/Password Reset',
};

export const Basic = () => (
    <Card>
        <Logo src={logo} />
        <Heading>
            Reset Your Password
        </Heading>
        <TextBlock>
            Enter your username, and we'll send you a link to create a new password.
        </TextBlock>
        <Form margin="small">
            <FloatLabelTextInput label="Username" id="username10" />
            <TextBlock size="small-right"><a href="#">Have a reset code?</a></TextBlock>
            <Button label="Reset" type={Button.ButtonTypes.PRIMARY} disabled />
        </Form>
    </Card>
);

export const ResetCode = () => (
    <Card>
        <Logo src={logo} />
        <Heading>
            Reset Your Password
        </Heading>
        <TextBlock>
            A password reset code has been sent. Enter your reset code below.
        </TextBlock>
        <Form>
            <FloatLabelTextInput label="Reset Code" />
            <Button label="Reset" type={Button.ButtonTypes.PRIMARY} disabled />
        </Form>
    </Card>
);

export const ResetCodeExpired = () => (
    <Card>
        <Logo src={logo} />
        <Heading>
            Reset Your Password
        </Heading>
        <Feedback type="error">
            The reset code you entered has expired.
        </Feedback>
        <Form>
            <FloatLabelTextInput label="Username" id="username12" defaultValue="IronMan@gmail.com" />
            <Button label="Send New Code" type={Button.ButtonTypes.PRIMARY} />
        </Form>
    </Card>
);
