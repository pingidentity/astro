import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Errors from './Errors';
import { AstroComponents } from '../utils/astro';

const ObjectFieldTemplate = (props) => {
  const {
    formContext: { extraErrors, theme },
    title,
    description,
    properties,
    uiSchema,
  } = props;

  const FormTitle = AstroComponents.formTitle;
  const FormDescription = AstroComponents.formDescription;

  // eslint-disable-next-line react/prop-types
  const formLevelErrors = extraErrors?._form?.__errors; // eslint-disable-line no-underscore-dangle

  return (
    <>
      {title && <FormTitle>{title}</FormTitle>}
      <Errors
        errors={formLevelErrors}
        hasMarkdown={_.get(uiSchema, '_form["ui:options"].hasMarkdownErrors', false)}
        theme={theme}
      />
      {description && <FormDescription>{description}</FormDescription>}
      {properties.map((el) => <Fragment key={el.name}>{el.content}</Fragment>)}
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
  properties: PropTypes.arrayOf(PropTypes.object),
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
