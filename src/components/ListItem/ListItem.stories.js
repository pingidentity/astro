import React, { useState } from 'react';
import AccountIcon from 'mdi-react/AccountIcon';
import MoreVertIcon from 'mdi-react/MoreVertIcon';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Box,
  Icon,
  IconButton,
  ListItem,
  Separator,
  Text,
} from '../../index';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks.js';
import { onHoverArgTypes } from '../../utils/docUtils/hoverProps';

import ListItemReadme from './ListItem.mdx';

export default {
  title: 'Components/ListItem',
  component: ListItem,
  decorators: [withDesign],
  parameters: {
    docs: {
      page: () => (
        <>
          <ListItemReadme />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    ...onHoverArgTypes,
  },
};

export const Default = args => (
  <>
    <Separator margin={0} />
    <ListItem {...args}>
      <Box isRow mr="auto" alignSelf="center">
        <Icon
          icon={AccountIcon}
          alignSelf="center"
          mr="sm"
          color="accent.40"
          size={32}
        />
        <Text variant="itemTitle" alignSelf="center">Fons Vernall</Text>
      </Box>
      <Box isRow alignSelf="center">
        <IconButton aria-label="filter">
          <Icon icon={MoreVertIcon} size="sm" color="neutral.20" />
        </IconButton>
      </Box>
    </ListItem>
    <Separator margin={0} />
  </>
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.listItem.default,
  },
};

export const WithSubtitle = args => (
  <>
    <Separator margin={0} />
    <ListItem {...args}>
      <Box isRow mr="auto" alignSelf="center">
        <Icon
          icon={AccountIcon}
          alignSelf="center"
          mr="sm"
          color="accent.40"
          size={32}
        />
        <Box>
          <Text variant="itemTitle">Fons Vernall</Text>
          <Text variant="itemSubtitle" mt={1}>fvernall0@google.it</Text>
        </Box>
      </Box>
      <Box isRow alignSelf="center">
        <IconButton aria-label="filter">
          <Icon icon={MoreVertIcon} size="sm" color="neutral.20" />
        </IconButton>
      </Box>
    </ListItem>
    <Separator margin={0} />
  </>
);

export const WithHoverHandlers = args => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverChange = () => {
    setIsHovered(previousIsHovered => !previousIsHovered);
  };

  const sx = shouldTranslate => ({ transform: `${shouldTranslate ? 'translate(15px)' : 'translate(0)'}` });

  return (
    <>
      <Separator margin={0} />
      <ListItem
        {...args}
        onHoverEnd={handleHoverChange}
        onHoverStart={handleHoverChange}
      >
        <Box isRow mr="auto" alignSelf="center">
          <Icon
            icon={AccountIcon}
            alignSelf="center"
            mr="sm"
            color="accent.40"
            size={32}
          />
          <Box sx={sx(isHovered)}>
            <Text variant="itemTitle">Fons Vernall</Text>
            <Text variant="itemSubtitle" mt={1}>fvernall0@google.it</Text>
          </Box>
        </Box>
        <Box isRow alignSelf="center">
          <IconButton size={26} aria-label="filter">
            <Icon icon={MoreVertIcon} size={20} color="neutral.20" />
          </IconButton>
        </Box>
      </ListItem>
      <Separator margin={0} />
    </>
  );
};
