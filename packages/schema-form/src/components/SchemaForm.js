import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as v4uuid } from 'uuid';
import _ from 'lodash';
import { css } from '@emotion/core';
import Form from '@rjsf/core';
import applyRules from 'rjsf-conditionals';
import Engine from 'json-rules-engine-simplified';
import JSONSchemaV4 from 'ajv/lib/refs/json-schema-draft-04.json';

import useThemedStyles from '../hooks/useThemedStyles';
import { THEMES } from '../themes/utils';
import { FORM_STATE } from '../utils/constants';
import { getCorrectedSchema } from '../utils/props';
import widgets from '../utils/widgets';
import FieldTemplate from './FieldTemplate';
import ObjectFieldTemplate from './ObjectFieldTemplate';
import Errors from './Errors';
import SubmitButton from './SubmitButton';
import SuccessMessage from './SuccessMessage';

// Icons need to be globally accessible
import styles from '../styles';

const LIVE_VALIDATE = {
  ON: 'on',
  OFF: 'off',
  POST_SUBMIT: 'postSubmit',
};

const FormWrapper = (props) => {
  const { themeStyles, children } = props; // eslint-disable-line
  return (
    <div
      css={css`
        ${themeStyles}
        ${styles}
      `}
    >
      {children}
    </div>
  );
};

