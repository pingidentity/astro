import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";
import HelpHint from "../tooltips/HelpHint";
import { pick } from "underscore";

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
 * @param {node} [explanation]
 *     Explanation text for the field appears below it.
 * @param {boolean} [noSpacing=false]
 *     Remove margin
 */

export const labelProps = {
    description: PropTypes.node,
    explanation: PropTypes.node,
    helpClassName: PropTypes.string,
    helpPlacement: PropTypes.oneOf(Object.values(HelpHint.placements)),
    helpTarget: PropTypes.object,
    hint: PropTypes.node,
    lockText: PropTypes.string,
    noSpacing: PropTypes.bool,
};

export const passLabelProps = props => pick(props, Object.keys(labelProps));

class FormLabel extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        "data-id": PropTypes.string,
        detached: PropTypes.bool,
        style: PropTypes.object,
        value: PropTypes.node,
        ...labelProps,
    };

    static defaultProps = {
        "data-id": "formLabel",
        detached: false,
        noSpacing: false,
        style: {},
    };

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
        const {
            children,
            className,
            "data-id": dataId,
            detached,
            explanation,
            noSpacing,
            style,
            value,
        } = this.props;

        var noLabel = typeof(value) === "undefined" || value === null;

        if (noLabel && !children) {
            return null;
        }

        return (
            <label
                data-id={dataId}
                className={classnames(
                    "form-label",
                    className,
                    {
                        detached,
                        "form-label--no-spacing": noSpacing,
                    })
                }
                style={style}
            >
                { !noLabel && (
                    <span className="label-text" data-id="label">
                        <span className="label-container">
                            {value}
                            {this._renderHint()}
                            {this._renderLockHint()}
                        </span>
                        { this._renderDescriptionText()}
                    </span>
                )}
                {children}
                {explanation && <div className="form-label__explanation">{explanation}</div>}
            </label>
        );
    }
}

export default FormLabel;
