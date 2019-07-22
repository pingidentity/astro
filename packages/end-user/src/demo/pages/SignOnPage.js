import React from 'react';
import PropTypes from 'prop-types';
import Page from '../../components/Page';
import Branding from '../../components/Branding';
import Card from '../../components/Card';
import Form from '../../components/Form';
import Logo from '../../components/Logo';
import FloatLabelTextInput from '../../components/FloatLabelTextInput';
import FloatLabelPasswordInput from '../../components/FloatLabelPasswordInput';
import Checkbox from '../../components/Checkbox';
import Button, { ButtonTypes } from '../../components/Button';

const SignOnPage = ({ branding }) => (
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
                <Button label="Sign On" type={ButtonTypes.PRIMARY} />
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
