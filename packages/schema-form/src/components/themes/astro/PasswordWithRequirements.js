import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { PasswordField } from '@pingux/astro';

const PasswordWithRequirements = props => {
  const {
    controlProps: { onChange: onChangeCb },
    requirements,
    validateRequirements,
    ...others
  } = props;
  const [reqs, setReqs] = useState(requirements);

  const onChange = e => {
    const res = validateRequirements(e, requirements);
    setReqs(res);
    onChangeCb(e);
  };

  return (
    <PasswordField
      {...others}
      onChange={onChange}
      requirements={reqs}
    />
  );
};

PasswordWithRequirements.propTypes = {
  controlProps: PropTypes.shape({
    onChange: PropTypes.func,
  }),
  requirements: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  validateRequirements: PropTypes.func,
};

PasswordWithRequirements.defaultProps = {
  validateRequirements: (e, data) => data,
  controlProps: { onChange: noop },
};

export default PasswordWithRequirements;
