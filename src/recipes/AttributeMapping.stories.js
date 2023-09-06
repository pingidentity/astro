import React, { memo, useEffect, useRef, useState } from 'react';
import AddIcon from '@pingux/mdi-react/AddIcon';
import AlertCircleIcon from '@pingux/mdi-react/AlertCircleIcon';
import CogsIcon from '@pingux/mdi-react/CogsIcon';
import CreateIcon from '@pingux/mdi-react/CreateIcon';
import DeleteIcon from '@pingux/mdi-react/DeleteIcon';
import { v4 as uuid } from 'uuid';

import {
  Badge,
  Box,
  Button,
  ComboBoxField,
  HelpHint,
  Icon,
  IconButton,
  Item,
  ScrollBox,
  Separator,
  Text,
  TextField,
} from '../index';
import { FIGMA_LINKS } from '../utils/designUtils/figmaLinks.js';

export default {
  title: 'Recipes/Attribute Mappings',
};

const sx = {
  alertCircleIcon: {
    position: 'absolute',
    right: '4px',
    top: '4px',
    fill: '#A31300',
  },
  attributeMappingTitle: {
    fontSize: 'lg',
    lineHeight: '21px',
    fontWeight: 3,
    color: 'text.primary',
  },
  attributeMappingTitleWrapper: {
    marginBottom: 'md',
    alignItems: 'center',
  },
  badge: {
    width: 'xx',
    height: '22px',
    alignSelf: 'center',
    minWidth: 'fit-content',
    border: '1px solid',
    borderColor: 'neutral.80',
    backgroundColor: 'white !important',
    marginLeft: 8,
    '& span': {
      fontSize: 'sm',
      lineHeight: 1,
      color: '#253746',
    },
  },
  createIconButton: {
    marginLeft: 'xs',
  },
  defaultFieldsWrapperBox: {
    padding: '10px 10px 24px 10px',
    width: '450px',
    backgroundColor: 'accent.99',
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
    width: '21px',
    margin: '0 2px',
  },
  tooltipBox: {
    marginLeft: 'xs',
    height: 'md',
    width: 'md',
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

const Row = props => {
  const {
    withBadge,
    withTooltip,
    withError,
    leftValue,
    rightValue,
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
      {withTooltip
        && (
          <Box sx={sx.tooltipBox}>
            <HelpHint
              tooltipProps={{ direction: 'bottom' }}
            >
              Population set to default
            </HelpHint>
          </Box>
        )}
    </Box>
  );
};

const Title = () => {
  return (
    <Box
      isRow
      sx={sx.attributeMappingTitleWrapper}
    >
      <Text sx={sx.attributeMappingTitle}>
        Attribute Mapping
      </Text>
      <Box>
        <IconButton sx={sx.createIconButton} variant="inverted" aria-label="edit header button">
          <Icon icon={CreateIcon} size="sm" title={{ name: 'Create Icon' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export const Display = () => {
  return (
    <Box>
      <Title />
      <Box sx={sx.defaultFieldsWrapperBox}>
        <Box
          isRow
          sx={{ width: '100%' }}
        >
          <Box sx={sx.fieldColumnTitleWrapper}>
            <Text sx={sx.fieldColumnTitle}>
              PingOne
            </Text>
          </Box>
          <Box sx={sx.fieldColumnTitleWrapper}>
            <Text sx={sx.fieldColumnTitle}>
              Google Suites
            </Text>
          </Box>
        </Box>
        <Separator />
        <Row withBadge leftValue="UserId" rightValue="mdorey" />
        <Row leftValue="givenName" rightValue="firstName" />
        <Row leftValue="familyName" rightValue="lastName" />
        <Row withTooltip leftValue="population" rightValue="population" />
        <Row leftValue="password" rightValue="password" />
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
  const withErrorSx = {
    errorBox: {
      flexDirection: 'row !important',
      alignItems: 'center',
      padding: '13px 12px 13px 15px',
      gap: 'md',
      border: '1px solid #A31300',
      width: '450px',
      marginBottom: 'xs',
    },
    text: {
      fontSize: 'sm',
      lineHeight: '15px',
    },
  };

  return (
    <Box>
      <Title />

      {withError && (
        <Box sx={withErrorSx.errorBox}>
          <Icon size={24} icon={AlertCircleIcon} color="#A31300" title={{ name: 'Alert Circle Icon' }} />
          <Text sx={withErrorSx.text} id={helperTextId} role="alert">
            This attribute is unavailable.
            Please map the attribute again or re-map to a different attribute.
          </Text>
        </Box>
      )}

      <Box sx={sx.defaultFieldsWrapperBox}>
        <Box
          isRow
          sx={{ width: '100%' }}
        >
          <Box sx={sx.fieldColumnTitleWrapper}>
            <Text sx={sx.fieldColumnTitle}>
              PingOne
            </Text>
          </Box>
          <Box sx={sx.fieldColumnTitleWrapper}>
            <Text sx={sx.fieldColumnTitle}>
              Google Suites
            </Text>
          </Box>
        </Box>
        <Separator />
        <Row withBadge leftValue="UserId" rightValue="mdorey" />
        <Row withError={withError} leftValue="givenName" rightValue="firstName" />
        <Row withError={withError} leftValue="familyName" rightValue="lastName" />
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
  const [isSubmitted, submitFields] = useState(false);
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
                  submitFields={submitFields}
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

const EditRow = memo(props => {
  const {
    isDisabled,
    isNewRow,
    index,
    textValue,
    inputValue,
    updateRow,
    removeRow,
    areRowsValid,
    isSubmitted,
    submitFields,
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
    submitFields(false);
  };

  const setInputValue = value => {
    updateRow(index, value, 'inputValue');
    submitFields(false);
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
});
