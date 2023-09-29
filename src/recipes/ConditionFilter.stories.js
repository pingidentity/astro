import React from 'react';
import TrashIcon from '@pingux/mdi-react/TrashIcon';

import {
  Badge,
  Box,
  Bracket,
  Button,
  Icon,
  IconButton,
  Item,
  RockerButton,
  RockerButtonGroup,
  SelectField,
  Text,
  TextField,
} from '../index';

export default {
  title: 'Recipes/Condition Filter',
};

const borderBox = {
  borderColor: 'neutral.80',
  borderRadius: '3px 4px 4px 3px',
  borderStyle: 'solid',
  borderWidth: '1px 1px 1px 0px',
  width: '100%',
  '&::after': { bg: 'decorative.4', width: '2px' },
};

const sx = {
  badge: {
    condition: {
      height: '20px',
      minWidth: '65px',
    },
    equal: {
      alignSelf: 'center',
      bg: 'accent.95',
    },
  },
  borderedBoxStyles: {
    ...borderBox,
    padding: 'sm',
  },
  display: {
    borderBox: {
      ...borderBox,
      ml: '20px',
      mt: 'md',
      p: 'sm',
      pl: 0,
    },
    bracket: {
      position: 'absolute',
      height: '56px',
    },
    container: {
      bg: 'accent.99',
      maxWidth: '318px',
      p: 'sm',
      pl: 0,
    },
    rowBox: {
      alignItems: 'center',
      bg: 'white',
      borderRadius: '4px',
      fontWeight: 1,
      marginTop: 'md',
      minHeight: '25px',
      ml: '20px',
      pl: '13px',
    },
  },
  defaultText: {
    color: 'inherit',
    fontSize: 'sm',
    fontWeight: '3',
  },
};

const allConditions = [
  { field1: 'Family Name', field3: 'Smith', key: 'familyNameField' },
  { field1: 'Given Name', field3: 'John', key: 'givenNameField' },
  { field1: 'Email', field3: 'jsmith@company.com', key: 'emailField' },
];

const anyConditions = [
  { field1: 'Group', field3: 'Marketing', key: 'Group1Field' },
  { field1: 'Group', field3: 'UX Team', key: 'Group2Field' },
];

const noneConditions = [
  { field1: 'Misc', field3: 'Apple', key: 'Miscellaneous1' },
  { field1: 'Misc', field3: 'Banana', key: 'Miscellaneous2' },
];

const ofTheConditionsAreTrueCopy = ' of the conditions are true';

export const Display = () => (
  <Box sx={sx.display.container}>
    <DisplaySectionHeader />
    {allConditions.map(item => <DisplayRow item={item} key={item.key} />)}
    <Box isRow ml="xs">
      <Bracket sx={{ ...sx.display.bracket, height: '148px' }} isLast />
      <Box sx={sx.display.borderBox} variant="forms.input.fieldControlWrapper">
        <DisplaySectionHeader badgeColor="decorative.7" label="Any" />
        {anyConditions.map((item, index) => (
          <DisplayRow
            barColor="decorative.7"
            isLast={index === anyConditions.length - 1}
            item={item}
            key={item.key}
          />
        ))}
      </Box>
    </Box>
  </Box>
);

export const DisplayRow = ({ item = allConditions[0], isLast = false, barColor = 'decorative.4' }) => (
  <Box isRow ml="xs">
    <Bracket sx={sx.display.bracket} isLast={isLast} />
    <Box width="100%">
      <Box
        gap="sm"
        isRow
        sx={{ ...sx.display.rowBox, '&::after': { bg: barColor, width: '2px' } }}
        variant="forms.input.fieldControlWrapper"
      >
        <Text>{item.field1}</Text>
        <Badge
          label="Equals"
          sx={sx.badge.equal}
          textColor="neutral.10"
        />
        <Text>{item.field3}</Text>
      </Box>
    </Box>
  </Box>
);

