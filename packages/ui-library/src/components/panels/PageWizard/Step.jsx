import React from "react";
import PropTypes from "prop-types";

const Step = ({
    children,
    "data-id": stepDataId,
    description,
    menuDescription,
    menuTitle,
    title,
    infoItem
}) => (
    <div data-id={stepDataId}>
        <div className="wizard2-step-top">
            <div className="wizard2-step-top__title" data-id={`${stepDataId}-title`}>{title || menuTitle}</div>
            { infoItem ? (
                <div className="wizard2-step-top__info">
                    { infoItem }
                </div>
            ) : (
                null
            )}
        </div>
        <div className="wizard2-step__description" data-id={`${stepDataId}-description`}>
            {description || menuDescription}
        </div>
        <div className="wizard2-step__content" data-id={`${stepDataId}-content`}>
            {children}
        </div>
    </div>
);

Step.propTypes = {
    clickDisabled: PropTypes.bool,
    completed: PropTypes.bool,
    "data-id": PropTypes.string,
    description: PropTypes.string,
    hideButtonBar: PropTypes.bool,
    hideMenu: PropTypes.bool,
    menuDescription: PropTypes.string,
    onSave: PropTypes.func,
    required: PropTypes.bool,
    title: PropTypes.node,
    infoItem: PropTypes.node,
    menuTitle: PropTypes.string,
};

export default Step;
