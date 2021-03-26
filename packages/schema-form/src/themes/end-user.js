import React from 'react';
import _ from 'lodash';
import Button from '@pingux/end-user/components/Button';
import FloatLabelDropdown from '@pingux/end-user/components/FloatLabelDropdown';
import FloatLabelPasswordInput from '@pingux/end-user/components/FloatLabelPasswordInput';
import FloatLabelTextArea from '@pingux/end-user/components/FloatLabelTextArea';
import FloatLabelTextInput from '@pingux/end-user/components/FloatLabelTextInput';
import FormRow from '@pingux/end-user/components/FormRow';
import Heading from '@pingux/end-user/components/Heading';
import Markdown from '@pingux/end-user/components/Markdown';

import { getDisabledEnumOptions } from '../utils/props';
import { FIELD_TYPES } from '../utils/constants';
import Error from '../components/themes/end-user/Error';
import FieldLabel from '../components/themes/end-user/FieldLabel';
import SuccessMessage from '../components/themes/end-user/SuccessMessage';
import Checkbox from '../components/themes/end-user/Checkbox';
// eslint-disable-next-line
import PasswordWithRequirements from '../components/themes/end-user/PasswordWithRequirements';

export const EndUserComponents = {
  button: Button,
  checkbox: Checkbox,
  email: FloatLabelTextInput,
  error: Error,
  fieldLabel: FieldLabel,
  formTitle: Heading,
  formDescription: FieldLabel,
  password: FloatLabelPasswordInput,
  passwordWithRequirements: PasswordWithRequirements,
  select: FloatLabelDropdown,
  successMessage: SuccessMessage,
  textinput: FloatLabelTextInput,
  textarea: FloatLabelTextArea,
  wrapper: FormRow,
};

/**
 * Return the proper fieldMessage and fieldMessageProps for end-user consumption
 * @param {{}} props - The list of props from RJSF
 */
const getFieldMessageData = (props) => {
  const {
    rawErrors = [],
    options: {
      help: uiHelp = false,
      hasMarkdownErrors = false,
    } = {},
  } = props;
  let fieldMessage;
  let fieldMessageProps;

  if (rawErrors.length) {
    fieldMessage = rawErrors.join(' ');
    fieldMessageProps = { status: 'error' };
  } else if (uiHelp) {
    fieldMessage = uiHelp;
    fieldMessageProps = { status: 'info' };
  }

  if (hasMarkdownErrors) {
    // Convert to markdown WITHOUT additional logic if the option exists
    fieldMessage = fieldMessage && fieldMessage.length && <Markdown source={fieldMessage} />;
  } else if (rawErrors.length) {
    // Convert to a string if the option does not exist and it's meant to be an error
    fieldMessage = rawErrors.map(_.capitalize).join(', ');
  }

  return { fieldMessage, fieldMessageProps };
};

/**
 * Transforms the given props to the shape expected by Ping's End User library
 * @param {Object} props The props supplied by RJSF from the schema and uiSchema objects supplied
 * to the form
 */
export const toEndUserInputProps = (props) => {
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
      enumDisabled,
      enumOptions,
      help: uiHelp,
      label: uiLabel,
      hasMarkdownLabel: hasMarkdown,
      hasMarkdownErrors,
      ...custom
    },
    placeholder,
    rawErrors,
    readonly,
    required,
    schema,
    value,
  } = props;
  const getDefaultValue = () => {
    if (schema.type === FIELD_TYPES.BOOLEAN) return schema.id || id;
    if (schema.type === FIELD_TYPES.STRING && _.isObject(value)) return '';

    return value;
  };

  const isStacked = _.get(custom, 'isStacked', true);
  const { fieldMessage, fieldMessageProps } = getFieldMessageData(props);
  const getStatus = (errors) => (errors && errors.length ? 'error' : undefined);
  /* istanbul ignore next */
  const onValueChange = (e) => {
    if (schema?.type === FIELD_TYPES.BOOLEAN) {
      return onChange(e);
    }

    return onChange(e.target.value);
  };

  const inputProps = {
    ...custom,
    autofocus,
    checked: _.isObject(value) ? false : (value || false),
    defaultValue: getDefaultValue(),
    disabled,
    fieldMessage,
    fieldMessageProps,
    formContext,
    hasMarkdown,
    id,
    isStacked,
    label: uiLabel || label,
    onBlur,
    onChange: onValueChange,
    onFocus,
    options: getDisabledEnumOptions(enumOptions, enumDisabled),
    placeholder: placeholder || undefined,
    readonly,
    required,
    status: getStatus(rawErrors),
    type: getStatus(rawErrors),
  };

  return _.omitBy(inputProps, _.isUndefined);
};
