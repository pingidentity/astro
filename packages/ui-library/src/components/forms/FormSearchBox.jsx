var React = require("react"),
    classnames = require("classnames"),
    FormTextField = require("./FormTextField.jsx");

/**
 * @class FormSearchBox
 * @desc provides search box. perform a callback function when onChange fired
 *
 * @param {function} [onChange] - callback to be triggered when the searchbox changed
 * @param {function} [onKeyPress] - callback to be triggered when a key is pressed
 * @param {string} [queryString] - keyword to search data list
 * @param {string} [placeholder] - hint text inside searchBox
 * @param {string} [className] - extra CSS classes to be applied
 * @param {string} [id] - it is used for a unique data-id
 *
 * @private
 * @example <FormSearchBox onChange={this._filterOptions}
 *                      queryString="keyword to search"
 *                      onKeyUp={this._checkEscKeyUp}
 *                      placeholder="Search"
 *                      id="searchBox"/>
 **/
var FormSearchBox = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func.isRequired,
        queryString: React.PropTypes.string,
        placeholder: React.PropTypes.string,
        className: React.PropTypes.string,
        id: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            queryString: "",
            placeholder: "",
            id: "searchBox"
        };
    },

    /**
     * @desc searches when the searchBox has a new value.
     *
     * @param {object} e the event object
     * @private
     */
    _search: function (e) {
        this.props.onChange(e);
    },

    render: function () {
        var searchValue = this.props.queryString;
        var cssClass = classnames({
            className: this.props.className
        });

        return (
            <div data-id={this.props.id} className={cssClass} >
                <FormTextField onChange={this._search}
                        value={searchValue}
                        placeholder={this.props.placeholder}
                        className="search"
                        data-id="searchBox" />
            </div>
        );
    }
});

module.exports = FormSearchBox;