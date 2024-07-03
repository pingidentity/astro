import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Badge,
  Box,
  EnvironmentBreadcrumb,
  Item,
  Section,
  Text,
} from '../../index';
import { EnvironmentBreadcrumbProps, EnvironmentItemProps } from '../../types';

import EnvironmentBreadcrumbReadme from './EnvironmentBreadcrumb.mdx';

export default {
  title: 'Components/EnvironmentBreadcrumb',
  component: EnvironmentBreadcrumb,
  parameters: {
    docs: {
      page: () => (
        <>
          <EnvironmentBreadcrumbReadme />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
} as Meta;

const defaultEnvironments: EnvironmentItemProps[] = [
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

const environmentsWithSections: EnvironmentItemProps[] = [
  {
    name: 'Recent',
    key: 'Recent',
    options: [
      { name: 'Default' },
      { name: 'Consumer Banking Prod' },
      { name: 'Custom 360 Test' },
    ],
  },
  {
    name: 'All',
    key: 'All',
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

export const Default: StoryFn<EnvironmentBreadcrumbProps<EnvironmentItemProps>> = args => {
  const [selectedEnvironment, setSelectedEnvironment] = useState(defaultEnvironments[0]);

  const envNode = (
    <Box isRow key={selectedEnvironment.name}>
      <Text color="inherit">{selectedEnvironment.name}</Text>
      {selectedEnvironment.isSandbox ? (
        <Badge label="SANDBOX" variant="environmentBadge" bg="neutral.40" />
      ) : null}
    </Box>
  );

  const findEnvObj = envName => defaultEnvironments.find(({ name }) => name === envName);

  const handleSelectionChange = newEnvName => {
    const envObj = findEnvObj(newEnvName);
    if (typeof envObj === 'object') setSelectedEnvironment({ ...envObj });
  };

  return (
    <EnvironmentBreadcrumb
      {...args}
      items={defaultEnvironments}
      name="Organization"
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

export const WithSections = () => {
  const selectedSectionIndex = 0;
  const selectedOptionIndex = 0;
  const [environments, setEnvironments] = useState(environmentsWithSections);
  const [filteredOptionsNumber, setFilteredOptionsNumber] = useState<number | null>(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState(
    environmentsWithSections[selectedSectionIndex].options
    && environmentsWithSections[selectedSectionIndex].options[selectedOptionIndex],
  );
  const selectedKey = `${environmentsWithSections[selectedSectionIndex].key}-${selectedEnvironment?.name}`;
  const recentEnvShown = 3;
  const totalOptionsNumber = environmentsWithSections.reduce(
    (acc, section) => {
      if (Array.isArray(section.options)) return acc + section.options.length;
      return acc;
    }, 0);

  const optionsCountMessage = filteredOptionsNumber === totalOptionsNumber
    ? `${totalOptionsNumber} options in total`
    : `${filteredOptionsNumber} of ${totalOptionsNumber} options`;

  const getUpdatedRecentEnvs = (envObj, prevEnvs) => {
    const { name: envName } = envObj;

    const isDuplicate = prevEnvs.filter(prevEnv => prevEnv.name === envName).length > 0;

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

  const findEnvObj = (envName: string, envSectionName: string) => {
    const foundItem = environments
      .find((section: EnvironmentItemProps) => section.name === envSectionName);
    if (foundItem && foundItem.options) {
      return foundItem.options.find(option => option.name === envName);
    }
    return undefined;
  };

  const handleEnvPress = newEnv => {
    const sectionPrefixIndex = newEnv.indexOf('-');
    const envKey = newEnv.substr(sectionPrefixIndex + 1);
    const envSectionName = newEnv.substr(0, sectionPrefixIndex);

    const foundItem = environments
      .find((section: EnvironmentItemProps) => section.name === 'Recent');
    const recentEnvironments = foundItem && foundItem.options;

    const envObj = findEnvObj(envKey, envSectionName);
    const updatedRecentEnvironments = getUpdatedRecentEnvs(
      envObj,
      recentEnvironments,
    );
    setEnvironments(prevEnvs => prevEnvs.map(section => (section.name === 'Recent'
      ? { ...section, options: updatedRecentEnvironments }
      : section),
    ),
    );
    if (typeof envObj === 'object') setSelectedEnvironment({ ...envObj });
  };

  const envNode = (
    <Box isRow key={selectedKey}>
      <Text color="inherit">{selectedEnvironment?.name}</Text>
      {selectedEnvironment?.isSandbox ? (
        <Badge label="SANDBOX" variant="environmentBadge" bg="neutral.40" />
      ) : null}
    </Box>
  );

  return (
    <EnvironmentBreadcrumb
      items={environments}
      name="Organization"
      selectedItem={envNode}
      onSelectionChange={handleEnvPress}
      onFilteredOptionsNumber={setFilteredOptionsNumber}
      optionsCountMessage={optionsCountMessage}
      isDefaultOpen
    >
      {({ name: sectionName, options: sectionOptions, key: sectionKey }) => (
        <Section
          key={sectionKey}
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
                    align="right"
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


export const OrgLevel = () => (
  <EnvironmentBreadcrumb name="Organization" />
);

export const DefaultOpen = () => {
  const [selectedEnvironment, setSelectedEnvironment] = useState(defaultEnvironments[0]);

  const envNode = (
    <Box isRow key={selectedEnvironment.name}>
      <Text color="inherit">{selectedEnvironment.name}</Text>
      {selectedEnvironment.isSandbox ? (
        <Badge label="SANDBOX" variant="environmentBadge" bg="neutral.40" />
      ) : null}
    </Box>
  );

  const findEnvObj = envName => defaultEnvironments.find(({ name }) => name === envName);

  const handleSelectionChange = newEnvName => {
    const envObj = findEnvObj(newEnvName);
    if (typeof envObj === 'object') setSelectedEnvironment({ ...envObj });
  };

  return (
    <EnvironmentBreadcrumb
      items={defaultEnvironments}
      name="Organization"
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
              align="right"
            />
          ) : null}
        </Item>
      )}
    </EnvironmentBreadcrumb>
  );
};

export const ControlledMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEnvironment, setSelectedEnvironment] = useState(defaultEnvironments[0]);

  const envNode = (
    <Box isRow key={selectedEnvironment.name}>
      <Text color="inherit">{selectedEnvironment.name}</Text>
      {selectedEnvironment.isSandbox ? (
        <Badge label="SANDBOX" variant="environmentBadge" bg="neutral.40" />
      ) : null}
    </Box>
  );

  const findEnvObj = envName => defaultEnvironments.find(({ name }) => name === envName);

  const handleSelectionChange = newEnvName => {
    const envObj = findEnvObj(newEnvName);
    if (typeof envObj === 'object') setSelectedEnvironment({ ...envObj });
  };

  return (
    <EnvironmentBreadcrumb
      items={defaultEnvironments}
      name="Organization"
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
              align="right"
            />
          ) : null}
        </Item>
      )}
    </EnvironmentBreadcrumb>
  );
};
