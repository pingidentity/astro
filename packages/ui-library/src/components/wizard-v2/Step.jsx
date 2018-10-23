import React from "react";
import PropTypes from "prop-types";

function Step(props) {
    const stepDataId = `${props["data-id"]}`;

    return (
        <div data-id={stepDataId}>
            <div className="wizard2-step__title" data-id={`${stepDataId}-title`}>{props.title || props.menuTitle}</div>
            <div className="wizard2-step__description" data-id={`${stepDataId}-description`}>
                {props.description || props.menuDescription}
            </div>
            <div className="wizard2-step__content" data-id={`${stepDataId}-content`}>
                {props.children}
            </div>
        </div>
    );
}

Step.propTypes = {
    completed: PropTypes.bool,
    "data-id": PropTypes.string,
    description: PropTypes.string,
    hideButtonBar: PropTypes.bool,
    hideMenu: PropTypes.bool,
    menuDescription: PropTypes.string,
    onSave: PropTypes.func,
    required: PropTypes.bool,
    title: PropTypes.string,
};

export default Step;
