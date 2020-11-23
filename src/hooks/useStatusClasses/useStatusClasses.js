import classnames from 'classnames';
import mapKeys from 'lodash/mapKeys';
import kebabCase from 'lodash/kebabCase';

/**
 * Converts status information into classes which can be supplied to the rendered component's
 * `className` prop.
 * @param {String} [defaultClass] An optional default class that will be added
 * @param {Object} [statuses] A mapping of conditional statuses and the current value of each one
 * @returns A string of classes based on the input. Status keys will be converted to kebab-case,
 * e.g. useStatusClasses('thing', { isDisabled: true }) => "thing is-disabled"
 */
const useStatusClasses = (defaultClass, statuses = {}) => {
  const kebabStatuses = mapKeys(statuses, (_v, k) => kebabCase(k));
  const classNames = classnames(defaultClass, kebabStatuses);

  return {
    classNames,
  };
};

export default useStatusClasses;
