import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Button from "./Button";
import Icon from "../general/Icon";

/**
* @class Tutorial Button
* @desc button that takes you to the tutorial
*
* @param {string} [className]
*     Extra CSS class(s) applied to the top-level HTML container.
* @param {string} [data-id="tutorial-button"]
*     Defines the "data-id" for top-level HTML container.
* @param {function} [onClick]
*     Click handler.
* @param {string} [label]
*     Html name of the button.
*/

function TutorialButton({
    className,
    "data-id": dataId,
    label,
    onClick
}) {
    return (
        <Button
            className={classnames(
                "button--tutorial",
                className
            )}
            data-id={dataId}
            label={
                <div>
                    <Icon
                        iconName="play"
                    />
                    {label}
                </div>
            }
            onClick={onClick}
        />
    );
}

TutorialButton.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
    label: PropTypes.node,
    onClick: PropTypes.func
};

TutorialButton.defaultProps = {
    "data-id": "tutorial-button",
    label: "Tutorial"
};

export default TutorialButton;
