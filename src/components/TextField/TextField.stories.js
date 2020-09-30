import React from 'react';
import TextField from '.';

export default {
  title: 'TextField',
  component: TextField,
};

export const Default = () => (
  <TextField
    label="Hi, this is a label"
  />
);

export const Password = () => (
  <TextField
    label="Hi, this is a label"
    labelProps={{ color: 'red' }}
    controlProps={{ type: 'password' }}
  />
);
