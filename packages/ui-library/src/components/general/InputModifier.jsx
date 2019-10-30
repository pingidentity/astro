import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const InputColors = {
    LIGHT: "light",
    DARK: "DARK",
};

const InputMargins = {
    STRIP: "strip",
};

class InputModifier extends Component {
    render() {
        const {
            inputColor,
            inputMargin,
            children,
        } = this.props;

        const classNames = classnames({
            "modifier_light-inputs": inputColor === InputColors.LIGHT,
            "modifier_dark-inputs": inputColor === InputColors.DARK,
            "modifier_strip-input-margins": inputMargin === InputMargins.STRIP,
        });

        return (
            <div className={classNames}>
                {children}
            </div>
        )
    }
}

InputModifier.propTypes = {
    inputColor: PropTypes.oneOf(Object.values(InputColors)),
    inputMargin: PropTypes.oneOf(Object.values(InputMargins)),
};

InputModifier.InputColors = InputColors;
InputModifier.InputMargins = InputMargins;
export default InputModifier;