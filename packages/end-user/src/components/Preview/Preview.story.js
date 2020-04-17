import React from 'react';

import Preview from './Preview';
import Card from '../Card';
import Logo from '../Logo';
import Form from '../Form';
import FloatLabelTextInput from '../FloatLabelTextInput';
import FloatLabelPasswordInput from '../FloatLabelPasswordInput';
import Button from '../Button';
import TextBlock from '../TextBlock';
import Padding, { sizes } from '../shared/Padding';

import logo from '../../images/ping-logo.png';

export default {
    title: 'Components/Display/Preview',
    component: Preview,
};

export const Default = () => {
    return (
        <>
            <Preview
                width="500px"
                height="300px"
                scale={0.5}
                interactive={false}
            >
                <Card>
                    <div className="flex-container">
                        <div className="branding-template-logo-container">
                            <Logo className="branding-template-logo" src={logo} />
                        </div>
                        <div className="branding-template-form-container">
                            <Form classname="branding-template-form">
                                <FloatLabelTextInput className="branding-template-text-input" label="Username" id="username1" />
                                <FloatLabelPasswordInput className="branding-template-password-input" label="Password" id="password1" />
                                <Button label="Sign On" className="branding-template-primary-button" type={Button.ButtonTypes.PRIMARY} />
                                <TextBlock className="branding-template-link-text"><a href="">Forgot Password</a></TextBlock>
                                <TextBlock className="branding-template-link-text"><a href="/template1.html">No Account? Register Now!</a></TextBlock>
                            </Form>
                        </div>
                    </div>
                </Card>
            </Preview>

            <Padding top={sizes.XL} />

            <Preview
                themeStyleSheet="https://assets.pingone.com/ux/branding-themes/0.10.0/split/split.css"
            >
                <Card>
                    <div className="flex-container">
                        <div className="branding-template-logo-container">
                            <Logo className="branding-template-logo" src={logo} />
                        </div>
                        <div className="branding-template-form-container">
                            <Form classname="branding-template-form">
                                <FloatLabelTextInput className="branding-template-text-input" label="Username" id="username1" />
                                <FloatLabelPasswordInput className="branding-template-password-input" label="Password" id="password1" />
                                <Button label="Sign On" className="branding-template-primary-button" type={Button.ButtonTypes.PRIMARY} />
                                <TextBlock className="branding-template-link-text"><a href="">Forgot Password</a></TextBlock>
                                <TextBlock className="branding-template-link-text"><a href="/template1.html">No Account? Register Now!</a></TextBlock>
                            </Form>
                        </div>
                    </div>
                </Card>
            </Preview>

            <Padding top={sizes.XL} />

            <Preview
                themeStyleSheet="https://assets.pingone.com/ux/branding-themes/0.10.0/slate/slate.css"
            >
                <Card>
                    <div className="flex-container">
                        <div className="branding-template-logo-container">
                            <Logo className="branding-template-logo" src={logo} />
                        </div>
                        <div className="branding-template-form-container">
                            <Form classname="branding-template-form">
                                <FloatLabelTextInput className="branding-template-text-input" label="Username" id="username1" />
                                <FloatLabelPasswordInput className="branding-template-password-input" label="Password" id="password1" />
                                <Button label="Sign On" className="branding-template-primary-button" type={Button.ButtonTypes.PRIMARY} />
                                <TextBlock className="branding-template-link-text"><a href="">Forgot Password</a></TextBlock>
                                <TextBlock className="branding-template-link-text"><a href="/template1.html">No Account? Register Now!</a></TextBlock>
                            </Form>
                        </div>
                    </div>
                </Card>
            </Preview>

            <Padding top={sizes.XL} />

            <Preview
                themeStyleSheet="https://assets.pingone.com/ux/branding-themes/0.10.0/mural/mural.css"
            >
                <Card>
                    <div className="flex-container">
                        <div className="branding-template-logo-container">
                            <Logo className="branding-template-logo" src={logo} />
                        </div>
                        <div className="branding-template-form-container">
                            <Form classname="branding-template-form">
                                <FloatLabelTextInput className="branding-template-text-input" label="Username" id="username1" />
                                <FloatLabelPasswordInput className="branding-template-password-input" label="Password" id="password1" />
                                <Button label="Sign On" className="branding-template-primary-button" type={Button.ButtonTypes.PRIMARY} />
                                <TextBlock className="branding-template-link-text"><a href="">Forgot Password</a></TextBlock>
                                <TextBlock className="branding-template-link-text"><a href="/template1.html">No Account? Register Now!</a></TextBlock>
                            </Form>
                        </div>
                    </div>
                </Card>
            </Preview>

            <Padding top={sizes.XL} />

            <Preview
                themeStyleSheet="https://assets.pingone.com/ux/branding-themes/0.10.0/focus/focus.css"
            >
                <Card>
                    <div className="flex-container">
                        <div className="branding-template-logo-container">
                            <Logo className="branding-template-logo" src={logo} />
                        </div>
                        <div className="branding-template-form-container">
                            <Form classname="branding-template-form">
                                <FloatLabelTextInput className="branding-template-text-input" label="Username" id="username1" />
                                <FloatLabelPasswordInput className="branding-template-password-input" label="Password" id="password1" />
                                <Button label="Sign On" className="branding-template-primary-button" type={Button.ButtonTypes.PRIMARY} />
                                <TextBlock className="branding-template-link-text"><a href="">Forgot Password</a></TextBlock>
                                <TextBlock className="branding-template-link-text"><a href="/template1.html">No Account? Register Now!</a></TextBlock>
                            </Form>
                        </div>
                    </div>
                </Card>
            </Preview>
        </>
    );
};
