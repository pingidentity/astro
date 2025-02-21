import React from 'react';

import { AstroWrapper, NextGenTheme, Suggestion, Suggestions } from '../../../index';


export default {
  title: 'Ai Components/Suggestions',
  component: Suggestions,
};

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
