import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@pingux/astro';
import Markdown from '../../Markdown';

const Error = props => {
  const {
    error,
    hasMarkdown,
    renderers,
    ...others
  } = props;

  return (
    <Text sx={{ color: 'critical.dark' }}>
      <Markdown source={error} hasMarkdown={hasMarkdown} {...others} />
    </Text>
  );
};

Error.propTypes = {
  error: PropTypes.string,
  hasMarkdown: PropTypes.bool,
  renderers: PropTypes.shape({}),
};

Error.defaultProps = {
  error: '',
  hasMarkdown: false,
  renderers: {},
};

export default Error;
