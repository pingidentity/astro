import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { ThemeUICSSObject } from 'theme-ui';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Box,
  Button,
  Card,
  CardProps,
  SxObject,
  Text,
  TextField,
} from '../../index';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';

import CardReadme from './Card.mdx';
import { cardArgTypes } from './cardAttributes';

export default {
  title: 'Components/Card',
  component: Card,
  decorators: [withDesign],
  parameters: {
    docs: {
      page: () => (
        <>
          <CardReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    ...cardArgTypes,
  },
  args: {
    children: 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut at enim nunc. Cras congue consequat odio, ac sodales lacus imperdiet quis. In id ex eu lorem sollicitudin hendrerit feugiat ultrices elit. Curabitur imperdiet libero vitae luctus blandit. Ut ac dignissim tortor. Pellentesque convallis eu metus vitae mollis. Donec sapien felis, laoreet eu egestas eu, blandit quis tellus. Donec luctus suscipit nibh, et tincidunt nisl facilisis ut. Mauris molestie purus at lectus venenatis, ac ultrices felis ultrices.',
  },
} as Meta;

export const Default = args => (
  <Card {...args} />
);

export const HeaderAndFooter = args => {
  const textStyling = {
    fontSize: 'md',
    fontWeight: 600,
    color: 'text.secondary',
  };

  return (
    <Card {...args} variant="cards.flat" width="500px">
      <Box variant="cards.header">
        <Text sx={textStyling}>Optional Card Header</Text>
      </Box>
      <Box variant="cards.body">
        <Text sx={textStyling} mb="md">Card Body</Text>
        <Box gap="md">
          <Button sx={{ width: 'fit-content' }} variant="primary">Save</Button>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga sed ratione,
            recusandae ipsam explicabo, quasi vel maxime sint harum qui rerum perferendis.
            Voluptatem nisi eaque, distinctio accusamus nobis voluptas nemo.
          </Text>
        </Box>
      </Box>
      <Box variant="cards.footer">
        <Text sx={textStyling}>Optional Card Footer</Text>
      </Box>
    </Card>
  );
};

export const CardWidth = args => {
  return (
    <Box gap="40px" width="1300px">
      <Card size="container.xs" {...args} />
      <Card size="container.sm" {...args} />
      <Card size="container.md" {...args} />
      <Card size="container.lg" {...args} />
    </Box>
  );
};

CardWidth.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.card.cardWidth,
  },
};

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.card.default,
  },
};

export const CardRow: StoryFn<CardProps> = args => {
  const sx: SxObject = {
    li: {
      display: 'inline',
      flexGrow: 1,
      flexBasis: '0%',
    },
    card: {
      display: 'block',
    },
  };

  return (
    <Box isRow gap="md" as="ul" pl="0px">
      <Box as="li" sx={sx.li}>
        <Card sx={sx.card} {...args} />
      </Box>
      <Box as="li" sx={sx.li}>
        <Card sx={sx.card} {...args} />
      </Box>
      <Box as="li" sx={sx.li}>
        <Card sx={sx.card} {...args} />
      </Box>
    </Box>
  );
};

CardRow.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.card.cardRow,
  },
};

export const InteractiveCard = () => {
  const sx: ThemeUICSSObject = {
    alignContent: 'center',
    height: '221px',
    justifyContent: 'center',
    textAlign: 'center',
    maxWidth: '233px',
  };

  return (
    <Card
      onPress={() => console.log('card pressed')}
      onHoverStart={() => console.log('card hovered')}
      tabIndex="0"
      variant="cards.interactive"
      sx={sx}
    >
      Interactive Card
    </Card>
  );
};

InteractiveCard.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.card.interactiveCard,
  },
};

export const WithInteractiveContent = () => (
  <Card isInteractiveWithin>
    <Text>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga sed ratione,
      recusandae ipsam explicabo, quasi vel maxime sint harum qui rerum perferendis.
      Voluptatem nisi eaque, distinctio accusamus nobis voluptas nemo.
    </Text>
    <TextField
      label="Interactive TextField"
      mt="md"
      width="300px"
    />
  </Card>
);

export const ActiveCard = () => {
  const sx: ThemeUICSSObject = {
    alignContent: 'center',
    height: '221px',
    justifyContent: 'center',
    textAlign: 'center',
    maxWidth: '233px',
  };

  const [isSelected, setIsSelected] = React.useState(false);

  return (
    <Card
      tabIndex="0"
      variant="cards.activeCard"
      sx={sx}
      isSelected={isSelected}
      onPress={() => setIsSelected(!isSelected)}
    >
      Active Card
    </Card>
  );
};
