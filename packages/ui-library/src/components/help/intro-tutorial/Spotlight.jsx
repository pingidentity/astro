var PropTypes = require("prop-types");
var React = require("react"),
    _ = require("underscore");

/**
 * @class IntroTutorial#Spotlight
 * @desc A class that will clone the target and place it above the original so that it can pop out of a lightbox.
 *
 * @param {string} [data-id="spotlight"]
 *     To define the base "data-id" value for top-level HTML container.
 *
 * @param {number} [padding=10]
 *     A padding around the spotlight
 * @param {object} target
 *     The DOM element on which we want to cast a spotlight
 */

class Spotlight extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        padding: PropTypes.number,
        target: PropTypes.object.isRequired
    };

    static defaultProps = {
        "data-id": "spotlight",
        padding: 10
    };

    state = {
        left: 0,
        right: 0,
        clone: ""
    };

    componentDidMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(newProps) {
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
    }

    render() {
        var style = _.pick(this.state, ["left", "top", "width"]);
        style.padding = this.props.padding;

        return (
            <div data-id={this.props["data-id"]} className="spotlight" style={style}
                    dangerouslySetInnerHTML={{ __html: this.state.clone }} />
        );
    }
}

module.exports = Spotlight;
