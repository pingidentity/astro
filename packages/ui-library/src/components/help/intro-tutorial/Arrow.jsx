var React = require("react"),
    format = require("../../../util/format.js");

/** @class InfiniteScroll#Arrow
 * @desc Draws an svg path between two points
 * @param {object} to - A DOM element to be used as the target
 * @param {object} [from] - A DOM element to use as the starting point.  It not included, the
 *   center of the screen will be used.
 * @param {number} [arrowGapToTarget] - This number determines how close the arrow should point to the target.
 *   Default stops 20 pixels shy of touching the target
 * @param {number} [arrowOffsetFromEnd] - When the component decides to point to the end of the target, as opposed
 *   to the middle, this number will determine who many pixels from the end to inset.
 * @param {number} [arrowMinimumCurviture] - This number determines the minimum desired curviture of the pointing
 *   arrow.  This is determined by the distance from the middle of the screen to the middle of the target.
 */
var Arrow = React.createClass({
    propTypes: {
        arrowGapToTarget: React.PropTypes.number,
        arrowOffsetFromEnd: React.PropTypes.number,
        arrowMinimumCurviture: React.PropTypes.number,
        to: React.PropTypes.object.isRequired,
        from: React.PropTypes.object,
    },

    getDefaultProps: function () {
        return {
            arrowGapToTarget: 20,
            arrowOffsetFromEnd: 30,
            arrowMinimumCurviture: 150,
            arcAway: 400
        };
    },

    getInitialState: function () {
        return {
            command: ""
        };
    },

    componentDidMount: function () {
        React.findDOMNode(this.refs.focusPointer).setAttribute("marker-end", "url(#Triangle)");
        this.componentWillReceiveProps(this.props);
    },

    componentWillReceiveProps: function (newProps) {
        if (newProps.to) {
            var targetBounds = newProps.to.getBoundingClientRect();
            var fromBounds = (this.props.from || React.findDOMNode(this)).getBoundingClientRect();

            var coords = {
                endx: parseInt(targetBounds.left + targetBounds.width / 2, 10),
                endy: parseInt(targetBounds.top + targetBounds.height + this.props.arrowGapToTarget, 10),
                startx: parseInt(fromBounds.width / 2, 10),
                starty: parseInt(fromBounds.height / 2, 10)
            };

            //if the target's center is close to the center of the screen, the arrow ends up just pointing straight up (which doesnt
            //look pretty.  In this case, point to either the start or the end of the target to try and give the arrow some curivture.
            if (Math.abs(coords.startx - coords.endx) < this.props.arrowMinimumCurviture) {
                if (targetBounds.left < coords.startx - this.props.arrowMinimumCurviture) {
                    coords.endx = parseInt(targetBounds.left + this.props.arrowOffsetFromEnd, 10);
                } else {
                    coords.endx = parseInt(targetBounds.right - this.props.arrowOffsetFromEnd, 10);
                }
            }

            //if the start and end y coordinates are close, the arrow will just be horizontal so in that case make the control arms
            //point away so the arrow loops away and comes back
            if (Math.abs(coords.starty - coords.endy) < this.props.arrowMinimumCurviture ||
                coords.starty >= targetBounds.top && coords.starty <= targetBounds.bottom)
            {
                coords.ctrlx = coords.startx;
                coords.ctrly = coords.starty + this.props.arcAway;

                this.setState({
                    command: format("M{startx},{starty} C{ctrlx},{ctrly} {endx},{ctrly} {endx},{endy}", coords)
                });
            } else {
                coords.ctrlx = coords.endx;
                coords.ctrly = coords.starty;
                this.setState({
                    command: format("M{startx},{starty} S{ctrlx},{ctrly} {endx},{endy}", coords)
                });
            }
        }
    },

     /* React isnt passing svg attributes correctly so have to resort to setting the innerHTML instead */
    render: function () {
        /* jshint ignore:start */
        return (
            <svg>
                <defs dangerouslySetInnerHTML={{ __html:
                    "<marker id=\"Triangle\" viewBox=\"0 0 10 10\" refX=\"7\" " +
                        "refY=\"5\" markerWidth=\"15\" markerHeight=\"15\" orient=\"auto\">" +
                        "<path class=\"marker\" d=\"M 0 0 L 7 5 L 0 10\" fill=\"none\" />" +
                    "</marker>" }} />
                <path className="line" d={this.state.command} ref="focusPointer" />
            </svg>);
        /* jshint ignore:end */
    }
});

module.exports = Arrow;
