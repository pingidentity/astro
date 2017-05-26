var React = require("react"),
    _ = require("underscore"),
    FormTextField = require("./form-text-field/index"),
    KeyboardUtils = require("../../util/KeyboardUtils.js");

/**
* @callback FormSearchBox~onValueChange
*
* @param {string} queryString
*     The new query string
*/

/**
* @callback FormSearchBox~onKeyDown
*
* @param {object} e
*    The ReactJS synthetic event object.
*/

/**
* @callback FormSearchBox~onFocus
*
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @callback FormSearchBox~onBlur
*
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @callback FormSearchBox~onClear
*/

/**
* @class FormSearchBox
* @desc A search input box which calls the provided callback function on change.
*     Will also clear query string on ESC or (X) button click.
*
* @param {string} [data-id="searchBox"]
*     To define the base "data-id" value for top-level HTML container
* @param {string} [className]
*     CSS classes to set on the top-level HTML container
*
* @param {string} [queryString]
*     Query string to be used as value in the search field
* @param {string} [placeholder]
*     Hint text inside searchBox
* @param {FormSearchBox~onValueChange} onValueChange
*     Callback to be triggered when the searchbox value changes
*
* @param {FormSearchBox~onKeyDown} [onKeyDown]
*     Callback to be triggered when a key is pressed down in the search box.
*     "ESC" key clears the search field by default.
* @param {FormSearchBox~onFocus} [onFocus]
*     Callback to be triggered when the search box gains focus.
* @param {FormSearchBox~onBlur} [onBlur]
*     Callback to be triggered when the search box blurs (loses focus).
* @param {FormSearchBox~onClear} [onClear]
*     Callback to be triggered when the search field is cleared.
*
* @example
*     <FormSearchBox data-id="mySearchBox"
*         queryString="keyword to search"
*         placeholder="Search"
*         onChange={this._filterOptions} />
**/
var FormSearchBox = React.createClass({
    displayName: "FormSearchBox",
    
    propTypes: {
        "data-id": React.PropTypes.string,
        className: React.PropTypes.string,
        queryString: React.PropTypes.string,
        placeholder: React.PropTypes.string,
        inputFieldClassName: React.PropTypes.string,
        onValueChange: React.PropTypes.func.isRequired,
        onKeyDown: React.PropTypes.func,
        onFocus: React.PropTypes.func,
        onBlur: React.PropTypes.func,
        onClear: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            "data-id": "FormSearchBox",
            onKeyDown: _.noop,
            onFocus: _.noop,
            onBlur: _.noop,
            onClear: _.noop,
        };
    },

    /**
     * @desc Search when the searchBox has a new value.
     * @param {object} value
     *     The query string value.
     * @private
     * @ignore
     */
    _search: function (value) {
        this.props.onValueChange(value);
    },

    _clear: function () {
        this.props.onValueChange("");
        this.props.onClear();
    },

    _handleSearchBoxKeyDown: function (e) {
        if (e.keyCode === KeyboardUtils.KeyCodes.ESC) {
            this._clear();
        }
        this.props.onKeyDown(e);
    },

    _getSearchInputRef: function () {
        return this.refs.searchBox.refs.stateful.refs.stateless.refs["searchBox-input"];
    },

    /**
    * @function FormSearchBox~searchBoxFocus
    * @desc Sets focus on the search box field.
    */
    searchBoxFocus: function () {
        this._getSearchInputRef().focus();
    },

    /**
    * @function FormSearchBox~isFocused
    * @desc Whether or not this search box is the currently focused element.
    * @return {boolean} True if this search box is focused, false otherwise.
    */
    isFocused: function () {
        return document.activeElement === this._getSearchInputRef();
    },

    render: function () {
        var showClear = this.props.queryString && (this.props.queryString !== "");

        return (
            <div data-id={this.props["data-id"]} className={this.props.className} >
                <FormTextField data-id="searchBox"
                        ref="searchBox"
                        className="search"
                        value={this.props.queryString}
                        placeholder={this.props.placeholder}
                        onValueChange={this._search}
                        onKeyDown={this._handleSearchBoxKeyDown}
                        onFocus={this.props.onFocus}
                        onBlur={this.props.onBlur}
                        clear={true}>
                    { showClear &&
                        <a data-id="clear" className="clear-search" onClick={this._clear} />
                    }
                </FormTextField>
            </div>
        );
    }
});

module.exports = FormSearchBox;
