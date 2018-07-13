import PropTypes from "prop-types";
import React from "react";
import _ from "underscore";
import FormTextField from "./form-text-field/index";
import KeyboardUtils from "../../util/KeyboardUtils.js";
import classnames from "classnames";

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
* @param {string} [value]
*     Alias for queryString
* @param {string} [placeholder]
*     Hint text inside searchBox
* @param {string} [name]
*    Name attribute for the input.
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
* @param {number} [maxLength]
*     Maximum length supported by the text field.
*
* @example
*     <FormSearchBox data-id="mySearchBox"
*         queryString="keyword to search"
*         placeholder="Search"
*         onChange={this._filterOptions} />
**/
class FormSearchBox extends React.Component {
    static displayName = "FormSearchBox";

    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        queryString: PropTypes.string,
        placeholder: PropTypes.string,
        iconName: PropTypes.string,
        inputFieldClassName: PropTypes.string,
        name: PropTypes.string,
        onValueChange: PropTypes.func.isRequired,
        onKeyDown: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onClear: PropTypes.func,
        errorMessage: PropTypes.string,
        maxLength: PropTypes.number
    };

    static defaultProps = {
        "data-id": "FormSearchBox",
        iconName: "search",
        onKeyDown: _.noop,
        onFocus: _.noop,
        onBlur: _.noop,
        onClear: _.noop,
        errorMessage: null
    };

    /**
     * @desc Search when the searchBox has a new value.
     * @param {object} value
     *     The query string value.
     * @private
     * @ignore
     */
    _search = (value) => {
        this.props.onValueChange(value);
    };

    _clear = () => {
        this.props.onValueChange("");
        this.props.onClear();
    };

    _handleSearchBoxKeyDown = (e) => {
        if (e.keyCode === KeyboardUtils.KeyCodes.ESC) {
            this._clear();
        }
        this.props.onKeyDown(e);
    };

    _getSearchInputRef = () => {
        return this.refs.searchBox.refs.stateful.refs.stateless.refs["searchBox-input"];
    };

    /**
    * @function FormSearchBox~searchBoxFocus
    * @desc Sets focus on the search box field.
    */
    searchBoxFocus = () => {
        this._getSearchInputRef().focus();
    };

    /**
    * @function FormSearchBox~isFocused
    * @desc Whether or not this search box is the currently focused element.
    * @return {boolean} True if this search box is focused, false otherwise.
    */
    isFocused = () => {
        return document.activeElement === this._getSearchInputRef();
    };

    render() {
        const value = this.props.queryString || this.props.value || "";
        const showClear = value !== "";
        const iconClasses = classnames("input-icon", "icon-" + this.props.iconName);
        const inputClasses = classnames("search", {
            "input-text--mono": this.props.monospaced,
        });

        return (
            <div data-id={this.props["data-id"]} className={this.props.className} >
                <FormTextField data-id="searchBox"
                        stateless={false}
                        ref="searchBox"
                        className={inputClasses}
                        errorMessage={this.props.errorMessage}
                        value={value}
                        placeholder={this.props.placeholder}
                        name={this.props.name}
                        onValueChange={this._search}
                        onKeyDown={this._handleSearchBoxKeyDown}
                        onFocus={this.props.onFocus}
                        onBlur={this.props.onBlur}
                    maxLength={this.props.maxLength}
                        controls={showClear
                            ? <a data-id="clear" className="clear-search" onClick={this._clear} />
                            : null
                        }
                ><span className={iconClasses}/></FormTextField>
            </div>
        );
    }
}

module.exports = FormSearchBox;
