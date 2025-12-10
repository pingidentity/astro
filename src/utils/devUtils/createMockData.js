import { v4 as uuid } from 'uuid';

import animals from './constants/animals';
import firstNames from './constants/firstNames';

function createMockData(length, objectScheme) {
  const mockDataBase = {
    animal: animals,
    firstName: firstNames,
  };
  const itemsNumber = {
    animal: 0,
    firstName: 0,
  };

  const getPropValue = valueType => {
    if (valueType === 'id') {
      return uuid();
    }
    const valueNumber = itemsNumber[valueType];
    const propValue = mockDataBase[valueType][valueNumber];
    itemsNumber[valueType] += 1;
    return propValue;
  };

  const generateObject = () => {
    const entries = Object.entries(objectScheme);
    const reducer = (previousValue, currentValue) => {
      const fieldName = currentValue[0];
      const fieldValue = getPropValue(currentValue[1]);
      return { ...previousValue, [fieldName]: fieldValue };
    };
    return entries.reduce(reducer, {});
  };

  const generateDataArr = () => {
    return Array(length)
      .fill(undefined)
      .map(() => generateObject());
  };

  return generateDataArr();
}

export default createMockData;

// usage(delete this comment as soon as we used this function in a few stories so we have examples):
// const mockData = createMockData(100, { name: 'animal', id: 'id' });
