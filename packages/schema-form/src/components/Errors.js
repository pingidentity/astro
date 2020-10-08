import React from 'react';
import PropTypes from 'prop-types';
import { getThemedComponent } from '../themes/utils';

const Errors = (props) => {
  const { errors, hasMarkdown, theme } = props;
  const Error = getThemedComponent(theme, 'error');

  if (errors && errors.length) {
    return errors.map((err) => (
      <Error key={err} error={err} hasMarkdown={hasMarkdown} />
    ));
  }

  return null;
};

Errors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
  hasMarkdown: PropTypes.bool,
};

Errors.defaultProps = {
  hasMarkdown: false,
};

export default Errors;
