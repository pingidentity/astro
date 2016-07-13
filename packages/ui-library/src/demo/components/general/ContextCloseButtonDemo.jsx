var React = require("react");
var ContextCloseButton = require("./../../../components/general/context-close-button");

var ContextComponent = React.createClass({
    propTypes: {
        clickCallback: React.PropTypes.func,
        closeCallback: React.PropTypes.func,
        value: React.PropTypes.string
    },

    childContextTypes: {
        close: React.PropTypes.func
    },

    getChildContext: function () {
        return {
            close: this._close
        };
    },

    _close: function () {
        if (this.props.closeCallback) {
            this.props.closeCallback();
        }
    },

    render: function () {
        return (<ContextCloseButton onClick={this.props.clickCallback} value={this.props.value}/>);
    }
});

var ContextCloseButtonDemo = React.createClass({

    getInitialState: function () {
        return {
            clickCallbackCalled: false,
            contextCloseCalled: false
        };
    },

    _resetState: function () {
        this.setState({
            clickCallbackCalled: false,
            contextCloseCalled: false
        });
    },

    _handleClick: function () {
        this.setState({ clickCallbackCalled: true });
    },

    _handleContextClose: function () {
        this.setState({ contextCloseCalled: true });
    },

    render: function () {
        return (
            <div>
                <div className="input-row">
                    <ContextCloseButton
                        onClick={this._handleClick}
                        value="ContextCloseButton with no context" />
                </div>
                <div className="input-row">
                    <ContextComponent
                        closeCallback={this._handleContextClose}
                        value="ContextCloseButton with context only" />
                </div>
                <div className="input-row">
                    <ContextComponent
                        clickCallback={this._handleClick}
                        closeCallback={this._handleContextClose}
                        value="ContextCloseButton with callback and context" />
                </div>
                <div className="input-row">
                    <ContextCloseButton
                        disabled={true}
                        value="Disabled ContextCloseButton" />
                </div>
                {this.state.clickCallbackCalled
                    ? <div id="clickCallback">
                    <span>onClick callback called</span>
                </div> : null}
                {this.state.contextCloseCalled
                    ? <div id="contextClose">
                    <span>context close called</span>
                </div> : null}

            </div>
        );
    }
});

module.exports = ContextCloseButtonDemo;
