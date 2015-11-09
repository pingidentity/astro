var React = require("react/addons"),
    cx = require("classnames"),
    _ = require("underscore");

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
     * @returns {undefined}
     * @private
     * @param {label} label of text selected
     */
    _onSelectionChange: function (label) {
        this.setState({ selection: label });
        this.props.onChange(label);
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
            selection: (this.props.labels.length > 0) ? (this.props.selected || this.props.labels[0]) : ""
        };
    },

    render: function () {
        
        var self = this,
            buttonNodes =
                _.map(this.props.labels, function (key) {
                    var onChange = _.partial(self._onSelectionChange, key);

                    return (
                        <label data-id={key} onClick={onChange} key={key}>{key}</label>
                    );
                }),
            selectionIndex = _.indexOf(this.props.labels, this.state.selection);

        var containerCss = cx({
            "rocker-button": true,
            "sel-0": selectionIndex === 0,
            "sel-1": selectionIndex === 1,
            "sel-2": selectionIndex === 2,
            "sel-3": selectionIndex === 3
        });
        if (this.props.className) {
            containerCss = containerCss + " " + this.props.className;
        }

        return (
            <div data-id={this.props.id}
                 className={containerCss}>
                    {buttonNodes}
                    <span className="slide"></span>
            </div>
        );
    }
});

module.exports = RockerButton;
