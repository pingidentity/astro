import React from 'react';

import Card from '../../src/components/Card';
import Logo from '../../src/components/Logo';
import FormAside from '../../src/components/FormAside';
import TextBlock from '../../src/components/TextBlock';
import TextInput, { textInputTypes } from '../../src/components/TextInput';
import Form from '../../src/components/Form';
import Feedback from '../../src/components/Feedback';
import IconFeedback from '../../src/components/IconFeedback';
import Button from '../../src/components/Button';
import ModalMenu from '../../src/components/ModalMenu';

import '../../src/css/styles.scss';

export default {
    title: 'Templates/MFA/Flow',
};

export const Basic = () => (
    <Card>
        <Logo src="/ping-logo.svg" />
        <TextBlock>Enter the passcode you received to complete authentication.</TextBlock>
        <Form>
            <TextInput type={textInputTypes.PRIMARY} defaultValue="012345" />
            <FormAside>
                <TextBlock>SMS sent to:</TextBlock>
                <TextBlock size="large">+1 415-xxx-xx35</TextBlock>
                <Button label="Change" type={Button.ButtonTypes.TERTIARY} />
            </FormAside>
            <Button label="Sign On" type={Button.ButtonTypes.PRIMARY} />
            <Button label="Resend" />
        </Form>
    </Card>
);

export const InvalidPasscode = () => (
    <Card>
        <Logo src="/ping-logo.svg" />
        <Feedback type="error">Invalid passcode</Feedback>
        <TextBlock>Enter the passcode you received to complete authentication.</TextBlock>
        <Form>
            <TextInput type={textInputTypes.PRIMARY} defaultValue="012345" error />
            <FormAside>
                <TextBlock>SMS sent to:</TextBlock>
                <TextBlock size="large">+1 415-xxx-xx35</TextBlock>
                <Button label="Change" type={Button.ButtonTypes.TERTIARY} />
            </FormAside>
            <Button label="Sign On" type={Button.ButtonTypes.PRIMARY} />
            <Button label="Resend" />
        </Form>
    </Card>
);

export const Success = () => (
    <Card>
        <Logo src="/ping-logo.svg" />
        <IconFeedback type="success">Authenticated</IconFeedback>
    </Card>
);

export const TimedOut = () => (
    <Card>
        <Logo src="/ping-logo.svg" />
        <IconFeedback type="timeout">Timed Out</IconFeedback>
        <Button label="Back" />
    </Card>
);

export const Error = () => (
    <Card>
        <Logo src="/ping-logo.svg" />
        <IconFeedback type="error">Error</IconFeedback>
        <TextBlock size="small">
            Error message content will appear here when required to further
            explain the type of error and what can be done to resolve it, if
            there is a solution.
        </TextBlock>
        <Button label="Back" />
    </Card>
);

export const Blocked = () => (
    <Card>
        <Logo src="/ping-logo.svg" />
        <IconFeedback type="stopped">Blocked</IconFeedback>
        <TextBlock size="small">
            Blocked is a policy enforcement situation where the user isn’t
            meeting policy or has violated policy through repeated attempts
            at authentication and failing.
        </TextBlock>
    </Card>
);

export const Canceled = () => (
    <Card>
        <Logo src="/ping-logo.svg" />
        <IconFeedback type="stopped">Canceled</IconFeedback>
        <Button label="Back" />
    </Card>
);

export const Disabled = () => (
    <Card>
        <Logo src="/ping-logo.svg" />
        <IconFeedback type="disabled">Disabled</IconFeedback>
    </Card>
);

export const Complete = () => (
    <Card>
        <Logo src="/ping-logo.svg" />
        <TextBlock>Enter the passcode you received to complete authentication.</TextBlock>
        <Form>
            <TextInput type={textInputTypes.PRIMARY} defaultValue="012345" />
            <FormAside>
                <TextBlock>SMS sent to:</TextBlock>
                <TextBlock size="large">+1 415-xxx-xx35</TextBlock>
                <Button label="Change" type={Button.ButtonTypes.TERTIARY} />
            </FormAside>
            <Button label="Sign On" type={Button.ButtonTypes.PRIMARY} />
            <Button label="Resend" />
        </Form>
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
                {
                    id: 'mobile',
                    label: 'Mobile',
                    sublabel: '+972 3xx-xxx-x77',
                    icon: 'mobile',
                },
            ]}
        />
    </Card>
);
