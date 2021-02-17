import React from 'react';
import { TextField } from '@pingux/astro';

const PasswordInput = ({ ...props }) => (
  <TextField controlProps={{ type: 'password' }} {...props} />
);

export default PasswordInput;
