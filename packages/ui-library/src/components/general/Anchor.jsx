import React from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import classnames from "classnames";
import KeyboardUtils from "../../util/KeyboardUtils";

/**
 * @class Anchor
 * @desc An accessible link that can supports keyboard interaction even when no href is set.
 *
 * @property {string} [data-id]
 *     To define the base "data-id" value for the top-level HTML container.
 *
 * @param {function} [onClick]
 *     Callback to be triggered when trigger is clicked.
 */

class Anchor extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        "data-id": PropTypes.string,
        onClick: PropTypes.func
    };

    static defaultProps = {
        "data-id": "anchor",
        onClick: _.noop
    };

    _dontFocus = e => e.preventDefault();

    _handleKeyPress = e => {
        if (e.charCode === KeyboardUtils.KeyCodes.ENTER || e.charCode === KeyboardUtils.KeyCodes.SPACE) {
            this.props.onClick(e);
        }
    }

    _typeIcon = type => {
        switch (type) {
            case "add": return <span className="icon-plus anchor__icon" />;
            case "remove": return <span className="icon-clear anchor__icon" />;
        }
        return null;
    }

    render = () => {
        const { children, className, type, disabled, ...props } = this.props;

        return (
            <a
                tabIndex="0"
                {...props}
                className={classnames("anchor", className, { disabled })}
                onMouseDown={this._dontFocus}
                onKeyPress={this._handleKeyPress}
            >
                {this._typeIcon(type)}
                {children}
            </a>
        );
    };
}

module.exports = Anchor;
