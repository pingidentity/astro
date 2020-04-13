import React from 'react';
import SocialButton, { UnstyledSocialButton } from './SocialButton';

export default {
    title: 'Components/Actions/SocialButton',
    component: UnstyledSocialButton,
};

export const Buttons = () => (
    <div>
        <SocialButton label="Login with Facebook" branding={SocialButton.BrandTypes.FACEBOOK} />
        <SocialButton label="Login with Apple" branding={SocialButton.BrandTypes.APPLE} />
        <SocialButton label="Login with Google" branding={SocialButton.BrandTypes.GOOGLE} />
        <SocialButton label="Login with Amazon" branding={SocialButton.BrandTypes.AMAZON} />
        <SocialButton label="Login with Instagram" branding={SocialButton.BrandTypes.INSTAGRAM} />
        <SocialButton label="Login with LinkedIn" branding={SocialButton.BrandTypes.LINKEDIN} />
        <SocialButton label="Login with Microsoft" branding={SocialButton.BrandTypes.MICROSOFT} />
        <SocialButton label="Login with Twitter" branding={SocialButton.BrandTypes.TWITTER} />
    </div>
);
