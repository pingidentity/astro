import React, { useEffect, useRef, useState } from 'react';
import AlertCircleIcon from '@pingux/mdi-react/AlertCircleIcon';
import CogsIcon from '@pingux/mdi-react/CogsIcon';
import DeleteIcon from '@pingux/mdi-react/DeleteIcon';
import { v4 as uuid } from 'uuid';

import {
  Badge,
  Box,
  Callout,
  CheckboxField,
  ComboBoxField,
  Icon,
  IconButton,
  Item,
  Link,
  ScrollBox,
  Separator,
  Text,
  TextField,
} from '../index';
import { FIGMA_LINKS } from '../utils/designUtils/figmaLinks.ts';
import statuses from '../utils/devUtils/constants/statuses';

export default {
  title: 'Recipes/Attribute Mappings',
};

const sx = {
  alertCircleIcon: {
    position: 'absolute',
    right: '4px',
    top: '4px',
    fill: 'critical.bright',
  },
  badge: {
    alignSelf: 'center',
    border: '1px solid',
    borderColor: 'neutral.80',
    backgroundColor: 'white',
    marginLeft: 'sm',
    '& span': {
      lineHeight: 1,
      color: 'text.primary',
    },
  },
  container: {
    px: 'sm',
    pt: 'sm',
    pb: 'lg',
    width: '450px',
    backgroundColor: 'accent.99',
  },
  calloutSx: {
    width: '450px',
    marginBottom: 'xs',
    paddingRight: 'md',
  },
  createIconButton: {
    marginLeft: 'xs',
  },
  fieldColumnTitle: {
    fontWeight: 3,
    fontSize: 'md',
    lineHeight: '18px',
    marginBottom: 'xs',
  },
  fieldColumnTitleWrapper: {
    width: 'calc(50% - 22px)',
  },
  fieldRowWrapper: {
    alignItems: 'center',
    marginTop: 'sm',
  },
  separator: {
    width: '20px',
    margin: '0 2px',
  },
};

const editSx = {
  comboBoxFieldWrapper: {
    width: '275px',
    '& .is-float-label .field-control-input': {
      pt: '11px',
      pb: '11px',
    },
  },
  comboBoxField: {
    maxHeight: '40px',
  },
  rowTitle: {
    fontWeight: 3,
    fontSize: 'md',
    width: '275px',
    minWidth: '153px',
    mr: 'sm',
  },
  lastRowTitle: {
    fontWeight: 3,
    fontSize: 'md',
    width: '135px',
    textAlign: 'center',
  },
  editAttributesBox: {
    bg: 'accent.99',
    p: 'md',
    pr: '12px',
    pt: 'sm',
  },
  scrollBox: {
    mt: 'md',
    maxHeight: '700px',
  },
  checkbox: {
    '& .field-control-input': {
      margin: 0,
    },
  },
};

const helperTextId = uuid();

export const Display = () => {
  return (
    <Box>
      <Box sx={sx.container}>
        <Box
          isRow
          sx={{ width: '100%' }}
        >
          <Box sx={sx.fieldColumnTitleWrapper}>
            <Text sx={sx.fieldColumnTitle}>
              Application
            </Text>
          </Box>
          <Box sx={sx.fieldColumnTitleWrapper}>
            <Text sx={sx.fieldColumnTitle}>
              PingOne
            </Text>
          </Box>
        </Box>
        <Separator />
        <DisplayRow withBadge leftValue="username" rightValue="User ID" />
        <DisplayRow leftValue="firstName" rightValue="Given Name" />
        <DisplayRow leftValue="lastName" rightValue="Family Name" />
        <DisplayRow leftValue="population" rightValue="Population" />
      </Box>
    </Box>
  );
};

Display.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.attributeMappings.display,
  },
};

export const DisplayWithError = () => {
  const withError = true;

  return (
    <Box>
      <Callout status={statuses.ERROR} sx={sx.calloutSx}>
        <Text>
          You’ve got problems. Allow me to tell you about them in some detail so
          that you can address them.
          <Link href="https://pingidentity.com" target="_blank" aria-label={`${statuses.ERROR}-callout`} variant="app">
            {' '}
            Read More
          </Link>
        </Text>
      </Callout>

      <Box sx={sx.container}>
        <Box
          isRow
          sx={{ width: '100%' }}
        >
          <Box sx={sx.fieldColumnTitleWrapper}>
            <Text sx={sx.fieldColumnTitle}>
              Application
            </Text>
          </Box>
          <Box sx={sx.fieldColumnTitleWrapper}>
            <Text sx={sx.fieldColumnTitle}>
              PingOne
            </Text>
          </Box>
        </Box>
        <Separator />
        <DisplayRow withBadge leftValue="username" rightValue="User ID" />
        <DisplayRow leftValue="firstName" rightValue="Given Name" />
        <DisplayRow leftValue="lastName" rightValue="Family Name" />
        <DisplayRow withError={withError} leftValue="population" rightValue="Population" />
      </Box>
    </Box>
  );
};

