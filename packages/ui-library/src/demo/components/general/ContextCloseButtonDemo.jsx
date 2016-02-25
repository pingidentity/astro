var React = require("react");
var ContextCloseButton = require("./../../../components/general/ContextCloseButton.jsx");

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
        return (
            <ContextCloseButton onClick={this.props.clickCallback} value={this.props.value} />
        );
    }
});

var ContextCloseButtonDemo = React.createClass({

    getInitialState: function () {
        return {
            clickCallbackCalled: false,
            closeCallbackCalled: false
        };
    },

    _resetState: function () {
        this.setState({
            clickCallbackCalled: false,
            closeCallbackCalled: false
        });
    },

    _clickCallback: function () {
        this._resetState();
        this.setState({ clickCallbackCalled: true });
    },

    _clickCallbackFalse: function () {
        this._clickCallback();
        return false;
    },

    _closeCallback: function () {
        this.setState({ closeCallbackCalled: true });
    },

    render: function () {
        return (
            <div>
                <div className="input-row">
                    <ContextCloseButton
                        onClick={this._clickCallback}
                        value="ContextCloseButton with no context" />
                </div>
                <div className="input-row">
                    <ContextComponent
                        clickCallback={this._clickCallback}
                        closeCallback={this._closeCallback}
                        value="ContextCloseButton with context" />
                </div>
                <div className="input-row">
                    <ContextComponent
                        clickCallback={this._clickCallbackFalse}
                        closeCallback={this._closeCallback}
                        value="ContextCloseButton with close prevented by onClick" />
                </div>
                <div className="input-row">
                    <ContextCloseButton
                        disabled={true}
                        value="Disabled ContextCloseButton" />
                </div>
                {this.state.clickCallbackCalled
                    ? <div id="clickCallback">
                        <span>click callback called</span>
                    </div> : null}
                {this.state.closeCallbackCalled
                    ? <div id="closeCallback">
                        <span>close callback called</span>
                    </div> : null}
            </div>
        );
    }
});

module.exports = ContextCloseButtonDemo;
