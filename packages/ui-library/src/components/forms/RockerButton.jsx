import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import HelpHint from "../tooltips/HelpHint";
import _ from "underscore";
import { flagsPropType } from "../../util/FlagUtils";
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
* @param {string} [data-id="rocker-button"]
*     To define the base "data-id" value for the top-level HTML container.
* @param {string} [className]
*     CSS classes to be set on the top-level HTML container.
* @param {boolean} [stateless]
*     To enable the component to be externally managed. True will relinquish control to the component's owner.
*     False or not specified will cause the component to manage state internally.
* @param {boolean} [disabled=false]
*     Indicates whether component is disabled.
*
* @param {array} labels
*     Array of label strings to use as button titles.
*
* @param {RockerButton~onValueChange} [onValueChange]
*     Callback to be triggered when selection changes.
*
* @param {number} [selectedIndex=0]
*     The index of the selected label.
*     When not provided, the component will manage this value.
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


class RockerButtonStateless extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        labels: PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.shape({
                    label: PropTypes.string.isRequired,
                    id: PropTypes.string
                }),
            ])),
        labelHints: PropTypes.arrayOf(PropTypes.string),
        onValueChange: PropTypes.func,
        selectedIndex: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        autoFocus: PropTypes.bool,
        disabled: PropTypes.bool,
    };

    static defaultProps = {
        "data-id": "rocker-button",
        className: "",
        onValueChange: _.noop,
        selectedIndex: 0,
        autoFocus: false,
        disabled: false
    };

    _handleClick = (label, index) => {
        if (this.props.disabled) {
            return;
        }
        this.props.onValueChange({ label: label, index: index });

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
        var className = classnames("rocker-button sel-" + this.buttonPos(), this.props.className, {
            disabled: this.props.disabled
        });


        return (
            <div ref="container" data-id={this.props["data-id"]} className={className}>
                {
                    this.props.labels.map((data, index) => {
                        let props = {
                            onClick: this._handleClick,
                            key: index,
                            index,
                            autoFocus: index === this.props.selectedIndex &&
                                  this.props.autoFocus === true,
                            helpText: this.props.labelHints ? this.props.labelHints[index] : undefined,
                        };
                        if (data && data.id) {
                            props.text = data.label;
                            props["data-id"] = data.id;
                        } else {
                            props.text = data;
                        }
                        return (
                            <RockerButtonLabel {...props} />);
                    })
                }
            </div>
        );
    }
}

var RockerButtonLabel = function (props) {
    var _handleClick = function (event) {
        if (props["data-id"]) {
            props.onClick(props.text, props["data-id"], event);
        } else {
            props.onClick(props.text, props.index, event);
        }
    };

    const { text = "" } = props;

    const sanitizedText = text.toLowerCase().replace(/[^0-9a-z]/gi, "");

    return props.helpText
        ? <HelpHint
            data-id={`helphint-button_${sanitizedText}`}
            placement="top"
            delayShow={500}
            hintText={props.helpText} >
            <button
                data-id={props["data-id"] || `rocker-label_${sanitizedText}`}
                className="rocker-button__button"
                onClick={_handleClick}
                autoFocus={props.autoFocus}
                type="button"
            >
                {props.text}
            </button>
        </HelpHint>
        : <button
            data-id={props["data-id"] || `rocker-label_${sanitizedText}`}
            className="rocker-button__button"
            onClick={_handleClick}
            autoFocus={props.autoFocus}
            type="button"
        >
            {props.text}
        </button>;
};

RockerButtonLabel.propTypes = {
    "data-id": PropTypes.string,
    onClick: PropTypes.func,
    autoFocus: PropTypes.bool,
    text: PropTypes.string,
    index: PropTypes.number
};

const RockerButton = withFocusOutline(
    inStateContainer([
        {
            name: "selectedIndex",
            initial: 0,
            callbacks: [
                {
                    name: "onValueChange",
                    transform: ({ index }) => index
                }
            ],
        }
    ])(RockerButtonStateless)
);

RockerButton.displayName = "RockerButton";

RockerButton.propTypes = {
    stateless: deprecatedStatelessProp,
    flags: flagsPropType,
};

RockerButton.contextTypes = { flags: PropTypes.arrayOf(PropTypes.string) };

export default RockerButton;