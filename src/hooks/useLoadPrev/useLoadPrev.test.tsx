import React, { useRef } from 'react';
import { fireEvent } from '@testing-library/react';

import Box from '../../components/Box';
import { render, screen } from '../../utils/testUtils/testWrapper';

import useLoadPrev from './useLoadPrev';

const onLoadPrev = jest.fn();

const TestComponent = (props: {items: number[]}) => {
  const { items } = props;
  const ref = useRef(null);
  useLoadPrev({ isLoading: false, onLoadPrev, items }, ref);
  return (
    <Box
      sx={{
        height: '400px',
        maxHeight: '400px',
        overflowY: 'scroll',
      }}
      data-testid="outerbox"
      ref={ref}
    >
      content
      <Box
        sx={{
          height: '800px',
          minHeight: '800px',
        }}
        data-testid="innerbox"
      >
        inner content
      </Box>
    </Box>
  );
};

describe('useLoadPrev', () => {
  it('onLoadPrev is called when scrolling to the top', () => {
    const { rerender } = render(<TestComponent items={[1, 2, 3, 4]} />);
    const listView = screen.getByTestId('outerbox');
    fireEvent.scroll(listView, { target: { scrollY: 450 } });
    fireEvent.scroll(listView, { target: { scrollY: 0 } });
    expect(onLoadPrev).toHaveBeenCalledTimes(1);
    // should not call because props have not changed
    fireEvent.scroll(listView, { target: { scrollY: 450 } });
    fireEvent.scroll(listView, { target: { scrollY: 0 } });
    expect(onLoadPrev).toHaveBeenCalledTimes(1);
    // will call becuase props have changed.
    rerender(<TestComponent items={[1, 2, 3, 4, 5]} />);
    fireEvent.scroll(listView, { target: { scrollY: 450 } });
    fireEvent.scroll(listView, { target: { scrollY: 0 } });
    expect(onLoadPrev).toHaveBeenCalledTimes(2);
  });
});
