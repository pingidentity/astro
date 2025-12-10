import * as checkbox from '../../components/Checkbox/Checkbox.styles';
import colorField from '../../components/ColorField/ColorField.styles';
import comboBox from '../../components/ComboBox/ComboBox.styles';
import datePicker from '../../components/DatePicker/DatePicker.styles';
import fileInputField from '../../components/FileInputField/FileInputField.styles';
import * as input from '../../components/Input/Input.styles';
import * as label from '../../components/Label/Label.styles';
import numberField from '../../components/NumberField/NumberField.styles';
import radio from '../../components/Radio/Radio.styles';
import search from '../../components/SearchField/Search.styles';
import * as select from '../../components/SelectField/Select.styles';
import * as switchable from '../../components/Switch/Switch.styles'; // 'switch' is a reserved keyword
import textarea from '../../components/TextArea/TextArea.styles';
import timeField from '../../components/TimeField/TimeField.styles';

// See ThemeUI docs on variants and themes for intended structure
// Variants should be defined in the approprate file.
export default {
  ...checkbox,
  colorField,
  comboBox,
  datePicker,
  fileInputField,
  ...input,
  ...label,
  numberField,
  radio,
  ...select,
  textarea,
  timeField,
  switch: { ...switchable },
  search,
};
