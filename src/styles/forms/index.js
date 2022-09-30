import * as checkbox from '../../components/Checkbox/Checkbox.styles';
import comboBox from '../../components/ComboBox/ComboBox.styles';
import * as input from '../../components/Input/Input.styles';
import * as label from '../../components/Label/Label.styles';
import * as radio from '../../components/Radio/Radio.styles';
import search from '../../components/SearchField/Search.styles';
import * as select from '../../components/SelectField/Select.styles';
import * as switchable from '../../components/Switch/Switch.styles'; // 'switch' is a reserved keyword
import * as textarea from '../../components/TextArea/TextArea.styles';

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
