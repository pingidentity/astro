const isWithinRange = (inclusiveLowerBound = 0, inclusiveUpperBound = Infinity) => num => {
  return Number.isInteger(num) && inclusiveLowerBound <= num && num <= inclusiveUpperBound;
};

const validatePositiveInteger = () => (props, propName, componentName) => {
  const isPositiveInteger = isWithinRange(1, Infinity);
  if (props[propName] && !isPositiveInteger(props[propName])) {
    return new Error(`Expected a positive integer for ${propName} in ${componentName}, but instead received \`${props[propName]}\`.`);
  }
  // Everything is fine
  return null;
};
const isValidPositiveInt = validatePositiveInteger();

export default isValidPositiveInt;
