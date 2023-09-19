import React, { useEffect, useRef, useState } from 'react';
import AddIcon from '@pingux/mdi-react/AddIcon';
import AlertCircleIcon from '@pingux/mdi-react/AlertCircleIcon';
import CogsIcon from '@pingux/mdi-react/CogsIcon';
import DeleteIcon from '@pingux/mdi-react/DeleteIcon';
import { v4 as uuid } from 'uuid';

import {
  Badge,
  Box,
  Button,
  Callout,
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
import { FIGMA_LINKS } from '../utils/designUtils/figmaLinks.js';
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
  rowBox: { mb: '24.95px' },
  textField: { height: '40px !important' },
  comboBoxField: {
    height: '40px !important',
    pt: '5px !important',
  },
  headingText: {
    fontSize: 'sm',
    fontWeight: 0,
    color: 'neutral.40',
  },
  firstRowTitle: {
    fontWeight: 3,
    fontSize: 'md',
    maxWidth: '310px',
    width: 'calc(50% - 26px)',
    minWidth: '153px',
  },
  secondRowTitle: {
    fontWeight: 3,
    fontSize: 'md',
    ml: 'sm',
    flexGrow: 1,
  },
  comboBoxAndIconParentBox: {
    width: '378px',
    ml: '12px',
    alignItems: 'center',
  },
  headingParentBox: {
    alignItems: 'center',
    mb: 'md',
    ml: 'xs',
  },
  addRowButton: {
    ml: 'auto',
    height: '22px',
    minWidth: '0',
    width: '70px',
  },
  addButtonIconBox: {
    alignItems: 'center',
    width: '38px',
    justifyContent: 'center',
  },
  addIcon: {
    mr: 'xs',
    color: 'active',
  },
  editAttributesBox: {
    bg: 'accent.99',
    p: '16px',
  },
  scrollBox: {
    mt: 'md',
    maxHeight: '700px',
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
      isDisabled: false,
      textValue: '',
      inputValue: '',
      name: 'first default',
    },
    {
      isDisabled: false,
      textValue: '',
      inputValue: '',
      name: 'second default',
    },
  ];

  const [rows, setRows] = useState(defaultRows);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const addRow = () => {
    const newRow = {
      isDisabled: false,
      isNewRow: true,
      textValue: '',
      inputValue: '',
      name: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
    };
    setRows([...rows, newRow]);
  };

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
      maxWidth="740px"
    >
      <Box isRow sx={editSx.headingParentBox}>
        <Text
          sx={editSx.headingText}
        >
          Create new attributes and map predefined attributes with their PingOne Mappings.
        </Text>
        <Button variant="inline" onPress={addRow} sx={editSx.addRowButton}>
          <Box isRow sx={editSx.addButtonIconBox}>
            <Icon icon={AddIcon} size={15} title={{ name: 'Add Icon' }} sx={editSx.addIcon} />
            Add
          </Box>
        </Button>
      </Box>
      <Box
        sx={editSx.editAttributesBox}
      >
        <Box
          isRow
        >
          <Text
            sx={editSx.firstRowTitle}
          >
            Attributes
          </Text>
          <Text
            sx={editSx.secondRowTitle}
          >
            PingOne Mappings
          </Text>
        </Box>
        <Separator />
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
                  isSubmitted={isSubmitted}
                  setIsSubmitted={setIsSubmitted}
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
    isDisabled,
    isNewRow,
    index,
    textValue,
    inputValue,
    removeRow = () => {},
    updateRow = () => {},
    areRowsValid,
    isSubmitted,
    setIsSubmitted = () => {},
  } = props;

  const items = [
    { name: 'Aardvark', id: '1' },
    { name: 'Kangaroo', id: '2' },
    { name: 'Snake', id: '3' },
  ];

  const rowRef = useRef();
  const textFieldRef = useRef();

  const setTextValue = value => {
    updateRow(index, value, 'textValue');
    setIsSubmitted(false);
  };

  const setInputValue = value => {
    updateRow(index, value, 'inputValue');
    setIsSubmitted(false);
  };

  useEffect(() => {
    if (isNewRow) {
      textFieldRef.current.focus();
      textFieldRef.current.scrollIntoView();
    }
  }, []);

  const isInputValueEmpty = !areRowsValid && isSubmitted && inputValue === '' && textValue !== '';
  const isTextValueEmpty = !areRowsValid && isSubmitted && textValue === '' && inputValue !== '';

  return (
    <Box
      isRow
      alignItems="center"
      mb="md"
      ref={rowRef}
    >
      <Box
        width="310px"
        sx={isInputValueEmpty ? editSx.rowBox : {}}
      >
        <TextField
          name="custom-name"
          aria-label="text field"
          labelProps={{
            'aria-label': 'selection field',
            mb: 0,
          }}
          controlProps={{ sx: editSx.textField }}
          id={`textField ${index}`}
          key={`textField ${index}`}
          isReadOnly={isDisabled}
          value={textValue}
          onChange={e => setTextValue(e.target.value)}
          ref={textFieldRef}
          status={isTextValueEmpty ? 'error' : 'default'}
          helperText={!areRowsValid && isSubmitted && textValue === '' && inputValue !== '' ? 'Enter an attribute.' : null}
        />
      </Box>
      <Box
        isRow
        sx={isInputValueEmpty ? editSx.rowBox : {} && editSx.comboBoxAndIconParentBox}
      >
        <Box
          flexGrow="1"
          maxWidth="310px"
        >
          <ComboBoxField
            items={items}
            labelMode="float"
            id={`inputField ${index}`}
            key={`inputField ${index}`}
            status={isInputValueEmpty ? 'error' : 'default'}
            helperText={isInputValueEmpty ? 'Select an item.' : null}
            labelProps={{
              'aria-label': 'selection field',
              mb: 0,
            }}
            aria-label="selection field"
            controlProps={{
              'aria-label': 'selection field',
              sx: editSx.comboBoxField,
            }}
            containerProps={{
              width: '100%',
              maxWidth: '310px',
            }}
            inputValue={inputValue}
            onInputChange={setInputValue}
          >
            {item => <Item key={item.name} data-id={item.name}>{item.name}</Item>}
          </ComboBoxField>
        </Box>
        <Box
          isRow
          alignItems="center"
          ml="xs"
          sx={isInputValueEmpty && {
            mb: '22.475px',
            ml: 'xs',
          }}
        >
          <IconButton aria-label="icon button with tooltip" title="Advanced Expression">
            <Icon icon={CogsIcon} size="sm" title={{ name: 'Cogs Icon' }} />
          </IconButton>
          <IconButton
            aria-label="icon button with tooltip"
            title="Delete"
            sx={{ ml: 'xs' }}
            onPress={() => removeRow(index)}
          >
            <Icon icon={DeleteIcon} size="sm" title={{ name: 'Delete Icon' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
