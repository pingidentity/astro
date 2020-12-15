import React from 'react';
import Box from '../components/Box';
import Text from '../components/Text';
import { active } from '../styles/colors';

export default {
  title: 'Recipes/StatsCircle',
};

export const Default = () => (
  <Box
    width="110px"
    height="110px"
    sx={{
          'border': '3px solid',
          'borderColor': active,
          'borderRadius': '100%',
          'alignItems': 'center',
          'justifyContent': 'center',
          }}
  >
    <Text fontSize={30}>63</Text>
    <Text color="text.secondary">Members</Text>
  </Box>
);
