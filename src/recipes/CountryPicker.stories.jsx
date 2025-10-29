import React, { useCallback, useState } from 'react';
import { useFilter } from '@react-aria/i18n';
import { countries as countriesObj } from 'countries-list';
import { withDesign } from 'storybook-addon-designs';

import {
  Box,
  ComboBoxField,
  Input,
  Item,
} from '../index';
import { FIGMA_LINKS } from '../utils/designUtils/figmaLinks';

export default {
  title: 'Recipes/Country Picker',
  decorators: [withDesign],
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
    width: '110px',
  },
  inputWrapper: {
    width: '100%',
    ml: '110px',
  },
};

export const Default = () => {
  const countries = Object.entries(countriesObj);

  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const [fieldState, setFieldState] = useState({
    inputValue: '',
    selectedKey: '',
    searchValue: '',
    items: countries,
  });

  const { contains } = useFilter({
    sensitivity: 'base',
  });

  const inputHandler = useCallback(value => {
    setFieldState({
      inputValue: !value ? '' : value,
      selectedKey: null,
      searchValue: value,
      items: countries.filter(item => contains(`${item[1].name}${item[1].name !== item[1].native ? ` (${item[1].native})` : ''} +${item[1].phone[0]}`, value)),
    });
  }, [countries, setFieldState, contains]);

  const selectionHandler = key => {
    const selectedItem = Object.entries(countries.filter(item => item[0] === key));
    setFieldState({
      inputValue: key ? `+${countriesObj[key].phone.split(',')[0]}` : '',
      selectedKey: key,
      searchValue: !key ? '' : `+${countriesObj[key].phone.split(',')[0]}`,
      items: countries.filter(item => contains(item[1].name, selectedItem[1]?.name ?? '')),
    });
    if (isOpen) setIsOpen(false);
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
        wrapperProps={{ sx: isOpen ? sx.comboBoxFieldWrapperOpen : sx.comboBoxFieldWrapperClose }}
        controlProps={{ 'aria-label': 'Country Picker' }}
        scrollBoxProps={{ maxHeight: '215px' }}
        items={fieldState.items}
        inputValue={isOpen ? fieldState.searchValue : fieldState.inputValue}
        selectedKey={fieldState.selectedKey}
        onInputChange={inputHandler}
        onSelectionChange={selectionHandler}
        menuTrigger="focus"
        aria-labelledby="group-label"
      >
        {item => (
          <Item key={item[0]} textValue={`+${item[1].phone.split(',')[0]}`}>
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

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.countryPicker.default,
  },
};
