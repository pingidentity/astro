var React = require("react"),
    css = require("classnames");


/**
 * @callback ContextCloseButton~onClick
 * @return {boolean} Should return true if `close()` should be called or false if not.
 */

/**
 * @callback ContextCloseButton~close
 */

/**
 * @class ContextCloseButton
 * @desc Button that will invoke a 'close()' method from its props or context on click
 * should such a method exist, after invoking a supplied on click callback.
 * Should the supplied callback return false then the close() method will
 * not be called.
 *
 * @param {string} [id]
 *     To define the base "id" and "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 *
 * @param {string} [value]
 *     Button value, i.e. the text shown on the button
 * @param {boolean} [disabled=false]
 *     If true, the button is disabled; otherwise, it is enabled
 * @param {boolean} [show=true]
 *     If true, the button is displayed; otherwise, it is hidden
 *
 * @param {ContextCloseButton~onClick} [onClick]
 *     Callback to be triggered when the button is clicked. If this function returns false (but not undefined)
 *     then the close method in the context will not be called.
 * @param {ContextCloseButton~close} [close]
 *     Callback to be triggered when close is triggered and
 *     ContextCloseButton~onClick does not return false.
 *
 * @example
 *     <ContextCloseButton
 *          value="ContextCloseButton" onClick={this._onClick} />
 *
 **/
var ContextCloseButton = React.createClass({

    propTypes: {
        id: React.PropTypes.string,
        value: React.PropTypes.string,
        className: React.PropTypes.string,
        onClick: React.PropTypes.func,
        close: React.PropTypes.func,
        disabled: React.PropTypes.bool,
        show: React.PropTypes.bool
    },

    contextTypes: {
        close: React.PropTypes.func
    },

    /**
     * Call the appropriate close() function (from the close prop first, then the context).
     *
     * @private
     */
    _close: function () {
        var doClose = true;

        if (typeof(this.props.onClick) === "function") {
            doClose = this.props.onClick();
        }

        var close;
        if (this.props.close && typeof(this.props.close === "function")) {
            close = this.props.close;
        } else if (this.context && (typeof(this.context.close) === "function")) {
            close = this.context.close;
        }

        if (close && ((typeof(doClose) === "undefined") || doClose)) {
            close();
        }
    },

    getDefaultProps: function () {
        return {
            show: true
        };
    },

    componentWillMount: function () {
        console.warn("** This version of the ContextCloseButton is deprecated and will be removed in the next release");
    },

    render: function () {
        var styles = { disabled: this.props.disabled };
        styles[this.props.className] = true;

        return (
            this.props.show ? (
                <input id={this.props.id}
                    type="button"
                    value={this.props.value}
                    className={css(styles)}
                    data-id={this.props.id}
                    onClick={this._close}
                    disabled={this.props.disabled} />
            ) : null
        );
    }
});

module.exports = ContextCloseButton;