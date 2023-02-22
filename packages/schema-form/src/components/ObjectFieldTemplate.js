import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Errors from './Errors';
import { AstroComponents } from '../utils/astro';

export const FLOAT_LABEL = {
  isFloatLabel: 'is-float-label',
  isFloatLabelActive: 'is-float-label-active',
};

const UI_OPTIONS = 'ui:options';

const ObjectFieldTemplate = props => {
  const {
    description,
    formContext: { extraErrors, theme },
    properties,
    title,
    uiSchema,
  } = props;

  const FormTitle = AstroComponents.formTitle;
  const FormDescription = AstroComponents.formDescription;

  // eslint-disable-next-line react/prop-types
  const formLevelErrors = extraErrors?._form?.__errors; // eslint-disable-line no-underscore-dangle

  const fields = properties.map(el => {
    const { name, content } = el;
    const { formData } = content.props;

    const hasFloatLabel = uiSchema[name] && uiSchema[name][UI_OPTIONS]?.labelMode === 'float';

    return (hasFloatLabel
      ? (
        <div
          className={`${formData && FLOAT_LABEL.isFloatLabelActive}`}
          data-testid={`${formData ? FLOAT_LABEL.isFloatLabelActive : FLOAT_LABEL.isFloatLabel}`}
          key={name}
        >
          {content}
        </div>
      )
      : <Fragment key={name}>{content}</Fragment>
    );
  });

  return (
    <>
      {title && <FormTitle>{title}</FormTitle>}
      <Errors
        errors={formLevelErrors}
        hasMarkdown={_.get(uiSchema, `_form[${UI_OPTIONS}].hasMarkdownErrors`, false)}
        theme={theme}
      />
      {description && <FormDescription>{description}</FormDescription>}
      {fields}
    </>
  );
};

ObjectFieldTemplate.propTypes = {
  formContext: PropTypes.shape({
    theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    /** Apply any default errors */
    extraErrors: PropTypes.shape({
      _form: PropTypes.shape({
        __errors: PropTypes.arrayOf(PropTypes.string),
      }),
    }),
  }).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  properties: PropTypes.arrayOf(PropTypes.shape({})),
  /** Customization options for the look and feel of the form. */
  uiSchema: PropTypes.shape({}),
};

ObjectFieldTemplate.defaultProps = {
  title: undefined,
  description: undefined,
  properties: undefined,
  uiSchema: {},
};

export default ObjectFieldTemplate;
