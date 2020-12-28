
import * as go from 'gojs';
import {
    fillIfColor,
    bindIfColor,
} from './nodes';

jest.mock('gojs', () => {
    return ({
        GraphObject: {
            make: jest.fn(() => {}),
        },
        Binding: jest.fn(),
    });
});

describe('Nodes', () => {
    test('fillIfColor gets correct value with argument', () => {
        expect(fillIfColor('blue')).toEqual({ fill: 'blue' });
    });
    test('fillIfColor gets correct value with no argument', () => {
        expect(fillIfColor()).toEqual({});
    });
    test('bindIfColor gets correct value with argument', () => {
        expect(bindIfColor('blue')).toEqual([]);
    });
    test('bindIfColor gets correct value with no argument', () => {
        expect(bindIfColor()).toEqual([new go.Binding('fill', 'color')]);
    });
});
