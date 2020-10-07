import React from 'react';
import { mount } from 'enzyme';

import Stepper from './Stepper';
import Step from './Step';
import Line from './Line';
import { stepStatuses } from './Stepper.constants';
import { accent, active, line, neutral } from '../../styles/colors';

const {
    ACTIVE,
    COMPLETED,
    INACTIVE,
} = stepStatuses;

const bgColors = {
    [ACTIVE]: accent[90],
    [COMPLETED]: active,
    [INACTIVE]: neutral[95],
};

const lineColors = {
    [ACTIVE]: `2px solid ${active}`,
    [COMPLETED]: `2px solid ${active}`,
    [INACTIVE]: `2px dotted ${line.regular}`,
};

const defaultProps = {
    'data-id': 'test-stepper',
    numberOfSteps: 3,
};
const getComponent = props => mount(<Stepper {...defaultProps} {...props} />);

describe('Stepper', () => {
    it('renders the stepper in the default state', () => {
        const wrapper = getComponent();
        const stepper = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);
        const lines = wrapper.find(Line);
        const steps = wrapper.find(Step);
        const svg = wrapper.find('svg');
        const expectedStatuses = [ACTIVE, INACTIVE, INACTIVE];

        expect(stepper.exists()).toEqual(true);
        expect(lines).toHaveLength(defaultProps.numberOfSteps - 1);
        expect(steps).toHaveLength(defaultProps.numberOfSteps);
        expect(svg).toHaveLength(0);

        lines.forEach((current, index) => {
            expect(current.props().status).toBe(expectedStatuses[index + 1]);
            expect(current).toHaveStyleRule('border-bottom', lineColors[expectedStatuses[index + 1]]);
        });

        steps.forEach((current, index) => {
            expect(current.props().status).toBe(expectedStatuses[index]);
            expect(current).toHaveStyleRule('background-color', bgColors[expectedStatuses[index]]);
        });
    });

    it('renders the stepper with the given active step', () => {
        const wrapper = getComponent({ activeStep: defaultProps.numberOfSteps });
        const lines = wrapper.find(Line);
        const steps = wrapper.find(Step);
        const svg = wrapper.find('svg[data-icon="yes"]');
        const expectedStatuses = [COMPLETED, COMPLETED, ACTIVE];

        expect(svg).toHaveLength(defaultProps.numberOfSteps - 1);

        lines.forEach((current, index) => {
            expect(current.props().status).toBe(expectedStatuses[index + 1]);
            expect(current).toHaveStyleRule('border-bottom', lineColors[expectedStatuses[index + 1]]);
        });

        steps.forEach((current, index) => {
            expect(current.props().status).toBe(expectedStatuses[index]);
            expect(current).toHaveStyleRule('background-color', bgColors[expectedStatuses[index]]);
        });
    });

    it('renders the stepper with all completed steps', () => {
        const wrapper = getComponent({ activeStep: defaultProps.numberOfSteps + 1 });
        const lines = wrapper.find(Line);
        const steps = wrapper.find(Step);
        const svg = wrapper.find('svg[data-icon="yes"]');
        const expectedStatuses = [COMPLETED, COMPLETED, COMPLETED];

        expect(svg).toHaveLength(defaultProps.numberOfSteps);

        lines.forEach((current, index) => {
            expect(current.props().status).toBe(expectedStatuses[index + 1]);
            expect(current).toHaveStyleRule('border-bottom', lineColors[expectedStatuses[index + 1]]);
        });

        steps.forEach((current, index) => {
            expect(current.props().status).toBe(expectedStatuses[index]);
            expect(current).toHaveStyleRule('background-color', bgColors[expectedStatuses[index]]);
        });
    });

    it('renders the stepper with lots of steps', () => {
        const numberOfSteps = 100;
        const wrapper = getComponent({ numberOfSteps });

        expect(wrapper.find(Step)).toHaveLength(numberOfSteps);
    });

    it('throws an error if number of steps is missing', () => {
        const originalErr = global.console.error;
        const mockedErr = jest.fn();
        global.console.error = mockedErr;

        expect(mockedErr).toHaveBeenCalledTimes(0);
        getComponent({ numberOfSteps: undefined });
        expect(mockedErr).toHaveBeenCalledTimes(1);

        global.console.error = originalErr;
    });

    it('throws an error if active step is a negative number', () => {
        const originalErr = global.console.error;
        const mockedErr = jest.fn();
        global.console.error = mockedErr;

        expect(mockedErr).toHaveBeenCalledTimes(0);
        getComponent({ activeStep: -1 });
        expect(mockedErr).toHaveBeenCalledTimes(1);

        global.console.error = originalErr;
    });
});
