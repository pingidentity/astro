import React from 'react';
import CheckIcon from '@pingux/mdi-react/CheckIcon';
import { Meta, StoryFn } from '@storybook/react-vite';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Box,
  IconWrapper,
  LabelValuePairs,
  NoticeIcon,
  Pair,
  PairLabel,
  PairSubvalue,
  PairValue,
  Text,
  ValueTypes,
} from '../..';
import { useGetTheme } from '../../hooks';
import { LabelValuePairsProps } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';
import statuses from '../../utils/devUtils/constants/statuses';

import LabelValuePairsReadme from './LabelValuePairs.mdx';
import { labelValuePairsArgTypes } from './labelValuePairsAttributes';

export default {
  title: 'Components/LabelValuePairs',
  component: LabelValuePairs,
  parameters: {
    docs: {
      page: () => (
        <>
          <LabelValuePairsReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    ...labelValuePairsArgTypes,
  },
} as Meta;

export const Default: StoryFn<LabelValuePairsProps> = (args: LabelValuePairsProps) => (
  <LabelValuePairs {...args}>
    <Pair>
      <PairLabel>Username</PairLabel>
      <PairValue>jsmith</PairValue>
    </Pair>
    <Pair>
      <PairLabel>Email</PairLabel>
      <PairValue>jsmith@example.com</PairValue>
    </Pair>
    <Pair>
      <PairLabel>Role</PairLabel>
      <PairValue>Administrator</PairValue>
    </Pair>
  </LabelValuePairs>
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.labelValuePairs.default,
  },
};

export const WithCopyableValues: StoryFn = args => (
  <LabelValuePairs {...args}>
    <Pair>
      <PairLabel>API Key</PairLabel>
      <PairValue valueType={ValueTypes.COPYABLE}>abc123def456ghi789</PairValue>
    </Pair>
    <Pair>
      <PairLabel>Client Secret</PairLabel>
      <PairValue valueType={ValueTypes.COPYABLE}>supersecretvalue</PairValue>
    </Pair>
  </LabelValuePairs>
);

export const WithMaskedValue: StoryFn = args => (
  <LabelValuePairs {...args}>
    <Pair>
      <PairLabel>Password</PairLabel>
      <PairValue valueType={ValueTypes.MASKED}>mypassword123</PairValue>
    </Pair>
  </LabelValuePairs>
);

export const WithHelpHint: StoryFn = args => (
  <LabelValuePairs {...args}>
    <Pair>
      <PairLabel helpHint="This is the unique identifier for your OAuth application.">
        Client ID
      </PairLabel>
      <PairValue>client-abc-123</PairValue>
    </Pair>
  </LabelValuePairs>
);

export const WithSubLabel: StoryFn = args => (
  <LabelValuePairs {...args}>
    <Pair>
      <PairLabel>Domain</PairLabel>
      <PairSubvalue>The primary domain for your environment.</PairSubvalue>
      <PairValue>example.com</PairValue>
    </Pair>
  </LabelValuePairs>
);

export const WithLabelIcon: StoryFn = args => {
  const { themeState: { isOnyx } } = useGetTheme();

  const icon = isOnyx ? (
    <IconWrapper
      icon={CheckIcon}
      color="green"
      size="xs"
      isCircle
      title={{ name: 'Verified' }}
      iconProps={{ size: 'sm' }}
    />
  ) : (
    <NoticeIcon
      color="green"
      status={statuses.SUCCESS}
      aria-label={`${statuses.SUCCESS}-icon`}
      size="xs"
    />
  );

  return (
    <LabelValuePairs {...args}>
      <Pair>
        <PairLabel>
          Status
          <Box isRow gap="xs" alignItems="center">
            {icon}
            <Text variant="listSubtitle" color={isOnyx ? 'darkgreen' : 'green'}>Verified</Text>
          </Box>
        </PairLabel>
        <PairValue>Active</PairValue>
      </Pair>
    </LabelValuePairs>
  );
};

export const WithLoadingState: StoryFn = args => (
  <Box width="200px">
    <LabelValuePairs {...args}>
      <Pair>
        <PairLabel>Username</PairLabel>
        <PairValue isLoading />
      </Pair>
      <Pair>
        <PairLabel>Email</PairLabel>
        <PairValue isLoading />
      </Pair>
      <Pair>
        <PairLabel>Role</PairLabel>
        <PairValue isLoading />
      </Pair>
    </LabelValuePairs>
  </Box>
);
