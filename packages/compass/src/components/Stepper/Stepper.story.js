import React from 'react';

import { Stepper } from '../../.';
import Step from './Step';

export default {
    title: 'Stepper',
    component: Stepper,
    subcomponents: Step,

};

export const Default = () => (
    <Stepper numberOfSteps={3} />
);

export const MiddleStep = () => (
    <Stepper numberOfSteps={3} activeStep={2} />
);

export const LastStep = () => (
    <Stepper numberOfSteps={3} activeStep={3} />
);

export const Finished = () => (
    <Stepper numberOfSteps={3} activeStep={4} />
);

export const MoreSteps = () => (
    <Stepper numberOfSteps={5} activeStep={2} />
);
