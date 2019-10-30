import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export const inputColors = {
    LIGHT: "light",
    DARK: "dark",
};

export const inputMargins = {
    STRIP: "strip",
};

export default function InputModifier({
    inputColor,
    inputMargin,
    children,
}) {
    const classNames = classnames({
        "modifier_light-inputs": inputColor === inputColors.LIGHT,
        "modifier_dark-inputs": inputColor === inputColors.DARK,
        "modifier_strip-input-margins": inputMargin === inputMargins.STRIP,
    });

    return (
        <div className={classNames}>
            {children}
        </div>
    );
}

InputModifier.propTypes = {
    inputColor: PropTypes.oneOf(Object.values(inputColors)),
    inputMargin: PropTypes.oneOf(Object.values(inputMargins)),
};

InputModifier.propTypes = {
    inputColor: inputColors.LIGHT,
};
