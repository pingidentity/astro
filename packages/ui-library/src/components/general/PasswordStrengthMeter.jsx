import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
 * @class PasswordStrengthMeter
 * @desc A visual indicator of a passwords strength.
 *
 * @property {string} [data-id]
 *     The "data-id" value assigned to the top-level HTML container.
 *
 * @param {array} [labels=["Very Weak", "Weak", "Good", "Strong"]]
 *     An array of the password strength labels in order from weakest to the strongest. Each displays according to the
 *     score.
 *
]* @param {number} [score]
 *     The score is an integer value between 0-4. When zero, all bars are unfilled. Each following integer colors the
 *     corresponding number of bars.
 **/

const PasswordStrengthMeter = (props) => {
    const {
        "data-id": dataId,
        labels,
        score,
    } = props;
    const classes = classnames(
        "password-meter",
        [`password-meter--s${score}`],
    );

    return (
        <div className={classes} data-id={dataId}>
            <div className="password-meter__bar password-meter__bar--s1"></div>
            <div className="password-meter__bar password-meter__bar--s2"></div>
            <div className="password-meter__bar password-meter__bar--s3"></div>
            <div className="password-meter__bar password-meter__bar--s4"></div>
            <div className="password-meter__labels" data-id="password-meter-label">
                <div className="password-meter__label password-meter__label--s1">{labels[0]}</div>
                <div className="password-meter__label password-meter__label--s2">{labels[1]}</div>
                <div className="password-meter__label password-meter__label--s3">{labels[2]}</div>
                <div className="password-meter__label password-meter__label--s4">{labels[3]}</div>
            </div>
        </div>
    );
};

PasswordStrengthMeter.propTypes = {
    "data-id": PropTypes.string,
    password: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    labels: PropTypes.arrayOf(PropTypes.string),
};

PasswordStrengthMeter.defaultProps = {
    "data-id": "password-strength-meter",
    labels: ["Very Weak", "Weak", "Good", "Strong"],
};

export default PasswordStrengthMeter;
