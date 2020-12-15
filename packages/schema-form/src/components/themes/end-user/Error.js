import React from 'react';
import PropTypes from 'prop-types';
import Feedback from '@pingux/end-user/components/Feedback';
import Markdown from '@pingux/end-user/components/Markdown';

const Error = (props) => {
  const { error, hasMarkdown } = props;

  return (
    <Feedback type="error" key={error}>
      <Markdown source={error} hasMarkdown={hasMarkdown} />
    </Feedback>
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
