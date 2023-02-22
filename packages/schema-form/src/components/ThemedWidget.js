import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FIELD_TYPES } from '../utils/constants';
import { AstroComponents, toAstroInputProps } from '../utils/astro';

const ThemedWidget = componentType => {
  const Widget = props => {
    const {
      schema: { type },
      options: { emptyValue },
    } = props;
    const {
      schema,
      formContext,
    } = props;
    const Component = AstroComponents[componentType];
    const Wrapper = type === FIELD_TYPES.BOOLEAN
      ? AstroComponents.wrapper : React.Fragment;
    const inputProps = {
      ...toAstroInputProps(props),
      schema,
      formContext,
    };
    const { onChange: onChangeHandler } = props;

    const onChange = event => {
      const eventProperty = type === FIELD_TYPES.BOOLEAN ? 'checked' : 'value';
      let value = _.get(event, `target.${eventProperty}`, event);
      if (value === '') { // see https://github.com/rjsf-team/react-jsonschema-form/issues/1052#issuecomment-431495633
        value = emptyValue;
      }
      onChangeHandler(value);
    };

    return (
      <Wrapper>
        <Component
          {...inputProps}
          onChange={onChange}
          controlProps={{
            ...inputProps?.controlProps,
            onChange,
          }}
        />
      </Wrapper>
    );
  };

  // Full list of props can be found here:
  // https://react-jsonschema-form.readthedocs.io/en/latest/advanced-customization/custom-widgets-fields/#adding-your-own-custom-widgets
  Widget.propTypes = {
    id: PropTypes.string,
    formContext: PropTypes.shape({
      theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    }),
    label: PropTypes.string,
    schema: PropTypes.shape({
      type: PropTypes.string,
    }),
    options: PropTypes.shape({
      emptyValue: PropTypes.string,
    }),
    onChange: PropTypes.func,
  };

  Widget.defaultProps = {
    id: undefined,
    formContext: undefined,
    label: undefined,
    schema: undefined,
    options: {},
    onChange: _.noop,
  };

  return Widget;
};

export default ThemedWidget;
