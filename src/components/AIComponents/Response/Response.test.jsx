import React from 'react';
import CopyIcon from '@pingux/mdi-react/ContentCopyIcon';
import TextIcon from '@pingux/mdi-react/TextIcon';
import ThumbDownOutlineIcon from '@pingux/mdi-react/ThumbDownOutlineIcon';
import ThumbUpOutlineIcon from '@pingux/mdi-react/ThumbUpOutlineIcon';
import VolumeHighIcon from '@pingux/mdi-react/VolumeHighIcon';

import { act, render, screen } from '../../../utils/testUtils/testWrapper';

import Response from './Response';
import ResponseAttachment from './ResponseAttachment';
import ResponseList from './ResponseList';
import ResponseText from './ResponseText';
import ResponseToolbar from './ResponseToolbar';
import ResponseToolBarIcon from './ResponseToolbarIcon';

const delay = 100;

const headingText = 'heading';

const listItem1 = 'list item 1';
const listItem2 = 'list item 2';
const listItem3 = 'list item 3';
const nextText = 'nextText';
const attachmentWrapperId = 'wrapper-id';
const toolbarId = 'id';

const attachmentText = 'Attachment Text';

const icons = [{
  title: 'Read aloud test',
  icon: VolumeHighIcon,
}, {
  title: 'Copy test',
  icon: CopyIcon,
}, {
  title: 'Good Response test',
  icon: ThumbUpOutlineIcon,
}, {
  title: 'Bad Response test',
  icon: ThumbDownOutlineIcon,
}, {
  title: 'Rephrase Answer test',
  icon: TextIcon,
}];

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
    <ResponseToolbar data-testid={toolbarId}>
      {icons.map(icon => {
        return (
          <ResponseToolBarIcon key={icon.title} {...icon} />
        );
      })}
    </ResponseToolbar>
    <ResponseText text={defaultProps.text} />
  </Response>,
);

const getComponentWithAttachment = props => render(
  <Response {...defaultProps} {...props}>
    <ResponseText text={defaultProps.text} />
    <ResponseAttachment text={attachmentText} wrapperProps={{ 'data-testid': attachmentWrapperId }} />
    <ResponseText text={defaultProps.text} />
  </Response>,
);

test('component renders', () => {
  getComponent();
  const container = screen.getByTestId('container');

  expect(container).toBeInTheDocument();
});

test('delay prop works correctly', async () => {
  getComponent();

  const splitText = defaultProps.text.split(' ');

  expect(screen.queryByText(defaultProps.text)).not.toBeInTheDocument();
  for (let i = 1; i < splitText.length + 1; i += 1) {
    act(() => { jest.advanceTimersByTime(100); });
    expect(screen.queryByText(splitText.slice(0, i).join(' '))).toBeInTheDocument();
  }
  expect(screen.queryByText(defaultProps.text)).toBeInTheDocument();
});

test('delay prop works correctly, with list', async () => {
  getComponentWithList();

  const splitText = headingText.split(' ');

  expect(screen.queryByText(headingText)).not.toBeInTheDocument();
  for (let i = 1; i < splitText.length + 1; i += 1) {
    act(() => { jest.advanceTimersByTime(100); });
    expect(screen.queryByText(splitText.slice(0, i).join(' '))).toBeInTheDocument();
  }
  expect(screen.queryByText(headingText)).toBeInTheDocument();

  const nextTextSplit = nextText.split(' ');

  // advance through the listItems
  for (let i = 1; i < 10; i += 1) {
    act(() => { jest.advanceTimersByTime(100); });
  }
  expect(screen.queryByText(nextText)).not.toBeInTheDocument();

  // ensure that the subsequent text renders correctly
  for (let i = 1; i < nextText.length + 1; i += 1) {
    act(() => { jest.advanceTimersByTime(100); });
    expect(screen.queryByText(nextTextSplit.slice(0, i).join(' '))).toBeInTheDocument();
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
    expect(screen.queryByText(defaultProps.text.split(' ').slice(0, i).join(' '))).toBeInTheDocument();
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
  for (let i = 1; i < icons.length + 1; i += 1) {
    act(() => { jest.advanceTimersByTime(100); });
    expect(screen.getByTitle(icons[i - 1].title)).toBeInTheDocument();
    expect(screen.getByTitle(icons[i - 1].title)).not.toHaveClass('is-not-loaded');
  }
  act(() => { jest.advanceTimersByTime(2000); });
});

test('ResponseAttachment renders correctly', async () => {
  getComponentWithAttachment();
  act(() => { jest.advanceTimersByTime(10); });

  expect(screen.getByText(attachmentText)).toBeInTheDocument();
  const wrapper = screen.getByTestId(attachmentWrapperId);
  expect(wrapper).toHaveClass('is-not-loaded');
  for (let i = 1; i < defaultProps.text.length + 1; i += 1) {
    act(() => { jest.advanceTimersByTime(100); });
  }
  expect(wrapper).not.toHaveClass('is-not-loaded');
});
