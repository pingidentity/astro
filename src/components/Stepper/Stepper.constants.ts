export const stepStatuses = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  INACTIVE: 'inactive',
} as const;

export type StepStatus = typeof stepStatuses[keyof typeof stepStatuses];
