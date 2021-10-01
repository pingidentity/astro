import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { AstroComponents } from '../utils/astro';

const SuccessMessage = (props) => {
  const { formSuccessMessage, formSuccessTitle, theme } = props;
  const ThemedSuccessMessage = useMemo(() => AstroComponents.successMessage, [theme]);

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
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default SuccessMessage;
