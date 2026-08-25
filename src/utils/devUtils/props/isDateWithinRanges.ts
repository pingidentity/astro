import { parseDate } from '@internationalized/date';

import { DateValue } from '../../../types';

/**
 * Checks if a given date is within any of the ranges.
 * @param {DateValue} date - The date to be checked.
 * @param {[string, string][]} ranges - An array of date ranges to compare against.
 * Each range should be an array with two string elements representing the start and end dates.
 * @returns {boolean} - `true` if the date is within any of the unavailable ranges,
 * `false` otherwise.
 */
export const isDateWithinRanges = (date: DateValue, ranges: [string, string][]): boolean => {
  return ranges.some(([start, end]) => {
    return date.compare(parseDate(start)) >= 0 && date.compare(parseDate(end)) <= 0;
  });
};
