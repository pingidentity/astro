import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

interface ComponentWithRefProps {
  renderComponent: ({ ref }) => ReactNode
}

const ComponentWithRef = ({ renderComponent }: ComponentWithRefProps) => {
  const testRef = React.createRef<HTMLElement>();

  return renderComponent({ ref: testRef });
};

export const universalComponentTests = async ({ renderComponent, rules = {} }) => {
  describe('Universal Component Tests', () => {
    test('should have no accessibility violations', async () => {
      jest.useRealTimers();

      const { container } = render(renderComponent());
      const results = await axe(container, { rules });
      jest.useFakeTimers();
      expect(results).toHaveNoViolations();
    });

    test('should forward refs properly', () => {
      const testRef = React.createRef<HTMLElement>();
      expect(() => {
        render(renderComponent({ ref: testRef }));
      }).not.toThrow();
    });
  });
};
