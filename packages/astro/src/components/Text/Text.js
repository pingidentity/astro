import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { layout, flexbox, typography } from 'styled-system';
import { Text as ThemeUIText } from 'theme-ui';

import { textVariants } from '../../utils/devUtils/constants/variants';

const ExtendedText = styled(ThemeUIText)(layout, flexbox, typography);

/**
 * The Text component is used for displaying text.
 * Text supports [Typography Props from Styled System ](https://styled-system.com/table/#typography).
 */

const Text = React.forwardRef((props, ref) => (
  <ExtendedText variant="base" {...props} ref={ref} />
));

Text.propTypes = {
  variant: PropTypes.string,
};


Text.defaultProps = {
  variant: textVariants.BASE,
};

Text.displayName = 'Text';

export default Text;
