import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop } from "underscore";

import FieldMessage from '../FieldMessage';
import Markdown from '../Markdown';

/**
 * @enum {string}
 * @alias Checkbox~statuses
 * @desc Enum for the different types of checkbox styling
 */

export const statuses = {
    DEFAULT: 'default',
    ERROR: 'error',
};

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
    fieldMessage,
    fieldMessageProps,
    status,
}) => {
    const classNames = classnames('checkbox', className, {
        'checkbox--stacked': isStacked,
        'checkbox--error': status === statuses.ERROR,
    });
    const iconClassNames = classnames('checkbox__icon', {
        'feedback--error pingicon-error-triangle': status === statuses.ERROR,
    });

    return (
        <div className="checkbox-container">
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
                    {status !== statuses.DEFAULT && <span className={iconClassNames} />}
                    <Markdown hasMarkdown={hasMarkdown} source={label} />
                </span>
            </label>
            {
                fieldMessage &&
                <FieldMessage status={status} {...fieldMessageProps}>
                    {fieldMessage}
                </FieldMessage>
            }
        </div>
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
     * Message below field
     */
    fieldMessage: PropTypes.node,
    /**
     * Sets field message props
     */
    fieldMessageProps: PropTypes.object,
    /**
     * Determines whether the checkbox label has Markdown applied to it
     */
    hasMarkdown: PropTypes.bool,
    /**
     * ID to apply to the Checkbox element itself
     */
    id: PropTypes.string,
    /**
     * Determines whether the checkbox is meant to be stacked with other checkboxes
     */
    isStacked: PropTypes.bool,
    /**
     * Label for the Checkbox
     */
    label: PropTypes.string,
    /**
     * Fired when the value of the checkbox changes
     */
    onChange: PropTypes.func,
    /**
     * Controls styling effects
     */
    status: PropTypes.oneOf(Object.values(statuses)),
};

Checkbox.defaultProps = {
    checked: false,
    hasMarkdown: false,
    isStacked: false,
    onChange: noop,
    status: statuses.DEFAULT,
};

export default Checkbox;