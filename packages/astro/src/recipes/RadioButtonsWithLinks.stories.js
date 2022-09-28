import React, { useState } from 'react';
import CloseIcon from 'mdi-react/CloseIcon';
import { Box, Button, Icon, IconButton, Text } from '../index';
import RadioField from '../components/RadioField';
import RadioGroupField from '../components/RadioGroupField';

export default {
  title: 'Recipes/Radio Buttons with Links',
};

export const Default = () => {
  const roles = [
    { name: 'Client Application Developer' },
    { name: 'Environment Admin', isDisabled: true },
    { name: 'Identity Data Admin', isDisabled: true },
    { name: 'Organization Admin' },
  ];

  const titleSx = { fontSize: 'md', color: 'neutral.20', fontWeight: 2 };
  const subtitleSx = { fontSize: 'md', color: 'neutral.10' };

  const RadioFieldWithButton = ({ fieldName, isDisabled }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Box>
        <Box isRow alignItems="center">
          <RadioField
            value={fieldName}
            label={fieldName}
            isDisabled={isDisabled}
          />
          <Button
            variant="link"
            mb="xs"
            ml="md"
            onPress={() => setIsOpen(prev => !prev)}
            isDisabled={isDisabled}
          >
            {`${isOpen ? 'Hide' : 'Show'} Permissions`}
          </Button>
        </Box>
        {isOpen && <PermissionsList onPress={() => setIsOpen(false)} />}
      </Box>
    );
  };

  const PermissionsList = ({ onPress }) => (
    <Box p="md" bg="neutral.95">
      <Box isRow justifyContent="space-between" mb="sm">
        <Text sx={{ fontWeight: 2 }}>Permissions</Text>
        <IconButton onPress={onPress}>
          <Icon icon={CloseIcon} />
        </IconButton>
      </Box>
      <Box>
        <Text sx={titleSx} mb="xs">
          Resource
        </Text>
        <Text sx={subtitleSx} mb="sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        <Text sx={titleSx} mb="xs">
          Push Credentials
        </Text>
        <Text sx={subtitleSx} mb="sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod
        </Text>
        <Text sx={titleSx} mb="xs">
          Organization
        </Text>
        <Text sx={subtitleSx} mb="sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco
        </Text>
        <Text sx={titleSx} mb="xs">
          Image
        </Text>
        <Text sx={subtitleSx} mb="sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod
        </Text>
      </Box>
    </Box>
  );

  return (
    <RadioGroupField>
      {roles.map(({ name, isDisabled }) => (
        <RadioFieldWithButton
          fieldName={name}
          isDisabled={isDisabled}
          key={name}
        />
      ))}
    </RadioGroupField>
  );
};
