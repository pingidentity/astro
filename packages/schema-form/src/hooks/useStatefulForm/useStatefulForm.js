import { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import Form from '@rjsf/core';
import applyRules from 'rjsf-conditionals';
import Engine from 'json-rules-engine-simplified';

import { FORM_STATE, FORM_MODE } from '../../utils/constants';
import { getCorrectedSchema } from '../../utils/props';
import { isRecaptchaResetChange } from '../../utils/helpers';

const LIVE_VALIDATE = {
  ON: true,
  OFF: false,
  POST_SUBMIT: 'postSubmit',
};

const useStatefulForm = (props = {}) => {
  const {
    endpoint,
    extraActions,
    extraErrors,
    formData,
    liveValidate = false,
    mode,
    onChange,
    onError,
    onServerError,
    onServerSuccess,
    onSubmit,
    rules,
    schema,
    uiSchema,
  } = props;

  // In simplified mode, don't worry about all of the control happening below
  if (mode === FORM_MODE.SIMPLIFIED) {
    return {};
  }

  const [currentData, setCurrentData] = useState(formData);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formState, setFormState] = useState(FORM_STATE.DEFAULT);
  const [asyncErrors, setAsyncErrors] = useState(extraErrors);

  const hasLiveValidation = useMemo(() => {
    if (liveValidate === LIVE_VALIDATE.POST_SUBMIT) return formSubmitted;

    return liveValidate;
  }, [liveValidate, formSubmitted]);

  const correctedSchema = useMemo(() => getCorrectedSchema(schema), [schema]);

  const FormWithConditionals = useMemo(() => applyRules(
    correctedSchema,
    uiSchema,
    rules,
    Engine,
    extraActions,
  )(Form),
  [correctedSchema, uiSchema, rules, extraActions]);

  useEffect(() => {
    // Set state to show form has been submitted once
    if (formState !== FORM_STATE.DEFAULT && !formSubmitted) {
      setFormSubmitted(true);
    }

    // Reset form state after error state is triggered
    if (formState === FORM_STATE.ERROR) {
      setFormState(FORM_STATE.DEFAULT);
    }
  });

  const handleChange = (formInfo = {}, ...args) => {
    const { formData: newFormData } = formInfo;
    // Get only the updated form data from the last change event
    const differences = _.differenceWith(
      Object.entries(newFormData),
      Object.entries(currentData),
      _.isEqual,
    );

    // Ignore a recaptcha reset event
    const ignoreChange = isRecaptchaResetChange(differences, uiSchema);

    // Remove any async errors related to the differences
    if (!ignoreChange && differences.length && Object.keys(asyncErrors).length) {
      const newAsyncErrors = { ...asyncErrors };
      differences.forEach((diff) => {
        const [fieldId] = diff;
        delete newAsyncErrors[fieldId];
      });
      setAsyncErrors(newAsyncErrors);
    }

    // Update the current form data state so we can keep track of it for differences again
    setCurrentData(newFormData);

    // Call the onChange prop if one was passed in
    onChange(formInfo, ...args);
  };
  const handleValidationError = () => {
    // Clear all async errors if validation errors occur. Otherwise, they stick around.
    setAsyncErrors({});
    setFormState(FORM_STATE.ERROR);
  };
  const handleServerError = async (response) => {
    const newErrors = await onServerError(response);
    setAsyncErrors(newErrors);
    setFormState(FORM_STATE.ERROR);
  };
  const handleServerSuccess = (response) => {
    onServerSuccess(response);
    setFormState(FORM_STATE.SUCCESS);
  };
  const handleSubmit = async (...args) => {
    const submittedFormData = args[0];
    if (onSubmit) {
      setFormState(FORM_STATE.PENDING);
      onSubmit(...args, handleServerError, handleServerSuccess);
    } else if (endpoint) {
      let isError;
      let response;
      const payload = submittedFormData.formData;

      setFormState(FORM_STATE.PENDING);
      try {
        response = await fetch(endpoint, {
          method: 'post',
          body: JSON.stringify(payload),
        });
        isError = !response.ok;
      } catch (e) {
        /* eslint-disable-next-line no-console */
        console.error(e);
        isError = true;
      }

      // HACK: The following is a hack to work around AEM implementation which distorts the response
      // and actually stores response context in the body while the status property may incorrectly
      // indicate a successful response was returned.
      if (!isError) {
        try {
          const clonedResponse = response.clone();
          const body = await clonedResponse.json();

          isError = body.status >= 400;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn('The following error occurred when trying to parse the server response as JSON: ', e);
        }
      }

      if (isError) {
        handleServerError(response);
      } else {
        handleServerSuccess(response);
      }
    }
  };

  return {
    statefulProps: {
      extraErrors: asyncErrors,
      formState,
      liveValidate: hasLiveValidation,
      onChange: handleChange,
      onError: onError ?? handleValidationError,
      onSubmit: handleSubmit,
      FormComponent: FormWithConditionals,
    },
  };
};

export default useStatefulForm;
