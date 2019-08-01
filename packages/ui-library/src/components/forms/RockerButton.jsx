import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import HelpHint from "../tooltips/HelpHint";
import _ from "underscore";
import Utils from "../../util/Utils";
import { cannonballChangeWarning } from "../../util/DeprecationUtils";
import { inStateContainer } from "../utils/StateContainer";
import { flagsPropType, hasFlag } from "../../util/FlagUtils";

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
* @param {array} [flags]
*     Set the flag to use Pstateful
*
* @param {RockerButton~onValueChange} [onValueChange]
*     Callback to be triggered when selection changes.
*
* @param {string} [selected]
*     The text value of the item to select initially. Used only when stateless=false.
*     stateless components must use 'selectedIndex'. Is mutually exclusive with "selectedIndex".
*     Will be removed in v4.
* @param {number} [selectedIndex=0]
*     The index of the selected label. Is mutually exclusive with "selected".
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

export default class RockerButton extends React.Component {

    static propTypes = {
        stateless: PropTypes.bool,
        flags: flagsPropType,
    };

    static defaultProps = {
        stateless: false,
    };

    static contextTypes = { flags: PropTypes.arrayOf(PropTypes.string) };

    _usePStateful = () => hasFlag(this, "p-stateful");

    componentDidMount() {
        if (!this._usePStateful()) {
            cannonballChangeWarning({
                message: `The 'selectedIndex' prop will no longer serve as an initial state for RockerButton. ` +
                    `If it is present, it will control the current value of the component. ` +
                    `Set the 'p-stateful' flag to switch to this behavior now.`,
            });
        }

        if (this.props.selected) {
            cannonballChangeWarning({
                message: `The 'selected' prop will be ignored. ` +
                `Use the 'p-stateful' flag and the 'initialState.seletedIndex' prop`,
            });
        }

        if (!Utils.isProduction()) {
            if (this.props.controlled !== undefined) {
                throw new Error(Utils.deprecatePropError("controlled", "stateless"));
            }
            if (this.props.id) {
                throw new Error(Utils.deprecatePropError("id", "data-id"));
            }
            if (this.props.onChange) {
                throw new Error(Utils.deprecatePropError("onChange", "onValueChange"));
            }
            if (this.props.labels && (this.props.labels.length < 2 || this.props.labels.length > 5)) {
                console.warn("RockerButton expecting two to five labels, but was given ", this.props.labels.length);
            }
            if (this.props.stateless === false) {
                console.warn("Deprecated: the stateful option for this component will be removed in next version");
            }
        }
    }


    render() {
        if (hasFlag(this, "p-stateful")) {
            return <PStatefulRockerButton {...this.props} />;
        }

        return (
            this.props.stateless
                ? <RockerButtonStateless ref="RockerButtonStateless" {...this.props} />
                : <RockerButtonStateful ref="RockerButtonStateful" {...this.props} />);
    }
}


class RockerButtonStateless extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        labels: PropTypes.array.isRequired,
        labelHints: PropTypes.arrayOf(PropTypes.string),
        onValueChange: PropTypes.func,
        selected: PropTypes.string,
        selectedIndex: PropTypes.number,
        autoFocus: PropTypes.bool,
        disabled: PropTypes.bool,
    };

    static defaultProps = {
        "data-id": "rocker-button",
        className: "",
        onValueChange: _.noop,
        selected: "",
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

    render() {
        var className = classnames("rocker-button sel-" + this.props.selectedIndex, this.props.className, {
            disabled: this.props.disabled
        });

        return (
            <div ref="container" data-id={this.props["data-id"]} className={className}>
                {
                    this.props.labels.map((text, index) => {
                        const props = {
                            onClick: this._handleClick,
                            key: index,
                            text,
                            index,
                            autoFocus: index === this.props.selectedIndex &&
                                this.props.autoFocus === true,
                            helpText: this.props.labelHints ? this.props.labelHints[index] : undefined,
                        };
                        return (
                            <RockerButtonLabel {...props} />);
                    })
                }
            </div>
        );
    }
}

const dontFocus = event => event.preventDefault();

var RockerButtonLabel = function (props) {
    var _handleClick = function (event) {
        props.onClick(props.text, props.index, event);
    };

    const { label = "" } = props;

    const sanitizedLabel = label.toLowerCase().replace(/[^0-9a-z]/gi, "");

    return props.helpText
        ? <HelpHint
            data-id={`helphint-button_${sanitizedLabel}`}
            placement="top"
            delayShow={500}
            hintText={props.helpText} >
            <button
                data-id={`rocker-label_${sanitizedLabel}`}
                onMouseDown={dontFocus}
                onClick={_handleClick}
                autoFocus={props.autoFocus}
            >
                {props.text}
            </button>
        </HelpHint>
        : <button
            data-id={`rocker-label_${sanitizedLabel}`}
            onMouseDown={dontFocus}
            onClick={_handleClick}
            autoFocus={props.autoFocus}
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

class RockerButtonStateful extends React.Component {
    state = {
        selectedIndex: this.props.selectedIndex || Math.max(0, this.props.labels.indexOf(this.props.selected))
    };

    _handleOnValueChange = (selectedButton) => {
        // Don't trigger callback if index is the same
        if (selectedButton.index === this.state.selectedIndex) {
            return;
        }

        if (this.props.onValueChange) {
            this.props.onValueChange(selectedButton);
        }

        this.setState({
            selectedIndex: selectedButton.index
        });
    };

    render() {
        var props = _.defaults({
            ref: "RockerButtonStateless",
            selectedIndex: this.state.selectedIndex,
            onValueChange: this._handleOnValueChange
        }, this.props);

        return <RockerButtonStateless {...props} />;
    }
}

const PStatefulRockerButton = inStateContainer([
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
])(RockerButtonStateless);

PStatefulRockerButton.displayName = "PStatefulRockerButton";
