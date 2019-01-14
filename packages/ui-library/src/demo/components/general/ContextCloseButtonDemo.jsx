var PropTypes = require("prop-types");
var React = require("react");
var ContextCloseButton = require("./../../../components/general/context-close-button");

/**
* @name ContextCloseButtonDemo
* @memberof ContextCloseButton
* @desc A demo for ContextCloseButton
*/
class ContextComponent extends React.Component {
    static propTypes = {
        clickCallback: PropTypes.func,
        closeCallback: PropTypes.func,
        value: PropTypes.string
    };

    static childContextTypes = {
        close: PropTypes.func
    };

    getChildContext() {
        return {
            close: this._close
        };
    }

    _close = () => {
        if (this.props.closeCallback) {
            this.props.closeCallback();
        }
    };

    render() {
        return (<ContextCloseButton onClick={this.props.clickCallback} value={this.props.value}/>);
    }
}

class ContextCloseButtonDemo extends React.Component {
    state = {
        clickCallbackCalled: false,
        contextCloseCalled: false
    };

    _resetState = () => {
        this.setState({
            clickCallbackCalled: false,
            contextCloseCalled: false
        });
    };

    _handleClick = () => {
        this.setState({ clickCallbackCalled: true });
    };

    _handleContextClose = () => {
        this.setState({ contextCloseCalled: true });
    };

    render() {
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
}

module.exports = ContextCloseButtonDemo;
