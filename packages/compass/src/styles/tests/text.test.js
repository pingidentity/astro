import { textProps } from '../text';

describe('Text Styles', () => {
    it('should provide props with standard size & weight', () => {
        const output = textProps();

        expect(output.fontSize).toBe('md');
        expect(output.fontWeight).toBe(400);
    });
});
