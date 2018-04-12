import React from 'react';
import Catalog from './Catalog';
import MFA from './MFA';
import SignOnPage from '../components/SignOnPage';
import ChangePWPage from '../components/ChangePWPage';
import SigningYouOnPage from '../components/SigningYouOnPage';
import completeBranding from '../util/completeBranding';

import '../css/styles.scss';
import './css/demo.scss';
import pinglogo from './assets/ping-logo.svg';
import jjlogo from './assets/jj-logo.png';

const pingBranding = {
    logo: pinglogo,
};

const jjBranding = completeBranding({
    logo: jjlogo,
    backgroundColor: '#0000ff',
    primaryColor: '#ff0000',
});

const App = () => (
    <div className="page-content">
        <Catalog />
    </div>
);

export default {
    main: <App />,
    mfa: <div className="page-content"><MFA/></div>,
    signon: <SignOnPage branding={pingBranding} />,
    branded: <SignOnPage branding={jjBranding} />,
    changepw: <ChangePWPage branding={pingBranding} />,
    signingon: <SigningYouOnPage branding={pingBranding} />,
};
