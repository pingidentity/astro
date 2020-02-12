import React from 'react';
import SocialIcon from './SocialIcon';


export default {
    title: 'Components/Display/SocialIcon',
    component: SocialIcon,
};

export const Icons = () => (
    <div>
        <SocialIcon.GOOGLE width="50px" height="50px" />
        <SocialIcon.LINKEDIN width="50px" height="50px" />
        <SocialIcon.TWITTER width="50px" height="50px" />
        <SocialIcon.FACEBOOK width="50px" height="50px" />
        <SocialIcon.MARKETO width="50px" height="50px" />
        <SocialIcon.SALESFORCE width="50px" height="50px" />
        <SocialIcon.SCIM width="50px" height="50px" />
    </div>
);
