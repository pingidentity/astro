import React, { useState } from 'react';
import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import useComponentToggle from './useComponentToggle';

const callback = jest.fn();
const condition = false;
const defaultProps = {
  condition,
  onConditionChange: callback,
  ComponentToRenderIfTrue: <span>true-string</span>,
  ComponentToRenderIfFalse: <span>false-string</span>,
};

const TestComponent = () => {
  const [thisCondition, setCondition] = useState(false);

  const conditionalRenderProps = {
    condition: thisCondition,
    onConditionChange: setCondition,
    ComponentToRenderIfTrue: <span>true-string</span>,
    ComponentToRenderIfFalse: <span>false-string</span>,
    onConditionChangeProp: callback,
  };

  const {
    handleConditionChange,
    RenderedComponent,
  } = useComponentToggle(
    conditionalRenderProps,
  );

  return (
    <button type="button" data-testid="test-div" onClick={handleConditionChange} onKeyDown={handleConditionChange}>
      {RenderedComponent}
    </button>
  );
};

const getComponent = () => render(<TestComponent />);

test('default useField', () => {
  renderHook(() => useComponentToggle(defaultProps));
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
  expect(RenderedComponent).toEqual(<span>false-string</span>);
});

test('expect conditional toggling to work', async () => {
  getComponent();
  const component = screen.getByTestId('test-div');
  expect(component).toHaveTextContent('false-string');
  userEvent.click(component);
  expect(component).toHaveTextContent('true-string');
});
