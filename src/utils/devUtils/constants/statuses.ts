const statuses = {
  DEFAULT: 'default',
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning',
} as const;

export const statusIcon = {
  DEFAULT: 'default',
  CRITICAL: 'critical',
  MAJOR: 'major',
  MINOR: 'minor',
  WARNING_NEUTRAL: 'warningNeutral',
  INFO: 'info',
  WARNING: 'warning',
  FATAL: 'fatal',
} as const;

export default statuses;
