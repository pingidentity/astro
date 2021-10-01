import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FORM_STATE } from '../utils/constants';
import { AstroComponents } from '../utils/astro';

const SubmitButton = (props) => {
  const { formState, submitText, theme } = props;
  const Button = useMemo(() => AstroComponents.button, [theme]);

  return (
    <Button
      mt="xs"
      type="submit"
      variant="primary"
      disabled={formState === FORM_STATE.PENDING}
    >
      {submitText}
    </Button>
  );
};

SubmitButton.propTypes = {
  formState: PropTypes.oneOf(Object.values(FORM_STATE)).isRequired,
  submitText: PropTypes.string.isRequired,
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default SubmitButton;
