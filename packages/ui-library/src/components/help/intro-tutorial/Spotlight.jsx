var React = require("react"),
    _ = require("underscore");

/**
 * @class IntroTutorial#Spotlight
 * @private
 * @desc A class that will clone the target and place it above the original so that it can pop out of a
 * lightbox.
 * @param {number} [padding=10] - A padding around the spotlight
 * @param {object} target - The target on which we want to cast a spotlight
 */
var Spotlight = React.createClass({
    propTypes: {
        padding: React.PropTypes.number,
        target: React.PropTypes.object.isRequired
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
            var marginLeft = 0, marginRight = 0;

            try {
                var style = getComputedStyle(newProps.target);
                marginLeft = parseInt(style.marginLeft);
                marginRight = parseInt(style.marginRight);
            } catch (e) {}

            this.setState({
                left: targetBounds.left - this.props.padding - marginLeft,
                top: targetBounds.top - this.props.padding,
                width: targetBounds.width + marginLeft + marginRight,
                clone: newProps.target.outerHTML
            });
        }
    },

    render: function () {
        var style = _.pick(this.state, ["left", "top", "width"]);
        style.padding = this.props.padding;

        return (<div className="spotlight" style={style} dangerouslySetInnerHTML={{ __html: this.state.clone }} />);
    }
});

module.exports = Spotlight;
