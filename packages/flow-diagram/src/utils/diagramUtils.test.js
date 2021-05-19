import { generateKey } from './diagramUtils';

describe('diagramUtils', () => {
    it('generateKey generates a key based on incoming key', () => {
        const data = {
            key: 'IAMTHEKEYMASTER',
        };

        const generatedKey = generateKey(undefined, data);

        expect(generatedKey.startsWith('IAMTHEKEYMASTER')).toEqual(true);
    });

    it('generateKey sets data key to generated key', () => {
        const data = {
            key: 'IAMTHEKEYMASTER',
        };

        generateKey(undefined, data);
        expect(data.key).toBeDefined();
        expect(data.key).not.toEqual('IAMTHEKEYMASTER');
    });
});
