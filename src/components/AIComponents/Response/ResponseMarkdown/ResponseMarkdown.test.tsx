import React from 'react';

import { act, render, screen } from '../../../../utils/testUtils/testWrapper';
import Response from '../Response';

import ResponseMarkdown from './ResponseMarkdown';

const markdownString = '#Heading\n\n1. First item\n\n  - Unordered item\n\n **bold**:not bold';
const italics = '*Italics* regular';
const secondMarkDownString = 'begin\n\n1. **Timestamp:** 2025-02-13T09:25:55.946Z\n   - **User:** bbludis476@gmail.com\n   - **Action:** User Access Allowed\n   - **Status:** SUCCESS\n\n2. **Timestamp:** 2025-02-13T09:25:52.377Z\n   - **User:** bbludis476@gmail.com\n   - **Action:** User Access Allowed\n   - **What:** SUCCESS';

const getComponent = (props = {}) => render(
  <Response {...props} delay={10}>
    <ResponseMarkdown str={markdownString} />
  </Response>,
);

const getComponentWithNesting = (props = {}) => render(
  <Response {...props} delay={10}>
    <ResponseMarkdown str={secondMarkDownString} />
  </Response>,
);

const getComponentItalics = (props = {}) => render(
  <Response {...props} delay={10}>
    <ResponseMarkdown str={italics} />
  </Response>,
);

beforeEach(() => {
  jest.useFakeTimers();
});

test('renders markdown content correctly', () => {
  getComponent();
  for (let i = 0; i < 8 + 1; i += 1) {
    act(() => { jest.advanceTimersByTime(10); });
  }
  expect(screen.queryByText('Heading')).toBeInTheDocument();

  for (let i = 0; i < 10 + 1; i += 1) {
    act(() => { jest.advanceTimersByTime(10); });
  }
  expect(screen.getByText('First item')).toBeInTheDocument();

  for (let i = 0; i < 15; i += 1) {
    act(() => { jest.advanceTimersByTime(10); });
  }
  expect(screen.getByText('Unordered item')).toBeInTheDocument();

  for (let i = 0; i < 13; i += 1) {
    act(() => { jest.advanceTimersByTime(10); });
  }
  expect(screen.getByText('bold')).toBeInTheDocument();
  expect(screen.getByText(':not bold')).toBeInTheDocument();
});

test('renders nested markdown content correctly', () => {
  getComponentWithNesting();

  for (let i = 0; i < 300; i += 1) {
    act(() => { jest.advanceTimersByTime(10); });
  }
  expect(screen.getByText('What:')).toBeInTheDocument();
});

test('renders nested markdown content correctly', () => {
  getComponentItalics();

  for (let i = 0; i < 15; i += 1) {
    act(() => { jest.advanceTimersByTime(10); });
  }
  expect(screen.getByText('Italics')).toBeInTheDocument();
});
