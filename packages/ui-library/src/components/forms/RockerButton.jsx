var PropTypes = require("prop-types");
var React = require("react"),
    classnames = require("classnames"),
    HelpHint = require("../tooltips/HelpHint"),
    _ = require("underscore"),
    Utils = require("../../util/Utils");

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
* @param {string} [selected]
*     The text value of the item to select initially. Used only when stateless=false.
*     stateless components must use 'selectedIndex'. Is mutually exclusive with "selectedIndex".
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

module.exports = class extends React.Component {

    static propTypes = {
        stateless: PropTypes.bool
    };

    static defaultProps = {
        stateless: false
    };

    constructor(props) {
        super(props);
        if (!Utils.isProduction()) {
            if (props.controlled !== undefined) {
                throw new Error(Utils.deprecatePropError("controlled", "stateless"));
            }
            if (props.id) {
                throw new Error(Utils.deprecatePropError("id", "data-id"));
            }
            if (props.onChange) {
                throw new Error(Utils.deprecatePropError("onChange", "onValueChange"));
            }
            if (props.labels && (props.labels.length < 2 || props.labels.length > 4)) {
                console.warn("RockerButton expecting two to four labels, but was given ", props.labels.length);
            }
            if (props.stateless === false) {
                console.warn("Deprecated: the stateful option for this component will be removed in next version");
            }
        }
    }

    render() {
        return (
            this.props.stateless
                ? <RockerButtonStateless ref="RockerButtonStateless" {...this.props} />
                : <RockerButtonStateful ref="RockerButtonStateful" {...this.props} />);
    }
};

class RockerButtonStateless extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        labels: PropTypes.array.isRequired,
        labelHints: PropTypes.arrayOf(PropTypes.string),
        onValueChange: PropTypes.func,
        selected: PropTypes.string,
        selectedIndex: PropTypes.number,
        disabled: PropTypes.bool,
    };

    static defaultProps = {
        "data-id": "rocker-button",
        className: "",
        onValueChange: _.noop,
        selected: "",
        selectedIndex: 0,
        disabled: false
    };

    _handleClick = (label, index) => {
        if (this.props.disabled) {
            return;
        }

        if (this.props.onValueChange) {
            this.props.onValueChange({ label: label, index: index });
        }
    };

    render() {
        var className = classnames("rocker-button sel-" + this.props.selectedIndex, this.props.className, {
            disabled: this.props.disabled
        });

        return (
            <div ref="container" data-id={this.props["data-id"]} className={className}>
                {
                    this.props.labels.map(function (text, index) {
                        const props = {
                            "data-id": text,
                            onClick: this._handleClick,
                            key: index,
                            text,
                            index,
                            helpText: this.props.labelHints ? this.props.labelHints[index] : undefined,
                        };
                        return (
                            <RockerButtonLabel {...props} />);
                    }.bind(this))
                }
            </div>
        );
    }
}

var RockerButtonLabel = function (props) {
    var _handleClick = function (event) {
        props.onClick(props.text, props.index, event);
    };

    return props.helpText
        ? <HelpHint
            data-id="helphint-button"
            placement = "top"
            delayShow={500}
            hintText={props.helpText} ><label data-id={props["data-id"]} onClick={_handleClick}>{props.text}</label>
        </HelpHint>
        : <label data-id={props["data-id"]} onClick={_handleClick}>{props.text}</label>;
};

RockerButtonLabel.propTypes = {
    "data-id": PropTypes.string,
    onClick: PropTypes.func,
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
