import React from 'react';

import {
  Box,
  Text,
} from '../../index';

export default {
  title: 'Docs/Design/Container Sizes',
};

const containerArray = [
  {
    key: 'xs',
    size: 'container.xs',
    bg: 'black',
    codeString: '<Box size="container.xs" />',
    widthString: '400px width',
  },
  {
    key: 'sm',
    size: 'container.sm',
    bg: 'neutral.10',
    codeString: '<Box size="container.sm" />',
    widthString: '550px width',
  },
  {
    key: 'md',
    size: 'container.md',
    bg: 'neutral.20',
    codeString: '<Box size="container.md" />',
    widthString: '800px width',
  },
  {
    key: 'lg',
    size: 'container.lg',
    bg: 'neutral.30',
    codeString: '<Box size="container.lg" />',
    widthString: '1200px width',
  },
  {
    key: 'full',
    size: 'container.full',
    bg: 'neutral.40',
    codeString: '<Box size="container.full" />',
    widthString: '100% width',
  },
];

const Container = props => {
  const {
    bg,
    codeString,
    size,
    widthString,
  } = props;

  return (
    <Box size={size} maxHeight="250px" bg={bg} p="md">
      <Text color="white" fontWeight={1} fontSize="xx">
        {size}
      </Text>
      <Text color="white" fontWeight={0} fontSize="lg">
        {widthString}
      </Text>
      <br />
      <Text color="white" fontWeight={0} fontSize="lg">
        {codeString}
      </Text>
    </Box>
  );
};

export const ContainerSizes = () => {
  return (
    <Box height="1250px" width="1600px">
      <Text fontSize="lg" fontWeight="0" width="800px">
        For cards, panels, and popup modals, these are our standard widths.
        They should be max widths,
        and these elements should shrink based on the amount of space available.
        (Popup modals should never be LG or Full, and probably never MD as well.)
      </Text>
      <br />
      {containerArray.map(item => {
        return (
          <Container {...item} />
        );
      })}
    </Box>
  );
};
