import { snakeCase, toUpper, fromPairs } from 'lodash';
import { text } from '../../../components/Text/Text.styles';
import buttons from '../../../components/Button/Buttons.styles';

/**
 * Converts the given object to a constant mapping.
 * e.g. { aBox: '1', b: '2' } -> { A_BOX: 'a', B: 'b' }
 *
 * @param {Object} obj - An object with keys to convert
 */
const toConstantObject = obj => fromPairs(Object.keys(obj).map(i => [toUpper(snakeCase(i)), i]));

export const textVariants = toConstantObject(text);
export const buttonVariants = toConstantObject(buttons);
