import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { noop } from "underscore";
import Button from "../../buttons/Button";

/**
 * @class EditButton
 * @desc An edit button for the QuickActions.
 * @memberof QuickActions
 *
 * @param {string} [className]
 *   A class name applied at the component's top level.
 * @param {string} [data-id]
 *   A data-id test hook applied at the root element.
 */

/**
 * @callback EditButton~onClick
 * @param {Object} event
 *   The click event object.
 */

export default function EditButton({
    className,
    "data-id": dataId,
    onClick,
}) {
    return (
        <Button
            className={classnames("quick-actions__edit-button", className)}
            data-id={dataId}
            iconName="edit"
            inline
            onClick={onClick}
        />
    );
}

EditButton.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
    onClick: PropTypes.func
};

EditButton.defaultProps = {
    onClick: noop
};
