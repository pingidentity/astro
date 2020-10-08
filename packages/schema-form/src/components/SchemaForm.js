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
import iconStyles from '../styles/icons.css';

const FormWrapper = (props) => {
  const { styles, children } = props; // eslint-disable-line
  return <div css={css`${iconStyles} ${styles}`}>{children}</div>;
};

const SchemaForm = (props) => {
  const {
    endpoint,
    extraActions,
    extraErrors,
    formData: propsFormData,
    formSuccessMessage,
    formSuccessTitle,
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
  const [formState, setFormState] = useState(FORM_STATE.DEFAULT);
  const [asyncErrors, setAsyncErrors] = useState(extraErrors);
  const correctedSchema = useMemo(() => getCorrectedSchema(schema), [schema]);
  const idHash = useMemo(() => {
    // Prefix all tests the same for DOM consistency
    if (process.env.NODE_ENV === 'test') {
      return 'rjsf';
    }
    return v4uuid();
  }, []);
  const styles = useThemedStyles(theme);
  const FormWithConditionals = useMemo(() => applyRules(
    correctedSchema,
    uiSchema,
    rules,
    Engine,
    extraActions,
  )(Form),
  [correctedSchema, uiSchema, rules, extraActions]);

  useEffect(() => {
    if (formState === FORM_STATE.ERROR) {
      setFormState(FORM_STATE.DEFAULT);
    }
  });

  const formLevelErrors = _.get(asyncErrors, '_form.__errors', undefined);
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
      <FormWrapper styles={styles}>
        <SuccessMessage
          theme={theme}
          formSuccessMessage={formSuccessMessage}
          formSuccessTitle={formSuccessTitle}
        />
      </FormWrapper>
    );
  }

  return (
    <FormWrapper styles={styles}>
      <Errors
        errors={formLevelErrors}
        hasMarkdown={_.get(uiSchema, '_form["ui:options"].hasMarkdownErrors', false)}
        theme={theme}
      />
      <FormWithConditionals
        formData={propsFormData}
        className="form"
        id={`${idHash}_form`}
        idPrefix={idHash}
        disabled={formState === FORM_STATE.PENDING}
        onSubmit={handleSubmit}
        extraErrors={asyncErrors}
        additionalMetaSchemas={[JSONSchemaV4]}
        FieldTemplate={FieldTemplate}
        ObjectFieldTemplate={ObjectFieldTemplate}
        widgets={widgets}
        formContext={{ formState, sitekey, theme }}
        autoComplete="off"
        showErrorList={false}
        noHtml5Validate
        onError={handleValidationError}
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
   * for more info */
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
  /** Callback triggered if the server responds to the request with a status
   * outside of the `2XX` range. */
  onServerError: PropTypes.func,
  /** Callback triggered if the server responds to the request with a status within
   *  the `2XX` range. */
  onServerSuccess: PropTypes.func,
  /** Overrides the default form submission event allowing for various custom behaviors,
  * please be warned that this may also lead to unpredictable outcomes.
  * See [usage docs](/?path=/docs/usage-async-behavior--custom-submit) for more info. */
  onSubmit: PropTypes.func,
  /** Applies conditional logic to show/hide fields.
   * See [usage docs](/?path=/docs/usage-conditionals--conditionals-example) for more info. */
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
