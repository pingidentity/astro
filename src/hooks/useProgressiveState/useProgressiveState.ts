import { useState } from 'react';

interface UseProgressiveState {
  /**
   * A custom hook that provides stateful capabilities when the associated prop is not supplied
   * @param {T} prop The intended prop to be controlled by state
   * @param {U} initial The initial state value, used only if the given prop is undefined
   */
  <T, U>(prop: T | undefined, initial: U): [U, React.Dispatch<U>] | [T, () => undefined];
}


const useProgressiveState: UseProgressiveState = (prop, initial) => {
  const controlledState = useState(initial);

  if (prop === undefined) {
    return controlledState;
  }

  return [prop, () => undefined];
};

export default useProgressiveState;
