import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Errors from './Errors';
import { FIELD_TYPES } from '../utils/constants';
import { getThemedComponent, THEMES } from '../themes/utils';
import ThemedWidget from './ThemedWidget';

const convertToValues = (options, values = []) => options.reduce((acc, cur) => ({
  ...acc,
  [cur.value]: values.includes(cur.value),
}), {});

const Checkboxes = (props) => {
  const {
    formContext: { theme },
    id,
    onChange,
    options,
    rawErrors,
    value,
  } = props;
  const { label, enumOptions, hasMarkdownErrors } = options;
  const FieldLabel = useMemo(() => getThemedComponent(theme, 'fieldLabel'), [theme]);
  const defaultValues = convertToValues(enumOptions, value);
  const [values, setValues] = useState(defaultValues);

  // Form data doesn't come through on first render so this corrects that
  useEffect(() => {
    if (value.length) {
      setValues(convertToValues(enumOptions, value));
    }
  }, [value]);

  useEffect(() => {
    const checkedValues = _.flatMap(Object.entries(values), ([key, val]) => (val ? key : []));
    onChange(checkedValues);
  }, [values]);

  const handleChange = (option, isChecked) => {
    if (isChecked) {
      setValues({ ...values, [option]: true });
    } else {
      setValues({ ...values, [option]: false });
    }
  };

  return (
    <div id={id}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <Errors errors={rawErrors} hasMarkdown={hasMarkdownErrors} />
      {
        enumOptions.map((option) => {
          const ArrayCheckbox = ThemedWidget('checkbox');
          return (
            <ArrayCheckbox
              key={option.value}
              checked={values[option.value] || value.includes(option.value)}
              label={option.label}
              onChange={(e) => handleChange(option.value, e)}
              options={{
                isStacked: true,
              }}
              schema={{
                type: FIELD_TYPES.BOOLEAN,
              }}
              formContext={props.formContext}
            />
          );
        })
      }
    </div>
  );
};

Checkboxes.propTypes = {
  formContext: PropTypes.shape({
    theme: PropTypes.oneOf(Object.values(THEMES)).isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.shape({
    label: PropTypes.string,
    enumOptions: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.value,
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
