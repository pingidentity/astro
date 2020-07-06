import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop } from "underscore";

import Markdown from '../Markdown';

/**
 * Toggles an option
 */
const Checkbox = ({
    'data-id': dataId,
    checked,
    className,
    id,
    label,
    onChange,
    isStacked,
    hasMarkdown,
}) => {
    const classNames = classnames('checkbox', className, {
        'checkbox--stacked': isStacked,
    });

    return (
        <label className={classNames} htmlFor={id} data-id={dataId}>
            <input
                type="checkbox"
                className="checkbox__input"
                id={id}
                defaultChecked={checked}
                onChange={onChange}
            />
            <span className="checkbox__standin" />
            <span className="checkbox__label">
                <Markdown hasMarkdown={hasMarkdown} source={label} />
            </span>
        </label>
    );
};

Checkbox.propTypes = {
    /**
     * Sets the checkbox's state
     */
    checked: PropTypes.bool,
    /**
     * CSS class(es) applied to the Checkbox element
     */
    className: PropTypes.string,
    /**
     * Sets a data-id property on the Checkbox to be used as a test hook
     */
    'data-id': PropTypes.string,
    /**
     * ID to apply to the Checkbox element itself
     */
    id: PropTypes.string,
    /**
     * Label for the Checkbox
     */
    label: PropTypes.string,
    /**
     * Fired when the value of the checkbox changes
     */
    onChange: PropTypes.func,
    /**
     * Determines whether the checkbox is meant to be stacked with other checkboxes
     */
    isStacked: PropTypes.bool,
    /**
     * Determines whether the checkbox label has Markdown applied to it
     */
    hasMarkdown: PropTypes.bool,
};

Checkbox.defaultProps = {
    checked: false,
    onChange: noop,
    isStacked: false,
    hasMarkdown: false,
};

export default Checkbox;