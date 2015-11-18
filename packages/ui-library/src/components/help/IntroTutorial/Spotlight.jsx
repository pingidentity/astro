var React = require("react"),
    _ = require("underscore");

/** @class IntroTutorial#Spotlight
 * @desc A class that will clone the target and place it above the original so that it can pop out of a
 * lightbox.
 * @param {number} [padding=10] - A padding around the spotlight
 * @param {object} target - The target on which we want to cast a spotlight
 */
var Spotlight = React.createClass({
    propTypes: {
        padding: React.PropTypes.number,
        target: React.PropTypes.object
    },

    getDefaultProps: function () {
        return {
            padding: 10
        };
    },

    getInitialState: function () {
        return {
            left: 0,
            right: 0,
            clone: ""
        };
    },

    componentDidMount: function () {
        this.componentWillReceiveProps(this.props);
    },

    componentWillReceiveProps: function (newProps) {
        if (newProps.target) {
            var targetBounds = newProps.target.getBoundingClientRect();

            this.setState({
                left: targetBounds.left - this.props.padding,
                top: targetBounds.top - this.props.padding,
                width: targetBounds.width,
                clone: newProps.target.outerHTML
            });
        }
    },

    render: function () {
        var style = _.pick(this.state, ["left", "top", "width"]);

        /* jshint ignore:start */
        return (
            <div className="spotlight" style={style} dangerouslySetInnerHTML={{ __html: this.state.clone }} />);
        /* jshint ignore:end */
    }
});

module.exports = Spotlight;
