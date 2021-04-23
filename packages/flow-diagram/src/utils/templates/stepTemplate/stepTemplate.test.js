
import React from 'react';
import { Desktop } from '@pingux/icons';
import { svgComponentToBase64 } from '../templateUtils';
import {
    getIfLengthGreater,
    getBorderColor,
    getIcon,
} from './stepTemplate';

jest.mock('gojs', () => {
    return ({
        GraphObject: {
            make: jest.fn(() => {}),
        },
        Shape: {
            defineFigureGenerator: jest.fn(() => {}),
        },
        Spot: {},
        TextBlock: {},
        Size: () => {},
        Margin: () => {},
    });
});

describe('Step Template', () => {
    test('getIfLengthGreater returns correct true value', () => {
        expect(getIfLengthGreater('1', true, false, 0)).toBe(true);
    });
    test('getIfLengthGreater returns correct false value', () => {
        expect(getIfLengthGreater('1', true, false, 2)).toBe(false);
    });
    test('getBorderColor returns correct selected value', () => {
        const selected = {
            data: {
                errorMessage: null,
            },
            containingGroup: {
                isSelected: true,
            },
        };
        expect(getBorderColor('blue', 'red', 'transparent')(selected)).toBe('blue');
    });
    test('getBorderColor returns correct error value', () => {
        const errorData = {
            data: {
                errorMessage: 'error',
            },
            containingGroup: {
                isSelected: false,
            },
        };
        expect(getBorderColor('blue', 'red', 'transparent')(errorData)).toBe('red');
    });
    test('getBorderColor returns correct default value', () => {
        const none = {
            data: {
                errorMessage: null,
            },
            containingGroup: {
                isSelected: false,
            },
        };
        expect(getBorderColor('blue', 'red', 'transparent')(none)).toBe('transparent');
    });

    test('getIcon returns correct color and icon', () => {
        const coloredIcon = svgComponentToBase64(<Desktop fill="white" />);
        expect(getIcon('white')(color => svgComponentToBase64(<Desktop fill={color} />))).toEqual(coloredIcon);
    });
});
