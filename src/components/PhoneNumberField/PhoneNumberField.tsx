import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { useFilter } from '@react-aria/i18n';
import { countries as countriesObj } from 'countries-list';
import { v4 as uuid } from 'uuid';

import {
  Box,
  ComboBoxField,
  FieldHelperText,
  Input,
  Item,
  Label,
} from '../..';
import { useField, useLocalOrForwardRef, usePropWarning } from '../../hooks';
import { PhoneNumberFieldProps } from '../../types';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';

const displayName = 'PhoneNumberField';

const validatePhoneNumber = (str: string): boolean => /^$|^\+\d*$|^\d+$/.test(str);

const allCountries = Object.entries(countriesObj);

const getCountry = (key: string) => countriesObj[key as keyof typeof countriesObj];
const primaryDial = (key: string) => getCountry(key)?.phone.split(',')[0] ?? '';
const toDialCode = (key: string) => {
  const dial = primaryDial(key);
  return dial ? `+${dial}` : '';
};

const parsePaste = (raw: string): { countryKey: string | null; localNumber: string } => {
  const digitsOnly = raw.replace(/\D/g, '');
  if (raw.trimStart().startsWith('+')) {
    const match = allCountries.find(([, c]) => digitsOnly.startsWith(c.phone.split(',')[0]));
    if (match) {
      const dialLen = match[1].phone.split(',')[0].length;
      return { countryKey: match[0], localNumber: digitsOnly.slice(dialLen) };
    }
  }
  return { countryKey: null, localNumber: digitsOnly };
};

interface CountryFieldState {
  inputValue: string;
  selectedKey: string | null;
  searchValue: string;
  items: typeof allCountries;
  isOpen: boolean;
}


