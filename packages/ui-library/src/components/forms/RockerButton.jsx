var React = require("react"),
    _ = require("underscore");
/**
 * @callback RockerButton~onChangeCallback
 * @param {string} label - selected label from labels array prop
 * @param {number} labelIndex - index of selected label from labels array prop
 */

/**
 * @class RockerButton
 *
 * @desc Rocker buttons implementation, supports 2 to 4 buttons (current CSS restriction).
 *
 * @param {array} labels - array of strings. labels to use as button titles
 * @param {number} [selectedIndex] - The index of the selectedIndex label
 * @param {string} [selected] - The text value of item to select initially.  Not this property is only valid if controlled
 *   is not true.  Controlled components must use selectedIndex
 * @param {RockerButton~onChangeCallback} [onChange] - function (selectedLabel) {...} delegate to call when selection changed.
 * @param {string} [id] - optional id to pass
 * @param {string} [className] - optional class to pass
 * @param {boolean} [controlled] - A boolean to enable the component to be externally managed.  True will relinquish
 *   control to the component's owner.  False or not specified will cause the component to manage state internally
 *   but still execute the onChange callback in case the owner is interested.
 *
 * @example
 *
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
    render: function () {
        return (
            this.props.controlled
                ? <ControlledRockerButton ref="rocker" {...this.props} />
                : <ManagedRockerButton ref="manager" {...this.props} />);
    }
});

var ControlledRockerButton = React.createClass({
    propTypes: {
        labels: React.PropTypes.array.isRequired,
        selectedIndex: React.PropTypes.number,
        onChange: React.PropTypes.func,
        id: React.PropTypes.string,
        className: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            onChange: _.noop,
            id: "rocker-button"
        };
    },

    //dont expose the event
    _handleChange: function (text, index) {
        this.props.onChange(text, index);
    },

    render: function () {

        if (this.props.labels && (this.props.labels.length < 2 || this.props.labels.length > 4)) {
            console.warn("RockerButton expecting two to four labels, but was given ", this.props.labels.length);
        }

        var className = "rocker-button sel-" + this.props.selectedIndex;
        if (this.props.className) {
            className = className + " " + this.props.className;
        }

        return (
            <div ref="container" data-id={this.props.id} className={className}>
                {
                    this.props.labels.map(function (text, index) {
                        return (
                            <label data-id={text}
                                onClick={this._handleChange.bind(this, text, index)}
                                key={text}>{text}</label>);
                    }.bind(this))
                }
                <span className="slide"></span>
            </div>);
    }
});

var ManagedRockerButton = React.createClass({
    getInitialState: function () {
        return {
            index: typeof(this.props.selectedIndex) === "number"
                ? this.props.selectedIndex
                : Math.max(0, this.props.labels.indexOf(this.props.selected))
        };
    },

    _handleChange: function (label, index) {
        this.props.onChange(label, index);
        this.setState({
            index: index
        });
    },

    render: function () {
        return (<ControlledRockerButton ref="rocker" {...this.props}
            selectedIndex={this.state.index}
            onChange={this._handleChange} />);
    }
});
