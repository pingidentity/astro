import { placement } from '../StyleUtils';

describe('Style Utils', () => {
    it('returns nothing', () => {
        expect(placement({}).trim()).toEqual('');
    });

    it('returns css with a 17px gap', () => {
        expect(placement({ hGap: 17 }).trim()).toEqual(`
        > * + * {
            margin-left: 17px;
        }
        `.trim());
    });
});
