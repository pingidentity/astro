import React from "react";
import PropTypes from "prop-types";
import _ from "underscore";

export const handleOpen = ({ onOpen, onToggle, open }) => {
    if (onOpen) {
        onOpen();
    }
    if (!open && onToggle) {
        onToggle();
    }
};

export const handleClose = ({ onClose, onToggle, open }) => {
    if (onClose) {
        onClose();
    }
    if (open && onToggle) {
        onToggle();
    }
};

const togglesOpen = WrappedComponent =>
    class extends React.Component {
        static propTypes = {
            children: PropTypes.node,
            initialState: PropTypes.object,
            onClose: PropTypes.func,
            onOpen: PropTypes.func,
            onToggle: PropTypes.func,
            open: PropTypes.bool,
        };

        static defaultProps = {
            onToggle: _.noop,
        };

        state = _.extend({}, this.props.initialState);

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
                />
            );
        }
    };

export default togglesOpen;
