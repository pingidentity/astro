import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { getThemedComponent, THEMES } from '../themes/utils';
import { FORM_STATE } from '../utils/constants';

const SubmitButton = (props) => {
  const { formState, submitText, theme } = props;
  const Button = useMemo(() => getThemedComponent(theme, 'button'), [theme]);

  return (
    <Button
      type="primary"
      isSubmit
      disabled={formState === FORM_STATE.PENDING}
      loading={formState === FORM_STATE.PENDING}
    >
      {submitText}
    </Button>
  );
};

SubmitButton.propTypes = {
  formState: PropTypes.oneOf(Object.values(FORM_STATE)).isRequired,
  submitText: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(Object.values(THEMES)).isRequired,
};

export default SubmitButton;
