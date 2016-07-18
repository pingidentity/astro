var React = require("re-react"),
    Toggle = require("../../components/forms/form-toggle").v2,
    FormTextField = require("../../components/forms/form-text-field").v2,
    FormCheckbox = require("../../components/forms/FormCheckbox.jsx"),
    ExpandableRow = require("../../components/rows/ExpandableRow.jsx"),
    Pagination = require("../../components/list/Pagination"),
    classnames = require("classnames");

/**
 * @callback ListView~onSearchAdvancedToggle
 * @param {object} e
 *    The ReactJS synthetic event object.
 */

/**
 * @callback ListView~onSearchFilterChange
 * @param {string} Name
 *          Identifier for input
 * @param {string} value
 *          New value of input
 */

/**
 * @callback ListView~onPageChange
 * @param {Pagination~pagingDetails} pageDetails
 *          Details about the paging
 */

/**
 * @class ListViewPaginated
 * @desc This is a template to demonstrate how to build an paginated list view, with search and filters.  Use it as a
 *     starting point for a page.
 *
 * @param {boolean} advancedSearch
 *          Whether to show the narrow by section
 * @param {number} page
 *          The page number of row results to display
 * @param {ListView~onSearchAdvancedToggle} onSearchAdvancedToggle
 *          Callback to be triggered when the advanced search is toggled
 * @param {ListView~onSearchFilterChange} onSearchFilterChange
 *          Callback to be triggered when the filter criteria is changed.
 *          The signature is function (filterName, filterValue).
 * @param {ListView~onPageChange} onPageChange
 *          Callback to be triggered when the page has changed.
 */
module.exports = React.createClass({
    /*
     * Declare which variables affect rendering.  The shouldComponentUpdate method will be be injected by ReactDefaultMethods
     * utility.
     */
    propTypes: {
        advancedSearch: React.PropTypes.bool.affectsRendering,
        filters: React.PropTypes.object.affectsRendering,
        page: React.PropTypes.number.affectsRendering,
        onSearchFilterChange: React.PropTypes.func,
        onSearchAdvancedToggle: React.PropTypes.func,
        onPageChange: React.PropTypes.func
    },

    /*
     * When the component mounts, do a bunch of initialization
     */
    componentWillMount: function () {
        //Instead of creating partials in the render function, which get computed on ever render, or
        //extracting the data-id of the target.  Created partials on mount and use them
        this._handleTextChange = this._handleFilter.bind(null, "text");
        this._handleOddFilterToggle = this._handleFilter.bind(null, "odd");
        this._handleEvenFilterToggle = this._handleFilter.bind(null, "even");
    },

    /*
     * Wrap the callback in a function so that we can create partials without having to worry about the
     * callback changing.
     */
    _handleFilter: function (name, value) {
        this.props.onSearchFilterChange(name, value);
    },

    _handlePageChange: function (pageDetails) {
        this.props.onPageChange(pageDetails.page);
    },

    _generatePageRows: function () {
        return this.props.rows.page.map(function (obj) {
            return (<ExpandableRow {...obj} showEdit={true} rowAccessories={ <Toggle /> } />);
        });
    },

    render: function () {
        return (
            <div>
                <div className={classnames("search-bar", { expanded: this.props.advancedSearch })}>
                    <div>
                        <FormTextField controlled={true}
                            onValueChange={this._handleTextChange}
                            value={this.props.filters.text}
                            className="search" />

                        <span data-id="narrow-by"
                            className="filter-by"
                            onClick={this.props.onSearchAdvancedToggle}>Narrow By</span>
                    </div>
                    <div className="filters">
                        <FormCheckbox label="filter odd rows"
                            onValueChange={this._handleOddFilterToggle}
                            checked={this.props.filters.odd} />
                        <FormCheckbox label="filter even rows"
                            onValueChange={this._handleEvenFilterToggle}
                            checked={this.props.filters.even} />
                    </div>

                </div>
                {this.props.rows.filtered.length && (
                    <Pagination controlled={true}
                        className = "result-set"
                        perPage = {this.props.perPage}
                        page = {this.props.page}
                        total = {this.props.rows.filtered.length}
                        onValueChange = {this._handlePageChange}>

                        <div className="result-set">{this._generatePageRows()}</div>
                    </Pagination>
                ) || (
                    <div>No rows returned</div>
                )}

            </div>
        );
    }
});
