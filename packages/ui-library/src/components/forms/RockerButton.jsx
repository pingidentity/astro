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

class RockerButtonStateless extends React.Component {
    static propTypes = {
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
        type: PropTypes.oneOf(Object.values(rockerTypes)),
    };

    static defaultProps = {
        autoFocus: false,
        className: "",
        "data-id": "rocker-button",
        disabled: false,
        noMargin: false,
        onValueChange: _.noop,
        selectedIndex: 0,
    };

    _handleClick = ({
        id,
        index,
        label,
    }, e) => {
        if (this.props.disabled) {
            return;
        }
        this.props.onValueChange({ label, index, id }, e);

    };

    buttonPos = () => {
        if (typeof this.props.labels[0] === "object") {
            if (this.props.selectedIndex) {
                return this.props.labels.findIndex(({ id }) => id === this.props.selectedIndex);
            }
            return 0;
        } else {
            return this.props.selectedIndex;
        }
    };

    render() {
        const { type } = this.props;


        const className = classnames("rocker-button sel-" + this.buttonPos(), this.props.className, {
            disabled: this.props.disabled,
            "rocker-button--chart-rocker": type === rockerTypes.CHART || type === rockerTypes.CHART_SMALL,
            "rocker-button--chart-rocker-small": type === rockerTypes.CHART_SMALL,
            "rocker-button--no-margin": this.props.noMargin
        });

        return (
            <div ref="container" data-id={this.props["data-id"]} className={className}>
                {
                    this.props.labels.map((data, index) => {
                        const {
                            id,
                            label = id || data,
                            ...props
                        } = data;

                        return (
                            <RockerButtonLabel
                                autoFocus={index === this.props.selectedIndex && this.props.autoFocus === true}
                                helpText={this.props.labelHints ? this.props.labelHints[index] : undefined}
                                key={id || index}
                                id={id}
                                index={index}
                                text={label}
                                onClick={this._handleClick}
                                {...props}
                            />);
                    })
                }
            </div>
        );
    }
}

var RockerButtonLabel = function ({
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
};

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
            name: "selectedIndex",
            initial: 0,
            callbacks: [
                {
                    name: "onValueChange",
                    transform: ({ index, id = index }) => id
                }
            ],
        }
    ])(RockerButtonStateless)
);

RockerButton.displayName = "RockerButton";

RockerButton.propTypes = {
    stateless: deprecatedStatelessProp,
};

RockerButton.rockerTypes = rockerTypes;

export default RockerButton;