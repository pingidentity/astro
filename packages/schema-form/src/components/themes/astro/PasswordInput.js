import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@pingux/astro';

const PasswordInput = ({ controlProps, ...props }) => (
  <TextField controlProps={{ ...controlProps, type: 'password' }} {...props} />
);

PasswordInput.propTypes = {
  controlProps: PropTypes.shape({}),
};

PasswordInput.defaultProps = {
  controlProps: {},
};

export default PasswordInput;
