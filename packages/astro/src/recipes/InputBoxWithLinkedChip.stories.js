import React from 'react';
import { Link } from '@pingux/icons';
import Chip from '../components/Chip';
import Text from '../components/Text';
import Icon from '../components/Icon';
import Box from '../components/Box';
import Popover from '../components/Popover';

export default {
  title: 'Recipes/InputBoxWithLinkedChip',
};

export const Default = () => (
  <Box variant="forms.input.container" width="500px">
    <Box variant="forms.input" height="40px" p="0" justifyContent="center">
      <Popover content="steps.registration.formData.user" placement="bottom">
        <Chip
          ml="md"
          bg="#E5E9F8"
          label={
            <Box isRow justifyContent="center">
              <Icon icon={Link} color="#253746" size={10} alignSelf="center" mr="xs" />
              <Text color="#253746" sx={{ textTransform: 'lowercase' }}>user</Text>
            </Box>
          }
        />
      </Popover>
    </Box>
  </Box>
);
