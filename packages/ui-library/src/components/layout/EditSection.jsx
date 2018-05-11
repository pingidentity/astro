import React from "react";
import PropTypes from "prop-types";
import ButtonBar from "../forms/ButtonBar";
import classnames from "classnames";

/**
* @class EditSection
* @desc Displays a bordered section with an unfixed ButtonBar
*
* @param {string} [data-id=edit-section]
*     The data-id of the component
* @param {string} [className]
*     Class name(s) to add to the top-level container/div
* @param {boolean} [saveDisabled=false]
*     Disabled the save button when true
* @param {boolean} [enableSavingAnimation=false]
*     Enables the ellipsis loading animation on the save button. This also disables the "discard" and "cancel" buttons.
* @param {ButtonBar~onCancel} [onCancel]
*     Callback that will be triggered when the "cancel" button is clicked.
* @param {ButtonBar~onSave} onSave
*     Callback that will be triggered when the "save" button is clicked
* @param {object} buttonBarProps
*     Advanced way to set any props for the ButtonBar that aren't included in other EditSection props
*/
const EditSection = ({
    buttonBarProps,
    children,
    className,
    "data-id": dataId,
    enableSavingAnimation,
    onSave,
    onCancel,
    saveDisabled,
}) => (
    <div className={classnames("edit-section", className)} data-id={dataId}>
        {children}
        <ButtonBar
            unfixed
            onSave={onSave}
            onCancel={onCancel}
            saveDisabled={saveDisabled}
            enableSavingAnimation={enableSavingAnimation}
            {...buttonBarProps}
        />
    </div>
);

EditSection.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
    onCancel: PropTypes.func,
    onSave: PropTypes.func.isRequired,
    saveDisabled: PropTypes.bool,
    enableSavingAnimation: PropTypes.bool,
    buttonBarProps: PropTypes.object
};

EditSection.defaultProps = {
    "data-id": "edit-section"
};

export default EditSection;
