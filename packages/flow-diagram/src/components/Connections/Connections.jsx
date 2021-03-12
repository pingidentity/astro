import React from 'react';
import PropTypes from 'prop-types';
import Xarrow from 'react-xarrows';

export default function Connections({ links }) {
    return (
        links.map(link => (
            <Xarrow
                start={link.from}
                end={link.to}
                color="#FF8324"
                headSize={0}
                strokeWidth={1}
            />
        ))
    );
}

Connections.propTypes = {
    links: PropTypes.array,
};
