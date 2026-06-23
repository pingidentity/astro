const isWithinRange = (
  inclusiveLowerBound = 0,
  inclusiveUpperBound = Infinity,
) => (num: number): boolean => {
  return Number.isInteger(num) && inclusiveLowerBound <= num && num <= inclusiveUpperBound;
};

const validatePositiveInteger = () => (
  props: Record<string, unknown>,
  propName: string,
  componentName: string,
): null | Error => {
  const isPositiveInteger = isWithinRange(1, Infinity);
  if (props[propName] && !isPositiveInteger(props[propName] as number)) {
    const received = props[propName];
    return new Error(
      `Expected a positive integer for ${propName} in ${componentName}, but instead received \`${received}\`.`,
    );
  }
  // Everything is fine
  return null;
};
const isValidPositiveInt = validatePositiveInteger();

export default isValidPositiveInt;
