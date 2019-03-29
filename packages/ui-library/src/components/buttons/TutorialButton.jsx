import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Button from "./Button";
import Icon from "../general/Icon";

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
