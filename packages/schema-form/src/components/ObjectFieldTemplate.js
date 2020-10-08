import React, { Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';
import { getThemedComponent, THEMES } from '../themes/utils';

const ObjectFieldTemplate = (props) => {
  const {
    formContext: { theme },
    title,
    description,
    properties,
  } = props;
  const FormTitle = useMemo(() => getThemedComponent(theme, 'formTitle'), [theme]);
  const FormDescription = useMemo(() => getThemedComponent(theme, 'formDescription'), [theme]);

  return (
    <>
      {title && <FormTitle>{title}</FormTitle>}
      {description && <FormDescription>{description}</FormDescription>}
      {properties.map((el) => <Fragment key={el.name}>{el.content}</Fragment>)}
    </>
  );
};

ObjectFieldTemplate.propTypes = {
  formContext: PropTypes.shape({
    theme: PropTypes.oneOf(Object.values(THEMES)).isRequired,
  }).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  properties: PropTypes.arrayOf(PropTypes.object),
};

ObjectFieldTemplate.defaultProps = {
  title: undefined,
  description: undefined,
  properties: undefined,
};

export default ObjectFieldTemplate;
