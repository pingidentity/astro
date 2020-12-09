import React from 'react';
import PropTypes from 'prop-types';
import { Text as RText } from 'rebass';

import { textVariants } from '../../utils/devUtils/constants/variants';

const Text = React.forwardRef((props, ref) => (
  <RText variant="base" {...props} ref={ref} />
));

Text.propTypes = {
  variant: PropTypes.oneOf(Object.values(textVariants)),
};


Text.defaultProps = {
  variant: textVariants.BASE,
};

Text.displayName = 'Text';

export default Text;
