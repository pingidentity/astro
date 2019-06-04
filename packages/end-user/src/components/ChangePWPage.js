import React from 'react';
import PropTypes from 'prop-types';
import Branding from './Branding';
import Button, { ButtonTypes } from './Button';
import Card from './Card';
import Feedback from './Feedback';
import FloatLabelPasswordInput from './FloatLabelPasswordInput';
import Form from './Form';
import Heading from './Heading';
import Logo from './Logo';
import Page from './Page';
import Requirements from './Requirements';
import Tooltip from './Tooltip';

const ChangePWPage = ({ branding }) => (
    <Page footer="© Copyright 2017 Ping Identity. All rights reserved.">
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
                <Button label="Save" type={ButtonTypes.PRIMARY} disabled />
            </Form>
        </Card>
    </Page>
);

ChangePWPage.propTypes = {
    branding: PropTypes.shape({
        logo: PropTypes.string,
    }),
};

export default ChangePWPage;
