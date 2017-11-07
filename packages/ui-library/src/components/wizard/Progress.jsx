var PropTypes = require("prop-types");
var React = require("react"),
    Utils = require("../../util/Utils"),
    format = require("../../util/format.js");

/** @class Wizard#Progress
 * @desc Wizard progress indicator (a-la icon)
 * @see Wizard
 *
 * @param {string} [data-id="progress"]
 *              To define the base "data-id" value for the top-level HTML container.
 * @param {string} [id]
 *              Deprecated. Use data-id instead.
 * @param {string} [className]
 *              CSS classes to set on the top-level HTML container
 * @param {number} step
 *              Step number (1-6)
 * @param {number} of
 *              Total number of steps (1-6)
 * @param {boolean} done
 *              Completed step indicator */
class Progress extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        id: PropTypes.string,
        className: PropTypes.string,
        step: PropTypes.number.isRequired,
        of: PropTypes.number.isRequired,
        done: PropTypes.bool
    };

    static defaultProps = {
        "data-id": "progress"
    };

    _style = () => {
        return format("progress step{step} of{of}", this.props) +
            (this.props.done ? " done" : "") +
            (this.props.className ? " " + this.props.className : "");
    };

    componentWillReceiveProps(nextProps) {
        if (!Utils.isProduction()) {
            if (nextProps.step < 1 || nextProps.step > 7) {
                console.warn("Progress expecting 'step' param between 1 and 6, but was given ", nextProps.step);
            }
            if ((nextProps.of < 1) || (nextProps.step > 7)) {
                console.warn("Progress expecting 'of' param between 1 and 6, but was given ", nextProps.of);
            }
        }
    }

    componentWillMount() {
        if (this.props.id) {
            console.warn(Utils.deprecateMessage("id", "data-id"));
        }
    }

    render() {
        var id = this.props.id || this.props["data-id"];

        return (
            <div ref="container" className={this._style()} data-id={id}><i>{this.props.step}</i></div>
        );
    }
}

module.exports = Progress;
