import React from 'react';

import DocsLayout from '../../../../.storybook/storybookDocsLayout';
import {
  Box,
  DefaultBadge,
  ErrorCalloutBadge,
  InfoCalloutBadge,
  SuccessCalloutBadge,
  WarningCalloutBadge,
} from '../../../index';
import { FIGMA_LINKS } from '../../../utils/designUtils/figmaLinks.js';

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
