import React, { useState } from 'react';
import EnvironmentBreadcrumb from './EnvironmentBreadcrumb';
import { Item, Section, OverlayProvider, Chip, Box, Text } from '../../index';

export default {
  title: 'EnvironmentBreadcrumb',
  component: EnvironmentBreadcrumb,
};

const defaultEnvironments = [
  { name: 'Default' },
  { name: 'Kangaroo' },
  { name: 'Snake' },
  { name: 'Snail' },
  { name: 'Slug' },
  { name: 'Crow' },
  { name: 'Dog' },
  { name: 'Crab', isSandbox: true },
  { name: 'Fish' },
  { name: 'Turtle' },
  { name: 'Mouse' },
  { name: 'Banana' },
  { name: 'Shark' },
  { name: 'Gorilla' },
  { name: 'Goat' },
];

const environmentsWithSections = [
  {
    name: 'Recent',
    options: [
      { name: 'Default' },
      { name: 'Consumer Banking Prod' },
      { name: 'Custom 360 Test' },
    ],
  },
  {
    name: 'All',
    options: [
      { name: 'Consumer Banking Prod' },
      { name: 'Custom 360 Test' },
      { name: 'Default' },
      { name: 'Great New One', isSandbox: true },
      { name: 'Jeff’s Workforce' },
      { name: 'Lindemuller Prod' },
      { name: 'Mine' },
    ],
  },
];

export const Default = (args) => {
  const [selectedEnvironment, setSelectedEnvironment] = useState({
    name: 'Snail',
    isSandbox: true,
  });

  const envNode = (
    <Box isRow>
      <Text color="inherit">{selectedEnvironment.name}</Text>
      {selectedEnvironment.isSandbox ? (
        <Chip label="SANDBOX" variant="boxes.environmentChip" bg="neutral.40" />
      ) : null}
    </Box>
  );

  const findEnvObj = envName =>
    defaultEnvironments.find(({ name }) => name === envName);

  const handleSelectionChange = (newEnvName) => {
    const envObj = findEnvObj(newEnvName);
    setSelectedEnvironment({ ...envObj });
  };

  return (
    <OverlayProvider>
      <EnvironmentBreadcrumb
        {...args}
        items={defaultEnvironments}
        name="Globochem"
        selectedItem={envNode}
        onSelectionChange={handleSelectionChange}
      >
        {({ name, isSandbox }) => (
          <Item key={name} textValue={name}>
            {name}
            {isSandbox ? (
              <Chip
                label="SANDBOX"
                variant="boxes.environmentChip"
                bg="neutral.40"
              />
            ) : null}
          </Item>
        )}
      </EnvironmentBreadcrumb>
    </OverlayProvider>
  );
};

export const WithSections = () => {
  const [environments, setEnvironments] = useState(environmentsWithSections);
  const [selectedEnvironment, setSelectedEnvironment] = useState({
    name: 'Consumer Banking Prod',
  });
  const recentEnvShown = 3;

  const getUpdatedRecentEnvs = (envObj, prevEnvs) => {
    const { name: envName } = envObj;

    const isDuplicate =
      prevEnvs.filter(prevEnv => prevEnv.name === envName).length > 0;

    if (isDuplicate) {
      return [
        { ...envObj },
        ...prevEnvs.filter(prevEnv => prevEnv.name !== envName),
      ];
    }
    if (prevEnvs.length >= recentEnvShown) {
      return [{ ...envObj }, ...prevEnvs.slice(0, recentEnvShown - 1)];
    }
    return [{ ...envObj }, ...prevEnvs];
  };

  const findEnvObj = envName =>
    environments
      .find(section => section.name === 'All')
      .options.find(option => option.name === envName);

  const handleEnvPress = (newEnv) => {
    const sectionPrefixIndex = newEnv.indexOf('-');
    const envKey = newEnv.substr(sectionPrefixIndex + 1);
    const recentEnvironments = environments.find(
      envSection => envSection.name === 'Recent',
    ).options;
    const envObj = findEnvObj(envKey);
    const updatedRecentEnvironments = getUpdatedRecentEnvs(
      envObj,
      recentEnvironments,
    );
    setEnvironments(prevEnvs =>
      prevEnvs.map(section =>
        (section.name === 'Recent'
          ? { ...section, options: updatedRecentEnvironments }
          : section),
      ),
    );
    setSelectedEnvironment({ ...envObj });
  };

  const envNode = (
    <Box isRow>
      <Text color="inherit">{selectedEnvironment.name}</Text>
      {selectedEnvironment.isSandbox ? (
        <Chip label="SANDBOX" variant="boxes.environmentChip" bg="neutral.40" />
      ) : null}
    </Box>
  );

  return (
    <OverlayProvider>
      <EnvironmentBreadcrumb
        items={environments}
        name="Globochem"
        selectedItem={envNode}
        onSelectionChange={handleEnvPress}
      >
        {({ name: sectionName, options: sectionOptions }) => (
          <Section
            key={sectionName}
            title={sectionName}
            items={sectionOptions}
          >
            {({ name: itemName, options: itemOptions, isSandbox }) => (
              <Item
                key={`${sectionName}-${itemName}`}
                childItems={itemOptions}
                textValue={itemName}
              >
                <Box isRow>
                  {itemName}
                  {isSandbox ? (
                    <Chip
                      label="SANDBOX"
                      variant="boxes.environmentChip"
                      bg="neutral.40"
                    />
                  ) : null}
                </Box>
              </Item>
            )}
          </Section>
        )}
      </EnvironmentBreadcrumb>
    </OverlayProvider>
  );
};

export const OrgLevel = () => <EnvironmentBreadcrumb name="Globochem" />;
