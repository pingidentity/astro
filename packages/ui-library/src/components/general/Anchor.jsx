import React from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import classnames from "classnames";
import KeyboardUtils, { withFocusOutline } from "../../util/KeyboardUtils";

/**
 * @enum {string}
 * @alias Anchor.linkTypes
 */
const linkTypes = {
    /** regular */
    REGULAR: "regular",
    /** add */
    ADD: "add",
    /** remove */
    REMOVE: "remove",
    /** pageReturn */
    PAGE_RETURN: "pageReturn",
    /** block */
    BLOCK: "block",
};

/**
 * @enum {string}
 * @alias Anchor.linkSizes
 */
const linkSizes = {
    /** auto */
    AUTO: "auto",
    /** sm */
    SM: "sm",
    /** md */
    MD: "md",
};

/**
 * @class Anchor
 * @desc An accessible link that can supports keyboard interaction even when no href is set.
 *
 * @param {string} [className]
 *     CSS classes to be set on the root element.
 * @property {string} [data-id]
 *     To define the base "data-id" value for the top-level HTML container.
 * @property {boolean} [disabled=false]
 *     Disables the link.
 * @param {function} [onClick]
 *     Callback to be triggered when trigger is clicked.
 * @param {Anchor.linkSizes} [size=AUTO]
 *     Size of link. When AUTO, the size is determined by context.
 * @param {Anchor.linkTypes} [type=REGULAR]
 *     Type of link
 * @param {boolean} [disabled=false]
 *     Indicates whether component is disabled.
 * @param {function} [onClick]
 *     Callback to be triggered when trigger is clicked.
 */

class AnchorBase extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        "data-id": PropTypes.string,
        disabled: PropTypes.bool,
        onClick: PropTypes.func,
        size: PropTypes.oneOf(Object.values(linkSizes)),
        type: PropTypes.oneOf(Object.values(linkTypes)),
    };

    static defaultProps = {
        "data-id": "anchor",
        disabled: false,
        onClick: _.noop,
        type: "block"
    };

    _handleKeyPress = e => {
        if (e.charCode === KeyboardUtils.KeyCodes.ENTER || e.charCode === KeyboardUtils.KeyCodes.SPACE) {
            this.props.onClick(e);
        }
    }

    _typeIcon = type => {
        switch (type) {
            case linkTypes.ADD: return <span className="icon-plus anchor__icon" />;
            case linkTypes.REMOVE: return <span className="icon-clear anchor__icon" />;
            case linkTypes.PAGE_RETURN:
            case linkTypes.BLOCK:
            default: return null;
        }
    }

    render = () => {
        const { children, className, size, type, disabled, iconAfter, ...props } = this.props;

        return (
            <a
                tabIndex="0"
                {...props}
                className={classnames("anchor", className,
                    {
                        "page-return-link": type === linkTypes.PAGE_RETURN,
                        [`anchor--${size}`]: size !== linkSizes.AUTO,
                        "anchor--disabled": disabled,
                    })}
                onKeyPress={this._handleKeyPress}
            >
                {this._typeIcon(type)}
                {children}
            </a>
        );
    };
}

const Anchor = withFocusOutline(AnchorBase);

Anchor.linkTypes = linkTypes;
Anchor.linkSizes = linkSizes;

export default Anchor;
