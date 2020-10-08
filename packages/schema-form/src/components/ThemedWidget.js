import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { getThemedComponent, getThemedProps, THEMES } from '../themes/utils';
import { FIELD_TYPES } from '../utils/constants';

const ThemedWidget = (componentType) => {
  const Widget = (props) => {
    const {
      formContext: { theme },
      schema: { type },
    } = props;
    const Component = getThemedComponent(theme, componentType);
    const Wrapper = type === FIELD_TYPES.BOOLEAN
      ? getThemedComponent(theme, 'wrapper')
      : React.Fragment;
    const inputProps = getThemedProps(theme, props);

    const onChange = (event) => {
      const eventProperty = type === FIELD_TYPES.BOOLEAN ? 'checked' : 'value';
      const value = _.get(event, `target.${eventProperty}`, event);
      props.onChange(value);
    };

    return (
      <Wrapper>
        <Component
          {...inputProps}
          onChange={onChange}
        />
      </Wrapper>
    );
  };

  // Full list of props can be found here:
  // https://react-jsonschema-form.readthedocs.io/en/latest/advanced-customization/custom-widgets-fields/#adding-your-own-custom-widgets
  Widget.propTypes = {
    id: PropTypes.string,
    formContext: PropTypes.shape({
      theme: PropTypes.oneOf(Object.values(THEMES)),
    }),
    label: PropTypes.string,
    schema: PropTypes.shape({
      type: PropTypes.string,
    }),
    onChange: PropTypes.func,
  };

  Widget.defaultProps = {
    id: undefined,
    formContext: undefined,
    label: undefined,
    schema: undefined,
    onChange: _.noop,
  };

  return Widget;
};

export default ThemedWidget;
