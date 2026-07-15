import React from 'react';
import { Meta } from '@storybook/react-vite';

import { AstroWrapper, NextGenTheme, Suggestion, Suggestions } from '../../../index';
import { booleanArg } from '../../../utils/docUtils/docArgTypes';

export default {
  title: 'Ai Components/Suggestions',
  component: Suggestions,
  argTypes: {
    isFullScreen: {
      ...booleanArg,
      description: 'Whether the suggestions panel is displayed in full-screen mode.',
    },
  },
} satisfies Meta<typeof Suggestions>;

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

export const Default = () => {
  return (
    <AstroWrapper theme={NextGenTheme}>
      <Suggestions>
        <Suggestion text={lorem} />
        <Suggestion text={lorem} />
        <Suggestion text={lorem} />
        <Suggestion text={lorem} />
      </Suggestions>
    </AstroWrapper>
  );
};

export const FullScreen = () => {
  return (
    <AstroWrapper theme={NextGenTheme}>
      <Suggestions isFullScreen>
        <Suggestion text={lorem} />
        <Suggestion text={lorem} />
        <Suggestion text={lorem} />
        <Suggestion text={lorem} />
      </Suggestions>
    </AstroWrapper>
  );
};
