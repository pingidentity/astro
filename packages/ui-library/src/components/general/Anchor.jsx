import React from "react";
import PropTypes from "prop-types";
import _ from "underscore";
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
 **/

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
        if (e.charCode === KeyboardUtils.KeyCodes.ENTER) {
            this.props.onClick(e);
        }
    }

    render = () => (
        <a
            tabIndex="0"
            {...this.props}
            onMouseDown={this._dontFocus}
            onKeyPress={this._handleKeyPress}
        />
    );
}

module.exports = Anchor;
