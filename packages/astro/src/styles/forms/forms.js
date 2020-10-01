import * as checkbox from './checkbox';
import * as input from './input';
import * as label from './label';
import * as radio from './radio';

// See https://rebassjs.org/forms/ for the intended structure.
// Variants should be defined in the approprate file.
const forms = {
  ...checkbox,
  ...input,
  ...label,
  ...radio,
};

export default forms;
