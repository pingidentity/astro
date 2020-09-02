import React from 'react';

import Preview, { devices } from './Preview';
import Card from '../Card';
import Logo from '../Logo';
import Form from '../Form';
import FloatLabelTextInput from '../FloatLabelTextInput';
import FloatLabelPasswordInput from '../FloatLabelPasswordInput';
import FlexRow, {
    spacingOptions,
    flexDirectionOptions,
    justifyOptions,
    alignments as flexRowAlignments,
} from '../shared/FlexRow.js';
import TileSelector from '../shared/TileSelector.js';
import { UserInfo, imageSizes } from '../shared/UserNav.js';
import Button from '../Button';
import TextBlock, { alignments } from '../TextBlock';
import Heading from '../Heading';
import Padding, { sizes } from '../shared/Padding';
import Feedback from '../Feedback';
import SocialButton from '../SocialButton';

import logo from '../../images/ping-logo.png';

export default {
    title: 'Components/Display/Preview',
    component: Preview,
};

const themes = [
    'https://assets.pingone.com/ux/branding-themes/0.16.0/default/default.css',
    'https://assets.pingone.com/ux/branding-themes/0.16.0/split/split.css',
    'https://assets.pingone.com/ux/branding-themes/0.16.0/slate/slate.css',
    'https://assets.pingone.com/ux/branding-themes/0.16.0/mural/mural.css',
    'https://assets.pingone.com/ux/branding-themes/0.16.0/focus/focus.css',
];

