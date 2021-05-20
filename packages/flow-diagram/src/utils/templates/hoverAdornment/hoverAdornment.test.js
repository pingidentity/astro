
import {
    adornmentMouseLeave,
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
