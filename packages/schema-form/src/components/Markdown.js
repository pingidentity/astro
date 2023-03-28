import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

// Need to ignore this since we have to mock the Markdown component in tests
/* istanbul ignore next */
const renderLink = props => (
  <a
    href={props.href}
    rel="nofollow noreferrer noopener"
    target="_blank"
  >
    {props.children}
  </a>
);

const defaultComponents = {
  a: renderLink,
};

const Markdown = props => {
  const {
    source,
    hasMarkdown,
    components,
    ...others
  } = props;

  return hasMarkdown
    ? (
      <ReactMarkdown
        components={{ ...defaultComponents, ...components }}
        linkTarget="_blank"
        disallowedElements={['p']}
        unwrapDisallowed
        {...others}
      >
        {source}
      </ReactMarkdown>
    )
    : source;
};

Markdown.propTypes = {
  source: PropTypes.string,
  hasMarkdown: PropTypes.bool,
  components: PropTypes.shape({}),
};

Markdown.defaultProps = {
  source: '',
  hasMarkdown: false,
  components: {},
};

export default Markdown;
