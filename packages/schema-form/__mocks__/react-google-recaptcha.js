import React from 'react';

/* eslint-disable react/prop-types */
const MockRecaptcha = React.forwardRef((props, ref) => {
  const { onChange, ...others } = props;
  return (
    <input
      ref={ref}
      type="checkbox"
      data-testid="recaptcha"
      onChange={() => onChange('test-result-key')}
      {...others}
    />
  );
});

export default MockRecaptcha;
