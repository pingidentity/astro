import React from 'react';
import PropTypes from 'prop-types';
import { AstroComponents } from '../utils/astro';

const Errors = (props) => {
  const { errors, hasMarkdown } = props;
  const Error = AstroComponents.error;

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
