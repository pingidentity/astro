import * as checkbox from './checkbox';
import comboBox from './comboBox';
import * as input from './input';
import * as label from './label';
import * as radio from './radio';
import search from './search';
import * as select from './select';
import * as switchable from './switch'; // 'switch' is a reserved keyword
import * as textarea from './textarea';

// See ThemeUI docs on variants and themes for intended structure
// Variants should be defined in the approprate file.
export default {
  ...checkbox,
  comboBox,
  ...input,
  ...label,
  ...radio,
  ...select,
  ...textarea,
  switch: { ...switchable },
  search,
};
