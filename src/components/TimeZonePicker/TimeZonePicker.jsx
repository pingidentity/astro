import React, { forwardRef,
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
    ...otherProps
  } = props;

  const [search, setSearch] = useState('');
  const [selectedKey, setSelectedKey] = useState('');

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

  const filteredItems = useMemo(() => {
    const selectedItem = allTimeZones.find(tz => tz.key === selectedKey);
    const isExactMatch = selectedItem && selectedItem.key === search;

    if (!search || isExactMatch) {
      return allTimeZones;
    }

    const upperSearch = search.toUpperCase();
    return allTimeZones.filter(tz => tz.searchTags.includes(upperSearch));
  }, [search, selectedKey, allTimeZones]);

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
    setSearch(value);
    if (value === '') {
      setSelectedKey(null);
    }
  };

  const onSelectionChange = key => {
    if (!key) return;
    const selectedItem = allTimeZones.find(item => item.key === key);
    if (selectedItem) {
      setSearch(selectedItem.key);
      setSelectedKey(key);
    }
  };

  return (
    <ComboBoxField
      {...getPendoID('TimeZonePicker')}
      {...otherProps}
      ref={timeZonePickerRef}
      items={filteredItems}
      inputValue={search}
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
