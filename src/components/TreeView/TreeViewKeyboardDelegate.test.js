import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { isIterableProp } from '../../utils/devUtils/props/isIterable';
import { fireEvent, render, screen } from '../../utils/testUtils/testWrapper';

import { onKeyDownItem } from './TreeViewItem';
import { onLeftPress } from './TreeViewKeyboardDelegate';
import { onKeyDownSection } from './TreeViewSection';

const testId = 'test-keyboard-tree';
const toggleKey = jest.fn();
const setSelectedKeys = jest.fn();
const focusPrevious = jest.fn();
const focusNext = jest.fn();
const refFocus = jest.fn();

const state = {
  toggleKey,
};

const tree = {
  setSelectedKeys,
};

const focusManager = {
  focusPrevious,
  focusNext,
};

export const refArray = [
  {
    key: 'testprior',
    thisRef: {
      current: {
        focus: refFocus,
      },
    },
  },
  {
    key: 'test',
    thisRef: {
      current: {
        focus: refFocus,
      },
    },
  },
  {
    key: 'testsecond',
    thisRef: {
      current: {
        focus: refFocus,
      },
    },
  },
];

export const flatKeyArray = [
  {
    key: 'testprior',
  },
  {
    key: 'test',
  },
  {
    key: 'testsecond',
  },
];

const defaultProps = {
  'data-testid': testId,
  focusManager,
  state,
  tree,
  key: 'test',
  flatKeyArray,
  refArray,
};

const TestComponent = props => {
  const {
    focusManager: focusManagerProp,
    state: stateProp,
    tree: treeProp,
    isSelected,
    isExpanded,
    isInRefArray = true,
    flatKeyArray: flatKeyArrayProp,
    refArray: refArrayProp,
  } = props;

  const thisRef = useRef(null);

  const testOnKeyDown = e => {
    props.onKeyDown(e, stateProp, 'test', treeProp, isSelected, isExpanded, focusManagerProp, flatKeyArrayProp, refArrayProp, 5, true);
  };

  const testOnKeyDownAddRef = e => {
    props.onKeyDown(e, stateProp, 'test', treeProp, isSelected, isExpanded, focusManagerProp, flatKeyArrayProp, [...refArrayProp, { key: 'button', thisRef }], 5, true);
  };

  return (
    <div>
      <button
        ref={thisRef}
        onKeyDown={e => (isInRefArray
          ? testOnKeyDownAddRef(e)
          : testOnKeyDown(e))}
      >
        let us test keypresses
      </button>
    </div>
  );
};

TestComponent.propTypes = {
  isInRefArray: PropTypes.bool,
  isEventTargetAKey: PropTypes.bool,
  state: PropTypes.shape({
    toggleKey: PropTypes.func,
  }),
  tree: PropTypes.shape({
    setSelectedKeys: PropTypes.func,
  }),
  focusManager: PropTypes.shape({
    focusPrevious: PropTypes.func,
    focusNext: PropTypes.func,
  }),
  isExpanded: PropTypes.bool,
  isSelected: PropTypes.bool,
  onKeyDown: PropTypes.func,
  flatKeyArray: isIterableProp,
  refArray: isIterableProp,
};


const getComponent = (props = {}) => render((
  <TestComponent {...defaultProps} {...props} />
));

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

test('OnEnterPress calls when enter is pressed', () => {
  getComponent({ onKeyDown: onKeyDownSection });
  const button = screen.getByRole('button');
  fireEvent.keyDown(button, { key: 'Enter', keyCode: 13 });
  fireEvent.keyUp(button, { key: 'Enter', keyCode: 13 });
  expect(toggleKey).toHaveBeenCalled();
});

test('onSpacePress calls when space is pressed', () => {
  getComponent({ onKeyDown: onKeyDownSection });
  const button = screen.getByRole('button');
  fireEvent.keyDown(button, { key: 'Space', keyCode: 32 });
  fireEvent.keyUp(button, { key: 'Space', keyCode: 32 });
  expect(setSelectedKeys).toHaveBeenCalled();
});

test('onSpacePress calls when space is pressed, and selected', () => {
  getComponent({ onKeyDown: onKeyDownSection, isSelected: true });
  const button = screen.getByRole('button');
  fireEvent.keyDown(button, { key: 'Space', keyCode: 32 });
  fireEvent.keyUp(button, { key: 'Space', keyCode: 32 });
  expect(setSelectedKeys).toHaveBeenCalled();
});

