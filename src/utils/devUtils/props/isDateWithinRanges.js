import { parseDate } from '@internationalized/date';

/**
 * Checks if a given date is within any of the ranges.
 * @param {Date} date - The date to be checked.
 * @param {Array<Array<string>>} ranges - An array of date ranges to compare against.
 * Each range should be an array with two string elements representing the start and end dates.
 * @returns {boolean} - `true` if the date is within any of the unavailable ranges,
 * `false` otherwise.
 */
export const isDateWithinRanges = (date, ranges) => {
  return ranges.some(([start, end]) => {
    return date.compare(parseDate(start)) >= 0 && date.compare(parseDate(end)) <= 0;
  });
};
