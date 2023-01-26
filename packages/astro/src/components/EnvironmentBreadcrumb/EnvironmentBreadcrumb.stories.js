import React, { useState } from 'react';
import EnvironmentBreadcrumb from './EnvironmentBreadcrumb';
import { Item, Section, Badge, Box, Text } from '../../index';

export default {
  title: 'Components/EnvironmentBreadcrumb',
  component: EnvironmentBreadcrumb,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
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
    <Box isRow key={selectedEnvironment.name}>
      <Text color="inherit">{selectedEnvironment.name}</Text>
      {selectedEnvironment.isSandbox ? (
        <Badge label="SANDBOX" variant="environmentBadge" bg="neutral.40" />
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
            <Badge
              label="SANDBOX"
              variant="environmentBadge"
              bg="neutral.40"
            />
          ) : null}
        </Item>
      )}
    </EnvironmentBreadcrumb>
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
    <Box isRow key={selectedEnvironment.name}>
      <Text color="inherit">{selectedEnvironment.name}</Text>
      {selectedEnvironment.isSandbox ? (
        <Badge label="SANDBOX" variant="environmentBadge" bg="neutral.40" />
      ) : null}
    </Box>
  );

  return (
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
                  <Badge
                    label="SANDBOX"
                    variant="environmentBadge"
                    bg="neutral.40"
                  />
                ) : null}
              </Box>
            </Item>
          )}
        </Section>
      )}
    </EnvironmentBreadcrumb>
  );
};

export const OrgLevel = () => <EnvironmentBreadcrumb name="Globochem" />;

export const DefaultOpen = () => {
  const [selectedEnvironment, setSelectedEnvironment] = useState({
    name: 'Dog',
    isSandbox: true,
  });

  const envNode = (
    <Box isRow key={selectedEnvironment.name}>
      <Text color="inherit">{selectedEnvironment.name}</Text>
      {selectedEnvironment.isSandbox ? (
        <Badge label="SANDBOX" variant="environmentBadge" bg="neutral.40" />
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
    <EnvironmentBreadcrumb
      items={defaultEnvironments}
      name="Globochem"
      selectedItem={envNode}
      onSelectionChange={handleSelectionChange}
      isDefaultOpen
    >
      {({ name, isSandbox }) => (
        <Item key={name} textValue={name}>
          {name}
          {isSandbox ? (
            <Badge
              label="SANDBOX"
              variant="environmentBadge"
              bg="neutral.40"
            />
          ) : null}
        </Item>
      )}
    </EnvironmentBreadcrumb>
  );
};

export const ControlledMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEnvironment, setSelectedEnvironment] = useState({
    name: 'Shark',
    isSandbox: true,
  });

  const envNode = (
    <Box isRow key={selectedEnvironment.name}>
      <Text color="inherit">{selectedEnvironment.name}</Text>
      {selectedEnvironment.isSandbox ? (
        <Badge label="SANDBOX" variant="environmentBadge" bg="neutral.40" />
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
    <EnvironmentBreadcrumb
      items={defaultEnvironments}
      name="Globochem"
      selectedItem={envNode}
      onSelectionChange={handleSelectionChange}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    >
      {({ name, isSandbox }) => (
        <Item key={name} textValue={name}>
          {name}
          {isSandbox ? (
            <Badge
              label="SANDBOX"
              variant="environmentBadge"
              bg="neutral.40"
            />
          ) : null}
        </Item>
      )}
    </EnvironmentBreadcrumb>
  );
};

export const RightAlignedBadges = (args) => {
  const [selectedEnvironment, setSelectedEnvironment] = useState({
    name: 'Snail',
    isSandbox: true,
  });

  const envNode = (
    <Box isRow>
      <Text color="inherit">{selectedEnvironment.name}</Text>
      {selectedEnvironment.isSandbox ? (
        <Badge label="SANDBOX" variant="environmentBadge" bg="neutral.40" />
      ) : null}
    </Box>
  );

  const findEnvObj = envName =>
    defaultEnvironments.find(({ name }) => name === envName);

  const handleSelectionChange = (newEnvName) => {
    const envObj = findEnvObj(newEnvName);
    setSelectedEnvironment({ ...envObj });
  };

  const items = [
    { name: 'Default' },
    { name: 'Kangaroo', isSandbox: true },
    { name: 'Snake', isSandbox: true },
    { name: 'Snail' },
    { name: 'Slug', isSandbox: true },
    { name: 'Crow' },
    { name: 'Dog' },
    { name: 'Crab', isSandbox: true },
    { name: 'Fish', isSandbox: true },
    { name: 'Turtle', isSandbox: true },
    { name: 'Mouse' },
  ];

  return (
    <EnvironmentBreadcrumb
      {...args}
      items={items}
      name="Globochem"
      selectedItem={envNode}
      onSelectionChange={handleSelectionChange}
    >
      {({ name, isSandbox }) => (
        <Item key={name} textValue={name}>
          {name}
          {isSandbox ? (
            <Badge
              label="SANDBOX"
              variant="environmentBadge"
              bg="neutral.40"
              align="right"
            />
          ) : null}
        </Item>
      )}
    </EnvironmentBreadcrumb>
  );
};
