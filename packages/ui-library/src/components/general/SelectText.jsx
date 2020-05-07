import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { selectTextWithinElement } from "../../util/DOMUtils";

import classnames from "classnames";
/**
 * @callback SelectText~onClick
 */

/**
 * @class SelectText
 * @desc Component that will select all text in all child elements when clicked, or select initially if
 * the prop select is set to true. Special handling is enabled for input fields contained within a SelectText component.
 * An input field will have its select() method called specifically if the input field is the target of the click.
 * Other elements clicked on within a select text field will result all text for all elements being selected.
 *
 * @param {string} [data-id="select-text"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 *
 * @param {boolean} [select=false]
 *     Select text immediately without requiring a click.
 * @param {SelectText~onClick} [onClick]
 *     Callback to be triggered when selection has been triggered.
 *
 * @example
 * <SelectText>
 *     Some text to select when clicked
 * <SelectText>
 *
 * @example
 * <SelectText>
 *     <div>
 *         <h2>Some more text to select when clicked</h2>
 *         <p>
 *             All of this text will be selected when any
 *             of it is clicked, including both the header
 *             and this paragraph. <span>Even this text
 *             in the span</span>.
 *         </p>
 *     </div>
 * </SelectText>
 *
 * @example
 * In the below example, only the text within the input will be selected when the input itself is clicked.
 *
 * <SelectText>
 *     <input type="text" value="some text to select when clicked" />
 * </SelectText>
 *
 * @example
 * In the below example, the whole input will be selected when the div is clicked,
 * but only the text within the input will be selected if the input itself is clicked.
 * The difference is in how it looks when selected, and what actually ends up being copied
 * when doing a copy and paste.
 *
 * <SelectText>
 *     <div>
 *         <input type="text" value="some text to select when clicked" />
 *     </div>
 * </SelectText>
 *
 * @example
 * In the below example, all of the text (including the whole input) will be selected
 * when the div or header are clicked, but only the input text will be selected if the
 * input itself is clicked.
 *
 * <SelectText>
 *     <div>
 *         <h1>Only selected if header or div are clicked</h1>
 *         <input type="text" value="selected by itself if clicked, or together with the header if h1 or div clicked"/>
 *     </div>
 * </SelectText>
 */

class SelectText extends React.Component {
    constructor(props) {
        super(props);
        this.selectTextRef = React.createRef();
    }

    static propTypes = {
        "data-id": PropTypes.string,
        dataId: PropTypes.string,
        className: PropTypes.string,
        select: PropTypes.bool,
        onClick: PropTypes.func
    };

    static defaultProps = {
        "data-id": "select-text",
    };

    _selectText = (event) => {
        /*
        * If the event target element has a native select function, use it
        * Otherwise, use the component element
        */
        const targetElement = (
            _.get(event, "target.select")
                ? event.target
                : this.selectTextRef.current
        );
        selectTextWithinElement(targetElement);

        if (this.props.onClick) {
            this.props.onClick();
        }
    };

    componentDidMount() {
        if (this.props.select) {
            this._selectText();
        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.select && this.props.select) {
            this._selectText();
        }
    }

    render() {
        var dataId = this.props.dataId || this.props["data-id"];
        return (
            <span
                className={ classnames(
                    "select-text",
                    this.props.className
                )}
                onClick={this._selectText}
                data-id={dataId}
                ref={this.selectTextRef}
            >
                {this.props.children}
            </span>
        );
    }
}

module.exports = SelectText;
