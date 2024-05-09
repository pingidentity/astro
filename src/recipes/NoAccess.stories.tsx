import React from 'react';
import AlertCircle from '@pingux/mdi-react/AlertCircleIcon';
import LockIcon from '@pingux/mdi-react/LockIcon';
import { withDesign } from 'storybook-addon-designs';

import {
  Box, Icon, Link, Text,
} from '../index';
import { FIGMA_LINKS } from '../utils/designUtils/figmaLinks';

export default {
  title: 'Recipes/No Access',
  decorators: [withDesign],
};

export const Default = () => {
  return (
    <Box isRow gap="xs">
      <Icon icon={LockIcon} color="text.secondary" size="xs" title={{ name: 'Lock Icon' }} />
      <Text color="text.secondary" fontSize="sm" fontWeight={1}>No access</Text>
    </Box>
  );
};

export const PageLevel = () => {
  return (
    <Box gap="sm" alignItems="center">
      <Icon icon={LockIcon} color="text.secondary" size={50} title={{ name: 'Lock Icon' }} />
      <Text color="text.secondary" fontSize="lg" fontWeight={1}>No access</Text>
    </Box>
  );
};

export const RateLimit429 = () => {
  return (
    <Box gap="sm" alignItems="center">
      <Icon icon={AlertCircle} color="text.secondary" size={50} title={{ name: 'Alert Circle Icon' }} />
      <Text color="text.secondary" fontSize="lg" fontWeight={1}>
        There was a problem loading this page.
        {' '}
        <Link href="https://a.url.com">Reload</Link>
      </Text>
    </Box>
  );
};

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.noAccess.default,
  },
};
