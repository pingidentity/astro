import * as input from './endUserInput';
import * as label from './endUserLabel';
import * as select from './endUserSelect';
import * as radio from './endUserRadio';
import * as checkbox from './endUserCheckbox';

const endUserForms = {
  input: input.default,
  select: select.default,
  radio: radio.default,
  label: label.default,
  checkbox: checkbox.default,
};

export default endUserForms;
