import React from 'react';

import Card, { CardMessage, messageTypes } from '../../src/components/Card';
import Logo from '../../src/components/Logo';
import Button from '../../src/components/Button';
import SocialButton from '../../src/components/SocialButton';
import Form from '../../src/components/Form';
import FloatLabelTextInput from '../../src/components/FloatLabelTextInput';
import FloatLabelPasswordInput from '../../src/components/FloatLabelPasswordInput';
import Checkbox from '../../src/components/Checkbox';
import Feedback from '../../src/components/Feedback';
import Heading from '../../src/components/Heading';
import TextBlock, { alignments } from '../../src/components/TextBlock';
import IconFeedback from '../../src/components/IconFeedback';
import TextStyle from '../../src/components/TextStyle';
import Tooltip from '../../src/components/Tooltip';
import Requirements from '../../src/components/Requirements';
import ButtonSet from '../../src/components/ButtonSet';
import Stack from '../../src/components/Stack';

// Shared
import FlexRow, { spacingOptions, flexDirectionOptions, justifyOptions, alignments as flexRowAlignments } from '../../src/components/shared/FlexRow.js';
import Padding, { sizes } from '../../src/components/shared/Padding.js';
import Link from '../../src/components/shared/Link.js';
import TileSelector from '../../src/components/shared/TileSelector.js';
import { UserInfo, imageSizes } from '../../src/components/shared/UserNav';

import logo from '../../src/images/ping-logo.svg';
import '../../src/css/styles.scss';

export default {
    title: 'Templates/Layouts/Signin',
};

export const SocialProviders = () => (
    <Card
        header={(
            <CardMessage type={messageTypes.critical}>
                Your trial has expired. Please contact sales to purchase a license.
            </CardMessage>
        )}
    >
        <Logo src={logo} />
        <Form>
            <FloatLabelTextInput label="Username" id="username6" />
            <FloatLabelPasswordInput label="Password" id="password2" />
            <div><Checkbox label="Remember me" /></div>
            <Button label="Sign On" type={Button.ButtonTypes.PRIMARY} />
            <SocialButton label="Login with Facebook" branding={SocialButton.BrandTypes.FACEBOOK} />
            <SocialButton label="Login with Apple" branding={SocialButton.BrandTypes.APPLE} />
            <SocialButton label="Login with Google" branding={SocialButton.BrandTypes.GOOGLE} />
            <SocialButton label="Login with Amazon" branding={SocialButton.BrandTypes.AMAZON} />
            <SocialButton label="Login with Instagram" branding={SocialButton.BrandTypes.INSTAGRAM} />
            <SocialButton label="Login with LinkedIn" branding={SocialButton.BrandTypes.LINKEDIN} />
            <SocialButton label="Login with Microsoft" branding={SocialButton.BrandTypes.MICROSOFT} />
            <SocialButton label="Login with Twitter" branding={SocialButton.BrandTypes.TWITTER} />
        </Form>
    </Card>
);

export const SigninError = () => (
    <Card>
        <Logo src={logo} />
        <Feedback type="error">Cannot sign on. There is a problem with either your username or password.</Feedback>
        <Form>
            <FloatLabelTextInput label="Username" id="username7" />
            <FloatLabelPasswordInput label="Password" id="password3" />
            <div><Checkbox label="Remember me" /></div>
            <Button label="Sign On" type={Button.ButtonTypes.PRIMARY} />
        </Form>
    </Card>
);

export const OnlyPassword = () => (
    <Card>
        <Logo src={logo} />
        <Heading>Hello Cindy Lou Who,</Heading>
        <TextBlock>Please enter your password below:</TextBlock>
        <Form>
            <FloatLabelPasswordInput label="Password" id="password5" />
            <Button label="Sign On" type={Button.ButtonTypes.PRIMARY} disabled />
        </Form>
        <TextBlock size="small">Not Cindy Lou? <a href="#">Switch Accounts</a></TextBlock>
    </Card>
);

