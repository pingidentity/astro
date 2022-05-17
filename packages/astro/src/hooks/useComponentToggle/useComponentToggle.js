import { useProgressiveState } from '../index';

/**
 * Returns one of two components that are supplied via props.
 * A boolean value is used to determine which component to render.
 * State can be handled by either props or within this hook if props are not provided.
 * Also returns a function that inverts the boolean attribute, and calls a callback function.
 * @param {Object} [props] Properties provided to the state
 * @param {Boolean} [props.condition] Boolean that controls which component is returned.
 * @param {Component} [props.ComponentToRenderIfTrue]
 * Component that is returned when the condition is true.
 * @param {Component} [props.ComponentToRenderIfFalse]
 * Component that is returned when the condition is false.
 * @param {Function} [props.onConditionChange]
 * Callback function that is called, when the condition boolean changes, if it is provided .
 * @returns {Object} `{ isOpen: Boolean, open: Function, close: Function, toggle: Function }`
 * @returns {Object} `{ handleCondtionChange: Function, renderedComponent: Component, }`
 */

const useComponentToggle = (props = {}) => {
  const {
    ComponentToRenderIfTrue,
    ComponentToRenderIfFalse,
    condition,
    onConditionChange,
  } = props;

  const [isToggled, setIsToggled] = useProgressiveState(
    condition,
    () => {});

  const RenderedComponent = isToggled ? ComponentToRenderIfTrue : ComponentToRenderIfFalse;

  const handleConditionChange = (...args) => {
    setIsToggled(!isToggled);
    if (onConditionChange) {
      onConditionChange(!isToggled, ...args);
    }
  };

  return {
    handleConditionChange,
    RenderedComponent,
  };
};

export default useComponentToggle;
