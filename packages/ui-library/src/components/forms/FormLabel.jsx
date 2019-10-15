var PropTypes = require("prop-types");
var React = require("react"),
    classnames = require("classnames"),
    HelpHint = require("../tooltips/HelpHint"),
    Utils = require("../../util/Utils");

/** @class FormLabel
 * @desc Most form fields implement the same logic to display an optional label, with optional hint.
 * It is easier to consolidate this logic in one component to avoid re-inventing the wheel.
 * This component displays the value provided as prop, if provided. Next to it, it displays its children.
 * If there is no value and no children, nothing is rendered.
 *
 * @param {string} [data-id="formLabel"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 * @param {boolean} [detached=false]
 *     When true, detached styling is applied. For use when label is used when not bundled with an input
 * @param {string} [value]
 *     The label text.  If omitted and if this element has no children, nothing is rendered.
 * @param {node} [hint]
 *     The hint text either a string or a JSX object. If omitted, the help hint is not rendered.
 * @param {string} [lockText]
 *     The lock text. If omitted, the lock hint is not rendered.
 * @param {HelpHint.Placements} [helpPlacement]
 *     How to place the help hint.
 * @param {object} [helpTarget]
 *     An optional icon or image to replace standard help hint icon
 * @param {object} [style]
 *     For passing through direct style attribute from parent
 * @param {node} [description]
 *     The text to display below the title. Can be a string or a node.
 */

class FormLabel extends React.Component {

    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        value: PropTypes.node,
        hint: PropTypes.node,
        lockText: PropTypes.string,
        helpClassName: PropTypes.string,
        helpPlacement: PropTypes.oneOf(Object.values(HelpHint.placements)),
        helpTarget: PropTypes.object,
        style: PropTypes.object,
        detached: PropTypes.bool,
        description: PropTypes.node
    };

    static defaultProps = {
        "data-id": "formLabel",
        detached: false,
        style: {},
    };

    constructor(props) {
        super(props);
        if (!Utils.isProduction() && props.id) {
            throw new Error(Utils.deprecatePropError("id", "data-id"));
        }
    }


    _renderHint = () => {
        if (!this.props.hint) {
            return null;
        }

        return (
            <HelpHint
                ref="hint"
                data-id="help-tooltip"
                className={classnames("inline", this.props.helpClassName)}
                placement={this.props.helpPlacement}
                hintText={this.props.hint}>
                {this.props.helpTarget}
            </HelpHint>
        );
    };

    _renderLockHint = () => {
        if (!this.props.lockText) {
            return null;
        }

        return (
            <HelpHint
                ref="lock"
                data-id="lock-tooltip"
                className={classnames("inline", this.props.helpClassName)}
                hintText={this.props.lockText}
                placement={this.props.helpPlacement}
                lock={true}
            />
        );
    };

    _renderDescriptionText = () => {
        if (this.props.description) {
            return (
                <div className="label-text__description">
                    {this.props.description}
                </div>
            );
        }
    }

    render() {
        var noLabel = typeof(this.props.value) === "undefined" || this.props.value === null;

        if (noLabel && !this.props.children) {
            return null;
        }

        return (
            <label
                data-id={this.props["data-id"]}
                className={classnames(this.props.className, this.props.detached && "detached")}
                style={this.props.style}
            >
                { !noLabel && (
                    <span className="label-text" data-id="label">
                        { this.props.value }
                        { this._renderHint() }
                        { this._renderLockHint() }
                        { this._renderDescriptionText()}
                    </span>
                )}
                {this.props.children}
            </label>
        );
    }
}

module.exports = FormLabel;
