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
* @param {boolean} [controlled=false]
*     To enable the component to be externally managed. True will relinquish control to the component's owner.
*     False or not specified will cause the component to manage state internally.
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
*     The text value of the item to select initially. Used only when controlled=false.
*     Controlled components must use 'selectedIndex'. Is mutually exclusive with "selectedIndex".
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

module.exports = React.createClass({

    propTypes: {
        controlled: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            controlled: false
        };
    },

    render: function () {
        return (
            this.props.controlled
                ? <RockerButtonStateless ref="RockerButtonStateless" {...this.props} />
                : <RockerButtonStateful ref="RockerButtonStateful" {...this.props} />);
    }
});

var RockerButtonStateless = React.createClass({

    propTypes: {
        id: React.PropTypes.string,
        "data-id": React.PropTypes.string,
        className: React.PropTypes.string,
        labels: React.PropTypes.array.isRequired,
        onChange: React.PropTypes.func,
        onValueChange: React.PropTypes.func,
        selected: React.PropTypes.string,
        selectedIndex: React.PropTypes.number
    },

    getDefaultProps: function () {
        return {
            "data-id": "rocker-button",
            className: "",
            onValueChange: _.noop,
            selected: "",
            selectedIndex: 0
        };
    },

    componentWillMount: function () {
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
    },

    _handleClick: function (label, index) {
        //TODO: remove v1 support for onChange when switch to v2
        if (this.props.onValueChange) {
            this.props.onValueChange({ label: label, index: index });
        }
        if (this.props.onChange) {
            this.props.onChange(label, index);
        }
    },

    render: function () {
        var id = this.props.id || this.props["data-id"],
            className = classnames("rocker-button sel-" + this.props.selectedIndex, this.props.className);

        return (
            <div ref="container" data-id={id} className={className}>
                {
                    this.props.labels.map(function (text, index) {
                        return (
                            <label data-id={text}
                                onClick={this._handleClick.bind(this, text, index)}
                                key={text}>{text}</label>);
                    }.bind(this))
                }
            </div>);
    }
});

var RockerButtonStateful = React.createClass({

    _handleValueChange: function (labelValues) {
        //TODO: remove v1 support for onChange when switch to v2
        if (this.props.onValueChange) {
            this.props.onValueChange({ label: labelValues.label, index: labelValues.index });
        }
        if (this.props.onChange) {
            this.props.onChange(labelValues.label, labelValues.index);
        }

        this.setState({
            selectedIndex: labelValues.index
        });
    },

    componentWillMount: function () {
        if (!Utils.isProduction()) {
            console.warn("Deprecated: the stateful option for this component will be removed in next version");
        }
    },

    getInitialState: function () {
        return {
            selectedIndex: this.props.selectedIndex || Math.max(0, this.props.labels.indexOf(this.props.selected))
        };
    },

    render: function () {
        return (<RockerButtonStateless ref="RockerButtonStateless" {...this.props}
            selectedIndex={this.state.selectedIndex}
            onValueChange={this._handleValueChange} />);
    }
});
