import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { v4 as v4uuid } from 'uuid';
import { css } from '@emotion/core';
import JSONSchemaV4 from 'ajv/lib/refs/json-schema-draft-04.json';
import Form from '@rjsf/core';

import useStatefulForm from '../hooks/useStatefulForm';
import useThemedStyles from '../hooks/useThemedStyles';
import { THEMES } from '../themes/utils';
import { FORM_STATE, FORM_MODE } from '../utils/constants';
import widgets from '../utils/widgets';
import FieldTemplate from './FieldTemplate';
import ObjectFieldTemplate from './ObjectFieldTemplate';
import Errors from './Errors';
import SubmitButton from './SubmitButton';
import SuccessMessage from './SuccessMessage';

// Icons need to be globally accessible
import styles from '../styles';

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
    children,
    extraErrors: formExtraErrors,
    formSuccessMessage,
    formSuccessTitle,
    sitekey, // For captcha purposes
    submitText,
    theme,
    uiSchema,
  } = props;
  const {
    statefulProps = {
      extraErrors: formExtraErrors,
      FormComponent: Form,
      formState: FORM_STATE.DEFAULT,
    },
  } = useStatefulForm(props);
  const { extraErrors, FormComponent, formState } = statefulProps;
  const themeStyles = useThemedStyles(theme);
  const formLevelErrors = extraErrors?._form?.__errors; // eslint-disable-line no-underscore-dangle
  const uuid = useMemo(() => {
    // Prefix all tests the same for DOM consistency
    if (process.env.NODE_ENV === 'test') {
      return 'rjsf';
    }
    return v4uuid();
  }, []);

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
      <FormComponent
        additionalMetaSchemas={[JSONSchemaV4]}
        autoComplete="off"
        className="form"
        disabled={formState === FORM_STATE.PENDING}
        formContext={{ formState, sitekey, theme }}
        noHtml5Validate
        showErrorList={false}
        widgets={widgets}
        FieldTemplate={FieldTemplate}
        ObjectFieldTemplate={ObjectFieldTemplate}
        id={`${uuid}_form`}
        idPrefix={uuid}
        {...props}
        {...statefulProps}
      >
        {
          children ?? (
            <SubmitButton
              formState={formState}
              submitText={submitText}
              theme={theme}
            />
          )
        }
      </FormComponent>
    </FormWrapper>
  );
};

SchemaForm.propTypes = {
  children: PropTypes.node,
  /** When provided, will send a `POST` request to the given endpoint with the form data */
  endpoint: PropTypes.string,
  /** Refer to the [rjsf-conditionals docs](https://github.com/ivarprudnikov/rjsf-conditionals#extension-mechanism)
   * for more information.
  */
  extraActions: PropTypes.shape({}),
  /** Apply any default errors */
  extraErrors: PropTypes.shape({
    _form: PropTypes.shape({
      __errors: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
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
  // FIXME: Use LIVE_VALIDATE const here when Storybook renders them properly
  liveValidate: PropTypes.oneOf([true, false, 'postSubmit']),
  /**
   * Determines what will be controlled by the form. In `simplified` mode, the form will handle
   * as little as possible.
   */
  mode: PropTypes.oneOf(['simplified', 'default']),
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
  children: undefined,
  extraActions: {},
  extraErrors: {},
  endpoint: undefined,
  formData: {},
  formSuccessMessage: '',
  formSuccessTitle: '',
  liveValidate: false,
  mode: FORM_MODE.DEFAULT,
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
