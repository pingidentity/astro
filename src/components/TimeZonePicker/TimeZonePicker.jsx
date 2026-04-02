import React, { forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState } from 'react';
import PropTypes from 'prop-types';

import { Box, ComboBoxField, Item, Text } from '../../index';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';

import { getGmtAndOffset } from './helper';
import defaultTimezones, { usCities } from './timezones';

const createSearchTags = ({ gmt, timeZone }) => {
  const normalizedTz = timeZone.replace(/_/g, ' ');
  let additionalTags = '';
  if (timeZone.includes('America')) {
    const city = timeZone.split('/')[1];
    if (usCities.includes(city)) {
      additionalTags = `US ${city}`;
    }
  }
  return `${gmt} ${timeZone} ${normalizedTz} ${additionalTags}`.toUpperCase();
};

const TimeZonePicker = forwardRef((props, ref) => {
  const {
    additionalTimeZones,
    emptySearchText,
    locales,
    localeOptions,
    selectedKey: selectedKeyProp,
    onSelectionChange: onSelectionChangeProp,
    inputValue: inputValueProp,
    onInputChange: onInputChangeProp,
    ...otherProps
  } = props;

  const isSelectionControlled = selectedKeyProp !== undefined;
  const isInputControlled = inputValueProp !== undefined;

  const [internalInputValue, setInternalInputValue] = useState(selectedKeyProp || '');
  const [internalSelectedKey, setInternalSelectedKey] = useState(selectedKeyProp || '');

  const inputValue = isInputControlled ? inputValueProp : internalInputValue;
  const selectedKey = isSelectionControlled ? selectedKeyProp : internalSelectedKey;

  const timeZonePickerRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => timeZonePickerRef.current);

  const allTimeZones = useMemo(() => {
    const sourceList = additionalTimeZones
      ? { ...defaultTimezones, ...additionalTimeZones }
      : defaultTimezones;

    return Object.entries(sourceList).map(([label, tzValue]) => {
      const { gmt, numericOffset } = getGmtAndOffset(tzValue);
      const displayTz = tzValue.replace(/_/g, ' ');

      return {
        key: `${displayTz} ${gmt}`,
        id: tzValue,
        label,
        timeZone: displayTz,
        gmt,
        numericOffset,
        searchTags: createSearchTags({ gmt, timeZone: tzValue }),
      };
    }).sort((a, b) => a.numericOffset - b.numericOffset);
  }, [additionalTimeZones]);

  // Sync internal input value when controlled selectedKey changes externally
  useEffect(() => {
    if (isSelectionControlled) {
      if (selectedKeyProp) {
        const item = allTimeZones.find(tz => tz.key === selectedKeyProp);
        if (item && !isInputControlled) {
          setInternalInputValue(item.key);
        }
      } else if (!isInputControlled) {
        setInternalInputValue('');
      }
    }
  }, [selectedKeyProp, isSelectionControlled, isInputControlled, allTimeZones]);

  const filteredItems = useMemo(() => {
    const selectedItem = allTimeZones.find(tz => tz.key === selectedKey);
    const isExactMatch = selectedItem && selectedItem.key === inputValue;

    if (!inputValue || isExactMatch) {
      return allTimeZones;
    }

    const upperSearch = inputValue.toUpperCase();
    return allTimeZones.filter(tz => tz.searchTags.includes(upperSearch));
  }, [inputValue, selectedKey, allTimeZones]);

  const timeData = useMemo(() => {
    const now = new Date();
    const map = new Map();
    allTimeZones.forEach(tz => {
      map.set(tz.id, now.toLocaleTimeString(locales, {
        timeZone: tz.id,
        ...localeOptions,
      }));
    });
    return map;
  }, [allTimeZones, locales, localeOptions]);

  const onInputChange = value => {
    if (!isInputControlled) {
      setInternalInputValue(value);
    }
    if (value === '') {
      if (!isSelectionControlled) {
        setInternalSelectedKey(null);
      }
      onSelectionChangeProp?.(null);
    }
    onInputChangeProp?.(value);
  };

  const onSelectionChange = key => {
    if (!key) return;
    const selectedItem = allTimeZones.find(item => item.key === key);
    if (selectedItem) {
      if (!isInputControlled) {
        setInternalInputValue(selectedItem.key);
      }
      if (!isSelectionControlled) {
        setInternalSelectedKey(key);
      }
      onSelectionChangeProp?.(key);
      onInputChangeProp?.(selectedItem.key);
    }
  };

  return (
    <ComboBoxField
      {...getPendoID('TimeZonePicker')}
      {...otherProps}
      ref={timeZonePickerRef}
      items={filteredItems}
      inputValue={inputValue}
      selectedKey={selectedKey}
      onInputChange={onInputChange}
      onSelectionChange={onSelectionChange}
      menuTrigger="input"
      disabledKeys={[emptySearchText]}
      containerProps={{ sx: { width: 400, fontSize: 'md' } }}
      allowsEmptyCollection
      renderEmptyState={() => (
        <span>
          {emptySearchText}
        </span>
      )}
    >
      {item => (
        <Item key={`${item.key}`} textValue={`${item.key}`}>
          <Box flexDirection="row" justifyContent="space-between" width="100%">
            <Box flexDirection="row">
              <Text variant="variants.timeZone.item.title">{item.timeZone}</Text>
              <Text variant="variants.timeZone.item.subTitle">{item.gmt}</Text>
            </Box>
            <Box>
              <Text variant="variants.timeZone.item.time">{timeData.get(item.id)}</Text>
            </Box>
          </Box>
        </Item>
      )}
    </ComboBoxField>
  );
});

TimeZonePicker.propTypes = {
  /**
   * An object representing additional time zones to merge with the [default list](https://github.com/yury-dymov/react-bootstrap-timezone-picker/blob/master/src/timezones.json).
   * The key may be customized, but the value should be a timezone string from the list in the [Time Zone Database](https://www.iana.org/time-zones).
   *
   * e.g. `{'(GMT+02:00) Africa/Juba': 'Africa/Juba'}`
   */
  additionalTimeZones: PropTypes.shape({}),
  /** Text that will be shown if no search results are found. */
  emptySearchText: PropTypes.string,
  /** Locale(s) to use when generating the time format. See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString#using_locales) for more info. */
  locales: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  /** Custom options to use when generating the time format. See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString#using_options) for more info. */
  localeOptions: PropTypes.shape({}),
  /** The key of the currently selected item (controlled). */
  selectedKey: PropTypes.string,
  /** Handler called when the selection changes. Receives the selected key. */
  onSelectionChange: PropTypes.func,
  /** The current input value (controlled). */
  inputValue: PropTypes.string,
  /** Handler called when the input value changes. */
  onInputChange: PropTypes.func,
};

TimeZonePicker.defaultProps = {
  emptySearchText: 'No Search Result',
  locales: [],
  localeOptions: {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
  },
};

export default TimeZonePicker;
