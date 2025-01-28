import React from 'react';
import CopyIcon from '@pingux/mdi-react/ContentCopyIcon';
import TextIcon from '@pingux/mdi-react/TextIcon';
import ThumbDownOutlineIcon from '@pingux/mdi-react/ThumbDownOutlineIcon';
import ThumbUpOutlineIcon from '@pingux/mdi-react/ThumbUpOutlineIcon';
import VolumeHighIcon from '@pingux/mdi-react/VolumeHighIcon';

import { AstroWrapper, NextGenTheme } from '../../..';

import Response from './Response';
import ResponseAttachment from './ResponseAttachment';
import ResponseList from './ResponseList';
import ResponseText from './ResponseText';
import ResponseToolbar from './ResponseToolbar';

export default {
  title: 'Ai Components/Response',
  component: Response,
};

const testText = 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet';

export const Default = args => {
  const toolBarProps = { readButtonProps: {
    title: 'Read aloud',
    icon: VolumeHighIcon,
  },
  copyButtonProps: {
    title: 'Copy',
    icon: CopyIcon,
  },
  goodButtonProps: {
    title: 'Good Response',
    icon: ThumbUpOutlineIcon,
  },
  badButtonProps: {
    title: 'Bad Response',
    icon: ThumbDownOutlineIcon,
  },
  rephraseButtonProps: {
    title: 'Rephrase Answer',
    icon: TextIcon,
  } };

  const delay = 20;

  return (
    <AstroWrapper {...args} themeOverrides={[NextGenTheme]}>
      <Response delay={delay}>
        <ResponseText text={testText} />
        <ResponseAttachment />
        <ResponseText text={testText} />
        <ResponseText text={testText} />
        <ResponseList>
          <ResponseText as="h5" sx={{ fontWeight: 2 }} text="heading" />
          <ResponseText as="li" text="list item 1" />
          <ResponseText as="li" text="list item 2" />
          <ResponseText as="li" text="list item 3" />
        </ResponseList>
        <ResponseText text="follow up text" />
        <ResponseToolbar {...toolBarProps} />
      </Response>
    </AstroWrapper>
  );
};
