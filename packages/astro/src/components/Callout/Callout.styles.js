const base = {
  alignItems: 'center',
  border: '1px solid',
  borderColor: 'text.secondary',
  fontSize: 'md',
  p: '15px 12px 15px 0',
  width: '600px',
};

const error = {
  ...base,
  borderColor: 'critical.bright',
};

const success = {
  ...base,
  borderColor: 'success.bright',
};

const warning = {
  ...base,
  borderColor: 'warning.bright',
};

export default {
  base,
  error,
  success,
  warning,
};
