import React from 'react';
import AccountGroupIcon from '@pingux/mdi-react/AccountGroupIcon';
import AccountIcon from '@pingux/mdi-react/AccountIcon';
import LockIcon from '@pingux/mdi-react/LockIcon';
import SearchIcon from '@pingux/mdi-react/SearchIcon';
import TagIcon from '@pingux/mdi-react/TagIcon';

import { act, render, screen } from '../../../utils/testUtils/testWrapper';

import Response from './Response';
import ResponseAttachment from './ResponseAttachment';
import ResponseList from './ResponseList';
import ResponseText from './ResponseText';
import ResponseToolbar from './ResponseToolbar';

const delay = 100;

const headingText = 'heading';

const listItem1 = 'list item 1';
const listItem2 = 'list item 2';
const listItem3 = 'list item 3';
const nextText = 'nextText';
const attachmentWrapperId = 'wrapper-id';
const toolbarId = 'id';

const customProps = {
  readButtonProps: {
    title: 'Read aloud test',
    icon: AccountGroupIcon,
  },
  copyButtonProps: {
    title: 'Copy test',
    icon: AccountIcon,
  },
  goodButtonProps: {
    title: 'Good Response test',
    icon: LockIcon,
  },
  badButtonProps: {
    title: 'Bad Response test',
    icon: SearchIcon,
  },
  rephraseButtonProps: {
    title: 'Rephrase Answer test',
    icon: TagIcon,
  },
};

const defaultProps = {
  containerProps: {
    'data-testid': 'container',
  },
  text: 'Hello',
  delay,
};

beforeEach(() => {
  jest.useFakeTimers();
});

const getComponent = props => render(
  <Response {...defaultProps} {...props}>
    <ResponseText text={defaultProps.text} />
  </Response>,
);

const getComponentWithList = props => render(
  <Response {...defaultProps} {...props}>
    <ResponseText text={headingText} delay={delay} />
    <ResponseList as="ul">
      <ResponseText as="li" text={listItem1} />
      <ResponseText as="li" text={listItem2} />
      <ResponseText as="li" text={listItem3} />
    </ResponseList>
    <ResponseText text={nextText} />
  </Response>,
);

const getComponentWithToolbar = props => render(
  <Response {...defaultProps} {...props}>
    <ResponseText text={defaultProps.text} />
    <ResponseToolbar data-testid={toolbarId} />
  </Response>,
);

const getComponentWithAttachment = props => render(
  <Response {...defaultProps} {...props}>
    <ResponseText text={defaultProps.text} />
    <ResponseAttachment wrapperProps={{ 'data-testid': attachmentWrapperId }} />
    <ResponseText text={defaultProps.text} />
  </Response>,
);

const getComponentWithToolbarCustomProps = props => render(
  <Response {...defaultProps} {...props}>
    <ResponseText text={defaultProps.text} />
    <ResponseToolbar data-testid={toolbarId} {...customProps} />
  </Response>,
);

test('component renders', () => {
  getComponent();
  const container = screen.getByTestId('container');

  expect(container).toBeInTheDocument();
});

test('delay prop works correctly', async () => {
  getComponent();

  expect(screen.queryByText(defaultProps.text)).not.toBeInTheDocument();
  for (let i = 1; i < defaultProps.text.length + 1; i += 1) {
    act(() => { jest.advanceTimersByTime(100); });
    expect(screen.queryByText(defaultProps.text.slice(0, i))).toBeInTheDocument();
  }
  expect(screen.queryByText(defaultProps.text)).toBeInTheDocument();
});

test('delay prop works correctly, with list', async () => {
  getComponentWithList();

  expect(screen.queryByText(headingText)).not.toBeInTheDocument();
  for (let i = 1; i < headingText.length + 1; i += 1) {
    act(() => { jest.advanceTimersByTime(100); });
    expect(screen.queryByText(headingText.slice(0, i))).toBeInTheDocument();
  }
  expect(screen.queryByText(headingText)).toBeInTheDocument();

  // advance through the listItems
  for (let i = 1; i < (listItem1.length * 3) + 1; i += 1) {
    act(() => { jest.advanceTimersByTime(100); });
  }
  expect(screen.queryByText(nextText)).not.toBeInTheDocument();

  // ensure that the subsequent text renders correctly
  for (let i = 1; i < nextText.length + 1; i += 1) {
    act(() => { jest.advanceTimersByTime(100); });
    expect(screen.queryByText(nextText.slice(0, i))).toBeInTheDocument();
  }
  expect(screen.queryByText(nextText)).toBeInTheDocument();
});

test('default delay prop works correctly', async () => {
  render(
    <Response {...defaultProps} delay={undefined}>
      <ResponseText text={defaultProps.text} />
    </Response>,
  );

  expect(screen.queryByText(defaultProps.text)).not.toBeInTheDocument();
  for (let i = 1; i < defaultProps.text.length + 1; i += 1) {
    act(() => { jest.advanceTimersByTime(10); });
    expect(screen.queryByText(defaultProps.text.slice(0, i))).toBeInTheDocument();
  }
  expect(screen.queryByText(defaultProps.text)).toBeInTheDocument();
});

test('ResponseToolbar renders correctly', async () => {
  getComponentWithToolbar();

  const toolbar = screen.getByTestId(toolbarId);
  expect(toolbar).toHaveClass('is-not-loaded');

  for (let i = 1; i < defaultProps.text.length + 1; i += 1) {
    act(() => { jest.advanceTimersByTime(100); });
  }
  expect(toolbar).not.toHaveClass('is-not-loaded');
});

test('ResponseAttachment renders correctly', async () => {
  getComponentWithAttachment();
  act(() => { jest.advanceTimersByTime(10); });

  expect(screen.getByText('Attachment text')).toBeInTheDocument();
  const wrapper = screen.getByTestId(attachmentWrapperId);
  expect(wrapper).toHaveClass('is-not-loaded');
  for (let i = 1; i < defaultProps.text.length + 1; i += 1) {
    act(() => { jest.advanceTimersByTime(100); });
  }
  expect(wrapper).not.toHaveClass('is-not-loaded');
});

test('ResponseAttachment renders correctly, with custom props', async () => {
  getComponentWithToolbarCustomProps();
  act(() => { jest.advanceTimersByTime(10); });

  expect(screen.getByTitle('Read aloud test')).toBeInTheDocument();
  expect(screen.getByTitle('Copy test')).toBeInTheDocument();
  expect(screen.getByTitle('Good Response test')).toBeInTheDocument();
  expect(screen.getByTitle('Bad Response test')).toBeInTheDocument();
  expect(screen.getByTitle('Rephrase Answer test')).toBeInTheDocument();
});

test('ResponseToolbar conditional rendering of IconButton based on title prop', async () => {
  render(
    <Response {...defaultProps}>
      <ResponseText text={defaultProps.text} />
      <ResponseToolbar
        data-testid={toolbarId}
        readButtonProps={{ title: 'Read aloud' }}
        copyButtonProps={{ title: '' }}
        goodButtonProps={{ title: 'Good Response' }}
        badButtonProps={{ title: '' }}
        rephraseButtonProps={{ title: 'Rephrase Answer' }}
      />
    </Response>,
  );

  expect(screen.getByTitle('Read aloud')).toBeInTheDocument();
  expect(screen.queryByTitle('Copy')).not.toBeInTheDocument();
  expect(screen.getByTitle('Good Response')).toBeInTheDocument();
  expect(screen.queryByTitle('Bad Response')).not.toBeInTheDocument();
  expect(screen.getByTitle('Rephrase Answer')).toBeInTheDocument();
});
