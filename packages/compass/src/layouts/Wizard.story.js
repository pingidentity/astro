import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { linkTo } from '@storybook/addon-links';

import Box from '../components/Box';
import Button from '../components/Button';
import Text from '../components/Text';
import Stepper from '../components/Stepper';

import WizardStep1 from './WizardStep1';
import WizardStep2 from './WizardStep2';
import WizardStep3 from './WizardStep3';

export default {
    title: 'Layouts/Wizard',
};

const WizardContent = (props) => {
    const { currentStep } = props;

    if (currentStep === 1) {
        return <WizardStep1 />;
    } else if (currentStep === 2) {
        return <WizardStep2 />;
    }

    return <WizardStep3 />;
};

WizardContent.propTypes = {
    currentStep: PropTypes.number.isRequired,
};

export const Wizard = () => {
    const numberOfSteps = 3;
    const [currentStep, setCurrentStep] = useState(1);
    const isFinalStep = currentStep === numberOfSteps;
    const handleClickBack = () => setCurrentStep(currentStep - 1);
    const handleClickNext = () => setCurrentStep(currentStep + 1);

    return (
        <Box>
            <Text type="title">Create Enviroment</Text>
            <Text mt="xs">Lorem Ipsum Dolor Sit Amet, Consectetur sistre</Text>
            <Box isRow hGap="md" alignItems="center">
                <Stepper
                    maxWidth="300px"
                    numberOfSteps={numberOfSteps}
                    activeStep={currentStep}
                />
                <Box isRow hGap="sm" marginLeft="auto">
                    {
                        currentStep > 1
                        && (
                            <Button
                                type="text"
                                onClick={handleClickBack}
                            >
                                Back
                            </Button>
                        )
                    }
                    <Button
                        type="primary"
                        iconAfter={isFinalStep ? undefined : 'arrow-right'}
                        isDisabled={currentStep > numberOfSteps}
                        onClick={isFinalStep ? linkTo('Layouts/App Demo') : handleClickNext}
                    >
                        {isFinalStep ? 'Finish' : 'Next'}
                    </Button>
                </Box>
            </Box>
            <WizardContent currentStep={currentStep} />
        </Box>
    );
};
