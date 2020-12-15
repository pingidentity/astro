import React from 'react';

/* eslint-disable */

// let's fake a Tippy tooltip for testing so we can simulate show and hide events
const Tippy = ({
    children,
    render,
    onShow,
    onHide,
}) => (
    <div>
        <span
            data-id="test-reference"
            onMouseOver={onShow}
            onMouseOut={onHide}
        >
            {children}
        </span>
        <div data-id="test-rendered">
            {render()}
        </div>
    </div>
);

export default Tippy;
