
import React from 'react';
import { Desktop } from '@pingux/icons';
import { COLORS } from '../../constants';
import { svgComponentToBase64 } from '../templateUtils';
import {
    getDraggedColor,
    getIcon,
    checkIfDragged,
} from './paletteTemplates';

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

const isDraggingItem = jest.fn((node) => {
    return node.part.layerName === 'Tool';
});

describe('Step Template', () => {
    test('getDraggedColor returns correct value for isDraggingItem and !isBeingDragged', () => {
        const node = {
            part: {
                layerName: 'Tool',
            },
        };
        expect(getDraggedColor(isDraggingItem, COLORS.WHITE, '#E5E9F8')(false, node)).toEqual(COLORS.WHITE);
    });
    test('getDraggedColor returns correct value for isDraggingItem and isBeingDragged', () => {
        const node = {
            part: {
                layerName: 'Tool',
            },
        };
        expect(getDraggedColor(isDraggingItem, COLORS.WHITE, '#E5E9F8')(true, node)).toEqual(COLORS.WHITE);
    });
    test('getDraggedColor returns correct value for !isDraggingItem and !isBeingDragged', () => {
        const node = {
            part: {
                layerName: 'layer',
            },
        };
        expect(getDraggedColor(isDraggingItem, COLORS.WHITE, '#E5E9F8')(false, node)).toEqual(COLORS.WHITE);
    });
    test('getDraggedColor returns correct value for isBeingDragged and !isDraggingItem', () => {
        const node = {
            part: {
                layerName: 'layer',
            },
        };
        expect(getDraggedColor(isDraggingItem, COLORS.WHITE, '#E5E9F8')(true, node)).toEqual('#E5E9F8');
    });

    test('getIcon returns correct color and icon', () => {
        const coloredIcon = svgComponentToBase64(<Desktop fill="white" />);
        expect(getIcon((color = 'white') => svgComponentToBase64(<Desktop fill={color} />))).toEqual(coloredIcon);
    });
    test('checkIfDragged returns correct value for isDraggingItem and !isBeingDragged', () => {
        const node = {
            part: {
                layerName: 'Tool',
            },
        };
        expect(checkIfDragged(false, node)).toEqual(true);
    });
    test('checkIfDragged returns correct value for isDraggingItem and isBeingDragged', () => {
        const node = {
            part: {
                layerName: 'Tool',
            },
        };
        expect(checkIfDragged(true, node)).toEqual(true);
    });
    test('checkIfDragged returns correct value for !isDraggingItem and !isBeingDragged', () => {
        const node = {
            part: {
                layerName: 'layer',
            },
        };
        expect(checkIfDragged(false, node)).toEqual(true);
    });
    test('checkIfDragged returns correct value for isBeingDragged and !isDraggingItem', () => {
        const node = {
            part: {
                layerName: 'layer',
            },
        };
        expect(checkIfDragged(true, node)).toEqual(false);
    });
});
