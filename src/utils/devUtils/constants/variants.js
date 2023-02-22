import { fromPairs, snakeCase, toUpper } from 'lodash';

import buttons from '../../../components/Button/Buttons.styles';
import { text } from '../../../components/Text/Text.styles';

/**
 * Converts the given object to a constant mapping.
 * e.g. { aBox: '1', b: '2' } -> { A_BOX: 'a', B: 'b' }
 *
 * @param {Object} obj - An object with keys to convert
 */
// eslint-disable-next-line max-len
const toConstantObject = obj => fromPairs(Object.keys(obj).map(i => [toUpper(snakeCase(i)), i]));

export const textVariants = toConstantObject(text);
export const buttonVariants = toConstantObject(buttons);
