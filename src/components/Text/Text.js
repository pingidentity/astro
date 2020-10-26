import React from 'react';
import PropTypes from 'prop-types';
import { Text as RText } from 'rebass';

const Text = React.forwardRef((props, ref) => (
  <RText {...props} ref={ref} />
));

Text.propTypes = {
  variant: PropTypes.oneOf([
    'title',
    'sectionTitle',
    'itemTitle',
    'subtitle',
    'bodyStrong',
    'bodyWeak',
    'label',
    'capsLabel',
    'base',
  ]),
};


Text.defaultProps = {
  variant: 'base',
};

Text.displayName = 'Text';

export default Text;
