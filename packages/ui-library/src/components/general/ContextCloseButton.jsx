var React = require("react/addons"),
    css = require("classnames");

/*
 * @class src/components/general/ContextCloseButton
 * @desc Button that will invoke a 'close()' method from the context on click
 * should such a method exist, after invoking a supplied on click callback.
 * Should the supplied callback return false then the close() method will
 * not be called.
 *
 * @param {string} [id] id attribute of rendered input button
 * @param {string} [value] Button value, i.e. the text shown on the button
 * @param {string} [className] CSS classes added to the input button
 * @param {function} [onClick] Function to call when the button is clicked.  If this function returns false (but not undefined) then the close method in the context will not be called.
 * @param {boolean} [disabled] if true, the button is disabled; otherwise, it is enabled
 * @param {boolean} [show] if true, the button is displayed; otherwise, it is hidden (default true)
 */
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

    render: function () {
        var styles = { disabled: this.props.disabled };
        styles[this.props.className] = !!this.props.className;

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