test('onSpacePress calls when space is pressed, item', () => {
  getComponent({ onKeyDown: onKeyDownItem, isInRefArray: false });
  const button = screen.getByRole('button');
  fireEvent.keyDown(button, { key: 'Space', keyCode: 32 });
  fireEvent.keyUp(button, { key: 'Space', keyCode: 32 });
  expect(setSelectedKeys).toHaveBeenCalled();
});

test('onLeftPress calls when Left Arrow is pressed and expanded', () => {
  getComponent({ isExpanded: true, onKeyDown: onKeyDownSection, isInRefArray: false });
  const button = screen.getByRole('button');
  fireEvent.keyDown(button, { key: 'ArrowLeft', keyCode: 37 });
  fireEvent.keyUp(button, { key: 'ArrowLeft', keyCode: 37 });
  expect(toggleKey).not.toHaveBeenCalled();
  expect(focusPrevious).toHaveBeenCalled();
});

test('onLeftPress does not call when Left Arrow is pressed and NOT expanded', () => {
  getComponent({ onKeyDown: onKeyDownSection });
  const button = screen.getByRole('button');
  fireEvent.keyDown(button, { key: 'ArrowLeft', keyCode: 37 });
  fireEvent.keyUp(button, { key: 'ArrowLeft', keyCode: 37 });
  expect(toggleKey).not.toHaveBeenCalled();
  expect(focusPrevious).not.toHaveBeenCalled();
});

test('onRightPress calls when Right Arrow is pressed and NOT expanded', () => {
  getComponent({ onKeyDown: onKeyDownSection, isInRefArray: false });
  const button = screen.getByRole('button');
  fireEvent.keyDown(button, { key: 'ArrowRight', keyCode: 39 });
  fireEvent.keyUp(button, { key: 'ArrowRight', keyCode: 39 });
  expect(toggleKey).toHaveBeenCalled();
  expect(focusNext).not.toHaveBeenCalled();
});

test('onRightPress calls correct callback when Right Arrow is pressed and expanded', () => {
  getComponent({ onKeyDown: onKeyDownSection, isExpanded: true, isInRefArray: false });
  const button = screen.getByRole('button');
  fireEvent.keyDown(button, { key: 'ArrowRight', keyCode: 39 });
  fireEvent.keyUp(button, { key: 'ArrowRight', keyCode: 39 });
  expect(toggleKey).not.toHaveBeenCalled();
  expect(focusNext).not.toHaveBeenCalled();
});

test('onLeftPress calls when Left Arrow is pressed and expanded', () => {
  getComponent({ isExpanded: true, onKeyDown: onKeyDownSection });
  const button = screen.getByRole('button');
  fireEvent.keyDown(button, { key: 'ArrowRight', keyCode: 39 });
  fireEvent.keyUp(button, { key: 'ArrowRight', keyCode: 39 });
  expect(toggleKey).not.toHaveBeenCalled();
});

test('onDownPress calls when down Arrow is pressed and expanded', () => {
  getComponent({ onKeyDown: onKeyDownSection });
  const button = screen.getByRole('button');
  fireEvent.keyDown(button, { key: 'ArrowDown', keyCode: 40 });
  fireEvent.keyUp(button, { key: 'ArrowDown', keyCode: 40 });
  expect(refFocus).toHaveBeenCalled();
});

test('nothing happens when a unspecified key is pressed', () => {
  getComponent({ onKeyDown: onKeyDownSection });
  const button = screen.getByRole('button');
  fireEvent.keyDown(button, { key: 'a', keyCode: 65 });
  fireEvent.keyUp(button, { key: 'a', keyCode: 65 });
  expect(refFocus).not.toHaveBeenCalled();
  expect(focusNext).not.toHaveBeenCalled();
  expect(focusPrevious).not.toHaveBeenCalled();
  expect(setSelectedKeys).not.toHaveBeenCalled();
  expect(toggleKey).not.toHaveBeenCalled();
});

test('onUpPress calls when down Arrow is pressed and expanded', () => {
  getComponent({ onKeyDown: onKeyDownSection });
  const button = screen.getByRole('button');
  fireEvent.keyDown(button, { key: 'ArrowUp', keyCode: 38 });
  fireEvent.keyUp(button, { key: 'ArrowUp', keyCode: 38 });
  expect(refFocus).toHaveBeenCalled();
});

test('onUpPress calls when down Arrow is pressed and expanded for items', () => {
  getComponent({ onKeyDown: onKeyDownItem });
  const button = screen.getByRole('button');
  fireEvent.keyDown(button, { key: 'ArrowUp', keyCode: 38 });
  fireEvent.keyUp(button, { key: 'ArrowUp', keyCode: 38 });
  expect(refFocus).toHaveBeenCalled();
});

