import React from 'react';
import {
  Box,
  Bracket,
  Badge,
  Text,
} from '../../index';
import DocsLayout from '../../../.storybook/storybookDocsLayout';
import BracketReadme from './Bracket.mdx';

export default {
  title: 'Components/Bracket',
  component: Bracket,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
      page: () => (
        <>
          <BracketReadme />
          <DocsLayout />
        </>
      ),
    },
  },
};

export const Default = () => {
  const anyConditions = [
    { field1: 'Group', field3: 'Marketing', key: 'Group1Field' },
    { field1: 'Group', field3: 'UX Team', key: 'Group2Field' },
  ];

  const customBadgeStyles = ({
    '& > span': { textTransform: 'none', fontWeight: '500' }, minWidth: '65px', 'z-index': '1',
  });

  return (
    <Box p="md" ml="sm" bg="background" >
      <Box isRow>
        <Badge
          label="Any"
          bg="neutral.20"
          mr="sm"
          sx={customBadgeStyles}
          alignSelf="center"
        />
        <Text> of the conditions are true</Text>
      </Box>
      {anyConditions.map((item, index) => (
        <Box isRow key={item.key}>
          <Bracket isLast={index === anyConditions.length - 1} />
          <Box
            mt="md"
            ml="xs"
            variant="forms.input.fieldControlWrapper"
            bg="white"
            isRow
            alignItems="center"
            borderRadius="4px"
            width="100%"
            sx={{ '&::after': { bg: 'decorative.4' } }}
          >
            <Text pl="md" pr="sm">{item.field1}</Text>
            <Badge
              label="Equals"
              bg="accent.90"
              textColor="neutral.10"
              sx={customBadgeStyles}
              mr="sm"
              alignSelf="center"
            />
            <Text>{item.field3}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
