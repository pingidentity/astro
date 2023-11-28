import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

const HAS_REF = 'ref';

interface ComponentWithRefProps {
  renderComponent: ({ ref }) => ReactNode
}

const ComponentWithRef = ({ renderComponent }: ComponentWithRefProps) => {
  const [state, setState] = useState(null);
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    setState(ref.current);
  }, []);

  return (
    <>
      {renderComponent({ ref })}
      {state && HAS_REF}
    </>
  );
};

export const universalComponentTests = async ({ renderComponent, props, rules = {} }) => {
  test('should have no accessibility violations', async () => {
    jest.useRealTimers();

    const { container } = render(renderComponent(props));
    const results = await axe(container, rules);

    expect(results).toHaveNoViolations();
  });

  test('should forward refs properly', () => {
    render(<ComponentWithRef renderComponent={renderComponent} />);
    screen.getByText(HAS_REF);
  });
};
