import * as go from 'gojs';
import {
    fillIfColor,
    strokeIfColor,
    bindFillIfColor,
    bindStrokeIfColor,
} from './nodes';

jest.mock('gojs', () => {
    return ({
        GraphObject: {
            make: jest.fn(() => {}),
        },
        Binding: jest.fn(),
        Spot: {},
        TextBlock: {},
        Size: () => {},
        Margin: () => {},
    });
});

describe('Nodes', () => {
    test('fillIfColor gets correct value with argument', () => {
        expect(fillIfColor('blue')).toEqual({ fill: 'blue' });
    });
    test('fillIfColor gets correct value with no argument', () => {
        expect(fillIfColor()).toEqual({});
    });
    test('strokeIfColor gets correct value with argument', () => {
        expect(strokeIfColor('blue')).toEqual({ stroke: 'blue' });
    });
    test('strokeIfColor gets correct value with no argument', () => {
        expect(strokeIfColor()).toEqual({});
    });
    test('bindIfColor gets correct value with argument', () => {
        expect(bindFillIfColor('blue')).toEqual([]);
    });
    test('bindIfColor gets correct value with no argument', () => {
        expect(bindFillIfColor()).toEqual([new go.Binding('fill', 'color')]);
    });
    test('bindStrokeIfColor gets correct value with argument', () => {
        expect(bindStrokeIfColor('blue')).toEqual([]);
    });
    test('bindStrokeIfColor gets correct value with no argument', () => {
        expect(bindStrokeIfColor()).toEqual([new go.Binding('stroke', 'color')]);
    });
});
