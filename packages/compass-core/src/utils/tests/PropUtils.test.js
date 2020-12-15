import { typeToVariant } from '../PropUtils';

describe('PropUtils', () => {
    it('should return the type value or the default value', () => {
        const originalWarn = global.console.warn;
        const mockedWarn = jest.fn();
        global.console.warn = mockedWarn;
        const component = 'Something';
        const variants = ['this', 'that'];
        const defaultValue = 'default';

        expect(mockedWarn).toHaveBeenCalledTimes(0);
        expect(typeToVariant(component, variants, 'that', defaultValue)).toBe('that');
        expect(typeToVariant(component, variants, 'the other', defaultValue)).toBe(defaultValue);
        expect(mockedWarn).toHaveBeenCalledTimes(1);

        global.console.warn = originalWarn;
    });

    it('should not warn if in production', () => {
        process.env.NODE_ENV = 'production';
        const callback = jest.fn();
        console.warn = callback; // eslint-disable-line no-console

        const component = 'Something';
        const variants = ['this', 'that'];
        const defaultValue = 'default';

        expect(typeToVariant(component, variants, 'that', defaultValue)).toBe('that');

        expect(callback).not.toBeCalled();

        delete process.env.NODE_ENV;
    });
});
