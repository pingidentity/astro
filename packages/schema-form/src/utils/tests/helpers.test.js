import helpers from '../helpers';

test('isRecaptchaResetChange returns false for empty differences', () => {
  // Default param is empty array
  const actual = helpers.isRecaptchaResetChange();
  expect(actual).toBe(false);
});

test('isRecaptchaResetChange returns false for non-reset recaptcha difference', () => {
  const differences = [['captcha', 'not-undefined']];
  const uiSchema = {
    captcha: {
      'ui:widget': 'recaptchaV2',
    },
  };
  const actual = helpers.isRecaptchaResetChange(differences, uiSchema);
  expect(actual).toBe(false);
});

test('isRecaptchaResetChange returns true for undefined recaptcha difference', () => {
  const differences = [['captcha', undefined]];
  const uiSchema = {
    captcha: {
      'ui:widget': 'recaptchaV2',
    },
  };
  const actual = helpers.isRecaptchaResetChange(differences, uiSchema);
  expect(actual).toBe(true);
});
