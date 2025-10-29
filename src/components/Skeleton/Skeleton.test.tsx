import React from 'react';

import { SkeletonProps } from '../../types';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import Box from '../Box';

import Skeleton from '.';

let offsetHeight;
let offsetWidth;

const testId = 'test-skeleton';

const defaultProps: SkeletonProps = {
  'data-testid': testId,
};

const getComponent = (props = {}) => render(
  <Skeleton {...defaultProps} {...props} />,
);

const getComponentWithChild = (props = {}) => render(
  <Skeleton {...defaultProps} {...props}>
    <Box height={100} width={200}>.</Box>
  </Skeleton>,
);

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <Skeleton {...defaultProps} {...props} /> });

describe('Skeleton component', () => {
  beforeAll(() => {
    offsetWidth = jest
      .spyOn(window.HTMLElement.prototype, 'clientWidth', 'get')
      .mockImplementation(() => 1000);
    offsetHeight = jest
      .spyOn(window.HTMLElement.prototype, 'clientHeight', 'get')
      .mockImplementation(() => 1000);
    jest.useFakeTimers();
  });

  afterAll(() => {
    offsetWidth.mockReset();
    offsetHeight.mockReset();
  });

  test('renders Skeleton component', () => {
    getComponent({ role: 'presentation' });
    const skeleton = screen.getByTestId(testId);
    expect(skeleton).toBeInstanceOf(HTMLDivElement);
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute('role', 'presentation');
  });

  test('applies custom className if provided', () => {
    getComponent({ className: 'custom-class' });
    const skeleton = screen.getByTestId(testId);
    expect(skeleton).toHaveClass('custom-class');
  });

  test('applies default animation', () => {
    getComponent();
    const skeleton = screen.getByTestId(testId);
    expect(skeleton).toHaveClass('is-pulsate');
  });

  test('when variant is passed', () => {
    getComponent({ width: '40px', height: '40px', variant: 'circular' });
    const skeleton = screen.getByTestId(testId);
    expect(skeleton).toHaveStyle('border-radius: 50%');
  });

  test('when style object is passed', () => {
    getComponent({ width: '40px', height: '40px', variant: 'circular', sx: { bg: 'red' } });
    const skeleton = screen.getByTestId(testId);
    expect(skeleton).toHaveStyle('background: red');
  });

  test('when fontSize is passed', () => {
    getComponent({ variant: 'text', fontSize: '16px' });
    const skeleton = screen.getByTestId(testId);
    expect(skeleton).toHaveStyle('height: 16px');
  });

  test('check the inferrer dimensions', () => {
    const originalOffsetHeight = Object.getOwnPropertyDescriptor(
      window.HTMLDivElement.prototype,
      'offsetHeight',
    );
    const originalOffsetWidth = Object.getOwnPropertyDescriptor(
      window.HTMLDivElement.prototype,
      'offsetWidth',
    );

    Object.defineProperties(window.HTMLDivElement.prototype, {
      offsetHeight: {
        get() {
          return this.tagName === 'DIV' ? 100 : 500;
        },
      },
      offsetWidth: {
        get() {
          return this.tagName === 'DIV' ? 200 : 500;
        },
      },
    });

    getComponentWithChild({ variant: 'rounded' });
    const skeleton = screen.getByTestId(testId);

    expect(skeleton).toHaveStyle('height: 100px');
    expect(skeleton).toHaveStyle('width: 200px');

    if (originalOffsetHeight) {
      Object.defineProperty(
        window.HTMLDivElement.prototype,
        'offsetHeight',
        originalOffsetHeight,
      );
    }
    if (originalOffsetWidth) {
      Object.defineProperty(
        window.HTMLDivElement.prototype,
        'offsetWidth',
        originalOffsetWidth,
      );
    }
  });
});
