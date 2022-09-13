import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Box, CheckboxField, Text } from '@pingux/astro';
import Errors from './Errors';
import { FIELD_TYPES } from '../utils/constants';
import { AstroComponents } from '../utils/astro';

const convertToValues = (options, values = []) => options.reduce((acc, cur) => ({
  ...acc,
  [cur.value]: values.includes(cur.value),
}), {});

const Checkboxes = (props) => {
  const {
    id,
    onChange,
    options,
    rawErrors,
    value,
    formContext,
  } = props;
  const { label, enumOptions, hasMarkdownErrors } = options;
  const FieldLabel = AstroComponents.fieldLabel;
  const defaultValues = convertToValues(enumOptions, value);
  const [values, setValues] = useState(defaultValues);

  // Form data doesn't come through on first render so this corrects that
  useEffect(() => {
    if (value.length) {
      setValues(convertToValues(enumOptions, value));
    }
  }, [value, enumOptions]);

  useEffect(() => {
    const checkedValues = _.flatMap(Object.entries(values), ([key, val]) => (val ? key : []));
    onChange(checkedValues);
  }, [values, onChange]);

  const handleChange = (option, isChecked) => {
    if (isChecked) {
      setValues({ ...values, [option]: true });
    } else {
      setValues({ ...values, [option]: false });
    }
  };

  return (
    <Box id={id} role="group" aria-labelledby={`${id}_grouplabel`}>
      {label && <FieldLabel id={`${id}_grouplabel`}>{label}</FieldLabel>}
      <Errors errors={rawErrors} hasMarkdown={hasMarkdownErrors} />
      {
        enumOptions.map((option, index) => (
          <CheckboxField
            pt={index === 0 ? '' : 'xs'}
            key={option.value}
            label={<Text>{option.label}</Text>}
            checked={values[option.value] || value.includes(option.value)}
            onChange={(e) => handleChange(option.value, e)}
            options={{
              isSelected: values[option.value] || value.includes(option.value),
            }}
            schema={{
              type: FIELD_TYPES.BOOLEAN,
            }}
            formContext={formContext}
          />
        ))
      }
    </Box>
  );
};

Checkboxes.propTypes = {
  formContext: PropTypes.shape({
    theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.shape({
    label: PropTypes.string,
    enumOptions: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })),
    hasMarkdownErrors: PropTypes.bool,
  }),
  rawErrors: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.arrayOf(PropTypes.string),
};

Checkboxes.defaultProps = {
  label: undefined,
  onChange: _.noop,
  options: {},
  rawErrors: undefined,
  value: [],
};

export default Checkboxes;
