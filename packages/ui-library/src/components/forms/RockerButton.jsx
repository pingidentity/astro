var PropTypes = require("prop-types");
var React = require("react"),
    classnames = require("classnames"),
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
* @callback RockerButton~onChange
* @deprecated Use onValueChange insted. Support for onChange will be removed in next version.
* @param {string} label - selected label from labels array prop
* @param {number} index - index of selected label from labels array prop
*/


/**
* @class RockerButton
* @desc Rocker buttons implementation, supports 2 to 4 buttons (current CSS restriction).
*
* @param {string} [data-id="rocker-button"]
*     To define the base "data-id" value for the top-level HTML container.
* @param {string} [id="rocker-button"]
*     DEPRECATED. Use "data-id" instead. To define the base "id" value for the top-level HTML container.
* @param {string} [className]
*     CSS classes to be set on the top-level HTML container.
* @param {boolean} [stateless]
*     To enable the component to be externally managed. True will relinquish control to the component's owner.
*     False or not specified will cause the component to manage state internally.
* @param {boolean} [controlled=false]
*     DEPRECATED. Use "stateless" instead.
* @param {boolean} [disabled=false]
*     Indicates whether component is disabled.
*
* @param {array} labels
*     Array of label strings to use as button titles.
*
* @param {RockerButton~onChange} [onChange]
*     DEPRECATED. Use "onValueChange" instead. Callback to be triggered when selection changes.
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
*      <RockerButton onChange={this._changeSubview}
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
        controlled: PropTypes.bool, //TODO: remove in new version
        stateless: PropTypes.bool
    };

    static defaultProps = {
        controlled: false //TODO: change to stateless in new version
    };

    componentWillMount() {
        if (!Utils.isProduction()) {
            console.warn(Utils.deprecateMessage("controlled", "stateless"));
        }
    }

    render() {
        var stateless = this.props.stateless !== undefined ? this.props.stateless : this.props.controlled;

        return (
            stateless
                ? <RockerButtonStateless ref="RockerButtonStateless" {...this.props} />
                : <RockerButtonStateful ref="RockerButtonStateful" {...this.props} />);
    }
};

class RockerButtonStateless extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        "data-id": PropTypes.string,
        className: PropTypes.string,
        labels: PropTypes.array.isRequired,
        onChange: PropTypes.func,
        onValueChange: PropTypes.func,
        selected: PropTypes.string,
        selectedIndex: PropTypes.number,
        disabled: PropTypes.bool
    };

    static defaultProps = {
        "data-id": "rocker-button",
        className: "",
        onValueChange: _.noop,
        selected: "",
        selectedIndex: 0,
        disabled: false
    };

    componentWillMount() {
        if (!Utils.isProduction()) {
            if (this.props.id) {
                console.warn(Utils.deprecateMessage("id", "data-id"));
            }
            if (this.props.onChange) {
                console.warn(Utils.deprecateMessage("onChange", "onValueChange"));
            }
            if (this.props.labels && (this.props.labels.length < 2 || this.props.labels.length > 4)) {
                console.warn("RockerButton expecting two to four labels, but was given ", this.props.labels.length);
            }
        }
    }

    _handleClick = (label, index) => {
        if (this.props.disabled) {
            return;
        }

        if (this.props.onValueChange) {
            this.props.onValueChange({ label: label, index: index });
        }

        // TODO: remove v1 support for onChange when switch to v2
        if (this.props.onChange) {
            this.props.onChange(label, index);
        }
    };

    render() {
        var id = this.props.id || this.props["data-id"],
            className = classnames("rocker-button sel-" + this.props.selectedIndex, this.props.className, {
                disabled: this.props.disabled
            });

        return (
            <div ref="container" data-id={id} className={className}>
                {
                    this.props.labels.map(function (text, index) {
                        return (
                            <RockerButtonLabel data-id={text} onClick={this._handleClick}
                                key={text} text={text} index={index} />);
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

    return <label data-id={props["data-id"]} onClick={_handleClick} key={props.key}>{props.text}</label>;
};

RockerButtonLabel.propTypes = {
    "data-id": PropTypes.string,
    key: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string,
    index: PropTypes.number
};

class RockerButtonStateful extends React.Component {
    state = {
        selectedIndex: this.props.selectedIndex || Math.max(0, this.props.labels.indexOf(this.props.selected))
    };

    //TODO: remove v1 support for onChange when switch to v2
    _handleOnChange = (label, index) => {
        this._handleOnValueChange({ label: label, index: index });
    };

    _handleOnValueChange = (selectedButton) => {
        // Don't trigger callback if index is the same
        if (selectedButton.index === this.state.selectedIndex) {
            return;
        }

        if (this.props.onValueChange) {
            this.props.onValueChange(selectedButton);
        }
        if (this.props.onChange) {
            this.props.onChange(selectedButton.label, selectedButton.index);
        }

        this.setState({
            selectedIndex: selectedButton.index
        });
    };

    componentWillMount() {
        if (!Utils.isProduction()) {
            console.warn("Deprecated: the stateful option for this component will be removed in next version");
        }
    }

    render() {
        var props = _.defaults({
            ref: "RockerButtonStateless",
            selectedIndex: this.state.selectedIndex,
            onChange: this.props.onChange ? this._handleOnChange : null,
            onValueChange: this.props.onValueChange ? this._handleOnValueChange : null
        }, this.props);

        return <RockerButtonStateless {...props} />;
    }
}
