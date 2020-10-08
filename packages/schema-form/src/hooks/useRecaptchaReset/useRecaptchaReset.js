import { useEffect, useState } from 'react';

const useRecaptchaReset = (args) => {
  const {
    formState,
    onChange,
    resetRecaptcha,
    value,
  } = args;
  const [reset, setReset] = useState(false);

  // Internally set whether the recaptcha should be reset
  useEffect(() => {
    if (formState === 'error' && value) {
      setReset(true);
    }
  }, [formState, value]);

  // Handle the reset case separately so it doesn't get cleared until intended
  useEffect(() => {
    if (reset) {
      try {
        resetRecaptcha();
        onChange(undefined);
        setReset(false);
      } catch (error) {
        /* eslint-disable-next-line no-console */
        console.error('Could not reset the ReCAPTCHA due to the following error:', error);
      }
    }
  }, [reset]);
};

export default useRecaptchaReset;
