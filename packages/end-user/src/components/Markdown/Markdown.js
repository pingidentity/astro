import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import renderers from './renderers';

const Markdown = (props) => {
    const {
        hasMarkdown,
        renderers: propsRenderers,
        source,
        ...others
    } = props;

    if (!hasMarkdown) return source || null;

    return (
        <ReactMarkdown
            className="end-user-markdown"
            renderers={{ ...renderers, ...propsRenderers }}
            source={source}
            disallowedTypes={['paragraph']}
            unwrapDisallowed
            {...others}
        />
    );
};

Markdown.propTypes = {
    /**
     * The string of text which will be rendered as Markdown
     */
    source: PropTypes.string,
    /**
     * Determines whether the source will be rendered as Markdown
     */
    hasMarkdown: PropTypes.bool,
};

Markdown.defaultProps = {
    hasMarkdown: true,
};

export default Markdown;
