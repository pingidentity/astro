import React, { forwardRef } from 'react';
import { Input as RInput } from '@rebass/forms';

const Input = forwardRef((props, ref) => (
  <RInput
    ref={ref}
    {...props}
  />
));

export default Input;
