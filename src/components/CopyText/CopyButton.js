import React, { forwardRef } from 'react';
import ContentCopy from '@pingux/mdi-react/ContentCopyIcon';
import { omit } from 'lodash';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import IconButton from '../IconButton';


const CopyButton = forwardRef((props, ref) => (
  <IconButton ref={ref} aria-label="copy to clipboard" variant="copyButton" {...omit(props, 'iconProps')}>
    <Icon icon={ContentCopy} size="xs" color="text.secondary" title={{ name: 'Content Copy Icon' }} {...props?.iconProps} />
  </IconButton>
));

CopyButton.propTypes = {
  iconProps: PropTypes.shape({}),
};

export default CopyButton;
