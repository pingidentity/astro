import React, { useState } from 'react';

import { Badge, Box, EnvironmentBreadcrumb, Item, Text } from '../../../index';
import WithUiLibraryCss from '../withUiLibraryCss';

export default {
  title: 'Chromatic Only EnvironmentBreadcrumb',
  component: EnvironmentBreadcrumb,
  decorators: [WithUiLibraryCss],
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

export const Default = args => {
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

  const findEnvObj = envName => defaultEnvironments.find(({ name }) => name === envName);

  const handleSelectionChange = newEnvName => {
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
