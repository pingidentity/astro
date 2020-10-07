import React from 'react';
import PropTypes from 'prop-types';

export const between = (children, insert) => {
    let isFirst = true; // make sure not to insert until there's at least one non-null child

    return React.Children.map(children, (child, index) => {
        const result = !isFirst && child
            ? (
                <>{Array.isArray(insert) ? insert[index - 1] : insert}{child}</>
            ) : child;

        isFirst = isFirst && !child;

        return result;
    });
};

const Between = ({ children, insert }) => (
    <>{between(children, insert)}</>
);

Between.propTypes = {
    insert: PropTypes.node,
};

export default Between;