export const Edit = () => {
  const defaultRows = [
    {
      leftValue: 'username',
      rightValue: 'User ID',
      name: 'first default',
    },
    {
      leftValue: 'firstName',
      rightValue: 'Given Name',
      name: 'second default',
    },
    {
      leftValue: 'lastName',
      rightValue: 'Family Name',
      name: 'third default',
    },
    {
      leftValue: 'population',
      rightValue: 'Population',
      name: 'fourth default',
    },
  ];

  const [rows, setRows] = useState(defaultRows);

  const removeRow = rowIndex => {
    const newArray = rows.filter((row, index) => {
      return rowIndex !== index;
    });
    setRows([...newArray]);
  };

  const updateRow = (rowIndex, value, attribute) => {
    const newArray = rows.map((row, index) => {
      if (rowIndex === index) {
        const thisRow = rows[index];
        thisRow[attribute] = value;
        return thisRow;
      }
      return row;
    });
    setRows([...newArray]);
  };

  return (
    <Box
      maxWidth="735px"
    >
      <Box
        sx={editSx.editAttributesBox}
      >
        <Box
          isRow
        >
          <Text
            sx={editSx.rowTitle}
          >
            Application
          </Text>
          <Text
            sx={editSx.rowTitle}
          >
            PingOne
          </Text>
          <Text
            sx={editSx.lastRowTitle}
          >
            Required
          </Text>
        </Box>
        <Box sx={{ mr: '3px' }}>
          <Separator sx={{ mb: 0, mt: 'sm' }} />
        </Box>
        <ScrollBox
          sx={editSx.scrollBox}
        >
          <Box>
            {rows.map((row, index) => {
              return (
                <EditRow
                  {...row}
                  index={index}
                  removeRow={removeRow}
                  updateRow={updateRow}
                  key={`row container ${row.name}`}
                />
              );
            })}
          </Box>
        </ScrollBox>
      </Box>
    </Box>
  );
};

Edit.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.attributeMappings.edit,
  },
};

export const DisplayRow = props => {
  const {
    withBadge = false,
    withError,
    leftValue = 'UserId',
    rightValue = 'mdorey',
  } = props;

  return (
    <Box
      isRow
      sx={sx.fieldRowWrapper}
    >
      <TextField
        isReadOnly
        value={leftValue}
        labelProps={{
          mb: 0,
        }}
        controlProps={{
          variant: 'input.small',
          'aria-label': `input ${leftValue}`,
          sx: {
            width: '165px',
          },
        }}
        aria-labelledby={withError && helperTextId}
        slots={withError && {
          inContainer: (
            <Icon icon={AlertCircleIcon} sx={sx.alertCircleIcon} title={{ name: 'Alert Circle Icon' }} />
          ),
        }}
      />
      <Separator sx={sx.separator} />
      <TextField
        isReadOnly
        value={rightValue}
        labelProps={{
          mb: 0,
        }}
        controlProps={{
          variant: 'input.small',
          'aria-label': `input ${rightValue}`,
          sx: {
            width: '165px',
          },
        }}
      />
      {withBadge
        && (
          <Badge
            label="Required"
            sx={sx.badge}
          />
        )}
    </Box>
  );
};

export const EditRow = props => {
  const {
    isNewRow,
    index,
    leftValue,
    rightValue,
    updateRow = () => { },
    removeRow = () => { },
  } = props;

  const leftItems = [
    { name: 'username', id: '1' },
    { name: 'firstName', id: '2' },
    { name: 'lastName', id: '3' },
    { name: 'population', id: '4' },
  ];

  const rightItems = [
    { name: 'User ID', id: '1' },
    { name: 'Given Name', id: '2' },
    { name: 'Family Name', id: '3' },
    { name: 'Population', id: '4' },
  ];

  const rowRef = useRef();
  const comboBoxFieldRef = useRef();

  const setLeftInputValue = value => {
    updateRow(index, value, 'leftValue');
  };

  const setRightInputValue = value => {
    updateRow(index, value, 'rightValue');
  };

  useEffect(() => {
    if (isNewRow) {
      comboBoxFieldRef.current.focus();
      comboBoxFieldRef.current.scrollIntoView();
    }
  }, []);

  return (
    <Box
      isRow
      alignItems="center"
      mb="sm"
      gap="sm"
      ref={rowRef}
    >
      <Box sx={editSx.comboBoxFieldWrapper}>
        <ComboBoxField
          ref={comboBoxFieldRef}
          items={leftItems}
          labelMode="float"
          id={`leftInputField ${index}`}
          key={`leftInputField ${index}`}
          labelProps={{
            mb: 0,
          }}
          aria-label="selection field"
          controlProps={{
            sx: editSx.comboBoxField,
          }}
          containerProps={{
            width: '100%',
            maxWidth: '275px',
          }}
          inputValue={leftValue}
          onInputChange={setLeftInputValue}
        >
          {item => <Item key={item.name} data-id={item.name}>{item.name}</Item>}
        </ComboBoxField>
      </Box>
      <Box sx={editSx.comboBoxFieldWrapper}>
        <ComboBoxField
          items={rightItems}
          labelMode="float"
          id={`rightInputField ${index}`}
          key={`rightInputField ${index}`}
          labelProps={{
            mb: 0,
          }}
          aria-label="selection field"
          controlProps={{
            sx: editSx.comboBoxField,
          }}
          containerProps={{
            width: '100%',
            maxWidth: '275px',
          }}
          inputValue={rightValue}
          onInputChange={setRightInputValue}
        >
          {item => <Item key={item.name} data-id={item.name}>{item.name}</Item>}
        </ComboBoxField>
      </Box>
      <Box width="135px">
        <Box
          isRow
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <IconButton sx={{ alignSelf: 'center' }} aria-label="icon button with tooltip" title="Advanced Expression">
            <Icon icon={CogsIcon} size="sm" title={{ name: 'Cogs Icon' }} />
          </IconButton>
          <CheckboxField aria-label="required checkbox" containerProps={{ sx: editSx.checkbox }} />
          <IconButton
            aria-label="icon button with tooltip"
            title="Delete"
            onPress={() => removeRow(index)}
          >
            <Icon icon={DeleteIcon} color="neutral.30" size="24px" title={{ name: 'Delete Icon' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
