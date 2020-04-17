import React from 'react';

import Card from '../../src/components/Card';
import Logo from '../../src/components/Logo';
import IconFeedback from '../../src/components/IconFeedback';
import TextBlock from '../../src/components/TextBlock';
import Button from '../../src/components/Button';
import ButtonSet from '../../src/components/ButtonSet';
import Heading from '../../src/components/Heading';
import Form from '../../src/components/Form';
import TextStyle from '../../src/components/TextStyle';

import logo from '../../src/images/ping-logo.svg';
import '../../src/css/styles.scss';

export default {
    title: 'Templates/Feedback/Register',
};

export const Basic = () => (
    <Card>
        <Logo src={logo} />
        <IconFeedback type="success" small>Registered</IconFeedback>
        <TextBlock>
            Now that you&apos;ve registered, you can either continue on or edit your profile.
        </TextBlock>
        <ButtonSet>
            <Button label="Edit Profile" />
            <Button label="Continue" type={Button.ButtonTypes.PRIMARY} />
        </ButtonSet>
    </Card>
);

export const Email = () => (
    <Card>
        <Logo src={logo} />
        <Heading>Thank You!</Heading>
        <TextBlock>
            We&apos;ve sent a verification email to IronMan1@ping.com.
            Please verify you email to finish setting up your PingOne account.
        </TextBlock>
        <TextBlock size="small">Didn&apos;t receive an email? <a href="#">Resend</a></TextBlock>
    </Card>
);

export const Success = () => (
    <Card>
        <Logo src={logo} />
        <IconFeedback type="success" small>You&apos;re Registered</IconFeedback>
        <TextBlock spacing="xxlarge">Your account is setup and ready to go.</TextBlock>
        <Button label="Sign On" type={Button.ButtonTypes.PRIMARY} />
    </Card>
);

export const Error = () => (
    <Card>
        <Logo src={logo} />
        <IconFeedback type="error" small>Something Went Wrong</IconFeedback>
        <TextBlock>An unknown error is preventing us from signing you on.</TextBlock>
        <Form><Button label="Try Again" /></Form>
        <TextBlock size="small">
            <TextStyle muted>
                Authentication flow does not exist: 48f041b4-9fb0-4532-bae6-3bf0241419de
            </TextStyle>
        </TextBlock>
    </Card>
);

export const Expired = () => (
    <Card error>
        <Logo src={logo} />
        <IconFeedback type="hourGlass" bold>Trial Expired</IconFeedback>
        <TextBlock size="large">To extend your trial, please contact us.</TextBlock>
        <Button label="Contact Us" type={Button.ButtonTypes.PRIMARY} />
    </Card>
);

export const Inactive = () => (
    <Card error>
        <Logo src={logo} />
        <IconFeedback type="safe" bold>Account Inactive</IconFeedback>
        <TextBlock size="large">This service is no longer active.</TextBlock>
    </Card>
);
