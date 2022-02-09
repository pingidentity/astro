import React from 'react';
import axeTest from '../../utils/testUtils/testAxe';
import { fireEvent, render, screen } from '../../utils/testUtils/testWrapper';

import OverlayPanel from './OverlayPanel';

const testId = 'test-overlayPanel';
const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props = {}) => render(<OverlayPanel {...defaultProps} {...props} />);

afterEach(() => {
  jest.restoreAllMocks();
});

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('default overlayPanel', () => {
  getComponent({ children: <div>Test</div> });
  const overlayPanel = screen.getByTestId(testId);
  const child = screen.queryByText('Test');
  expect(overlayPanel).toBeInTheDocument();
  expect(child).toBeInTheDocument();
});

test('custom overlayPanel gets custom width', () => {
  getComponent({ children: <div>Test</div>, sx: { width: '240px' } });
  const overlayPanel = screen.getByTestId(testId);
  expect(overlayPanel).toBeInTheDocument();
  expect(overlayPanel).toHaveStyleRule('width', '240px');
});


test('onClose callback fires when provided', () => {
  const onClose = jest.fn();
  getComponent({ onClose, children: <div >Test</div> });
  const overlayPanel = screen.getByTestId(testId);
  fireEvent.keyDown(overlayPanel, {
    key: 'Escape',
    code: 'Escape',
    keyCode: 27,
    charCode: 27,
  });
  fireEvent.keyUp(overlayPanel, {
    key: 'Escape',
    code: 'Escape',
    keyCode: 27,
    charCode: 27,
  });
  expect(onClose).toHaveBeenCalled();
});

test('custom classname can be passed', () => {
  getComponent({ className: 'testing-class' });
  const overlayPanel = screen.getByTestId(testId);
  expect(overlayPanel).toHaveClass('testing-class');
});


test('neither callback fires when not provided', () => {
  const onClose = jest.fn();
  getComponent({ children: <div>Test</div> });
  const overlayPanel = screen.getByTestId(testId);
  fireEvent.keyDown(overlayPanel, {
    key: 'Escape',
    code: 'Escape',
    keyCode: 27,
    charCode: 27,
  });
  fireEvent.keyUp(overlayPanel, {
    key: 'Escape',
    code: 'Escape',
    keyCode: 27,
    charCode: 27,
  });
  expect(onClose).not.toHaveBeenCalled();
});

test('triggerRef.current.focus() fires when provided', () => {
  const onClose = jest.fn();
  const focusFunction = jest.fn();
  const state = { close: onClose };
  const triggerRef = { current: { focus: focusFunction } };
  getComponent({ state, children: <div >Test</div>, triggerRef });
  const overlayPanel = screen.getByTestId(testId);
  fireEvent.keyDown(overlayPanel, {
    key: 'Escape',
    code: 'Escape',
    keyCode: 27,
    charCode: 27,
  });
  fireEvent.keyUp(overlayPanel, {
    key: 'Escape',
    code: 'Escape',
    keyCode: 27,
    charCode: 27,
  });
  expect(focusFunction).toHaveBeenCalled();
});

test('triggerRef.current.focus() does not fire when key other than esc is pressed', () => {
  const onClose = jest.fn();
  const focusFunction = jest.fn();
  const state = { close: onClose };
  const triggerRef = { current: { focus: focusFunction } };
  getComponent({ state, children: <div >Test</div>, triggerRef });
  const overlayPanel = screen.getByTestId(testId);
  fireEvent.keyDown(overlayPanel, {
    key: 'KeyA',
    code: 'KeyA',
    keyCode: 65,
    charCode: 65,
  });
  fireEvent.keyUp(overlayPanel, {
    key: 'KeyA',
    code: 'KeyA',
    keyCode: 65,
    charCode: 65,
  });
  expect(focusFunction).not.toHaveBeenCalled();
});
