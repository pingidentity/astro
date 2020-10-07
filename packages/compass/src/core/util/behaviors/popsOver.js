import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import _ from 'underscore';
import { callIfOutsideOfContainer } from '../EventUtils';
import KeyboardUtils from '../KeyboardUtils';

export const handleOpen = ({ onOpen, onToggle, open }) => {
    if (onOpen) {
        onOpen();
    } else if (onToggle && !open) {
        onToggle();
    }
};

export const handleClose = ({ onClose, onToggle, open }) => {
    if (onClose) {
        onClose();
    } else if (onToggle && open) {
        onToggle();
    }
};

const popsOver = WrappedComponent =>
    class extends React.Component {
        static propTypes = {
            children: PropTypes.node,
            initialState: PropTypes.object,
            onClose: PropTypes.func,
            onOpen: PropTypes.func,
            onToggle: PropTypes.func,
            open: PropTypes.bool,
        };

        state = _.extend({}, this.props.initialState);

        componentDidMount() {
            if (this._isOpen()) {
                this._bindWindowsEvents();
            }
        }

        componentDidUpdate(prevProps, prevState) {
            if (this.props.open !== undefined) {
                if (this._isOpen() && !prevProps.open) {
                    this._bindWindowsEvents();
                } else if (!this._isOpen() && prevProps.open) {
                    this._removeWindowsEvents();
                }
            } else {
                if (this._isOpen() && !prevState.open) {
                    this._bindWindowsEvents();
                } else if (!this._isOpen() && prevState.open) {
                    this._removeWindowsEvents();
                }
            }
        }

        componentWillUnmount() {
            this._removeWindowsEvents();
        }

        _handleOpen = () => {
            this.setState({ open: true });
            handleOpen(this.props);
        };

        _handleClose = () => {
            this.setState({ open: false });
            handleClose(this.props);
        };

        _handleToggle = () => {
            if (this._isOpen()) {
                this._handleClose();
            } else {
                this._handleOpen();
            }
        };

        _handleGlobalClick = e => {
            // handle click outside of container
            const domRef = this.component.popperContainer
                ? this.component.popperContainer.popper
                : this.component;
            callIfOutsideOfContainer(
                ReactDOM.findDOMNode(domRef),
                this._handleClose,
                e
            );
        };

        _handleGlobalKeyDown = e => {
            // handle escape key
            if (e.keyCode === KeyboardUtils.KeyCodes.ESC) {
                this._handleClose();
            }
        };

        _bindWindowsEvents = () => {
            // bind once current execution stack is cleared (e.g. current window event processed).
            // to avoid possible false positive triggers if tooltip was open as result of click outside of it (e.g. some link outside)
            _.defer(
                function () {
                    window.addEventListener("click", this._handleGlobalClick);
                    window.addEventListener(
                        "keydown",
                        this._handleGlobalKeyDown
                    );
                }.bind(this)
            );
        };

        _removeWindowsEvents = () => {
            window.removeEventListener("click", this._handleGlobalClick);
            window.removeEventListener("keydown", this._handleGlobalKeyDown);
        };

        _isOpen = () =>
            this.props.open !== undefined ? this.props.open : this.state.open;

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    onClose={this._handleClose}
                    onOpen={this._handleOpen}
                    onToggle={this._handleToggle}
                    open={this._isOpen()}
                    ref={el => this.component = el}
                />
            );
        }
    };

export default popsOver;
