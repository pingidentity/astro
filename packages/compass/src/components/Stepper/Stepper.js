import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { between } from '@pingux/compass-core/lib/components/Between';
import { defaultRender } from '@pingux/compass-core/lib/utils/PropUtils';

import { stepStatuses } from './Stepper.constants';
import * as styles from './Stepper.styles';
import Step from './Step';
import Line from './Line';
import Box from '../Box';

const {
    ACTIVE,
    COMPLETED,
    INACTIVE,
} = stepStatuses;


// Stepper Component - exported wrapper
const Stepper = ({
    numberOfSteps,
    activeStep,
    renderBetween,
    renderStep,
    ...props
}) => {
    const getStatus = (num) => {
        if (num === activeStep) {
            return ACTIVE;
        } else if (num < activeStep) {
            return COMPLETED;
        }
        return INACTIVE;
    };
    const baseArray = Array(numberOfSteps).fill();
    const lines = baseArray.map((_v, i) => renderBetween({
        status: getStatus(i + 2),
    }, Line));
    const steps = baseArray.map((_v, i) => renderStep({
        key: uuidv4(),
        status: getStatus(i + 1),
        value: i + 1,
    }, Step));

    return (
        <Box isRow alignItems="center" css={styles.stepperWrapper} {...props}>
            {between(steps, lines)}
        </Box>
    );
};

const isWithinRange = (inclusiveLowerBound = 0, inclusiveUpperBound = Infinity) => (num) => {
    return Number.isInteger(num) && inclusiveLowerBound <= num && num <= inclusiveUpperBound;
};
const validatePositiveInteger = isRequired => (props, propName, componentName) => {
    const isPositiveInteger = isWithinRange(1, Infinity);
    if (props[propName] && !isPositiveInteger(props[propName])) {
        return new Error(`Expected a positive integer for ${propName} in ${componentName}, but instead received \`${props[propName]}\`.`);
    } else if (isRequired && !props[propName]) {
        return new Error(`The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`${props[propName]}\`.`);
    }
    // Everything is fine
    return null;
};
const isValidPositiveInt = validatePositiveInteger(false);
isValidPositiveInt.isRequired = validatePositiveInteger(true);

Stepper.propTypes = {
    /** Total number of steps to display */
    numberOfSteps: isValidPositiveInt.isRequired,
    /** The number of the current step (using one-based indexing) */
    activeStep: isValidPositiveInt,
    /** Function that renders the content between each step. */
    renderBetween: PropTypes.func,
    /** Function that renders each step. It receives a props object and a component.
     *  @param {object} props
     *  @param {object} Component
     */
    renderStep: PropTypes.func,
};

Stepper.defaultProps = {
    activeStep: 1,
    renderBetween: defaultRender,
    renderStep: defaultRender,
};

export default Stepper;
