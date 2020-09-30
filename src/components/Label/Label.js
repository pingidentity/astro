import React, { forwardRef } from 'react';
import { Label as RLabel } from '@rebass/forms';

const Label = forwardRef((props, ref) => (
  <RLabel
    ref={ref}
    {...props}
  />
));

export default Label;
