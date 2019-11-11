import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import classnames from 'classnames';
import KeyboardUtils, { withFocusOutline } from '../../util/KeyboardUtils';

const linkTypes = {
    ADD: 'add',
    REMOVE: 'remove',
    PAGE_RETURN: 'pageReturn',
    BLOCK: 'block',
};

/**
 * @class Anchor
 * @desc An accessible link that can supports keyboard interaction even when no href is set.
 *
 * @property {string} [data-id]
 *     To define the base 'data-id' value for the top-level HTML container.
 *
 * @param {function} [onClick]
 *     Callback to be triggered when trigger is clicked.
 */

class AnchorBase extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        'data-id': PropTypes.string,
        onClick: PropTypes.func,
        type: PropTypes.oneOf(Object.values(linkTypes)),
    };

    static defaultProps = {
        'data-id': 'anchor',
        onClick: _.noop,
        type: 'block'
    };

    _handleKeyPress = e => {
        if (e.charCode === KeyboardUtils.KeyCodes.ENTER || e.charCode === KeyboardUtils.KeyCodes.SPACE) {
            this.props.onClick(e);
        }
    }

    _typeIcon = type => {
        switch (type) {
            case linkTypes.ADD: return <span className="pingicon-plus anchor__icon" />;
            case linkTypes.REMOVE: return <span className="pingicon-clear anchor__icon" />;
            case linkTypes.PAGE_RETURN:
            case linkTypes.BLOCK:
            default: return null;
        }
    }

    render = () => {
        const { children, className, type, disabled, ...props } = this.props;

        return (
            <a
                tabIndex="0"
                {...props}
                className={classnames('anchor', className,
                    { disabled, 'page-return-link': type === linkTypes.PAGE_RETURN })}
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

export default Anchor;
