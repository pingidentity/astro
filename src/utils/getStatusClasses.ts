import classnames from 'classnames';
import kebabCase from 'lodash/kebabCase';
import mapKeys from 'lodash/mapKeys';

/**
 * Converts status information into a class string. Status keys are converted to
 * kebab-case and joined with the default class.
 *
 * This is the shared implementation behind the `useStatusClasses` hook; it exists
 * as a plain function so render-prop components (e.g. React Aria wrappers) can
 * build the same status classes from values that are only available inside a
 * callback, where hooks cannot be called.
 *
 * e.g. getStatusClasses('thing', { isDisabled: true }) => "thing is-disabled"
 */
const getStatusClasses = (
  defaultClass?: string | undefined | null,
  statuses: Record<string, string | boolean | undefined | null> = {},
): string => classnames(defaultClass, mapKeys(statuses, (_v, k) => kebabCase(k)));

export default getStatusClasses;
