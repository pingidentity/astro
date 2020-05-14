import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "underscore";
import Anchor from "./Anchor";

/**
 * @class MaskedValue
 * @desc Displays a value with a toggle to show/hide it
 *
 * @param {string} [className]
 *     CSS classes to be set on the inner MaskedValue container.
 * @param {string} [data-id = "masked-value"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {function} [onToggleReveal]
 *     Handler for when the show/hide toggle is clicked
 * @param {boolean} [maskValue = true]
 *     Whether to hide the value or not
 *
 * @example
 * <MaskedValue onToggleReveal={this._handleToggleReveal} maskValue={this.state.hide}>Some Value</MaskedValue>
 *
 */

class MaskedValue extends React.Component {
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
        className: PropTypes.string,
        "data-id": PropTypes.string,
        maskValue: PropTypes.bool,
        onToggleReveal: PropTypes.func
    };

    static defaultProps = {
        children: "",
        "data-id": "masked-value"
    };

    state = _.defaults(this.props.initialState || {}, { maskValue: true });

    _handleToggleReveal = () => {
        if (this.props.onToggleReveal) {
            this.props.onToggleReveal();
        } else {
            this.setState({ maskValue: !this.state.maskValue });
        }
    };

    _isMasked = () => (this.props.maskValue !== undefined ? this.props.maskValue : this.state.maskValue);

    render = () => {
        const maskValue = this._isMasked();

        const classNames = classnames("masked-value", this.props.className, {
            "masked-value--masked": maskValue
        });

        const children =
            maskValue && typeof this.props.children === "string"
                ? this.props.children.replace(/./g, "•")
                : this.props.children;

        const iconClassNames = classnames("masked-value__icon", {
            "icon-view-hidden": maskValue,
            "icon-view": !maskValue
        });

        return (
            <span className={classNames} data-id={this.props["data-id"]}>
                <div className="masked-value__container">
                    <div className="masked-value__value">{children}</div>
                    <Anchor data-id="reveal" className={iconClassNames} onClick={this._handleToggleReveal} />
                </div>
            </span>
        );
    };
}

export default MaskedValue;
