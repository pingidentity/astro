import React from 'react';
import PlusIcon from '@pingux/mdi-react/PlusIcon';
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
const customBadgeStyles = {
  marginRight: 'sm',
  '& > span': {
    fontWeight: 1,
    textTransform: 'none',
  },
  ml: '3px',
  minWidth: '65px',
  height: '20px',
  'z-index': '1',
};
const sx = {
  equalBadgeStyles: {
    ...customBadgeStyles,
    bg: 'accent.95',
    textColor: 'neutral.10',
    alignSelf: 'center',
    height: '21px',
    minWidth: '51px',
  },
  borderedBoxStyles: {
    '&::after': { bg: 'decorative.4', width: '2px', display: 'block' },
    borderColor: 'neutral.80',
    borderRadius: '3px 4px 4px 3px',
    borderStyle: 'solid',
    borderWidth: '1px 1px 1px 0px',
    padding: 'sm',
    width: '100%',
  },
  allConditionsBox: {
    '&::after': { bg: 'decorative.4', width: '2px' },
    alignItems: 'center',
    borderRadius: '4px',
    marginTop: 'md',
    fontWeight: 1,
  },
  defaultText: {
    textTransform: 'none',
    color: 'inherit',
    fontSize: 'sm',
    fontWeight: '3',
  },
  textStyles: {
    pl: 'md',
    pr: 'sm',
  },
};

const allConditions = [
  { field1: 'Family Name', field3: 'John', key: 'FamilyNameField' },
  { field1: 'Full Name', field3: 'Alex Smith', key: 'FullNameField' },
];

const anyConditions = [
  { field1: 'Group', field3: 'Marketing', key: 'Group1Field' },
  { field1: 'Group', field3: 'UX Team', key: 'Group2Field' },
];

const noneConditions = [
  { field1: 'Misc', field3: 'Apple', key: 'Miscellaneous1' },
  { field1: 'Misc', field3: 'Banana', key: 'Miscellaneous2' },
];

