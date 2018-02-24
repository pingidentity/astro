import React from 'react';
import PropTypes from 'prop-types';
import Page from './Page';
import Branding from './Branding';
import Card from './Card';
import Form from './Form';
import Logo from './Logo';
import FloatLabelTextInput from './FloatLabelTextInput';
import FloatLabelPasswordInput from './FloatLabelPasswordInput';
import Checkbox from './Checkbox';
import Button from './Button';

const SignOnPage = ({ branding }) => (
    <Page footer="© Copyright 2017 Ping Identity. All rights reserved.">
        <Branding {...branding} />
        <Card>
            <Logo src={branding && branding.logo} />
            <Form>
                <FloatLabelTextInput label="Username" id="username" />
                <FloatLabelPasswordInput label="Password" id="password" />
                <div>
                    <Checkbox label="Remember me" />
                </div>
                <Button label="Sign On" primary />
            </Form>
        </Card>
    </Page>
);

SignOnPage.propTypes = {
    branding: PropTypes.shape({
        logo: PropTypes.string,
    }),
};

SignOnPage.defaultProps = {
    branding: {},
};

export default SignOnPage;
