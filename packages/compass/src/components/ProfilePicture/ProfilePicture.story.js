import React from 'react';


import { ProfilePicture } from '../../.';

export default {
    title: 'ProfilePicture',
    component: ProfilePicture,

};

export const Default = () => (
    <ProfilePicture src="https://randomuser.me/api/portraits/lego/8.jpg" />
);

export const Small = () => (
    <ProfilePicture size={50} src="https://randomuser.me/api/portraits/lego/7.jpg" />
);

export const NoImage = () => (
    <ProfilePicture />
);
