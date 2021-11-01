import { useState } from 'react';

/**
 * A custom hook that provides stateful capabilities when the associated prop is not supplied
 * @param {*} prop The intended prop to be controlled by state
 * @param {*} initial The initial state value, used only if the given prop is undefined
 */
const useProgressiveState = (prop, initial) => {
  const controlledState = useState(initial);

  if (prop === undefined) {
    return controlledState;
  }

  return [prop, () => {}];
};

export default useProgressiveState;
