import React, { useState } from 'react';
import { countries as countriesObj } from 'countries-list';

import Box from '../components/Box';
import ComboBoxField from '../components/ComboBoxField';
import Input from '../components/Input';
import { Item } from '../index';

export default {
  title: 'Recipes/Country Picker',
};

const validatePhoneNumber = str => {
  const reg = /^$|^[\d\-(\d)\s.]+$|^\+/g;
  return reg.test(str);
};

const sx = {
  wrapperBox: {
    width: '100%',
    maxWidth: 500,
    position: 'relative',
  },
  comboBoxFieldWrapperOpen: {
    position: 'absolute',
    transition: '0.2s width ease',
    width: '100%',
  },
  comboBoxFieldWrapperClose: {
    position: 'absolute',
    transition: '0.2s width ease',
    maxWidth: '110px',
  },
  inputWrapper: {
    width: '100%',
    ml: '110px',
  },
};

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [phoneCodeValue, setPhoneCodeValue] = useState('');
  const [selectedKey, setSelectedKey] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const getInputValue = () => {
    if (isOpen) return searchValue;
    return phoneCodeValue || searchValue;
  };

  const inputHandler = value => {
    setSearchValue(value);
    if (!value) {
      setSelectedKey(null);
      setPhoneCodeValue('');
    }
  };

  const selectionHandler = key => {
    setSelectedKey(key);
    if (key) {
      setPhoneCodeValue(`+${countriesObj[key].phone.split(',')[0]}`);
    } else {
      setSearchValue('');
      setPhoneCodeValue('');
    }
    setIsOpen(false);
  };

  const keyHandler = e => {
    if (e.keyCode !== 13) setIsOpen(true);
  };

  const onPhoneNumberValueChange = e => {
    const value = e.target.value;
    if (value === '' || validatePhoneNumber(value)) {
      setPhoneNumber(value);
    }
  };

  return (
    <Box isRow sx={sx.wrapperBox}>
      <ComboBoxField
        mt={-5}
        width="100%"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        containerProps={{ sx: isOpen ? sx.comboBoxFieldWrapperOpen : sx.comboBoxFieldWrapperClose }}
        controlProps={{ 'aria-label': 'Country Picker' }}
        defaultItems={Object.entries(countriesObj)}
        inputValue={getInputValue()}
        onInputChange={inputHandler}
        selectedKey={selectedKey}
        onSelectionChange={selectionHandler}
        onKeyUp={keyHandler}
        menuTrigger="focus"
      >
        {item => (
          <Item key={item[0]}>
            {`${item[1].name}${item[1].name !== item[1].native ? ` (${item[1].native})` : ''} +${item[1].phone.split(',')[0]}`}
          </Item>
        )}
      </ComboBoxField>
      <Box sx={sx.inputWrapper}>
        <Input
          placeholder="Phone number..."
          onChange={onPhoneNumberValueChange}
          value={phoneNumber}
        />
      </Box>
    </Box>
  );
};
