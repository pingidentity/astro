import React from 'react';
import PropTypes from 'prop-types';
import Branding from '../../components/Branding';
import Card from '../../components/Card';
import Heading from '../../components/Heading';
import Logo from '../../components/Logo';
import Page from '../../components/Page';
import Spinner from '../../components/Spinner';
import TextBlock from '../../components/TextBlock';

const SigningYouOnPage = ({ branding }) => (
    <Page footer="© Copyright 2019 Ping Identity. All rights reserved.">
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
