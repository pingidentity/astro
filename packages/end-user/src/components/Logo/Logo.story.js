import React from 'react';
import Logo from './Logo';
import pingLogo from '../../images/ping-logo.png';

export default {
  title: 'Components/Display/Logo',
  component: Logo,
};

export const Default = () => <Logo src={pingLogo} />;