const PhoneNumberField = forwardRef<HTMLInputElement, PhoneNumberFieldProps>((props, ref) => {
  const {
    countryValue,
    defaultCountryValue,
    helperText,
    isReadOnly,
    onCountryChange,
    status,
    ...others
  } = props;

  const {
    fieldContainerProps,
    fieldControlInputProps,
    fieldControlWrapperProps,
    fieldLabelProps,
  } = useField({ status, isReadOnly, ...others });

  const { onChange, value: fieldValue } = fieldControlInputProps;
  const inputRef = useLocalOrForwardRef<HTMLInputElement>(ref);

  const helperTextId = uuid();

  usePropWarning(props, 'disabled', 'isDisabled');

  const { contains } = useFilter({ sensitivity: 'base' });

  const [phoneNumber, setPhoneNumber] = useState(() => String(fieldValue ?? ''));

  useEffect(() => {
    if (fieldValue !== undefined) setPhoneNumber(String(fieldValue));
  }, [fieldValue]);

  const [fieldState, setFieldState] = useState<CountryFieldState>(() => {
    const key = countryValue ?? defaultCountryValue;
    if (key && getCountry(key)) {
      const dialCode = toDialCode(key);
      return {
        inputValue: dialCode,
        selectedKey: key,
        searchValue: dialCode,
        items: allCountries,
        isOpen: false,
      };
    }
    return {
      inputValue: '', selectedKey: null, searchValue: '', items: allCountries, isOpen: false,
    };
  });

  const isControlledCountry = countryValue !== undefined;
  const currentSelectedKey = isControlledCountry ? (countryValue ?? null) : fieldState.selectedKey;
  const closedDisplayValue = isControlledCountry
    ? toDialCode(countryValue ?? '')
    : fieldState.inputValue;
  const currentCountryInputValue = fieldState.isOpen ? fieldState.searchValue : closedDisplayValue;

  const inputHandler = useCallback((value: string) => {
    const search = value.toLowerCase();
    const newItems = value
      ? allCountries.filter(([, c]) => {
        const nameStr = `${c.name}${c.name !== c.native ? ` (${c.native})` : ''}`;
        const dialStr = `+${c.phone.split(',')[0]}`.toLowerCase();
        return contains(nameStr, value) || dialStr.includes(search);
      })
      : allCountries;

    setFieldState(prev => ({
      ...prev, inputValue: value, searchValue: value, items: newItems,
    }));
  }, [contains]);

  const selectionHandler = useCallback((key: string) => {
    if (!key) return;
    const dialCode = toDialCode(key);
    setFieldState({
      inputValue: dialCode,
      selectedKey: key,
      searchValue: dialCode,
      items: allCountries,
      isOpen: false,
    });
    if (onCountryChange) onCountryChange(key);
  }, [onCountryChange]);

  const onOpenChangeHandler = useCallback((open: boolean) => {
    if (isReadOnly) return;
    if (open) {
      setFieldState(prev => ({ ...prev, isOpen: true, items: allCountries }));
    } else {
      setFieldState(prev => {
        if (!prev.selectedKey) return { ...prev, isOpen: false, items: allCountries };
        const dialCode = toDialCode(prev.selectedKey);
        return {
          ...prev, isOpen: false, inputValue: dialCode, searchValue: dialCode, items: allCountries,
        };
      });
    }
  }, [isReadOnly]);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;
    if (validatePhoneNumber(e.target.value)) {
      setPhoneNumber(e.target.value);
      onChange(e);
    }
  }, [onChange]);

  const commitPaste = useCallback((raw: string) => {
    if (!inputRef.current || !onChange) return;
    const { countryKey, localNumber } = parsePaste(raw);
    if (countryKey) selectionHandler(countryKey);
    setPhoneNumber(localNumber);
    inputRef.current.value = localNumber;
    const event = { target: inputRef.current, currentTarget: inputRef.current };
    onChange(event as React.ChangeEvent<HTMLInputElement>);
  }, [inputRef, onChange, selectionHandler]);

  const handlePhonePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    if (isReadOnly) return;
    e.preventDefault();
    commitPaste(e.clipboardData.getData('text'));
  }, [isReadOnly, commitPaste]);

  const handleComboBoxPaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    if (isReadOnly) return;
    const raw = e.clipboardData.getData('text');
    if (!raw.trimStart().startsWith('+')) return;
    e.preventDefault();
    commitPaste(raw);
  }, [isReadOnly, commitPaste]);

  const comboBoxWrapperSx = {
    position: 'absolute',
    zIndex: 1,
    ...(fieldState.isOpen
      ? { width: '100%' }
      : {
        transition: '0.2s width ease',
        width: '110px',
        '& input': {
          borderTopRightRadius: '0 !important',
          borderBottomRightRadius: '0 !important',
        },
      }),
  };

  const countryPickerScrollBoxSx = {
    minWidth: 0,
    '@media screen and (max-width: 500px)': {
      width: '100%',
      maxWidth: '100%',
      overflowX: 'hidden',
    },
  };

  const countryLabel = (c: { name: string; native: string; phone: string }) => `${c.name}${c.name !== c.native ? ` (${c.native})` : ''} +${c.phone.split(',')[0]}`;

  return (
    <Box variant="forms.input.fieldContainer" {...getPendoID(displayName)} {...fieldContainerProps}>
      <Label {...fieldLabelProps} />
      <Box
        variant="forms.input.fieldControlWrapper"
        isRow
        {...fieldControlWrapperProps}
        sx={{ position: 'relative' }}
      >
        <ComboBoxField
          width="100%"
          status={status}
          isReadOnly={isReadOnly}
          isOpen={fieldState.isOpen}
          onOpenChange={onOpenChangeHandler}
          wrapperProps={{ sx: comboBoxWrapperSx }}
          controlProps={{ 'aria-label': 'Country Picker', onPaste: handleComboBoxPaste }}
          containerProps={{ sx: { '> label': { mb: 0 } } }}
          scrollBoxProps={{ maxHeight: '215px', sx: countryPickerScrollBoxSx }}
          items={fieldState.items}
          inputValue={currentCountryInputValue}
          selectedKey={currentSelectedKey}
          onInputChange={inputHandler}
          onSelectionChange={selectionHandler}
          menuTrigger="focus"
          isDisabled={fieldControlInputProps.disabled}
        >
          {(item: [string, { name: string; native: string; phone: string }]) => (
            <Item key={item[0]} textValue={`+${item[1].phone.split(',')[0]}`}>
              {countryLabel(item[1])}
            </Item>
          )}
        </ComboBoxField>
        <Box
          className={fieldControlInputProps.className?.includes('is-focused') ? 'phone-number-field__input-focused' : undefined}
          sx={{
            ml: '109px',
            width: 'calc(100% - 109px)',
            visibility: fieldState.isOpen ? 'hidden' : undefined,
            '&.phone-number-field__input-focused': { ml: '111px' },
            '& input': { borderTopLeftRadius: '0 !important', borderBottomLeftRadius: '0 !important' },
          }}
        >
          <Input
            ref={inputRef}
            {...fieldControlInputProps}
            type="tel"
            value={phoneNumber}
            aria-describedby={[helperText && helperTextId, fieldControlInputProps['aria-describedby']].join(fieldControlInputProps['aria-describedby'] ? ' ' : '') || undefined}
            onChange={handlePhoneChange}
            onPaste={handlePhonePaste}
          />
        </Box>
      </Box>
      {helperText
      && (
      <FieldHelperText status={status} id={helperTextId}>
        {helperText}
      </FieldHelperText>
      )}
    </Box>
  );
});

PhoneNumberField.displayName = displayName;

export default PhoneNumberField;
