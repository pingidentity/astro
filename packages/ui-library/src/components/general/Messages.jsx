'use strict';

var React = require('react');

/**
 * @module components/general/Messages
 *
 * @desc
 *
 * Messages component.
 *
 * Renders a list of supplied message strings and allows for messages
 * to be removed by invoking a callback.
 *
 * @param {object[]} messages List of messages to render.
 * @param {string} [data-id] If specified then the
 *  data-id of the rendered parent div will be set to this id.
 * @param {function} [removeMessage] Function to call to remove a
 *  message from the messages list.
 * @param {function} [i18n] Function to handle internationalization of
 *  message keys to message text.
 *
 * @example
 * Usage:
 *   <Messages messages={messages} data-id="page-messages" removeMessage={this._removeMessage} />
 *
 */

var Messages = React.createClass({

    propTypes: {
        messages: React.PropTypes.array,
        'data-id': React.PropTypes.string,
        removeMessage: React.PropTypes.func
    },
    
    getDefaultProps: function () {
        return {
            removeMessage: null,
            messages: []
        };
    },

    render: function () {

        var renderedMessages = [];
        var messages = this.props.messages;
        var length = messages.length;

        for (var i = 0; i < length; i += 1) {
            renderedMessages.push(
                /* jshint ignore:start */
                <Message
                    message={messages[i]}
                    key={i}
                    index={i}
                    removeMessage={this.props.removeMessage}
                    i18n={this.props.i18n} />
                /* jshint ignore:end */
            );
        }

        return (
            /* jshint ignore:start */
            <div id={this.props['data-id']}>
                {renderedMessages}
            </div>
            /* jshint ignore:end */
        );
    }
});

/*
 * Message sub-component to render an individual
 * message and handle its closing (and removal
 * from the store).
 *
 */
var Message = React.createClass({

    /*
     * Close the message by calling the removeMessage
     * callback if it exists.
     *
     */
    _close: function () {
        if (this.props.removeMessage) {
            this.props.removeMessage(this.props.index);
        }
    },

    componentDidMount: function () {
        // Close after configured time interval, with 10000ms as the default.
        // Interval of 0 will result in no automatic message clearing (which is intended).
        var interval = (this.props.message.duration) ? this.props.message.duration : 10000;
        
        if (interval) {
            this.interval = global.setInterval(this._close, interval);
        }
    },

    componentWillUnmount: function () {
        if (this.interval) {
            // clear the timer before unmounting the component
            global.clearInterval(this.interval);
        }
    },

    render: function () {
        var text = this.props.message.text || this.props.i18n(this.props.message.key, this.props.message.params);
        var classes = this.props.message.type +
                ' ' +
                this.props.message.type +
                '-' +
                this.props.index +
                ' message show';

        // Allow html messages to be rendered, this is dangerous
        // as it could allow XSS, so messages have to be explicitly
        // flagged as being html.
        if (this.props.message.isHtml) {
            /* jshint ignore:start */
            text = <span dangerouslySetInnerHTML={{ __html: text }} /> ;
            /* jshint ignore:end */
        }
        
        return (
            /* jshint ignore:start */
            <div className={classes}>
                <div className="text">
                    {text}<a className="close" onClick={this._close}></a>
                </div>
            </div>
            /* jshint ignore:end */
        );
    }

});

module.exports = Messages;
