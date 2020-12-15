export const isRecaptchaResetChange = (differences = [], uiSchema = {}) => {
  if (!differences.length) return false;

  const [key, value] = differences[0];
  const options = uiSchema[key];

  if (options && options['ui:widget'] === 'recaptchaV2' && value === undefined) {
    return true;
  }

  return false;
};

export default {
  isRecaptchaResetChange,
};
