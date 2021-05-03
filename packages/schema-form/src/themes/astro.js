import _ from 'lodash';

import {
  Box,
  Button,
  TextField,
  TextAreaField,
} from '@pingux/astro';

import { getDisabledEnumOptions } from '../utils/props';
import Checkbox from '../components/themes/astro/Checkbox';
import PasswordInput from '../components/themes/astro/PasswordInput';
import Dropdown from '../components/themes/astro/Dropdown';
import Error from '../components/themes/astro/Error';
import FieldLabel from '../components/themes/astro/FieldLabel';
import SuccessMessage from '../components/themes/astro/SuccessMessage';
import SectionTitle from '../components/themes/astro/SectionTitle';
// eslint-disable-next-line
import PasswordWithRequirements from '../components/themes/astro/PasswordWithRequirements';
import { FIELD_TYPES } from '../utils/constants';

export const AstroComponents = {
  button: Button,
  checkbox: Checkbox,
  email: TextField,
  error: Error,
  fieldLabel: FieldLabel,
  formTitle: SectionTitle,
  formDescription: FieldLabel,
  password: PasswordInput,
  passwordWithRequirements: PasswordWithRequirements,
  select: Dropdown,
  successMessage: SuccessMessage,
  textinput: TextField,
  url: TextField,
  textarea: TextAreaField,
  wrapper: Box,
};

/**
 * Return the proper fieldMessage and fieldMessageProps for Astro consumption
 * @param {{}} props - The list of props from RJSF
 */
const getFieldMessageData = (props) => {
  const {
    rawErrors = [],
    options: {
      help: uiHelp = false,
    } = {},
  } = props;
  let helperText;
  let status;

  if (rawErrors.length) {
    helperText = rawErrors.join(' ');
    status = 'error';
  } else if (uiHelp) {
    helperText = uiHelp;
    status = 'default';
  }

  if (rawErrors.length) {
    // Convert to a string if the option does not exist and it's meant to be an error
    helperText = rawErrors.map(_.capitalize).join(', ');
  }

  return { helperText, status };
};

/**
 * Transforms the given props to the shape expected by Ping's Astro library
 * @param {Object} props The props supplied by RJSF from the schema and uiSchema objects supplied
 * to the form
 */
export const toAstroInputProps = (props) => {
  const {
    autofocus,
    disabled,
    formContext,
    id,
    label,
    onBlur,
    onChange,
    onFocus,
    options: {
      defaultText,
      enumDisabled,
      enumOptions,
      help: uiHelp,
      label: uiLabel,
      hasMarkdownLabel: hasMarkdown,
      hasMarkdownErrors,
      labelMode,
      ...custom
    },
    placeholder,
    readonly,
    required,
    schema,
    value,
  } = props;

  const inputLabel = uiLabel || label;
  const getDefaultValue = () => {
    if (schema.type === FIELD_TYPES.BOOLEAN) return schema.id || id;
    if (schema.type === FIELD_TYPES.STRING && _.isObject(value)) return '';

    return value;
  };
  const isStacked = _.get(custom, 'isStacked', true);
  const isSelected = _.isObject(value) ? false : (value || false);
  const { helperText, status } = getFieldMessageData(props);

  const inputProps = {
    controlProps: {
      defaultValue: getDefaultValue(),
      hasAutoFocus: autofocus,
      id: schema.id || id,
      isSelected,
      isStacked,
      onBlur,
      onChange,
      onFocus,
      placeholder: placeholder || undefined,
      isReadOnly: readonly,
      isRequired: required,
      ...custom,
    },
    defaultText,
    formContext,
    isDisabled: disabled,
    isRequired: required,
    label: inputLabel,
    helperText,
    labelMode,
    options: getDisabledEnumOptions(enumOptions, enumDisabled),
    status,
  };

  return _.omitBy(inputProps, _.isUndefined);
};
