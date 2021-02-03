
import React from 'react';
import { Desktop } from '@pingux/icons';
import { svgComponentToBase64 } from '../templateUtils';
import {
    getIfLengthGreater,
    getBorderColor,
    getIcon,
    adornmentMouseLeave,
    selectFromAdornment,
    getAdornmentOnHover,
} from './stepTemplate';

jest.mock('gojs', () => {
    return ({
        GraphObject: {
            make: jest.fn(() => {}),
        },
        Shape: {
            defineFigureGenerator: jest.fn(() => {}),
        },
    });
});

describe('Step Template', () => {
    test('getIfLengthGreater returns correct true value', () => {
        expect(getIfLengthGreater(true, false, 0)('1')).toBe(true);
    });
    test('getIfLengthGreater returns correct false value', () => {
        expect(getIfLengthGreater(true, false, 2)('1')).toBe(false);
    });
    test('getBorderColor returns correct selected value', () => {
        const selected = {
            data: {
                isSelected: true,
                errorMessage: null,
            },
        };
        expect(getBorderColor('blue', 'red', 'transparent')(selected)).toBe('blue');
    });
    test('getBorderColor returns correct error value', () => {
        const errorData = {
            lb: {
                errorMessage: '',
            },
            data: {
                isSelected: false,
                errorMessage: 'error',
            },
        };
        const errorLb = {
            lb: {
                errorMessage: 'error',
            },
            data: {
                isSelected: false,
                errorMessage: '',
            },
        };
        expect(getBorderColor('blue', 'red', 'transparent')(errorData)).toBe('red');
        expect(getBorderColor('blue', 'red', 'transparent')(errorLb)).toBe('red');
    });
    test('getBorderColor returns correct default value', () => {
        const none = {
            lb: {
                errorMessage: '',
            },
            data: {
                isSelected: false,
                errorMessage: null,
            },
        };
        expect(getBorderColor('blue', 'red', 'transparent')(none)).toBe('transparent');
    });

    test('getIcon returns correct color and icon', () => {
        const coloredIcon = svgComponentToBase64(<Desktop fill="white" />);
        expect(getIcon('white')(color => svgComponentToBase64(<Desktop fill={color} />))).toEqual(coloredIcon);
    });

    test('adornmentMouseLeave called with correct arguments', () => {
        const removeAdornment = jest.fn();
        const e = {
            anything: 'anything',
        };
        const obj = {
            part: {
                adornedPart: {
                    removeAdornment,
                },
            },
        };
        adornmentMouseLeave(e, obj);
        expect(removeAdornment).toHaveBeenCalledWith('mouseHover');
    });

    test('selectFromAdornment called with correct arguments', () => {
        const select = jest.fn();
        const e = {
            anything: 'anything',
        };
        const obj = {
            part: {
                adornedPart: {
                    diagram: {
                        select,
                    },
                },
            },
        };
        const node = obj.part.adornedPart;
        selectFromAdornment(e, obj);
        expect(select).toHaveBeenCalledWith(node);
    });

    test('getAdornmentOnHover called with correct arguments', () => {
        const addAdornment = jest.fn();
        const e = {
            anything: 'anything',
        };
        const obj = {
            part: {
                addAdornment,
            },
        };
        const adornment = {};
        getAdornmentOnHover(adornment)(e, obj);
        expect(addAdornment).toHaveBeenCalledWith('mouseHover', adornment);
    });
});