export const TooManyAttempts = () => (
    <Card>
        <Logo src={logo} />
        <Feedback type="error">Too many unsuccessful sign-on attempts. Please reset your password.</Feedback>
        <Form>
            <Button label="Reset Password" type={Button.ButtonTypes.PRIMARY} />
        </Form>
        <TextBlock size="small">No account? <a href="#">Register Now</a></TextBlock>
    </Card>
);

export const Error = () => (
    <Card>
        <Logo src={logo} />
        <IconFeedback type="error">Error</IconFeedback>
        <TextBlock size="small">
            <p>The actor attempting to perform the request is not authorized.</p>
            <p><TextStyle muted>
                id: 2e0b1d51-3409-46dd-ac5e-d49cf5213de4<br />
                code: ACCESS_FAILED
            </TextStyle></p>
        </TextBlock>
    </Card>
);

export const SignedOff = () => (
    <Card>
        <Logo src={logo} />
        <IconFeedback type="success">Signed Off</IconFeedback>
        <Button label="Sign On" />
    </Card>
);

export const ChangePassword = () => (
    <Card>
        <Logo src={logo} />
        <Heading>Change Password</Heading>
        <Feedback type="alert">Your password has expired. Please create a new one.</Feedback>
        <Form>
            <FloatLabelPasswordInput label="Current Password" id="password" />
            <FloatLabelPasswordInput label="New Password" id="new">
                <Tooltip>
                    <Heading level={4}>Minimum Password Requirements:</Heading>
                    <Requirements
                        requirements={[
                            {
                                name: '6 characters',
                                status: 'no',
                            },
                            {
                                name: 'At least 1 of ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
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
                            {
                                name: `Here is a very long requirement that hopefully won't come into play much
                                    but let's still make sure we support having this much content show.`,
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
);

export const RegisterSuccess = () => (
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

export const SignOn = () => (
    <Card>
        <Logo src={logo} />
        <Form>
            <FloatLabelTextInput label="Username" id="username9" />
            <FloatLabelPasswordInput label="Password" id="password6" />
            <Button label="Sign On" type={Button.ButtonTypes.PRIMARY} disabled />
        </Form>
        <TextBlock size="small">Trouble signing on? <a href="#">Reset password</a></TextBlock>
    </Card>
);

export const CreateProfile = () => (
    <Card>
        <Logo src={logo} />
        <Heading>Create Your Profile</Heading>
        <TextBlock size="small">Enter the required information below.</TextBlock>
        <Form spacing="large" >
            <Stack size="small">
                <FloatLabelTextInput label="First Name" id="firstname1" />
                <FloatLabelTextInput label="Last Name" id="lastname1" />
            </Stack>
            <Stack size="small">
                <FloatLabelTextInput label="Username" id="username13" />
                <FloatLabelTextInput label="Email Address" id="email1" />
            </Stack>
            <Stack size="small">
                <FloatLabelPasswordInput label="Password" id="newPwd6" />
                <FloatLabelPasswordInput label="Verify New Password" id="verifyPwd6" />
            </Stack>
            <Button label="Save" type={Button.ButtonTypes.PRIMARY} disabled />
        </Form>
        <TextBlock size="small">Already have an account? <a href="#">Sign in</a></TextBlock>
    </Card>
);

export const UserSelect = () => (
    <Card>
        <Logo src="./ping-logo.svg" />
        <TextBlock> Please select the account to login with:</TextBlock>
        <FlexRow spacing={spacingOptions.MD} alignment={flexRowAlignments.CENTER} flexDirection={flexDirectionOptions.COLUMN}>
            <TileSelector.TileButton type="side-icon">
                <FlexRow spacing={spacingOptions.MD} alignment={flexRowAlignments.CENTER}>
                    <FlexRow justify={justifyOptions.CENTER} alignment={flexRowAlignments.CENTER}>
                        <UserInfo
                            imageSrc="https://placedog.net/200/200"
                            imageSize={imageSizes.MEDIUM}
                        />
                    </FlexRow>
                    <FlexRow flexDirection={flexDirectionOptions.COLUMN} style={{ flex: 1 }}>
                        <TextBlock inline alignment={alignments.LEFT} spacing="small">Username:</TextBlock>
                        <TextBlock inline alignment={alignments.LEFT} spacing="small">Email:</TextBlock>
                        <TextBlock inline alignment={alignments.LEFT} spacing="small">Last Login:</TextBlock>
                    </FlexRow>
                    <FlexRow flexDirection={flexDirectionOptions.COLUMN} style={{ flex: 1 }} justify={justifyOptions.SPACEEVENLY}>
                        <TextBlock inline alignment={alignments.LEFT} spacing="small">da****</TextBlock>
                        <TextBlock inline alignment={alignments.LEFT} spacing="small">da**@gmail.com</TextBlock>
                        <TextBlock inline alignment={alignments.LEFT} spacing="small">Today, 9:48</TextBlock>
                    </FlexRow>
                </FlexRow>
            </TileSelector.TileButton>
            <TileSelector.TileButton type="side-icon">
                <FlexRow spacing={spacingOptions.MD} alignment={flexRowAlignments.CENTER}>
                    <FlexRow justify={justifyOptions.CENTER} alignment={flexRowAlignments.CENTER}>
                        <UserInfo
                            imageSize={imageSizes.MEDIUM}
                        />
                    </FlexRow>
                    <FlexRow flexDirection={flexDirectionOptions.COLUMN} style={{ flex: 1 }}>
                        <TextBlock inline alignment={alignments.LEFT} spacing="small">Username:</TextBlock>
                        <TextBlock inline alignment={alignments.LEFT} spacing="small">Email:</TextBlock>
                        <TextBlock inline alignment={alignments.LEFT} spacing="small">Last Login:</TextBlock>
                    </FlexRow>
                    <FlexRow flexDirection={flexDirectionOptions.COLUMN} style={{ flex: 1 }} justify={justifyOptions.SPACEEVENLY}>
                        <TextBlock inline alignment={alignments.LEFT} spacing="small">da****</TextBlock>
                        <TextBlock inline alignment={alignments.LEFT} spacing="small">da**@gmail.com</TextBlock>
                        <TextBlock inline alignment={alignments.LEFT} spacing="small">Today, 9:48</TextBlock>
                    </FlexRow>
                </FlexRow>
            </TileSelector.TileButton>
            <TileSelector.TileButton type="side-icon">
                <FlexRow spacing={spacingOptions.MD} alignment={flexRowAlignments.CENTER}>
                    <FlexRow justify={justifyOptions.CENTER} alignment={flexRowAlignments.CENTER}>
                        <UserInfo
                            imageSrc="https://placedog.net/200/200"
                            imageSize={imageSizes.MEDIUM}
                        />
                    </FlexRow>
                    <FlexRow flexDirection={flexDirectionOptions.COLUMN} style={{ flex: 1 }}>
                        <TextBlock inline alignment={alignments.LEFT} spacing="small">Username:</TextBlock>
                        <TextBlock inline alignment={alignments.LEFT} spacing="small">Email:</TextBlock>
                        <TextBlock inline alignment={alignments.LEFT} spacing="small">Last Login:</TextBlock>
                    </FlexRow>
                    <FlexRow flexDirection={flexDirectionOptions.COLUMN} style={{ flex: 1 }} justify={justifyOptions.SPACEEVENLY}>
                        <TextBlock inline alignment={alignments.LEFT} spacing="small">da****</TextBlock>
                        <TextBlock inline alignment={alignments.LEFT} spacing="small">da**@gmail.com</TextBlock>
                        <TextBlock inline alignment={alignments.LEFT} spacing="small">Today, 9:48</TextBlock>
                    </FlexRow>
                </FlexRow>
            </TileSelector.TileButton>
            <FlexRow justify={justifyOptions.END} >
                <Link>See 6 more accounts</Link>
            </FlexRow>
            <Padding top={sizes.SM} />
            <TextBlock>or</TextBlock>
            <Button label="Create New Account" type={Button.ButtonTypes.PRIMARY} />
            <FlexRow justify={justifyOptions.CENTER} >
                <Link>Already have an account? Sign on.</Link>
            </FlexRow>
        </FlexRow>
    </Card>
);
