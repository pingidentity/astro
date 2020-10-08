import propsUtils from '../props';

const options = new Array(10).fill(undefined).map((_v, i) => ({ label: `${i}`, value: `${i}` }));
const disabled = ['0', '3', '9'];

test('it transforms a list of options into one with disabled objects', () => {
  const actual = propsUtils.getDisabledEnumOptions(options, disabled);
  actual.forEach((option) => {
    const { label } = option;
    if (disabled.includes(label)) {
      expect(option).toHaveProperty('disabled', true);
    } else {
      expect(option).not.toHaveProperty('disabled', true);
    }
  });
});

test('it returns the same list for an undefined disabled array', () => {
  const actual = propsUtils.getDisabledEnumOptions(options, undefined);
  expect(actual).toBe(options); // toBe is a stricter check here
});
