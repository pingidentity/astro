import React from 'react';
import PropTypes from 'prop-types';

const FieldTemplate = (props) => {
  const {
    children,
  } = props;

  return (
    <>
      {children}
    </>
  );
};

FieldTemplate.propTypes = {
  children: PropTypes.node,
};

FieldTemplate.defaultProps = {
  children: undefined,
};

export default FieldTemplate;
