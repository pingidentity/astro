import PropTypes from "prop-types";
import React from "react";
import ContextCloseButton from "./../../../components/general/context-close-button";
import InputRow from "../../../components/layout/InputRow";

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
                <InputRow>
                    <ContextCloseButton
                        onClick={this._handleClick}
                        value="ContextCloseButton with no context" />
                </InputRow>
                <InputRow>
                    <ContextComponent
                        closeCallback={this._handleContextClose}
                        value="ContextCloseButton with context only" />
                </InputRow>
                <InputRow>
                    <ContextComponent
                        clickCallback={this._handleClick}
                        closeCallback={this._handleContextClose}
                        value="ContextCloseButton with callback and context" />
                </InputRow>
                <InputRow>
                    <ContextCloseButton
                        disabled={true}
                        value="Disabled ContextCloseButton" />
                </InputRow>
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
