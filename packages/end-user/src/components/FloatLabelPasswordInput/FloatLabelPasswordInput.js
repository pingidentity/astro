import React from 'react';
import FloatLabel from '../FloatLabel';
import PasswordInput from '../PasswordInput';

/**
 * PasswordInput with a FloatLabel
 */
const FloatLabelPasswordInput = props => <FloatLabel {...props} InputType={PasswordInput} />;

export default FloatLabelPasswordInput;
