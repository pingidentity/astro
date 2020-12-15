import { isModifier, isArrowKey } from '../KeyboardUtils';

describe('Keyboard Utils', () => {
    it('can return whether the key code is for a modifier or not', () => {
        expect(isModifier(13)).toBe(false);
        expect(isModifier(16)).toBe(true);
    });

    it('can return whether the key code is for an arrow key or not', () => {
        expect(isArrowKey(13)).toBe(false);
        expect(isArrowKey(37)).toBe(true);
    });
});
