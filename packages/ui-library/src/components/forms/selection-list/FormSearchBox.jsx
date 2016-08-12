var React = require("react"),
    FormTextField = require("../form-text-field/index"),
    KeyboardUtils = require("../../../util/KeyboardUtils.js");

/**
 * @callback FormSearchBox~onValueChange
 * @param {string} queryString
 *     The new query string
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
 * @param {string} [queryString]
 *     Query string to be used as value in the search field
 * @param {string} [placeholder]
 *     Hint text inside searchBox
 * @param {FormSearchBox~onValueChange} [onValueChange]
 *     Callback to be triggered when the searchbox value changes
 *
 * @private
 * @ignore
 *
 * @example
 *     <FormSearchBox data-id="mySearchBox"
 *         queryString="keyword to search"
 *         placeholder="Search"
 *         onChange={this._filterOptions} />
 **/
var FormSearchBox = React.createClass({
    propTypes: {
        "data-id": React.PropTypes.string,
        className: React.PropTypes.string,
        queryString: React.PropTypes.string,
        placeholder: React.PropTypes.string,
        onValueChange: React.PropTypes.func.isRequired
    },

    getDefaultProps: function () {
        return {
            "data-id": "searchBox"
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
    },

    _handleSearchBoxKeyDown: function (e) {
        if (e.keyCode === KeyboardUtils.KeyCodes.ESC) {
            this._clear();
        }
    },

    render: function () {
        var showClear = this.props.queryString !== "";

        return (
            <div data-id={this.props["data-id"]} className={this.props.className} >
                <FormTextField data-id="searchBox"
                        className="search"
                        value={this.props.queryString}
                        placeholder={this.props.placeholder}
                        onValueChange={this._search}
                        onKeyDown={this._handleSearchBoxKeyDown}
                        clear={true} />
                { showClear &&
                    <a data-id="clear" className="clear-search" onClick={this._clear} />
                }
            </div>
        );
    }
});

module.exports = FormSearchBox;
