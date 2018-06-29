import React from "react";
import PropTypes from "prop-types";
import clipboard from "clipboard-polyfill";
import _ from "underscore";
import HelpHint from "../../components/tooltips/HelpHint";

/**
 * @class copiesText
 * @desc Component that copies text onClick
 *
 * @param {string} text
 *     The text to be copied.
 * @param {object} strings
 *     Object that lets you override the default message text
 **/

const copiesText = (WrappedComponent, mapProps = {}) => class extends React.Component {
    static propTypes = {
        text: PropTypes.string,
        strings: PropTypes.object,
    };

    static defaultProps = {
        strings: {},
    };

    state = {
        message: 0,
    };

    _copyText = () => {
        const selection = global.getSelection();

        if (selection.toString() === "") {
            clipboard.writeText(this.props.text).then(() => {
                this.setState({ message: 1 });
            }).catch(() => {
                this.setState({ message: -1 });
            });
        }
    };

    _hintMessage = () => {
        const { strings } = this.props;

        if (this.state.message > 0) {
            return strings["success"] || "Copied!";
        } else if (this.state.message < 0) {
            return strings["failure"] || "Can't copy!";
        } else {
            return strings["prompt"] || "Copy to clipboard";
        }
    };

    _resetMessage = () => this.setState({ message: 0 });

    _getMappedProps = () => _.mapObject(mapProps, val => this.props[val]);

    render() {
        const {
            /* eslint-disable no-unused-vars */
            text, strings,
            /* eslint-enable no-unused-vars */
            ...props
        } = this.props;

        return (
            <HelpHint
                key={this._hintMessage()}
                hintText={this._hintMessage()}
                placement="top"
                delayHide={100}
                tooltipProps={{
                    afterHide: this._resetMessage,
                }}
            >
                <WrappedComponent {...props} {...this._getMappedProps()} onClick={this._copyText} />
            </HelpHint>
        );
    }
};

export default copiesText;