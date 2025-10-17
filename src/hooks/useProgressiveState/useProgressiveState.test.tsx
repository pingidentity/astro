import React from 'react';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import useProgressiveState from './useProgressiveState';

const hookProps = {
  prop: 'count',
  initial: 0,
};

const TestComponent = ({
  count,
}: {
  count?: number | undefined;
}): React.JSX.Element => {
  const [countVal, setCountVal] = useProgressiveState(count, 0);
  const handleClick = () => setCountVal(countVal + 1);

  return (
    <button type="button" onClick={handleClick}>{countVal}</button>
  );
};

const getComponent = (props = {}) => render(<TestComponent {...props} />);

describe('State Utils', () => {
  it('should update the state when no prop is provided', async () => {
    getComponent();
    const component = screen.getByRole('button');
    expect(component).toHaveTextContent('0');
    await userEvent.click(component);
    expect(component).toHaveTextContent('1');
    await userEvent.click(component);
    expect(component).toHaveTextContent('2');
  });

  it('should not update the state when a prop is provided', async () => {
    getComponent({ count: 5 });
    const component = screen.getByRole('button');
    expect(component).toHaveTextContent('5');
    await userEvent.click(component);
    expect(component).toHaveTextContent('5');
    await userEvent.click(component);
    expect(component).toHaveTextContent('5');
  });

  it('hook should return prop if provided', () => {
    const { result } = renderHook(() => useProgressiveState(hookProps.prop, hookProps.initial));
    expect(result.current[0]).toBe(hookProps.prop);
  });

  it('hook should return initial when no prop is provided', () => {
    const { result } = renderHook(() => useProgressiveState(undefined, hookProps.initial));
    expect(result.current[0]).toBe(hookProps.initial);
  });
});
