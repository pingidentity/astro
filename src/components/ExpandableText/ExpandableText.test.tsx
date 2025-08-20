import React from 'react';
import { fireEvent } from '@testing-library/react';
import useResizeObserver from 'use-resize-observer';

import { ExpandableTextProps } from '../../types';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import ExpandableText from './ExpandableText';

jest.mock('use-resize-observer', () => {
  return jest.fn(() => ({
    ref: jest.fn(), // a stub ref callback
    width: 300, // pretend container is 300px wide
  }));
});

const children = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const testId = 'test-text';

const defaultProps: ExpandableTextProps = {
  'data-testid': testId,
  //   children,
  maxLines: 2,
};

const getComponent = (props = {}, { renderFn = render } = {}) => (
  renderFn(<ExpandableText {...defaultProps} {...props}>{children}</ExpandableText>)
);

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => <ExpandableText {...defaultProps} {...props} />,
});

describe('ExpandableText', () => {
  it('renders children', () => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      get() {
        const text = this.innerText || '';
        const lineHeight = 20;
        const lines = Math.ceil(text.length / 50);
        return lines * lineHeight;
      },
    });
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({
        lineHeight: '20px',
      }),
    });
    getComponent();


    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(/View More/i);

    fireEvent.click(button);

    const expandableText = screen.getByText(children);
    expect(expandableText).toBeInTheDocument();
    expect(expandableText).toHaveAttribute('data-testid', testId);
  });

  it('expands and collapses text on button click', () => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      get() {
        const text = this.innerText || '';
        const lineHeight = 20;
        const lines = Math.ceil(text.length / 50);
        return lines * lineHeight;
      },
    });
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({
        lineHeight: '20px',
      }),
    });
    getComponent();


    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(/View More/i);

    fireEvent.click(button);
    expect(button).toHaveTextContent(/View Less/i);

    fireEvent.click(screen.getByRole('button'));
    expect(button).toHaveTextContent(/View More/i);
  });

  it('it rests the expansion state when resized', () => {
    getComponent();

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(button).toHaveTextContent(/View Less/i);

    const originalInnerWidth = window.innerWidth;

    window.innerWidth = originalInnerWidth + 100;
    fireEvent(window, new Event('resize'));

    expect(button).toHaveTextContent(/View More/i);

    window.innerWidth = originalInnerWidth;
  });

  it('truncates the text on resize when button is not expanded', () => {
    getComponent();

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(/View More/i);

    const originalInnerWidth = window.innerWidth;

    window.innerWidth = originalInnerWidth + 100;
    fireEvent(window, new Event('resize'));

    expect(button).toHaveTextContent(/View More/i);

    window.innerWidth = originalInnerWidth;
  });
});
