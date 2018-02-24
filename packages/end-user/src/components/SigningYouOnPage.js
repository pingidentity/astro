import React from 'react';
import PropTypes from 'prop-types';
import Branding from './Branding';
import Card from './Card';
import Heading from './Heading';
import Logo from './Logo';
import Page from './Page';
import Spinner from './Spinner';
import TextBlock from './TextBlock';

const SigningYouOnPage = ({ branding }) => (
    <Page footer="© Copyright 2017 Ping Identity. All rights reserved.">
        <Branding {...branding} />
        <Card>
            <Logo src={branding && branding.logo} />
            <Heading>Signing you on...</Heading>
            <Spinner />
            <TextBlock size="small">You are being signed on.</TextBlock>
        </Card>
    </Page>
);

SigningYouOnPage.propTypes = {
    branding: PropTypes.shape({
        logo: PropTypes.string,
    }),
};

SigningYouOnPage.defaultProps = {
    branding: {},
};

export default SigningYouOnPage;
