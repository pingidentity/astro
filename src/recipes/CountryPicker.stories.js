import React, { useState } from 'react';
import { countries as countriesObj } from 'countries-list';
import Box from '../components/Box';
import ComboBoxField from '../components/ComboBoxField';
import Input from '../components/Input';
import { Item } from '../index';

export default {
  title: 'Recipes/CountryPicker',
};

const validatePhoneNumber = (str) => {
  const reg = /^$|^[\d\-(\d)\s.]+$|^\+/g;
  return reg.test(str);
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

  const inputHandler = (value) => {
    setSearchValue(value);
    if (!value) {
      setSelectedKey(null);
      setPhoneCodeValue('');
    }
  };

  const selectionHandler = (key) => {
    setSelectedKey(key);
    if (key) {
      setPhoneCodeValue(`+${countriesObj[key].phone.split(',')[0]}`);
    } else {
      setSearchValue('');
      setPhoneCodeValue('');
    }
    setIsOpen(false);
  };

  const keyHandler = (e) => {
    if (e.keyCode !== 13) setIsOpen(true);
  };

  const onPhoneNumberValueChange = (e) => {
    const value = e.target.value;
    if (value === '' || validatePhoneNumber(value)) {
      setPhoneNumber(value);
    }
  };

  return (
    <Box isRow sx={{ width: '100%', maxWidth: 500, position: 'relative' }}>
      <ComboBoxField
        mt={-5}
        width="100%"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        wrapperProps={{ sx: { position: 'absolute', transition: '0.2s width ease', width: isOpen ? '100%' : 110 } }}
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
      <Box width="100%" ml={110}>
        <Input
          placeholder="Phone number..."
          onChange={onPhoneNumberValueChange}
          value={phoneNumber}
        />
      </Box>
    </Box>
  );
};
