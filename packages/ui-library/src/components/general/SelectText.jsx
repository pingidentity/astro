var React = require("react");
var ReactDOM = require("react-dom");

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
 * @param {string} [dataId]
 *     DEPRECATED. To define the base "data-id" value for top-level HTML container.
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

var SelectText = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        select: React.PropTypes.bool,
        className: React.PropTypes.string,
        onClick: React.PropTypes.func,
        dataId: React.PropTypes.string
    },

    /*
     * Select the text of the clicked element using
     * browser text selection functionality provided
     * as part of the global object.
     *
     */
    _selectText: function (event) {
        // Handle input elements (which have their
        // own select method) specially to provide
        // better / un-styled selection.  It is assumed
        // that if an input field exists within a
        // SelectText element that clicking the input
        // should only select the text within the input.
        if (event && event.target.select) {
            event.target.select();
        } else {

            var text = ReactDOM.findDOMNode(this);
            var range;

            if (global.document.body.createTextRange) {
                range = global.document.body.createTextRange();
                range.moveToElementText(text);
                range.select();
            } else if (global.getSelection) {
                var selection = global.getSelection();
                range = global.document.createRange();
                range.selectNodeContents(text);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }

        if (this.props.onClick) {
            this.props.onClick();
        }
    },

    getDefaultProps: function () {
        return {
            dataId: "select-text"
            // this is not yet changed to data-id so that data ids used by older clients are not overwritten.
        };
    },

    componentWillMount: function () {
        if (this.props.dataId) {
            console.warn("Deprecated: use data-id instead of dataId.  " +
            "Support for dataId will be removed in next version");
        }
    },

    componentDidMount: function () {
        if (this.props.select) {
            this._selectText();
        }
    },

    componentWillReceiveProps: function (nextProps) {
        if (!this.props.select && nextProps.select) {
            this._selectText();
        }
    },

    render: function () {
        var dataId = this.props["data-id"] || this.props.dataId;
        return (
            <span className={this.props.className}
                  onClick={this._selectText}
                  data-id={dataId}>
                {this.props.children}
            </span>
        );
    }
});

module.exports = SelectText;
