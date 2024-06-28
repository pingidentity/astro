import React from 'react';
import { Time } from '@internationalized/date';

import { parseTimeIfString, TimeField } from '../../index';
import {
  act,
  fireEvent,
  render,
  screen,
} from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';


const getComponent = (props = {}) => render(
  <TimeField
    {...props}
    aria-label="TimeField"
  />,
);

// Needs to be added to each components test file.
universalComponentTests({ renderComponent: props => <TimeField {...props} aria-label="TimeField" /> });

test('renders TimeField component', () => {
  getComponent();
  expect(screen.getByRole('group')).toBeInTheDocument();
});

test('renders the correct number of time segments', () => {
  getComponent();
  const timeSegments = screen.getAllByRole('spinbutton');
  expect(timeSegments.length).toBe(3);
});

test('renders the correct number of time segments when granularity is set to seconds', () => {
  getComponent({ granularity: 'second' });
  const timeSegments = screen.getAllByRole('spinbutton');
  expect(timeSegments.length).toBe(4);
});

test('renders the correct number of time segments when hourCycle is set to 24', () => {
  getComponent({ hourCycle: 24 });
  const timeSegments = screen.getAllByRole('spinbutton');
  expect(timeSegments.length).toBe(2);
});

test('renders the correct number of time segments when hourCycle is set to 24 and granularity is set to seconds', () => {
  getComponent({ hourCycle: 24, granularity: 'second' });
  const timeSegments = screen.getAllByRole('spinbutton');
  expect(timeSegments.length).toBe(3);
});

test('renders the correct time with defaultValue', () => {
  const defaultValue = new Time(3);
  getComponent({ defaultValue });
  const timeSegments = screen.getAllByRole('spinbutton');
  expect(timeSegments[0]).toHaveTextContent('3');
  expect(timeSegments[1]).toHaveTextContent('00');
  expect(timeSegments[2]).toHaveTextContent('AM');
});

test('renders the correct time with controlled value', () => {
  const value = new Time(3);
  getComponent({ value });
  const timeSegments = screen.getAllByRole('spinbutton');
  expect(timeSegments[0]).toHaveTextContent('3');
  expect(timeSegments[1]).toHaveTextContent('00');
  expect(timeSegments[2]).toHaveTextContent('AM');
});

test('renders TimeField component with isDisabled', () => {
  getComponent({ isDisabled: true });
  const timeSegments = screen.getAllByRole('spinbutton');
  timeSegments.forEach(segment => {
    expect(segment).toHaveAttribute('aria-disabled', 'true');
  });
});

test('renders TimeField component with isReadOnly', () => {
  getComponent({ isReadOnly: true });
  const timeSegments = screen.getAllByRole('spinbutton');
  timeSegments.forEach(segment => {
    expect(segment).toHaveAttribute('aria-readonly', 'true');
  });
});


test('should handle autofocus when deleting segments from left to right', () => {
  const defaultValue = new Time(12, 30);
  getComponent({ defaultValue });
  const timeSegments = screen.queryAllByRole('spinbutton');
  const hour = timeSegments[0];
  const minute = timeSegments[1];
  const period = timeSegments[2];

  expect(hour).toHaveTextContent('12');
  expect(minute).toHaveTextContent('30');
  expect(period).toHaveTextContent('PM');


  act(() => {
    hour.focus();
  });

  for (let i = 0; i < 2; i += 1) {
    fireEvent.keyDown(hour, { key: 'Backspace' });
    fireEvent.keyUp(hour, { key: 'Backspace' });
  }
  expect(minute).toHaveFocus();
});

test('should handle autofocus when deleting segments from right to left', () => {
  const defaultValue = new Time(12, 30);
  getComponent({ defaultValue });
  const timeSegments = screen.queryAllByRole('spinbutton');
  const hour = timeSegments[0];
  const minute = timeSegments[1];
  const period = timeSegments[2];

  expect(hour).toHaveTextContent('12');
  expect(minute).toHaveTextContent('30');
  expect(period).toHaveTextContent('PM');


  act(() => {
    minute.focus();
  });

  for (let i = 0; i < 2; i += 1) {
    fireEvent.keyDown(minute, { key: 'Backspace' });
    fireEvent.keyUp(minute, { key: 'Backspace' });
  }
  expect(hour).toHaveFocus();
});

describe('parseTimeIfString', () => {
  it('should parse a time with only hours', () => {
    const time = parseTimeIfString('14');
    const expected = new Time(14);
    expect(time).toEqual(expected);
  });

  it('should parse a padded time with only hours', () => {
    const time = parseTimeIfString('04');
    const expected = new Time(4);
    expect(time).toEqual(expected);
  });

  it('should parse a time with hours and minutes', () => {
    const time = parseTimeIfString('14:05');
    const expected = new Time(14, 5);
    expect(time).toEqual(expected);
  });

  it('should parse a time with hours, minutes, and seconds', () => {
    const time = parseTimeIfString('14:05:25');
    const expected = new Time(14, 5, 25);
    expect(time).toEqual(expected);
  });

  it('should parse a time with hours, minutes, seconds, and milliseconds', () => {
    let time = parseTimeIfString('14:05:25.1');
    let expected = new Time(14, 5, 25, 100);
    expect(time).toEqual(expected);

    time = parseTimeIfString('14:05:25.12');
    expected = new Time(14, 5, 25, 120);
    expect(time).toEqual(expected);
  });

  it('should error if time is not padded', () => {
    expect(() => parseTimeIfString('1')).toThrow();
    expect(() => parseTimeIfString('01:4')).toThrow();
  });

  it('should error if components are out of range', () => {
    expect(() => parseTimeIfString('45:23')).toThrow();
    expect(() => parseTimeIfString('12:99')).toThrow();
    expect(() => parseTimeIfString('12:45:99')).toThrow();
  });
});
