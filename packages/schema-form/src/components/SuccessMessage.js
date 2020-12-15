import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { getThemedComponent, THEMES } from '../themes/utils';

const SuccessMessage = (props) => {
  const { formSuccessMessage, formSuccessTitle, theme } = props;
  const ThemedSuccessMessage = useMemo(() => getThemedComponent(theme, 'successMessage'), [theme]);

  return (
    <ThemedSuccessMessage
      formSuccessMessage={formSuccessMessage}
      formSuccessTitle={formSuccessTitle}
    />
  );
};

SuccessMessage.propTypes = {
  formSuccessMessage: PropTypes.string.isRequired,
  formSuccessTitle: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(Object.values(THEMES)).isRequired,
};

export default SuccessMessage;
