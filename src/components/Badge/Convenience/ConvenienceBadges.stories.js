import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import DocsLayout from '../../../../.storybook/storybookDocsLayout';
import {
  Box,
  DefaultBadge,
  ErrorCalloutBadge,
  InfoCalloutBadge,
  RemovableBadge,
  SuccessCalloutBadge,
  WarningCalloutBadge,
} from '../../../index';
import { FIGMA_LINKS } from '../../../utils/designUtils/figmaLinks.ts';

export default {
  title: 'Components/Badge/Convenience',
  component: DefaultBadge,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
    isUppercase: {
      control: {
        type: 'boolean',
      },
    },
  },
  args: {},
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
      page: () => (
        <DocsLayout />
      ),
    },
  },
};

export const Default = ({ ...args }) => (
  <DefaultBadge {...args} />
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.badge.convenienceDefault,
  },
};

export const CalloutBadges = ({ ...args }) => (
  <Box gap="lg">
    <ErrorCalloutBadge label="You’ve Got Problems" {...args} />
    <WarningCalloutBadge label="You’ve Got Issues" {...args} />
    <SuccessCalloutBadge label="It Worked!" {...args} />
    <InfoCalloutBadge label="Oh by the Way" {...args} />
  </Box>
);

CalloutBadges.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.badge.calloutBadges,
  },
};

const badges = [
  { key: 'b1', id: uuid(), label: 'Removable Badge' },
  { key: 'b2', id: uuid(), label: 'Inverted Removable Badge', isInverted: true },
];

export const Removable = ({ ...args }) => {
  const [items, setItems] = useState(badges);

  const closeBadgeHandler = id => {
    setItems(items.filter((item => item.id !== id)));
  };

  return (
    <Box gap="sm">
      {items.map(badge => (
        <RemovableBadge
          id={badge.id}
          key={badge.key}
          label={badge.label}
          isInverted={badge.isInverted}
          onClose={closeBadgeHandler}
          {...args}
        />
      ))}
    </Box>
  );
};

Removable.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.badge.removable,
  },
};
