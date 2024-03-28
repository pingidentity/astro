import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import { Box, ComboBoxField, Item, Text } from '../../index';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';

import defaultTimezones, { usCities } from './timezones.js';

const createSearchTags = ({ gmt, gmtLabel, timeZone }) => {
  let additionalTags = '';
  const americaTimeZone = timeZone.includes('America') && timeZone.substring(8);
  if (usCities.includes(americaTimeZone)) {
    additionalTags = `US ${americaTimeZone}`;
  }
  return `${gmt} ${gmtLabel} ${timeZone} ${timeZone?.replace(
    /_/g,
    ' ',
  )} ${additionalTags}`;
};

const getLocaleTime = ({ timeZone, locales, localeOptions }) => {
  const date = new Date();
  return date.toLocaleTimeString(locales, {
    timeZone,
    ...localeOptions,
  });
};

const getTimezoneOffset = timeZone => {
  const now = new Date();
  const tzString = now.toLocaleString('en-US', { timeZone });
  const localString = now.toLocaleString('en-US');
  const diff = (Date.parse(localString) - Date.parse(tzString)) / 3600000;
  const offset = -(diff + (now.getTimezoneOffset() / 60));
  const formattedString = `${offset}:00`;

  return offset > 0 ? `+${formattedString}` : formattedString;
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
  const [timeUpdate, setTimeUpdate] = useState(true);
  const [timeZones, setTimeZones] = useState([]);
  const extendedTimeZonesList = additionalTimeZones
    ? { ...defaultTimezones, ...additionalTimeZones }
    : defaultTimezones;

  const timeZonePickerRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => timeZonePickerRef.current);

  useEffect(() => {
    if (timeUpdate) {
      const createTimeZoneTimes = () => Object.entries(extendedTimeZonesList).map(item => {
        const gmt = `GMT${getTimezoneOffset(item[1])}`;
        const gmtLabel = item[0].substring(12);
        const timeZone = item[1]?.replace(/_/g, ' ');
        const time = getLocaleTime({
          timeZone: item[1],
          locales,
          localeOptions,
        });
        const searchTags = createSearchTags({ gmt, gmtLabel, timeZone });
        return {
          gmt,
          timeZone,
          time,
          searchTags,
        };
      });

      setTimeZones(createTimeZoneTimes());
      setTimeUpdate(false);
    }
  }, [extendedTimeZonesList, locales, localeOptions, timeUpdate]);

  const filterTimezones = useCallback(
    timeZonesList => {
      return timeZonesList.filter(({ searchTags }) => {
        return searchTags.toUpperCase().indexOf(search.toUpperCase()) > -1;
      });
    },
    [search],
  );

  const filteredTimezones = useMemo(() => filterTimezones(timeZones), [
    filterTimezones,
    timeZones,
  ]);

  const sortByGMT = (a, b) => {
    const aNum = parseFloat(a.gmt.split('GMT')[1].split(':')[0]);
    const bNum = parseFloat(b.gmt.split('GMT')[1].split(')')[0]);

    return aNum - bNum;
  };

  const checkIsSelectedItem = () => {
    return timeZones.filter(tz => tz.timeZone === search).length > 0;
  };

  const renderTimeZones = timeZonesToRender => {
    return timeZonesToRender.sort(sortByGMT).map(({ gmt, time, timeZone }) => (
      <Item key={timeZone} data-id={timeZone} textValue={timeZone}>
        <Box flexDirection="row" justifyContent="space-between" width="100%">
          <Box flexDirection="row">
            <Text variant="variants.timeZone.item.title">{timeZone}</Text>
            <Text variant="variants.timeZone.item.subTitle">{gmt}</Text>
          </Box>
          <Box>
            <Text variant="variants.timeZone.item.time">{time}</Text>
          </Box>
        </Box>
      </Item>
    ));
  };

  const items = useMemo(() => {
    if (filteredTimezones.length === 0) {
      return <Item key={emptySearchText}>{emptySearchText}</Item>;
    }
    return renderTimeZones(checkIsSelectedItem() ? timeZones : filteredTimezones);
  }, [emptySearchText, filteredTimezones, search, timeZones]);

  const comboBoxFieldProps = useMemo(
    () => ({
      containerProps: { sx: { width: 400, fontSize: 'md' } },
      onInputChange: setSearch,
      items: filteredTimezones,
      ref: timeZonePickerRef,
      onOpenChange: isOpen => setTimeUpdate(isOpen),
      disabledKeys: [{ emptySearchText }],
      ...otherProps,
    }),
    [emptySearchText, filteredTimezones, otherProps],
  );

  return (
    <ComboBoxField
      {...getPendoID('TimeZonePicker')}
      {...comboBoxFieldProps}
      disabledKeys={[emptySearchText]}
      menuTrigger="input"
    >
      {items}
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
