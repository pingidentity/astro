import React from 'react';
import PropTypes from 'prop-types';

const HelpHintArrow = ({ borderColor, color, size }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 15 15"
        style={{ display: 'block' }}
    >
        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
            <g>
                <path fill={color} d="M7.5 5L15 15 0 15z" />
                {borderColor && (
                    <path stroke={borderColor} d="M-1.42108547e-15 15L7.5 5 15 15" />
                )}
            </g>
        </g>
    </svg>
);

HelpHintArrow.propTypes = {
    borderColor: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
};

export default HelpHintArrow;
