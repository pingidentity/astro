import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * @class ButtonGroup
 * @desc The grouped buttons in a dialog
 *
 * @param {string} [data-id="button-group"]
 *          To define the base "data-id" value for the top-level HTML container.
 * @param {string} [className]
 *      css paramanter
 * @param {string} [cancelLabel="Cancel"]
 *      Text to show in the cancel link
 * @param {function} [onCancel]
 *      Callback for when the cancel link is clicked. Cancel link only appears when this is defined.
 */

const ButtonGroup = ({
    children,
    className,
    cancelLabel,
    "data-id": dataId,
    onCancel,
}) => (
        <div className={classnames("button-group", className)} data-id={dataId}>
            {children}
            {onCancel &&
                [
                    <br key="break" />,
                    <a
                        key="cancel"
                        className="cancel"
                        data-id="button-group-cancel"
                        onClick={onCancel}
                    >{cancelLabel}</a>,
                ]
            }
        </div>
    );

ButtonGroup.propTypes = {
    "data-id": PropTypes.string,
    className: PropTypes.string,
    cancelLabel: PropTypes.string,
    onCancel: PropTypes.func,
};

ButtonGroup.defaultProps = {
    "data-id": "button-group",
    cancelLabel: "Cancel",
};

export default ButtonGroup;