import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import HelpHint from "../tooltips/HelpHint";
import _ from "underscore";
import { withFocusOutline } from "../../util/KeyboardUtils";
import { inStateContainer } from "../utils/StateContainer";
import { deprecatedStatelessProp } from "../../util/DeprecationUtils";



/**
* @typedef RockerButton~labelValues
* @property {string} label
*     Selected label from labels array prop.
* @property {number} index
*     Index of selected label from labels array prop.
*/

/**
* @callback RockerButton~onValueChange
* @param {RockerButton~labelValues} labelValues
*     Label and label index.
*/


/**
* @class RockerButton
* @desc Rocker buttons implementation, supports 2 to 4 buttons (current CSS restriction).
*
* @param {string} [className]
*     CSS classes to be set on the top-level HTML container.
* @param {string} [data-id="rocker-button"]
*     To define the base "data-id" value for the top-level HTML container.
* @param {boolean} [disabled=false]
*     Indicates whether component is disabled.
*
* @param {array} labels
*     Array of label strings to use as button titles.
* @param {boolean} noMargin
*     Removes the margin below the RockerButton.
*
* @param {RockerButton~onValueChange} [onValueChange]
*     Callback to be triggered when selection changes.
*
* @param {number} [selectedIndex=0]
*     The index of the selected label.
*     When not provided, the component will manage this value.
* @param {string} [selected=0]
*     The id or index of the selected label.
*     When not provided, the component will manage this value.
* @param {RockerButton.rockerTypes} [type]
*     Set to CHART for special style.
*
* @example
*      <RockerButton onValueChange={this._changeSubview}
*                    labels={["Profile", "Groups", "Services"]} />
*
*      , where this._changeSubview can be defined as:
*
*      _changeSubview: function (selectedView) {
*          console.log("++ _changeSubview: ",selectedView);
*      }
*/

/**
 * @enum {string}
 * @alias RockerButton.rockerTypes
 */
const rockerTypes = {
    /** default */
    DEFAULT: "default",
    /** chart */
    CHART: "chart",
    /** chart-small */
    CHART_SMALL: "chart-small",
};

const getButtonPosition = (labels, selected) => {
    if (typeof labels[0] === "object") {
        if (selected) {
            return labels.findIndex(({ id }) => id === selected);
        }
        return 0;
    } else {
        return selected;
    }
};

function RockerButtonBase({
    autoFocus,
    className,
    "data-id": dataId,
    disabled,
    labelHints,
    labels,
    noMargin,
    onValueChange,
    selectedIndex,
    selected,
    type
}) {
    const selectedValue = selectedIndex === undefined ? selected : selectedIndex;
    const position = getButtonPosition(labels, selectedValue);

    const classes = classnames("rocker-button", className, {
        disabled: disabled,
        "rocker-button--chart-rocker": type === rockerTypes.CHART || type === rockerTypes.CHART_SMALL,
        "rocker-button--chart-rocker-small": type === rockerTypes.CHART_SMALL,
        "rocker-button--no-margin": noMargin,
        [`sel-${position}`]: selectedValue !== null && selectedValue !== undefined
    });

    return (
        <div className="rocker-button__container">
            <div data-id={dataId} className={classes}>
                {
                    labels.map((data, index) => {
                        const {
                            id,
                            label = id || data,
                            ...props
                        } = data;

                        return (
                            <RockerButtonLabel
                                autoFocus={index === position && autoFocus === true}
                                helpText={labelHints ? labelHints[index] : undefined}
                                key={id || index}
                                id={id}
                                index={index}
                                text={label}
                                onClick={(payload, e) => {
                                    if (disabled) {
                                        return;
                                    }
                                    onValueChange(payload, e);

                                }}
                                {...props}
                            />);
                    })
                }
            </div>
        </div>
    );
}

RockerButtonBase.propTypes = {
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    "data-id": PropTypes.string,
    disabled: PropTypes.bool,
    labelHints: PropTypes.arrayOf(PropTypes.string),
    labels: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                label: PropTypes.node.isRequired,
                id: PropTypes.string
            }),
        ])),
    noMargin: PropTypes.bool,
    onValueChange: PropTypes.func,
    selectedIndex: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    selected: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    type: PropTypes.oneOf(Object.values(rockerTypes)),
};

RockerButtonBase.defaultProps = {
    autoFocus: false,
    className: "",
    "data-id": "rocker-button",
    disabled: false,
    noMargin: false,
    onValueChange: _.noop,
    selected: 0
};

function RockerButtonLabel({
    autoFocus,
    id,
    helpText,
    index,
    onClick,
    text = ""
}) {
    const _handleClick = function (event) {
        onClick({
            label: text,
            id,
            index
        }, event);
    };

    const sanitizedDataId = (() => {
        if (id !== undefined) {
            return id;
        } else if (typeof text === "string") {
            return text.toLowerCase().replace(/[^0-9a-z]/gi, "");
        } else {
            return index;
        }
    })();

    return helpText
        ? <HelpHint
            data-id={`helphint-button_${sanitizedDataId}`}
            placement="top"
            delayShow={500}
            hintText={helpText} >
            <button
                data-id={`rocker-label_${sanitizedDataId}`}
                className="rocker-button__button"
                onClick={_handleClick}
                autoFocus={autoFocus}
                type="button"
            >
                {text}
            </button>
        </HelpHint>
        : <button
            data-id={`rocker-label_${sanitizedDataId}`}
            className="rocker-button__button"
            onClick={_handleClick}
            autoFocus={autoFocus}
            type="button"
        >
            {text}
        </button>;
}

RockerButtonLabel.propTypes = {
    "data-id": PropTypes.string,
    onClick: PropTypes.func,
    autoFocus: PropTypes.bool,
    text: PropTypes.node,
    index: PropTypes.number,
};

const RockerButton = withFocusOutline(
    inStateContainer([
        {
            name: "selected",
            initial: 0,
            callbacks: [
                {
                    name: "onValueChange",
                    transform: ({ index, id = index }) => id
                }
            ],
        }
    ])(RockerButtonBase)
);

RockerButton.displayName = "RockerButton";

RockerButton.propTypes = {
    stateless: deprecatedStatelessProp,
};

RockerButton.rockerTypes = rockerTypes;

export default RockerButton;
