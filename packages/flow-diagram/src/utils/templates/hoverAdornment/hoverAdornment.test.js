import {
    selectFromAdornment,
    getAdornmentOnHover,
} from './hoverAdornment';

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

describe('Hover Adornment', () => {
    test('selectFromAdornment called with correct arguments', () => {
        const select = jest.fn();
        const e = {
            anything: 'anything',
        };
        const obj = {
            part: {
                diagram: {
                    select,
                },
            },
        };
        const node = obj.part;
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
