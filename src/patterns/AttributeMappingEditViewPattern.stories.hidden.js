import React from 'react';
import CogsIcon from '@pingux/mdi-react/CogsIcon';
import DeleteIcon from '@pingux/mdi-react/DeleteIcon';

import {
  Box,
  CheckboxField,
  ComboBoxField,
  Icon,
  IconButton,
  Separator,
  Text,
} from '../index';

export default {
  title: 'Design Patterns/Attribute Mapping Edit View',
};

const editFieldValues = [
  {
    field1: 'username',
    field2: 'User ID',
    key: 1,
  },
  { field1: 'firstName', field2: 'Given Name', hasChip: false, key: 2 },
  { field1: 'lastName', field2: 'Family Name', hasChip: false, key: 3 },
  { field1: 'population', field2: 'Population', hasChip: false, key: 4 },
];

const sx = {
  editFieldsBox: {
    mb: 'md',
  },
  mainBox: {
    maxWidth: '750px',
    height: '263px',
    'justifyContent': 'center',
    bg: 'accent.99',
    pl: 'md',
    pr: 'md',
  },
  headerTextApplication: {
    fontWeight: '3',
    fontSize: 'md',
    width: 'calc(50% - 26px)',
    lineHeight: '18.31px',
    pt: 'sm',
  },
  headerTextPingOne: {
    fontWeight: '3',
    fontSize: 'md',
    width: 'calc(50% - 5px)',
    lineHeight: '18.31px',
    pt: 'sm',
  },
  headerTextRequired: {
    fontWeight: '3',
    fontSize: 'md',
    width: 'calc(25% - 48px)',
    lineHeight: '18.31px',
    pt: 'sm',
  },
  separator: {
    mt: 'xs',
    mb: 'xs',
    width: '100%',
  },
  checkboxField: {
    'aria-label': 'Select',
    pt: 'xs',
  },
  comboBoxFieldContainer: {
    mb: 'xs',
  },
  comboBoxField: {
    'aria-label': 'Edit Text Field',
    width: '275px !important',
    py: '11px',
    pl: 'md',
    pr: '45px',
    lineHeight: '18.31px',
  },
  iconsBox: {
    mt: 'sm',
  },
};

export const Default = () => {
  return (
    <Box sx={sx.mainBox}>
      <Box isRow>
        <Text sx={sx.headerTextApplication}>
          Application
        </Text>
        <Text sx={sx.headerTextPingOne}>
          PingOne
        </Text>
        <Text sx={sx.headerTextRequired}>
          Required
        </Text>
      </Box>
      <Separator sx={sx.separator} />
      <Box items={editFieldValues} sx={sx.editFieldsBox}>
        {editFieldValues.map(({ field1, field2, key }) => (
          <Box isRow key={key} gap="sm" sx={sx.comboBoxFieldContainer}>
            <ComboBoxField
              isReadonly
              value={field1}
              controlProps={{
                sx: sx.comboBoxField,
              }}
            />
            <ComboBoxField
              isReadonly
              value={field2}
              controlProps={{
                sx: sx.comboBoxField,
              }}
            />
            <Box isRow gap="lg" sx={sx.iconsBox}>
              <IconButton aria-label="Cogs Icon">
                <Icon
                  icon={CogsIcon}
                  size={24}
                  title={{ name: 'Cogs Icon' }}
                />
              </IconButton>
              <CheckboxField
                status="default"
                containerProps={{
                  sx: sx.checkboxField,
                }}
              />
              <IconButton aria-label="Delete Icon">
                <Icon
                  icon={DeleteIcon}
                  size={24}
                  title={{ name: 'Delete Icon' }}
                />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