export const Display = () => {
  return (
    <Box>
      <Box
        bg="accent.99"
        maxWidth="318px"
        p="sm"
      >
        <Box isRow />
        <Box isRow>
          <Badge
            label="All"
            bg="decorative.4"
            sx={customBadgeStyles}
          />
          <Text> of the conditions are true</Text>
        </Box>
        {allConditions.map(item => (
          <Box
            isRow
            key={item.key}
          >
            <Bracket />
            <Box width="100%">
              <Box
                variant="forms.input.fieldControlWrapper"
                bg="white"
                isRow
                sx={sx.allConditionsBox}
              >
                <Text sx={sx.textStyles}>{item.field1}</Text>
                <Badge
                  label="Equals"
                  sx={sx.equalBadgeStyles}
                  textColor="neutral.10"
                />
                <Text>{item.field3}</Text>
              </Box>
            </Box>
          </Box>
        ))}
        <Box isRow>
          <Bracket />
          <Box
            variant="forms.input.fieldControlWrapper"
            mt="md"
            sx={sx.borderedBoxStyles}
          >
            <Box isRow>
              <Badge
                label="Any"
                bg="decorative.7"
                sx={customBadgeStyles}
                alignSelf="center"
              />
              <Text> of the conditions are true</Text>
            </Box>
            <Box ml="xs">
              {anyConditions.map((item, index) => (
                <Box
                  isRow
                  key={item.key}
                >
                  <Bracket
                    ml={0}
                    isLast={index === anyConditions.length - 1}
                  />
                  <Box
                    mt="md"
                    variant="forms.input.fieldControlWrapper"
                    bg="white"
                    isRow
                    width="100%"
                    sx={{ ...sx.allConditionsBox, '&::after': { bg: 'decorative.7', width: '2px' } }}
                  >
                    <Text sx={sx.textStyles}>{item.field1}</Text>
                    <Badge
                      label="Equals"
                      textColor="neutral.10"
                      sx={sx.equalBadgeStyles}
                    />
                    <Text>{item.field3}</Text>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box isRow>
          <Bracket isLast />
          <Box
            variant="forms.input.fieldControlWrapper"
            mt="md"
            sx={sx.borderedBoxStyles}
          >
            <Box isRow>
              <Badge
                label="None"
                bg="accent.20"
                sx={customBadgeStyles}
                alignSelf="center"
              />
              <Text> of the conditions are true</Text>
            </Box>
            <Box ml="xs">
              {noneConditions.map((item, index) => (
                <Box
                  isRow
                  key={item.key}
                >
                  <Bracket
                    ml={0}
                    isLast={index === noneConditions.length - 1}
                  />
                  <Box
                    mt="md"
                    variant="forms.input.fieldControlWrapper"
                    bg="white"
                    isRow
                    width="100%"
                    sx={{ ...sx.allConditionsBox, '&::after': { bg: 'accent.20', width: '2px' } }}
                  >
                    <Text sx={sx.textStyles}>{item.field1}</Text>
                    <Badge
                      label="Equals"
                      textColor="neutral.10"
                      sx={sx.equalBadgeStyles}
                    />
                    <Text>{item.field3}</Text>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const Edit = () => {
  const trashButton = (
    <IconButton
      aria-label="deleteButton"
      sx={{ alignSelf: 'center' }}
      ml="sm"
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
          mb="md"
          pr="42px"
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
          <Text> of the conditions are true</Text>
          <Button
            ml="auto"
            variant="inlineWithIcon"
            title="Add Field Button"
            aria-label="add"
          >
            <Icon
              icon={PlusIcon}
              mr="xs"
              size={15}
              title={{
                name: 'Add Icon',
              }}
            />
            Add
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
                labelProps={{ mb: 0 }}
                aria-label="temp-label"
              />
              <SelectField
                hasNoStatusIndicator
                selectedKey="Equals"
                mr="md"
                aria-label="temp-label"
                labelProps={{ mb: 0 }}
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
                aria-label="temp-label"
                labelProps={{ mb: 0 }}
              />
            </Box>
            {trashButton}
          </Box>
        ))}
        <Box isRow>
          <Box
            variant="forms.input.fieldControlWrapper"
            sx={{ ...sx.borderedBoxStyles, '&::after': { bg: 'decorative.4', width: '2px' }, p: 'md' }}
          >
            <Box
              isRow
              alignItems="center"
              mb="md"
              pr="42px"
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
              <Text> of the conditions are true</Text>
              <Button
                ml="auto"
                variant="inlineWithIcon"
                title="Add Field Button"
                aria-label="add"
              >
                <Icon
                  icon={PlusIcon}
                  mr="xs"
                  size={15}
                  title={{
                    name: 'Add Icon',
                  }}
                />
                Add
              </Button>
            </Box>

            <Box>
              {anyConditions.map((item, index) => (
                <Box
                  isRow
                  alignItems="center"
                  mb={index + 1 === anyConditions.length ? 0 : 'md'}
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
                      labelProps={{ mb: 0 }}
                    />
                    <SelectField
                      aria-label="temp-label"
                      hasNoStatusIndicator
                      selectedKey="Equals"
                      mr="md"
                      width="125px"
                      labelProps={{ mb: 0 }}
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
                      labelProps={{ mb: 0 }}
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
            sx={{ ...sx.borderedBoxStyles, '&::after': { bg: 'decorative.4', width: '2px' }, p: 'md' }}
          >
            <Box
              isRow
              alignItems="center"
              mb="md"
              pr="42px"
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
              <Text> of the conditions are true</Text>
              <Button
                ml="auto"
                variant="inlineWithIcon"
                title="Add Field Button"
                aria-label="add"
              >
                <Icon
                  icon={PlusIcon}
                  mr="xs"
                  size={15}
                  title={{
                    name: 'Add Icon',
                  }}
                />
                Add
              </Button>
            </Box>

            <Box>
              {noneConditions.map((item, index) => (
                <Box
                  isRow
                  alignItems="center"
                  mb={index + 1 === anyConditions.length ? 0 : 'md'}
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
                      labelProps={{ mb: 0 }}
                    />
                    <SelectField
                      aria-label="temp-label"
                      hasNoStatusIndicator
                      selectedKey="Equals"
                      mr="md"
                      width="125px"
                      labelProps={{ mb: 0 }}
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
                      labelProps={{ mb: 0 }}
                      value={item.field3}
                      width="44%"
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