const SchemaForm = (props) => {
  const {
    endpoint,
    extraActions,
    extraErrors,
    formData: propsFormData,
    formSuccessMessage,
    formSuccessTitle,
    liveValidate,
    onChange: propsOnChange,
    onServerError,
    onServerSuccess,
    onSubmit,
    rules,
    schema,
    sitekey, // For captcha purposes
    submitText,
    theme,
    uiSchema,
    ...others
  } = props;
  const [currentData, setCurrentData] = useState(propsFormData);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formState, setFormState] = useState(FORM_STATE.DEFAULT);
  const [asyncErrors, setAsyncErrors] = useState(extraErrors);
  const hasLiveValidation = useMemo(() => {
    switch (liveValidate) {
      case LIVE_VALIDATE.ON:
        return true;
      case LIVE_VALIDATE.POST_SUBMIT:
        return formSubmitted;
      case LIVE_VALIDATE.OFF:
      default:
        return false;
    }
  }, [liveValidate, formSubmitted]);
  const correctedSchema = useMemo(() => getCorrectedSchema(schema), [schema]);
  const idHash = useMemo(() => {
    // Prefix all tests the same for DOM consistency
    if (process.env.NODE_ENV === 'test') {
      return 'rjsf';
    }
    return v4uuid();
  }, []);
  const themeStyles = useThemedStyles(theme);
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

  const formLevelErrors = _.get(asyncErrors, '_form.__errors', undefined);
  const handleChange = (formInfo, ...args) => {
    // Only figure out whether the async errors need to be cleared if there are any
    if (Object.keys(asyncErrors).length) {
      const { formData } = formInfo;
      // Get only the updated form data from the last change event
      const differences = _.differenceWith(
        Object.entries(formData),
        Object.entries(currentData),
        _.isEqual,
      );

      // Remove any async errors related to the differences
      if (differences.length) {
        const newAsyncErrors = { ...asyncErrors };
        differences.forEach((diff) => {
          const [fieldId] = diff;
          delete newAsyncErrors[fieldId];
        });
        setAsyncErrors(newAsyncErrors);
      }
      // Update the current form data state so we can keep track of it for differences again
      setCurrentData(formData);
    }

    // Call the onChange prop if one was passed in
    propsOnChange(formInfo, ...args);
  };
  const handleValidationError = () => {
    // FIXME: Submit must be clicked twice to display new validation errors.
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
    const { formData } = args[0];
    if (onSubmit) {
      setFormState(FORM_STATE.PENDING);
      onSubmit(...args, handleServerError, handleServerSuccess);
    } else if (endpoint) {
      let isError;
      let response;
      const payload = formData;

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

  if (formState === FORM_STATE.SUCCESS) {
    return (
      <FormWrapper themeStyles={themeStyles}>
        <SuccessMessage
          theme={theme}
          formSuccessMessage={formSuccessMessage}
          formSuccessTitle={formSuccessTitle}
        />
      </FormWrapper>
    );
  }

  return (
    <FormWrapper themeStyles={themeStyles}>
      <Errors
        errors={formLevelErrors}
        hasMarkdown={_.get(uiSchema, '_form["ui:options"].hasMarkdownErrors', false)}
        theme={theme}
      />
      <FormWithConditionals
        additionalMetaSchemas={[JSONSchemaV4]}
        autoComplete="off"
        className="form"
        disabled={formState === FORM_STATE.PENDING}
        extraErrors={asyncErrors}
        formContext={{ formState, sitekey, theme }}
        formData={propsFormData}
        id={`${idHash}_form`}
        idPrefix={idHash}
        liveValidate={hasLiveValidation}
        onChange={handleChange}
        onError={handleValidationError}
        onSubmit={handleSubmit}
        noHtml5Validate
        showErrorList={false}
        widgets={widgets}
        FieldTemplate={FieldTemplate}
        ObjectFieldTemplate={ObjectFieldTemplate}
        {...others}
      >
        <SubmitButton
          formState={formState}
          submitText={submitText}
          theme={theme}
        />
      </FormWithConditionals>
    </FormWrapper>
  );
};

SchemaForm.propTypes = {
  /** When provided, will send a `POST` request to the given endpoint with the form data */
  endpoint: PropTypes.string,
  /** Refer to the [rjsf-conditionals docs](https://github.com/ivarprudnikov/rjsf-conditionals#extension-mechanism)
   * for more information.
  */
  extraActions: PropTypes.shape({}),
  /** Apply any default errors */
  extraErrors: PropTypes.shape({}),
  /** Apply any default form data */
  formData: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  /** Displays custom message when form is successfully submitted. */
  formSuccessMessage: PropTypes.string,
  /** Title of form message when successfully submitted. */
  formSuccessTitle: PropTypes.string,
  /** Options for real-time schema validation. */
  liveValidate: PropTypes.oneOf(['on', 'off', 'postSubmit']),
  /** Callback triggered on each change to the form data. */
  onChange: PropTypes.func,
  /**
   * Callback triggered if the server responds to the request with a status
   * outside of the `2XX` range.
  */
  onServerError: PropTypes.func,
  /**
   * Callback triggered if the server responds to the request with a status within
   * the `2XX` range.
  */
  onServerSuccess: PropTypes.func,
  /**
   * Overrides the default form submission event allowing for various custom behaviors,
   * please be warned that this may also lead to unpredictable outcomes.
   * See [usage docs](/?path=/docs/usage-async-behavior--custom-submit) for more info.
  */
  onSubmit: PropTypes.func,
  /**
   * Applies conditional logic to show/hide fields.
   * See [usage docs](/?path=/docs/usage-conditionals--conditionals-example) for more info.
  */
  rules: PropTypes.arrayOf(PropTypes.shape({})),
  /** The JSON schema object */
  schema: PropTypes.shape({
    properties: PropTypes.shape({}),
  }).isRequired,
  /** Required for recaptcha component. */
  sitekey: PropTypes.string,
  /** Label for submit button */
  submitText: PropTypes.string,
  /** Default is end-user, more themes to come... */
  theme: PropTypes.oneOf(Object.values(THEMES)),
  /** Customization options for the look and feel of the form. */
  uiSchema: PropTypes.shape({}),
};

SchemaForm.defaultProps = {
  extraActions: {},
  extraErrors: {},
  endpoint: undefined,
  formData: {},
  formSuccessMessage: '',
  formSuccessTitle: '',
  liveValidate: 'off',
  onChange: _.noop,
  onServerError: _.noop,
  onServerSuccess: _.noop,
  onSubmit: undefined,
  rules: [],
  sitekey: undefined,
  submitText: 'Submit',
  theme: THEMES.END_USER,
  uiSchema: {},
};

export default SchemaForm;
