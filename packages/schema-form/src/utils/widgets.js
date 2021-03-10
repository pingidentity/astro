import Checkboxes from '../components/Checkboxes';
import ThemedWidget from '../components/ThemedWidget';
import RecaptchaV2 from '../components/RecaptchaV2';
import PasswordWithRequirements from '../components/themes/end-user/PasswordWithRequirements';

const widgets = {
  CheckboxesWidget: Checkboxes,
  CheckboxWidget: ThemedWidget('checkbox'),
  EmailWidget: ThemedWidget('email'),
  PasswordWidget: ThemedWidget('password'),
  SelectWidget: ThemedWidget('select'),
  TextWidget: ThemedWidget('textinput'),
  TextareaWidget: ThemedWidget('textarea'),
  passwordWithRequirements: PasswordWithRequirements,
  recaptchaV2: RecaptchaV2,
};

export default widgets;
