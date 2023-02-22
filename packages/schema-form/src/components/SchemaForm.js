import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { v4 as v4uuid } from 'uuid';
import JSONSchemaV4 from 'ajv/lib/refs/json-schema-draft-04.json';
import Form from '@rjsf/core';
import { GlobalStyles, ThemeProvider } from '@pingux/astro';
import useAstroTheme from '@pingux/astro/lib/cjs/styles/useAstroTheme';
import useStatefulForm from '../hooks/useStatefulForm';
import { FORM_STATE, FORM_MODE } from '../utils/constants';
import widgets from '../utils/widgets';
import FieldTemplate from './FieldTemplate';
import ObjectFieldTemplate from './ObjectFieldTemplate';
import SubmitButton from './SubmitButton';
import SuccessMessage from './SuccessMessage';
import endUserTheme from '../../../../shared/themes/end-user/endUserTheme';

const SchemaForm = props => {
  const {
    children,
    extraErrors: formExtraErrors,
    formSuccessMessage,
    formSuccessTitle,
    sitekey, // For captcha purposes
    submitText,
    theme,
    fields,
    fieldTemplate,
    widgets: propWidgets,
  } = props;
  const {
    statefulProps = {
      extraErrors: formExtraErrors,
      FormComponent: Form,
      formState: FORM_STATE.DEFAULT,
    },
  } = useStatefulForm(props);
  const { extraErrors, FormComponent, formState } = statefulProps;
  const uuid = useMemo(() => {
    // Prefix all tests the same for DOM consistency
    if (process.env.NODE_ENV === 'test') {
      return 'rjsf';
    }
    return v4uuid();
  }, []);

  const astroTheme = useAstroTheme();

  // Use provided custom theme or retrieve existing.
  let themeObject;
  if (theme && typeof theme !== 'string') {
    themeObject = theme;
  } else {
    themeObject = theme === 'end-user' ? endUserTheme : astroTheme;
  }

  if (formState === FORM_STATE.SUCCESS) {
    return (
      <ThemeProvider theme={themeObject}>
        <SuccessMessage
          theme={theme}
          formSuccessMessage={formSuccessMessage}
          formSuccessTitle={formSuccessTitle}
        />
      </ThemeProvider>
    );
  }

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={themeObject}>
        <FormComponent
          additionalMetaSchemas={[JSONSchemaV4]}
          autoComplete="off"
          className="form"
          disabled={formState === FORM_STATE.PENDING}
          formContext={{
            formState, sitekey, theme, extraErrors,
          }}
          noHtml5Validate
          showErrorList={false}
          FieldTemplate={fieldTemplate}
          ObjectFieldTemplate={ObjectFieldTemplate}
          id={`${uuid}_form`}
          idPrefix={uuid}
          {...props}
          widgets={{ ...widgets, ...propWidgets }}
          {...statefulProps}
          fields={{ ...fields }}
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
      </ThemeProvider>
    </>
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
  /** Apply custom fields */
  fields: PropTypes.shape({}),
  /** Apply custom FieldTemplate */
  fieldTemplate: PropTypes.func,
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
  /** Choose between astro, end-user, or supply custom theme.
   * Default is astro, more themes to come... */
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Customization options for the look and feel of the form. */
  uiSchema: PropTypes.shape({}),
  /**
   * Mapping of widget names (key) and rendered components (value) that
   * gets merged with the themed widgets. Any options passed to this prop
   * have the potential to override existing themed widgets.
   */
  widgets: PropTypes.shape({}),
};

SchemaForm.defaultProps = {
  children: undefined,
  extraActions: {},
  extraErrors: {},
  endpoint: undefined,
  fields: {},
  fieldTemplate: FieldTemplate,
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
  theme: 'astro',
  uiSchema: {},
  widgets: undefined,
};

export default SchemaForm;
