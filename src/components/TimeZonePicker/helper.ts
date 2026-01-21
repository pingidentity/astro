export const getOffSetString = timeZone => {
  // Use Intl.DateTimeFormat to get the GMT offset string
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'longOffset',
  }).formatToParts(new Date());

  // Extract the GMT offset part
  const offsetString = parts.find(p => p.type === 'timeZoneName')?.value || 'GMT+00:00';

  if (offsetString !== 'GMT') {
    return offsetString;
  }

  return 'GMT+00:00';
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

export const getGmtAndOffset = timeZone => {
  try {
    const offsetString = getOffSetString(timeZone);
    const numericOffset = getNumericOffset(offsetString);

    // Return both the GMT string and numeric offset
    return { gmt: offsetString, numericOffset };
  } catch (e) {
    return { gmt: 'GMT+00:00', numericOffset: 0 };
  }
};
