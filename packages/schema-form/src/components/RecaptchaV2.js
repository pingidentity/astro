import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import _ from 'lodash';
import { useMediaQuery } from 'react-responsive';

import Errors from './Errors';
import { FORM_STATE } from '../utils/constants';
import useResetRecaptcha from '../hooks/useRecaptchaReset';

const RecaptchaV2 = (props) => {
  const {
    formContext: {
      formState,
      sitekey,
    },
    onChange,
    options,
    rawErrors,
    value,
  } = props;
  const recaptchaRef = useRef();
  /* istanbul ignore next */
  const resetRecaptcha = _.get(recaptchaRef, 'current.props.grecaptcha.reset', () => {
    // eslint-disable-next-line no-console
    console.error('Something went wrong, could not reset the ReCAPTCHA...');
  });

  useResetRecaptcha({
    formState,
    onChange,
    resetRecaptcha,
    value,
  });

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const size = (options.size) || (isTabletOrMobile ? 'compact' : 'normal');

  return (
    <>
      <ReCAPTCHA
        ref={recaptchaRef}
        size={size}
        sitekey={sitekey}
        onChange={onChange}
      />
      <Errors
        errors={rawErrors}
        hasMarkdown={options.hasMarkdownErrors}
      />
    </>
  );
};

RecaptchaV2.propTypes = {
  formContext: PropTypes.shape({
    formState: PropTypes.oneOf(Object.values(FORM_STATE)),
    sitekey: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func,
  options: PropTypes.shape({
    hasMarkdownErrors: PropTypes.bool,
    size: PropTypes.string,
  }),
  rawErrors: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
};

RecaptchaV2.defaultProps = {
  onChange: _.noop,
  options: {
    hasMarkdownErrors: false,
  },
  rawErrors: undefined,
  value: undefined,
};

export default RecaptchaV2;
