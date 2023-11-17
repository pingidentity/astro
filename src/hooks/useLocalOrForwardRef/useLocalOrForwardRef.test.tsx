import React, { forwardRef, useEffect, useRef } from 'react';
import { useFocusRing } from 'react-aria';
import { render, screen } from '@testing-library/react';

import { useStatusClasses } from '../index';

import useLocalOrForwardRef from './useLocalOrForwardRef';

const HAS_REF = 'hasRef';

const ForwardRefComponent = forwardRef((props, ref: React.Ref<HTMLButtonElement>) => {
  const localOrForwardRef = useLocalOrForwardRef<HTMLButtonElement>(ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  const { classNames } = useStatusClasses('className', {
    isFocused: isFocusVisible,
  });

  return (
    <button
      className={classNames}
      ref={localOrForwardRef}
      type="button"
      {...focusProps}
      {...props}
    >
      {localOrForwardRef && HAS_REF}
    </button>
  );
});

const TestComponentWithRef = () => {
  const parentRef = useRef({} as HTMLButtonElement);

  useEffect(() => {
    if (!parentRef.current) return;
    parentRef.current.focus();
  }, []);

  return (<ForwardRefComponent ref={parentRef} />);
};
const getComponentWithRef = () => render(<TestComponentWithRef />);

const TestComponentWithoutRef = () => <ForwardRefComponent />;
const getComponentWithoutRef = () => render(<TestComponentWithoutRef />);

describe('localOrForwardRef', () => {
  describe('When the test component has been provided a forward ref', () => {
    test('it has a valid ref', () => {
      getComponentWithRef();

      screen.getByText(HAS_REF);
    });

    test('the test component can access the refs properties', () => {
      getComponentWithRef();

      const button = screen.getByRole('button');
      expect(button).toHaveClass('is-focused');
    });
  });

  describe('When the test component has not been provided a forward ref', () => {
    test('it has a valid ref', () => {
      getComponentWithoutRef();

      screen.getByText(HAS_REF);
    });
  });
});