export const Default = () =>
    themes.map(theme => (
        <div
            key={theme}
        >
            <div
                style={{
                    height: '500px',
                    width: '100%',
                }}
            >
                <Preview
                    themeStyleSheet={theme}
                    device={devices.MOBILE}
                >
                    { /* Login */ }
                    <div className="page" style={{ width: '100%', height: '100%' }}>
                        <Card>
                            <div className="flex-container">
                                <div className="branding-template-logo-container">
                                    <Logo className="branding-template-logo" src={logo} />
                                </div>
                                <div className="branding-template-form-container">
                                    <Form classname="branding-template-form">
                                        <FloatLabelTextInput inputClassName="branding-template-text-input" label="Username" id="username1" />
                                        <FloatLabelPasswordInput inputClassName="branding-template-password-input" label="Password" id="password1" />
                                        <Padding top={sizes.SM} />
                                        <Button label="Sign On" className="branding-template-primary-button" type={Button.ButtonTypes.PRIMARY} />
                                        <TextBlock className="branding-template-link-container"><a href="#" className="branding-template-link-text">Forgot Password</a></TextBlock>
                                        <TextBlock className="branding-template-link-container"><a href="#" className="branding-template-link-text">No Account? Register Now!</a></TextBlock>
                                    </Form>
                                </div>
                            </div>
                        </Card>
                    </div>
                </Preview>
            </div>

            <Padding top={sizes.XL} />

            <Preview
                themeStyleSheet={theme}
            >
                { /* Recover */ }
                <div className="page" style={{ width: '100%', height: '100%' }}>
                    <Card>
                        <div className="flex-container">
                            <div className="branding-template-logo-container">
                                <Logo className="branding-template-logo" src={logo} />
                            </div>
                            <div className="branding-template-form-container">
                                <Heading className="branding-template-heading">Enter New Password</Heading>
                                <TextBlock className="branding-template-primary-text">
                                    If you have an active account with a valid email address,
                                    you will receive an email with a recovery code which you may enter here,
                                    along with a new password. If you do not have an account or email,
                                    please contact your administrator to recover your password.
                                </TextBlock>
                                <Form className="branding-template-form">
                                    <FloatLabelTextInput inputClassName="branding-template-text-input" label="Recovery Code" id="recoverycode3" />
                                    <FloatLabelPasswordInput inputClassName="branding-template-password-input" label="Enter New Password" id="newpassword3" />
                                    <FloatLabelPasswordInput inputClassName="branding-template-password-input" label="Verify New Password" id="verifypassword3" />
                                    <Padding top={sizes.SM} />
                                    <Button label="Save" className="branding-template-primary-button" type={Button.ButtonTypes.PRIMARY} />
                                    <TextBlock className="branding-template-link-container">Didn't receive an email? <a href="#" className="branding-template-link-text">Resend</a></TextBlock>
                                </Form>
                            </div>
                        </div>
                    </Card>
                </div>
            </Preview>

            <Padding top={sizes.XL} />

            <Preview
                themeStyleSheet={theme}
            >
                { /* Account Selector */ }
                <div className="page" style={{ width: '100%', height: '100%' }}>
                    <Card>
                        <div className="flex-container">
                            <div className="branding-template-logo-container">
                                <Logo className="branding-template-logo" src={logo} />
                            </div>
                            <div className="branding-template-form-container">
                                <TextBlock className="branding-template-primary-text">
                                    Please select the account to login with:
                                </TextBlock>
                                <FlexRow spacing={spacingOptions.MD} alignment={flexRowAlignments.CENTER} flexDirection={flexDirectionOptions.COLUMN}>
                                    <TileSelector.TileButton type="side-icon" className="branding-template-user-card">
                                        <FlexRow spacing={spacingOptions.MD} alignment={flexRowAlignments.CENTER}>
                                            <FlexRow justify={justifyOptions.CENTER} alignment={flexRowAlignments.CENTER}>
                                                <UserInfo
                                                    imageSrc="https://placedog.net/200/200"
                                                    imageSize={imageSizes.MEDIUM}
                                                />
                                            </FlexRow>
                                            <FlexRow flexDirection={flexDirectionOptions.COLUMN} style={{ flex: 1 }}>
                                                <TextBlock
                                                    className="branding-template-primary-text"
                                                    inline
                                                    alignment={alignments.LEFT}
                                                    spacing="small"
                                                >
                                                    Username:
                                                </TextBlock>
                                                <TextBlock
                                                    className="branding-template-primary-text"
                                                    inline
                                                    alignment={alignments.LEFT}
                                                    spacing="small"
                                                >
                                                    Email:
                                                </TextBlock>
                                                <TextBlock
                                                    className="branding-template-primary-text"
                                                    inline
                                                    alignment={alignments.LEFT}
                                                    spacing="small"
                                                >
                                                    Last login:
                                                </TextBlock>
                                            </FlexRow>
                                            <FlexRow flexDirection={flexDirectionOptions.COLUMN} style={{ flex: 1 }} justify={justifyOptions.SPACEEVENLY}>
                                                <TextBlock
                                                    className="branding-template-primary-text"
                                                    inline
                                                    alignment={alignments.LEFT}
                                                    spacing="small"
                                                >
                                                    da****
                                                </TextBlock>
                                                <TextBlock
                                                    className="branding-template-primary-text"
                                                    inline
                                                    alignment={alignments.LEFT}
                                                    spacing="small"
                                                >
                                                    da**@gmail.com
                                                </TextBlock>
                                                <TextBlock
                                                    className="branding-template-primary-text"
                                                    inline
                                                    alignment={alignments.LEFT}
                                                    spacing="small"
                                                >
                                                    Today, 9:48
                                                </TextBlock>
                                            </FlexRow>
                                        </FlexRow>
                                    </TileSelector.TileButton>
                                    <FlexRow justify={justifyOptions.END} >
                                        <a href="#" className="branding-template-link-text">
                                            See 6 more accounts
                                        </a>
                                    </FlexRow>
                                    <Padding top={sizes.SM} />
                                    <TextBlock>or</TextBlock>
                                    <Padding top={sizes.SM} />
                                    <Button
                                        className="branding-template-primary-button"
                                        label="Create New Account"
                                        type={Button.ButtonTypes.PRIMARY}
                                    />
                                    <FlexRow justify={justifyOptions.CENTER} >
                                        <a href="#" className="branding-template-link-text">
                                            Already have an account? Sign on.
                                        </a>
                                    </FlexRow>
                                </FlexRow>
                            </div>
                        </div>
                    </Card>
                </div>
            </Preview>

            <Padding top={sizes.XL} />

            <Preview
                themeStyleSheet={theme}
            >
                { /* Create profile */}
                <div className="page" style={{ width: '100%', height: '100%' }}>
                    <Card>
                        <div className="flex-container">
                            <div className="branding-template-logo-container">
                                <Logo className="branding-template-logo" src={logo} />
                            </div>
                            <div className="branding-template-form-container">
                                <Heading className="branding-template-heading">Create Your Profile</Heading>
                                <TextBlock className="branding-template-primary-text">
                                    Enter the required information below.
                                </TextBlock>
                                <Form className="branding-template-form">
                                    <FloatLabelTextInput inputClassName="branding-template-text-input" label="Username" id="username4" />
                                    <FloatLabelTextInput inputClassName="branding-template-text-input" label="Email Address" id="emailAddress4" />
                                    <FloatLabelPasswordInput inputClassName="branding-template-password-input" label="Create Password" id="password4" />
                                    <FloatLabelPasswordInput inputClassName="branding-template-password-input" label="Re-enter Password" id="verifypassword4" />
                                    <Padding top={sizes.SM} />
                                    <Button label="Create Account" className="branding-template-primary-button" type={Button.ButtonTypes.PRIMARY} />
                                    <TextBlock className="branding-template-link-container">Already have an account? <a href="#" className="branding-template-link-text">Sign In</a></TextBlock>
                                </Form>
                            </div>
                        </div>
                    </Card>
                </div>
            </Preview>

            <Padding top={sizes.XL} />

            <Preview
                themeStyleSheet={theme}
            >
                { /* Error */ }
                <div className="page" style={{ width: '100%', height: '100%' }}>
                    <Card>
                        <div className="flex-container">
                            <div className="branding-template-logo-container">
                                <Logo className="branding-template-logo" src={logo} />
                            </div>
                            <div className="branding-template-form-container">
                                <Feedback type="error" className="branding-template-feedback">Something went wrong.</Feedback>
                                <TextBlock className="branding-template-error-text">Access Denied</TextBlock>
                                <TextBlock className="branding-template-primary-text">
                                    Request denied: User does not have any role assignments
                                    (Correlation ID: 38942-309482-38947y23947)
                                </TextBlock>
                            </div>
                        </div>
                    </Card>
                </div>
            </Preview>

            <Padding top={sizes.XL} />

            <Preview
                themeStyleSheet={theme}
            >
                { /* Phone # */ }
                <div className="page" style={{ width: '100%', height: '100%' }}>
                    <Card>
                        <div className="flex-container">
                            <div className="branding-template-logo-container">
                                <Logo className="branding-template-logo" src={logo} />
                            </div>
                            <div className="branding-template-form-container">
                                <TextBlock className="branding-template-primary-text">
                                    To make your experience with us even better, please add the following information to your account:
                                </TextBlock>
                                <Form className="branding-template-form">
                                    <FloatLabelTextInput inputClassName="branding-template-text-input" label="Phone Number" id="phoneNumber6" />
                                    <Padding top={sizes.SM} />
                                    <Button label="Skip this for now" className="branding-template-primary-button" type={Button.ButtonTypes.PRIMARY} />
                                </Form>
                            </div>
                        </div>
                    </Card>
                </div>
            </Preview>

            <Padding top={sizes.XL} />

            <Preview
                themeStyleSheet={theme}
            >
                { /* Enter password */}
                <div className="page" style={{ width: '100%', height: '100%' }}>
                    <Card>
                        <div className="flex-container">
                            <div className="branding-template-logo-container">
                                <Logo className="branding-template-logo" src={logo} />
                            </div>
                            <div className="branding-template-form-container">
                                <Heading className="branding-template-heading">Hello Erika,</Heading>
                                <TextBlock className="branding-template-primary-text">
                                    Please enter your password below:
                                </TextBlock>
                                <Padding top={sizes.SM} />
                                <Form className="branding-template-form">
                                    <FloatLabelTextInput inputClassName="branding-template-text-input" label="Password" id="password7" />
                                    <Padding top={sizes.SM} />
                                    <Button label="Sign On" className="branding-template-primary-button" type={Button.ButtonTypes.PRIMARY} />
                                    <TextBlock className="branding-template-link-container"><a href="#" className="branding-template-link-text">Forgot Password</a></TextBlock>
                                    <TextBlock className="branding-template-link-container"><a href="#" className="branding-template-link-text">Not You? Switch Accounts.</a></TextBlock>
                                </Form>
                            </div>
                        </div>
                    </Card>
                </div>
            </Preview>

            <Padding top={sizes.XL} />

            <Preview
                themeStyleSheet={theme}
            >
                { /* Enter username */ }
                <div className="page" style={{ width: '100%', height: '100%' }}>
                    <Card>
                        <div className="flex-container">
                            <div className="branding-template-logo-container">
                                <Logo className="branding-template-logo" src={logo} />
                            </div>
                            <div className="branding-template-form-container">
                                <Form className="branding-template-form">
                                    <FloatLabelTextInput inputClassName="branding-template-text-input" label="Username" id="password" />
                                    <Padding top={sizes.SM} />
                                    <Button label="Submit" className="branding-template-primary-button" type={Button.ButtonTypes.PRIMARY} />
                                    <TextBlock className="branding-template-link-container"><a href="#" className="branding-template-link-text">Cancel</a></TextBlock>
                                </Form>
                            </div>
                        </div>
                    </Card>
                </div>
            </Preview>

            <Padding top={sizes.XL} />

            <Preview
                themeStyleSheet={theme}
            >
                { /* Login with provider */ }
                <div className="page" style={{ width: '100%', height: '100%' }}>
                    <Card>
                        <div className="flex-container">
                            <div className="branding-template-logo-container">
                                <Logo className="branding-template-logo" src={logo} />
                            </div>
                            <div className="branding-template-form-container">
                                <Form className="branding-template-form">
                                    <FloatLabelTextInput inputClassName="branding-template-text-input" label="Username" id="username7" />
                                    <FloatLabelPasswordInput inputClassName="branding-template-password-input" label="Password" id="password3" />
                                    <Padding top={sizes.SM} />
                                    <Button label="Sign On" className="branding-template-primary-button" type={Button.ButtonTypes.PRIMARY} />
                                    <SocialButton label="Login with Facebook" className="branding-template-social-button" branding={SocialButton.BrandTypes.FACEBOOK} />
                                    <TextBlock className="branding-template-link-container"><a href="#" className="branding-template-link-text">Forgot Password</a></TextBlock>
                                    <TextBlock className="branding-template-link-container"><a href="#" className="branding-template-link-text">No Account? Register Now!</a></TextBlock>
                                </Form>
                            </div>
                        </div>
                    </Card>
                </div>
            </Preview>

            <Padding top={sizes.XL} />
        </div>
    ));
