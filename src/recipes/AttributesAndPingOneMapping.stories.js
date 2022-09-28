import React, { useState, useRef, useEffect, memo } from 'react';
import CogsIcon from 'mdi-react/CogsIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';
import AddIcon from 'mdi-react/AddIcon';
import {
  ScrollBox,
  ComboBoxField,
  IconButton,
  Text,
  Box,
  Item,
  Icon,
  TextField,
  Separator,
  Button,
} from '../index';

const items = [
  { name: 'Aardvark', id: '1' },
  { name: 'Kangaroo', id: '2' },
  { name: 'Snake', id: '3' },
];

export default {
  title: 'Recipes/Attributes And PingOne Mapping',
};

const sx = {
  rowBox: { mb: '24.95px' },
  textField: { height: '40px !important' },
  comboBoxField: {
    height: '40px !important',
    pt: '5px !important',
  },
  headingText: {
    fontSize: 'sm',
    fontWeight: 400,
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
    ml: '10px',
    flexGrow: 1,
  },
};

const Row = memo((props) => {
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

  const rowRef = useRef();
  const textFieldRef = useRef();

  const setTextValue = (value) => {
    updateRow(index, value, 'textValue');
    submitFields(false);
  };

  const setInputValue = (value) => {
    updateRow(index, value, 'inputValue');
    submitFields(false);
  };

  useEffect(() => {
    if (isNewRow) {
      textFieldRef.current.focus();
      textFieldRef.current.scrollIntoView();
    }
  }, []);

  return (
    <Box
      isRow
      alignItems="center"
      mb="md"
      ref={rowRef}
    >
      <Box
        width="310px"
        sx={!areRowsValid && isSubmitted && inputValue === '' && textValue !== '' ? sx.rowBox : {}}
      >
        <TextField
          name="custom-name"
          aria-label="text field"
          labelProps={{
            'aria-label': 'selection field',
            mb: 0,
          }}
          controlProps={{ sx: sx.textField }}
          id={`textField ${index}`}
          key={`textField ${index}`}
          isReadOnly={isDisabled}
          value={textValue}
          onChange={e => setTextValue(e.target.value)}
          ref={textFieldRef}
          status={!areRowsValid && isSubmitted && textValue === '' && inputValue !== '' ? 'error' : 'default'}
          helperText={!areRowsValid && isSubmitted && textValue === '' && inputValue !== '' ? 'Enter an attribute.' : null}
        />
      </Box>
      <Box
        alignItems="center"
        ml="12px"
        isRow
        width="378px"
        sx={!areRowsValid && isSubmitted && textValue === '' && inputValue !== '' ? sx.rowBox : {}}
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
            status={!areRowsValid && isSubmitted && inputValue === '' && textValue !== '' ? 'error' : 'default'}
            helperText={!areRowsValid && isSubmitted && inputValue === '' && textValue !== '' ? 'Select an item.' : null}
            labelProps={{
              'aria-label': 'selection field',
              mb: 0,
            }}
            aria-label="selection field"
            controlProps={{
              'aria-label': 'selection field',
              sx: sx.comboBoxField,
            }}
            containerProps={{
              'aria-label': 'selection field',
              width: '100%',
              maxWidth: '310px',
              sx: { width: '100%' },
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
          sx={!areRowsValid && isSubmitted && inputValue === '' && textValue !== '' ? {
            mb: '22.475px',
            ml: 'xs',
          } : {
            ml: 'xs',
          }}
        >
          <IconButton aria-label="icon button with tooltip" title="Advanced Expression" >
            <Icon icon={CogsIcon} />
          </IconButton>
          <IconButton
            aria-label="icon button with tooltip"
            title="Delete"
            sx={{ ml: 'xs' }}
            onPress={() => removeRow(index)}
          >
            <Icon icon={DeleteIcon} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
});

export const Default = () => {
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

  const removeRow = (rowIndex) => {
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
      <Box
        isRow
        alignItems="center"
        mb="md"
        ml="xs"
      >
        <Text
          sx={sx.headingText}
        >
          Create new attributes and map predefined attributes with their PingOne Mappings.
        </Text>
        <Button variant="inline" ml="auto" height="22px" minWidth="0px" width="70px" onPress={addRow}>
          <Box isRow alignItems="center" width="38px" justifyContent="center">
            <Icon icon={AddIcon} mr="xs" color="active" size={15} />
            Add
          </Box>
        </Button>
      </Box>
      <Box
        backgroundColor="accent.99"
        p="16px"
      >
        <Box
          isRow
        >
          <Text
            sx={sx.firstRowTitle}
          >
            Attributes
          </Text>
          <Text
            sx={sx.secondRowTitle}
          >
            PingOne Mappings
          </Text>
        </Box>
        <Separator />
        <ScrollBox
          mt="md"
          maxHeight="700px"
        >
          <Box>
            {rows.map((row, index) => {
              return (
                <Row
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
