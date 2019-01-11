import React from 'react';
import Catalog from './Catalog';
import Inputs from './Inputs';
import Layouts from './Layouts';
import Feedback from './Feedback';
import MFA from './MFA';
import SignOnPage from '../components/SignOnPage';
import ChangePWPage from '../components/ChangePWPage';
import SigningYouOnPage from '../components/SigningYouOnPage';
import completeBranding from '../util/completeBranding';

import '../css/styles.scss';
import './css/demo.scss';
import pinglogo from './assets/ping-logo.svg';
import jjlogo from './assets/jj-logo.png';
import background from './assets/background.jpg';

const pingBranding = {
    logo: pinglogo,
    backgroundImage: background,
};

const jjBranding = completeBranding({
    logo: jjlogo,
    backgroundColor: '#0000ff',
    primaryColor: '#ff0000',
});


const App = PageComponent => (
    <div className="page-content">
        <ul className="demo-nav">
            <li><a href="./">Main</a></li>
            <li><a href="inputs.html">Inputs</a></li>
            <li><a href="layouts.html">Layouts</a></li>
            <li><a href="feedback.html">Feedback</a></li>
            <li><a href="mfa.html">MFA</a></li>
        </ul>
        <PageComponent />
    </div>
);

export default {
    main: App(Catalog),
    inputs: App(Inputs),
    layouts: App(Layouts),
    feedback: App(Feedback),
    mfa: App(MFA),
    signon: <SignOnPage branding={pingBranding} />,
    branded: <SignOnPage branding={jjBranding} />,
    changepw: <ChangePWPage branding={pingBranding} />,
    signingon: <SigningYouOnPage branding={pingBranding} />,
};