test('onPageUpPress calls when page up is pressed', () => {
  getComponent({ onKeyDown: onKeyDownItem });
  const button = screen.getByRole('button');
  fireEvent.keyDown(button, { key: 'PageUp', keyCode: 33 });
  fireEvent.keyUp(button, { key: 'PageUp', keyCode: 33 });
  expect(refFocus).toHaveBeenCalled();
});

test('onPageUpPress calls when page up is pressed, on section', () => {
  getComponent({ onKeyDown: onKeyDownSection });
  const button = screen.getByRole('button');
  fireEvent.keyDown(button, { key: 'PageUp', keyCode: 33 });
  fireEvent.keyUp(button, { key: 'PageUp', keyCode: 33 });
  expect(refFocus).toHaveBeenCalled();
});

test('onPageDownPress calls when page up is pressed', () => {
  getComponent({ onKeyDown: onKeyDownItem });
  const button = screen.getByRole('button');
  fireEvent.keyDown(button, { key: 'PageDown', keyCode: 34 });
  fireEvent.keyUp(button, { key: 'PageDown', keyCode: 34 });
  expect(refFocus).toHaveBeenCalled();
});

test('onPageDownPress calls when page up is pressed, on section', () => {
  getComponent({ onKeyDown: onKeyDownSection });
  const button = screen.getByRole('button');
  fireEvent.keyDown(button, { key: 'PageDown', keyCode: 34 });
  fireEvent.keyUp(button, { key: 'PageDown', keyCode: 34 });
  expect(refFocus).toHaveBeenCalled();
});

test('onDownPress calls when down Arrow is pressed and expanded, for items', () => {
  getComponent({ onKeyDown: onKeyDownItem });
  const button = screen.getByRole('button');
  fireEvent.keyDown(button, { key: 'ArrowDown', keyCode: 40 });
  fireEvent.keyUp(button, { key: 'ArrowDown', keyCode: 40 });
  expect(refFocus).toHaveBeenCalled();
});

test('onTabPress calls correct callbacks', () => {
  getComponent({ onKeyDown: onKeyDownItem });
  const button = screen.getByRole('button');
  fireEvent.keyDown(button, { key: 'Tab', keyCode: 9 });
  fireEvent.keyUp(button, { key: 'Tab', keyCode: 9 });
  expect(focusNext).not.toHaveBeenCalled();
});

test('onTabPress calls correct callbacks', () => {
  getComponent({ onKeyDown: onKeyDownSection });
  const button = screen.getByRole('button');
  fireEvent.keyDown(button, { key: 'Tab', keyCode: 9 });
  fireEvent.keyUp(button, { key: 'Tab', keyCode: 9 });
  expect(focusNext).toHaveBeenCalled();
});

test('onEndPress calls correct callbacks', () => {
  getComponent({ onKeyDown: onKeyDownSection });
  const button = screen.getByRole('button');
  fireEvent.keyDown(button, { key: 'End', keyCode: 35 });
  fireEvent.keyUp(button, { key: 'End', keyCode: 35 });
  expect(refFocus).toHaveBeenCalled();
});

test('onEndPress calls correct callbacks', () => {
  getComponent({ onKeyDown: onKeyDownItem });
  const button = screen.getByRole('button');
  fireEvent.keyDown(button, { key: 'End', keyCode: 35 });
  fireEvent.keyUp(button, { key: 'End', keyCode: 35 });
  expect(refFocus).toHaveBeenCalled();
});

test('onHomePress calls correct callbacks', () => {
  getComponent({ onKeyDown: onKeyDownSection });
  const button = screen.getByRole('button');
  fireEvent.keyDown(button, { key: 'Home', keyCode: 36 });
  fireEvent.keyUp(button, { key: 'Home', keyCode: 36 });
  expect(refFocus).toHaveBeenCalled();
});

test('onHomePress calls correct callbacks', () => {
  getComponent({ onKeyDown: onKeyDownItem });
  const button = screen.getByRole('button');
  fireEvent.keyDown(button, { key: 'Home', keyCode: 36 });
  fireEvent.keyUp(button, { key: 'Home', keyCode: 36 });
  expect(refFocus).toHaveBeenCalled();
});

test('onLeftPress calls correct callbacks, when correct props are provided', () => {
  const thisRefArray = [
    {
      thisRef: {
        current: 'test target',
      },
    },
  ];
  const thisEvent = {
    target: 'test target',
    preventDefault: () => jest.fn(),
    stopPropagation: () => jest.fn(),
  };
  onLeftPress(thisEvent, focusManager, state, 'test', true, thisRefArray);
  expect(toggleKey).toHaveBeenCalled();
});
