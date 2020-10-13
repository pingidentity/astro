import React from 'react';
import {
    render,
    screen,
} from '@testing-library/react';
import Palette from './Palette';
import { groupTemplate, nodeTemplate } from '../FlowManager/templates';

const loginStepJSON = {
    'title': 'My first step type!',
    'description': 'This is an example step type',
    'type': 'object',
    'properties': {
        'stepType': {
            'const': 'LOGIN',
        },
        'configuration': {
            'properties': {
                'enableRegistration': {
                    'type': 'boolean',
                },
                'redirectUrl': {
                    'type': 'string',
                    'format': 'uri',
                },
            },
            'additionalProperties': false,
        },
        'outlets': {
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': {
                    'name': {
                        'enum': [
                            'On Success',
                            'Bad Password',
                        ],
                    },
                    'next': {
                        'type': 'string',
                    },
                },
            },
        },
        'outputSchema': {
            'properties': {
                'someOutputParam': {
                    'type': 'string',
                    'title': 'The example output param',
                    'description': 'This is just an example output parameter.',
                },
            },
        },
    },
};

const testId = 'test-palette';
const defaultProps = {
    'data-testid': testId,
    nodeTemplates: [['', () => nodeTemplate(280)]],
    groupTemplates: [['', groupTemplate]],
    nodeDataArray: [{ ...loginStepJSON, key: 0, text: loginStepJSON.title }],
    linkDataArray: [],
};

const getComponent = props => render(<Palette {...defaultProps} {...props} />);
test('Renders palette', () => {
    getComponent();
    const palette = screen.getByTestId(testId);
    expect(palette).toBeInTheDocument();
});
test('Has correct styling', () => {
    getComponent();
    const palette = screen.getByTestId(testId);
    expect(palette).toHaveStyleRule('height', '100%');
});