export const DisplaySectionHeader = ({ badgeColor = 'decorative.4', label = 'All' }) => (
  <Box isRow ml="sm">
    <Badge
      bg={badgeColor}
      label={label}
      sx={sx.badge.condition}
    />
    <Text ml="sm" alignSelf="center">{ofTheConditionsAreTrueCopy}</Text>
  </Box>
);

export const Edit = () => {
  const trashButton = (
    <IconButton
      aria-label="deleteButton"
      sx={{ alignSelf: 'center' }}
    >
      <Icon
        icon={TrashIcon}
        sx={{ '& > path': { fill: 'neutral.40' } }}
        size="md"
        title={{ name: 'Trash Icon' }}
      />
    </IconButton>
  );

  return (
    <Box>
      <Box
        bg="accent.99"
        p="md"
        maxWidth="966px"
      >
        <Box
          isRow
          alignItems="center"
          mb="sm"
          pr="37px"
        >
          <RockerButtonGroup
            mr="sm"
            defaultSelectedKey="all"
          >
            <RockerButton
              name="all"
              key="all"
              selectedStyles={{ bg: 'decorative.4' }}
            >
              <Text sx={sx.defaultText}>ALL</Text>
            </RockerButton>
            <RockerButton
              name="any"
              key="any"
              selectedStyles={{ bg: 'decorative.7' }}
            >
              <Text sx={sx.defaultText}>ANY</Text>
            </RockerButton>
            <RockerButton
              name="none"
              key="none"
              selectedStyles={{ bg: 'accent.20' }}
            >
              <Text sx={sx.defaultText}>NONE</Text>
            </RockerButton>
          </RockerButtonGroup>
          <Text>{ofTheConditionsAreTrueCopy}</Text>
          <Button
            variant="inline"
            width="fit-content"
            role="button"
            title="Add Field Button"
            ml="auto"
            aria-label="add"
          >
            + Add
          </Button>
        </Box>

        {allConditions.map(item => (
          <Box
            isRow
            alignItems="center"
            mb="md"
            key={item.key}
          >
            <Box
              isRow
              width="100%"
            >
              <TextField
                width="44%"
                value={item.field1}
                mr="md"
                containerProps={{ sx: { '& > div::after': { bg: 'decorative.4' } } }}
                aria-label="temp-label"
              />
              <SelectField
                hasNoStatusIndicator
                selectedKey="Equals"
                mr="md"
                aria-label="temp-label"
                width="125px"
              >
                <Item
                  key="Equals"
                  textValue="Equals"
                  aria-label="equals"
                >
                  Equals
                </Item>
                <Item
                  key="NotEquals"
                  textValue="NotEquals"
                  aria-label="notequal"
                >
                  Not Equal
                </Item>
              </SelectField>
              <TextField
                hasNoStatusIndicator
                width="44%"
                value={item.field3}
                mr="xs"
                aria-label="temp-label"
              />
            </Box>
            {trashButton}
          </Box>
        ))}
        <Box isRow>
          <Box
            variant="forms.input.fieldControlWrapper"
            sx={{ ...sx.borderedBoxStyles, '&::after': { bg: 'decorative.4', width: '2px' } }}
          >
            <Box
              isRow
              alignItems="center"
              mb="sm"
              pr="37px"
            >
              <RockerButtonGroup
                mr="sm"
                defaultSelectedKey="any"
              >
                <RockerButton
                  name="all"
                  key="all"
                  selectedStyles={{ bg: 'decorative.4' }}
                >
                  <Text sx={sx.defaultText}>ALL</Text>
                </RockerButton>
                <RockerButton
                  name="any"
                  key="any"
                  selectedStyles={{ bg: 'decorative.7' }}
                >
                  <Text sx={sx.defaultText}>ANY</Text>
                </RockerButton>
                <RockerButton
                  name="none"
                  key="none"
                  selectedStyles={{ bg: 'accent.20' }}
                >
                  <Text sx={sx.defaultText}>NONE</Text>
                </RockerButton>
              </RockerButtonGroup>
              <Text>{ofTheConditionsAreTrueCopy}</Text>
              <Button
                variant="inline"
                width="fit-content"
                role="button"
                title="Add Field Button"
                ml="auto"
                aria-label="add"
              >
                + Add
              </Button>
            </Box>

            <Box ml="lg">
              {anyConditions.map(item => (
                <Box
                  isRow
                  alignItems="center"
                  mb="md"
                  key={item.key}
                >
                  <Box
                    isRow
                    width="100%"
                  >
                    <TextField
                      aria-label="temp-label"
                      value={item.field1}
                      width="44%"
                      mr="md"
                      containerProps={{ sx: { '& > div::after': { bg: 'decorative.7' } } }}
                    />
                    <SelectField
                      aria-label="temp-label"
                      hasNoStatusIndicator
                      selectedKey="Equals"
                      mr="md"
                      width="125px"
                    >
                      <Item
                        key="Equals"
                        textValue="Equals"
                        aria-label="Equals"
                      >
                        Equals
                      </Item>
                      <Item
                        key="NotEquals"
                        textValue="NotEqual"
                        aria-label="NotEqual"
                      >
                        Not Equal
                      </Item>
                    </SelectField>
                    <TextField
                      aria-label="temp-label"
                      hasNoStatusIndicator
                      value={item.field3}
                      width="44%"
                      mr="xs"
                    />
                  </Box>
                  {trashButton}
                </Box>
              ))}
            </Box>
          </Box>
          <Box alignSelf="start">{trashButton}</Box>
        </Box>
        <Box
          isRow
          mt="md"
        >
          <Box
            variant="forms.input.fieldControlWrapper"
            sx={{ ...sx.borderedBoxStyles, '&::after': { bg: 'decorative.4', width: '2px' } }}
          >
            <Box
              isRow
              alignItems="center"
              mb="sm"
              pr="37px"
            >
              <RockerButtonGroup
                mr="sm"
                defaultSelectedKey="none"
              >
                <RockerButton
                  name="all"
                  key="all"
                  selectedStyles={{ bg: 'decorative.4' }}
                >
                  <Text sx={sx.defaultText}>ALL</Text>
                </RockerButton>
                <RockerButton
                  name="any"
                  key="any"
                  selectedStyles={{ bg: 'decorative.7' }}
                >
                  <Text sx={sx.defaultText}>ANY</Text>
                </RockerButton>
                <RockerButton
                  name="none"
                  key="none"
                  selectedStyles={{ bg: 'accent.20' }}
                >
                  <Text sx={sx.defaultText}>NONE</Text>
                </RockerButton>
              </RockerButtonGroup>
              <Text>{ofTheConditionsAreTrueCopy}</Text>
              <Button
                variant="inline"
                width="fit-content"
                role="button"
                title="Add Field Button"
                ml="auto"
                aria-label="add"
              >
                + Add
              </Button>
            </Box>

            <Box ml="lg">
              {noneConditions.map(item => (
                <Box
                  isRow
                  alignItems="center"
                  mb="md"
                  key={item.key}
                >
                  <Box
                    isRow
                    width="100%"
                  >
                    <TextField
                      aria-label="temp-label"
                      value={item.field1}
                      width="44%"
                      mr="md"
                      containerProps={{ sx: { '& > div::after': { bg: 'accent.20' } } }}
                    />
                    <SelectField
                      aria-label="temp-label"
                      hasNoStatusIndicator
                      selectedKey="Equals"
                      mr="md"
                      width="125px"
                    >
                      <Item
                        key="Equals"
                        textValue="Equals"
                        aria-label="Equals"
                      >
                        Equals
                      </Item>
                      <Item
                        key="NotEquals"
                        textValue="NotEqual"
                        aria-label="NotEqual"
                      >
                        Not Equal
                      </Item>
                    </SelectField>
                    <TextField
                      aria-label="temp-label"
                      hasNoStatusIndicator
                      value={item.field3}
                      width="44%"
                      mr="xs"
                    />
                  </Box>
                  {trashButton}
                </Box>
              ))}
            </Box>
          </Box>
          <Box alignSelf="start">{trashButton}</Box>
        </Box>
      </Box>
    </Box>
  );
};
