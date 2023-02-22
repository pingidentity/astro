import React, { forwardRef } from 'react';
import { omit } from 'lodash';
import ContentCopy from 'mdi-react/ContentCopyIcon';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import IconButton from '../IconButton';

const CopyButton = forwardRef((props, ref) => (
  <IconButton ref={ref} aria-label="copy to clipboard" variant="copyButton" {...omit(props, 'iconProps')}>
    <Icon icon={ContentCopy} size={15} {...props?.iconProps} />
  </IconButton>
));

CopyButton.propTypes = {
  iconProps: PropTypes.shape({}),
};

export default CopyButton;
