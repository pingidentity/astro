import React from 'react';
import CopyIcon from '@pingux/mdi-react/ContentCopyIcon';
import TextIcon from '@pingux/mdi-react/TextIcon';
import ThumbDownOutlineIcon from '@pingux/mdi-react/ThumbDownOutlineIcon';
import ThumbUpOutlineIcon from '@pingux/mdi-react/ThumbUpOutlineIcon';
import VolumeHighIcon from '@pingux/mdi-react/VolumeHighIcon';

import DocsLayout from '../../../../.storybook/storybookDocsLayout';
import { Response } from '../../../index';

import Markdown from './ResponseMarkdown/ResponseMarkdown';
import ResponseReadme from './Response.mdx';
import ResponseAttachment from './ResponseAttachment';
import ResponseList from './ResponseList';
import ResponseText from './ResponseText';
import ResponseToolbar from './ResponseToolbar';
import ResponseToolbarIcon from './ResponseToolbarIcon';

export default {
  title: 'Ai Components/Response',
  component: Response,
  parameters: {
    docs: {
      page: () => (
        <>
          <ResponseReadme />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
};

const testText = 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet';

export const Default = args => {
  const icons = [
    {
      title: 'Read aloud',
      icon: VolumeHighIcon,
    },
    {
      title: 'Copy',
      icon: CopyIcon,
    }, {
      title: 'Good Response',
      icon: ThumbUpOutlineIcon,
    }, {
      title: 'Bad Response',
      icon: ThumbDownOutlineIcon,
    }, {
      title: 'Rephrase Answer',
      icon: TextIcon,
    },
  ];

  const delay = 100;

  return (
    <Response delay={delay}>
      <ResponseText text={testText} />
      <ResponseAttachment text="Attachment Text" />
      <ResponseText text={testText} />
      <ResponseText text={testText} />
      <ResponseList>
        <ResponseText as="li" text="list item 1" />
        <ResponseText as="li" text="list item 2" />
        <ResponseText as="li" text="list item 3" />
      </ResponseList>
      <ResponseText text="follow up text" />
      <ResponseToolbar>
        {icons.map(icon => {
          return (
            <ResponseToolbarIcon {...icon} />
          );
        })}
      </ResponseToolbar>
    </Response>
  );
};

// eslint-disable-next-line no-useless-escape
const nestedMarkdown = 'The recent login activity shows successful authentication attempts for the user \"bbludis476@gmail.com\" using the \"BXRetail App\". There were no failed authentication attempts recorded. Here are the details of the successful attempts:\n\n1. **Timestamp:** 2025-02-13T09:25:55.946Z\n   - **User:** bbludis476@gmail.com\n   - **Action:** User Access Allowed\n   - **Status:** SUCCESS\n\n2. **Timestamp:** 2025-02-13T09:25:52.377Z\n   - **User:** bbludis476@gmail.com\n   - **Action:** User Access Allowed\n   - **Status:** SUCCESS';

const italics = '*Italics* bbludis476@gmail.com';

export const MarkdownStory = () => {
  return (
    <Response delay={100}>
      <ResponseText text="Beginning response text" />
      <Markdown str={nestedMarkdown} />
      <ResponseText text="Follow up response text " />
      <Markdown str={italics} />
      <ResponseText text="Final response text " />
    </Response>
  );
};
