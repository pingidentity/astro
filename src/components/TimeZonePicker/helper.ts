export const getOffSetString = (timeZone, format = 'gmt') => {
  // Use Intl.DateTimeFormat to get the GMT offset string
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'longOffset',
  }).formatToParts(new Date());

  // Extract the GMT offset part
  let offsetString = parts.find(p => p.type === 'timeZoneName')?.value || 'GMT+00:00';

  if (offsetString === 'GMT') {
    offsetString = 'GMT+00:00';
  }

  if (format === 'utc') {
    return offsetString.replace('GMT', 'UTC');
  }

  return offsetString;
};

export const getNumericOffset = offsetString => {
  // Convert GMT offset string to numeric offset in hours
  const match = offsetString.match(/([+-])(\d+):(\d+)/);

  if (match) {
    const [_, sign, hours, minutes] = match;
    // Calculate the numeric offset in hours
    return (parseInt(hours, 10) + parseInt(minutes, 10) / 60) * (sign === '+' ? 1 : -1);
  }

  return 0;
};

export const getGmtAndOffset = (timeZone, format = 'gmt') => {
  try {
    const offsetString = getOffSetString(timeZone, format);
    const numericOffset = getNumericOffset(offsetString);

    // Return both the offset string and numeric offset
    return { gmt: offsetString, numericOffset };
  } catch (e) {
    const fallbackPrefix = format === 'utc' ? 'UTC' : 'GMT';
    return { gmt: `${fallbackPrefix}+00:00`, numericOffset: 0 };
  }
};
