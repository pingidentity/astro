import React from "react";
import PropTypes from "prop-types";
import KeyboardUtils from "../KeyboardUtils";
import _ from "underscore";

const keyboardSelection = WrappedComponent =>
    class extends React.Component {
        static propTypes = {
            onValueChange: PropTypes.func,
            options: PropTypes.array
        };

        static defaultProps = {
            onValueChange: _.noop
        };

        state = { highlightedIndex: -1 };

        _handleKeyDown = e => {
            if (e.keyCode === KeyboardUtils.KeyCodes.ENTER) {
                if (this.state.highlightedIndex >= 0) {
                    this.props.onValueChange(
                        this.props.options[this.state.highlightedIndex]
                    );
                }
            } else if (
                e.keyCode === KeyboardUtils.KeyCodes.ARROW_UP ||
                e.keyCode === KeyboardUtils.KeyCodes.ARROW_DOWN
            ) {
                this._handleUpDownKeys(e);
            }
        };

        /**
         * When Up or Down keys are pressed, increment/decrement the searchIndex accordingly
         * and call this.props.onSearch if list is open. Otherwise, toggle the list to open.
         *
         * @param {object} e
         *    The ReactJS synthetic event object.
         *
         * @private
         * @ignore
         */
        _handleUpDownKeys = e => {
            var index = this.state.highlightedIndex;
            if (e.keyCode === KeyboardUtils.KeyCodes.ARROW_UP) {
                index -= 1;
            } else if (e.keyCode === KeyboardUtils.KeyCodes.ARROW_DOWN) {
                index += 1;
            }
            //Dont allow index to go below the lowest or higher than the length of options
            var lowest = 0;
            if (index < lowest) {
                index = lowest;
            } else if (index >= this.props.options.length) {
                index = this.props.options.length - 1;
            }
            this.setState({ highlightedIndex: index });
            e.preventDefault();
            e.stopPropagation();
        };

        render = () => (
            <WrappedComponent
                highlightedIndex={this.state.highlightedIndex}
                onKeyDown={this._handleKeyDown}
                {...this.props}
            />
        );
    };

export default keyboardSelection;
