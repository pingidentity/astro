import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import * as clipboard from "clipboard-polyfill";
import _ from "underscore";
import { selectTextWithinElement } from "../DOMUtils";
import HelpHint from "../../components/tooltips/HelpHint";

/**
 * @class copiesText
 * @desc Component that copies text onClick
 *
 * @param {string} text
 *     The text to be copied.
 * @param {object} strings
 *     Object that lets you override the default message text
 */

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

    _selectText = () => {
        // FIXME: findDOMNode should be avoided, see:
        // https://reactjs.org/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components
        // Ideally, we should be implementing React.forwardRef on any child components, but this
        // would be a breaking change to those components, see:
        // https://reactjs.org/docs/forwarding-refs.html#note-for-component-library-maintainers
        const component = ReactDOM.findDOMNode(this);
        const copyField = component.querySelector("[data-id='copy-field']");
        selectTextWithinElement(copyField);
    }

    _copyText = () => {
        clipboard.writeText(this.props.text).then(() => {
            this.setState({ message: 1 }, () => this._selectText());
        }).catch(() => {
            this.setState({ message: -1 });
        });
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
                    onUntrigger: this._resetMessage,
                }}
            >
                <WrappedComponent
                    {...props}
                    {...this._getMappedProps()}
                    onClick={this._copyText}
                />
            </HelpHint>
        );
    }
};

export default copiesText;