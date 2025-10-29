import React from 'react';
import PlusIcon from '@pingux/mdi-react/PlusIcon';

import { Box, Card, Icon, Text } from '../../../index';
import { SuggestionProps } from '../../../types/suggestions';

const Suggestion = (props: SuggestionProps) => {
  const {
    isFullScreen,
    text,
    textProps,
    iconProps,
    ...others
  } = props;
  if (isFullScreen) {
    return (
      <Card variant="cards.suggestionColumn" tabIndex="0" {...others}>
        <Icon icon={PlusIcon} {...iconProps} />
        <Text variant="suggestion" {...textProps}>{text}</Text>
      </Card>
    );
  }
  return (
    <Card
      variant="cards.suggestionRow"
      isRow
      alignItems="center"
      tabIndex="0"
      {...others}
    >
      <Text variant="suggestion" {...textProps}>{text}</Text>
      <Box variant="suggestion.iconContainer">
        <Icon icon={PlusIcon} {...iconProps} />
      </Box>
    </Card>
  );
};

export default Suggestion;
