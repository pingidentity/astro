var React = require("react/addons");

/**
 * @module RockerButton
 *
 * @desc Rocker buttons implementation, supports 2 to 4 buttons (current CSS restriction)
 *
 * @param {string} labels - array of string labels to use as button titles
 * @param {function} onChange - function (selectedLabel) {...} delegate to call when selection changed.
 * @param {string} id - optional id to pass
 * @param {string} className - optional class to pass
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
var RockerButton = React.createClass({

    propTypes: {
        labels: React.PropTypes.array.isRequired,
        selected: React.PropTypes.string,
        onChange: React.PropTypes.func,
        id: React.PropTypes.string,
        className: React.PropTypes.string
    },

    /**
     * On rocker change
     *
     * @private
     * @param {string} label text label of the selected item
     * @param {number} index index of the selected item
     */
    _onSelectionChange: function (label, index) {
        this.setState({ selection: label, index: index });
        this.props.onChange(label, index);
    },

    componentWillReceiveProps: function (nextProps) {
        if (nextProps.labels && (nextProps.labels.length < 2 || nextProps.labels.length > 4)) {
            console.warn("RockerButton expecting two to four labels, but was given ", nextProps.labels.length);
        }
    },

    getDefaultProps: function () {
        return {
            id: "rocker-button"
        };
    },

    getInitialState: function () {
        return {
            selection: this.props.selected || this.props.labels[0],
            index: this.props.selected ? this.props.labels.indexOf(this.props.selected) : 0
        };
    },

    render: function () {
        var className = "rocker-button sel-" + this.state.index;
        if (this.props.className) {
            className = className + " " + this.props.className;
        }

        return (
            <div data-id={this.props.id}
                className={className}>
                {
                    this.props.labels.map(function (text, index) {
                        return (
                            <label data-id={text}
                                onClick={this._onSelectionChange.bind(this, text, index)}
                                key={text}>{text}</label>);
                    }.bind(this))
                }
                <span className="slide"></span>
            </div>);
    }
});

module.exports = RockerButton;
