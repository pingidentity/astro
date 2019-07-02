import React from 'react';
import PropTypes from 'prop-types';

import { inStateContainer, toggleTransform  } from '../util/StateContainer';

/**
 * @class Checkbox
 * @desc Toggle an option
 *
 * @param {Checkbox~onChange} [onChange]
 *      Fired when the value of the checkbox changes
 * @param {bool} [checked]
 *      Sets the checkbox's state
 * @param {string} [data-id]
 *      Sets a data-id property on the checkbox element to be used as a test hook
 *
 */
const StatelessCheckbox = ({
    'data-id': dataId,
    checked,
    id,
    label,
    onChange,
}) => {
    return (
        <label className="checkbox" htmlFor={id} data-id={dataId}>
            <input
                type="checkbox"
                className="checkbox__input"
                id={id}
                defaultChecked={checked}
                onChange={onChange}
            />
            <span className="checkbox__standin" />
            <span className="checkbox__label">{label}</span>
        </label>
    );
};

StatelessCheckbox.propTypes = {
    'data-id': PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
};

StatelessCheckbox.defaultProps = {
    checked: false,
    onChange: () => { },
};

const Checkbox = inStateContainer([
    {
        name: 'checked',
        initial: false,
        callbacks: [
            {
                name: 'onChange',
                transform: toggleTransform,
            },
        ],
    },
])(StatelessCheckbox);

Checkbox.propTypes = {
    'data-id': PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
};

Checkbox.defaultProps = {
    checked: false,
    onChange: () => { },
};

export default Checkbox;
