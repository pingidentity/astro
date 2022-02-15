import React from 'react';
import FloatLabelTextInput from './FloatLabelTextInput';

export default {
    title: 'Components/Inputs/Text/Float',
    component: FloatLabelTextInput,
};

export const Default = () => (
  <FloatLabelTextInput
    label="Username"
    onChange={(e) => console.log(e.target.value)}
  />
);

export const Accessibility = () => (
  <FloatLabelTextInput
    inputClassName="float-label__input--a11y"
    labelClassName="float-label__label--a11y"
    label="Username"
    onChange={(e) => console.log(e.target.value)}
  />
);
