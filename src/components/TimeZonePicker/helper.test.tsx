import { getGmtAndOffset, getNumericOffset, getOffSetString } from './helper';

describe('TimeZonePicker helpers', () => {
  describe('getOffSetString', () => {
    test('returns GMT offset string for America/New_York', () => {
      const result = getOffSetString('America/New_York');
      expect(result).toMatch(/GMT[+-]\d{2}:\d{2}/);
    });

    test('returns GMT offset string for Europe/London', () => {
      const result = getOffSetString('Europe/London');
      expect(result).toMatch(/GMT[+-]\d{2}:\d{2}/);
    });

    test('returns GMT offset string for Asia/Tokyo', () => {
      const result = getOffSetString('Asia/Tokyo');
      expect(result).toMatch(/GMT[+-]\d{2}:\d{2}/);
    });

    test('returns GMT+00:00 for UTC', () => {
      const result = getOffSetString('UTC');
      expect(result).toBe('GMT+00:00');
    });

    test('returns UTC offset string when format is utc', () => {
      const result = getOffSetString('America/New_York', 'utc');
      expect(result).toMatch(/UTC[+-]\d{2}:\d{2}/);
    });

    test('returns UTC+00:00 for UTC timezone with utc format', () => {
      const result = getOffSetString('UTC', 'utc');
      expect(result).toBe('UTC+00:00');
    });
  });

  describe('getNumericOffset', () => {
    test('parses positive offset correctly', () => {
      const result = getNumericOffset('GMT+05:30');
      expect(result).toBe(5.5);
    });

    test('parses negative offset correctly', () => {
      const result = getNumericOffset('GMT-08:00');
      expect(result).toBe(-8);
    });

    test('parses zero offset correctly', () => {
      const result = getNumericOffset('GMT+00:00');
      expect(result).toBe(0);
    });

    test('handles offset with minutes correctly', () => {
      const result = getNumericOffset('GMT+03:30');
      expect(result).toBe(3.5);
    });

    test('returns 0 for invalid offset string', () => {
      const result = getNumericOffset('invalid');
      expect(result).toBe(0);
    });

    test('returns 0 for GMT without offset', () => {
      const result = getNumericOffset('GMT');
      expect(result).toBe(0);
    });
  });

  describe('getGmtAndOffset', () => {
    test('returns GMT string and numeric offset for valid timezone', () => {
      const result = getGmtAndOffset('America/New_York');
      expect(result).toHaveProperty('gmt');
      expect(result).toHaveProperty('numericOffset');
      expect(result.gmt).toMatch(/GMT[+-]\d{2}:\d{2}/);
      expect(typeof result.numericOffset).toBe('number');
    });

    test('returns GMT+00:00 and 0 for invalid timezone', () => {
      const result = getGmtAndOffset('Invalid/Timezone');
      expect(result).toEqual({ gmt: 'GMT+00:00', numericOffset: 0 });
    });

    test('returns correct values for UTC', () => {
      const result = getGmtAndOffset('UTC');
      expect(result).toEqual({ gmt: 'GMT+00:00', numericOffset: 0 });
    });

    test('returns correct values for Asia/Kolkata', () => {
      const result = getGmtAndOffset('Asia/Kolkata');
      expect(result.gmt).toMatch(/GMT\+05:30/);
      expect(result.numericOffset).toBe(5.5);
    });

    test('returns UTC string when format is utc', () => {
      const result = getGmtAndOffset('America/New_York', 'utc');
      expect(result.gmt).toMatch(/UTC[+-]\d{2}:\d{2}/);
      expect(typeof result.numericOffset).toBe('number');
    });

    test('returns UTC+00:00 for UTC timezone with utc format', () => {
      const result = getGmtAndOffset('UTC', 'utc');
      expect(result).toEqual({ gmt: 'UTC+00:00', numericOffset: 0 });
    });

    test('returns UTC+00:00 and 0 for invalid timezone with utc format', () => {
      const result = getGmtAndOffset('Invalid/Timezone', 'utc');
      expect(result).toEqual({ gmt: 'UTC+00:00', numericOffset: 0 });
    });
  });
});
