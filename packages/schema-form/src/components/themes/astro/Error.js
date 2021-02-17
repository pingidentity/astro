import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@pingux/astro';
import Markdown from '@pingux/end-user/components/Markdown';

/* istanbul ignore next */
const Error = (props) => {
  const { error, hasMarkdown } = props;

  return (
    <Text css={{ color: 'red' }}>
      <Markdown source={error} hasMarkdown={hasMarkdown} />
    </Text>
  );
};

Error.propTypes = {
  error: PropTypes.string,
  hasMarkdown: PropTypes.bool,
};

Error.defaultProps = {
  error: '',
  hasMarkdown: false,
};

export default Error;
