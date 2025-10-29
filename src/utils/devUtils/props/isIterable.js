const requiredErrorText = ({ propName, componentName }) => `Required prop \`${propName}\` for \`${componentName}\` is missing.`;

const validationErrorText = ({ propName, componentName }) => `Invalid prop \`${propName}\` supplied to \`${componentName}\`.
  Expected an Iterable object such as String, Array, TypedArray, Map, or Set.`;

export const isIterable = obj => {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
};

const createIsIterableProp = isRequired => {
  // The factory returns a custom prop type
  return (props, propName, componentName) => {
    const prop = props[propName];
    let error;
    if (prop == null) {
      // Prop is missing
      if (isRequired) {
        // Prop is required but wasn't specified. Return an error.
        error = new Error(requiredErrorText({ propName, componentName }));
      }
      // Otherwise, prop is optional so do nothing if missing.
    } else if (!isIterable(prop)) {
      error = new Error(validationErrorText({ propName, componentName }));
    }

    return error;
  };
};

// Using the factory, create two different versions of your prop type
const isIterableProp = createIsIterableProp(false);
isIterableProp.isRequired = createIsIterableProp(true);
export { isIterableProp };
