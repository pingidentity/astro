import React from 'react';
import FloatLabel from '../FloatLabel';
import TextInput from '../TextInput';

/**
 * TextInput with a FloatLabel
 */
const FloatLabelTextInput = props => <FloatLabel {...props} InputType={TextInput} />;

export default FloatLabelTextInput;
