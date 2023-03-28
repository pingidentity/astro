import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';

import useComponentToggle from './useComponentToggle';

const callback = jest.fn();
const condition = false;
const defaultProps = {
  condition,
  onConditionChange: callback,
  ComponentToRenderIfTrue: 'true-string',
  ComponentToRenderIfFalse: 'false-string',
};

const TestComponent = () => {
  const [thisCondition, setCondition] = useState(false);

  const conditionalRenderProps = {
    condition: thisCondition,
    onConditionChange: setCondition,
    ComponentToRenderIfTrue: 'true-string',
    ComponentToRenderIfFalse: 'false-string',
    onConditionChangeProp: callback,
  };

  const {
    handleConditionChange,
    RenderedComponent,
  } = useComponentToggle(
    conditionalRenderProps,
  );

  return (
    <button data-testid="test-div" onClick={handleConditionChange} onKeyDown={handleConditionChange}>
      {RenderedComponent}
    </button>
  );
};

const getComponent = (props = {}) => render(<TestComponent {...props} {...defaultProps} />);

test('default useField', () => {
  renderHook(() => useComponentToggle());
});

test('callback function should call, if provided', () => {
  const { result } = renderHook(() => useComponentToggle(defaultProps));
  act(() => result.current.handleConditionChange());
  expect(callback).toHaveBeenCalled();
});

test('expect hook to return correct data shape', async () => {
  const { result } = renderHook(() => useComponentToggle(defaultProps));
  const {
    handleConditionChange,
    RenderedComponent,
  } = result.current;
  expect(handleConditionChange).toEqual(expect.any(Function));
  expect(RenderedComponent).toEqual('false-string');
});

test('expect conditional toggling to work', async () => {
  getComponent();
  const component = screen.getByTestId('test-div');
  expect(component).toHaveTextContent('false-string');
  userEvent.click(component);
  expect(component).toHaveTextContent('true-string');
});
