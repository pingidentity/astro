var React = require("re-react"),
    Toggle = require("../../components/forms/Toggle.jsx"),
    FormTextField = require("../../components/forms/form-text-field"),
    FormCheckbox = require("../../components/forms/FormCheckbox.jsx"),
    ExpandableRow = require("../../components/rows/ExpandableRow.jsx"),
    Pagination = require("../../components/list/Pagination.jsx"),
    classnames = require("classnames");

/**
 * @class ListViewPaginated
 * @desc This is a template to demonstrate how to build an paginated list view, with search and filters.  Use it as a
 *     starting point for a page.
 *
 * @param {bool} advancedSearch - Whether to show the narrow by section
 * @param {function} onSearchToggleAdvanced - A callback executed when the advanced search is toggled
 * @param {function} onSearchFilterChange - A callback executed when the filter criteria is changed.  The signature is
 *     function (filterName, filterValue).
 * @param {number} page - The page number of row results to display
 */
module.exports = React.createClass({
    /*
     * Declare which variables affect rendering.  The shouldComponentUpdate method will be be injected by ReactDefaultMethods
     * utility.
     */
    propTypes: {
        advancedSearch: React.PropTypes.bool.affectsRendering,
        filters: React.PropTypes.object.affectsRendering,
        page: React.PropTypes.number.affectsRendering
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

    _handlePageChange: function (start, last, currentPage) {
        this.props.onPageChange(currentPage);
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
                            onClick={this.props.onSearchToggleAdvanced}>Narrow By</span>
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
                        onChange = {this._handlePageChange}>

                        <div className="result-set">{this._generatePageRows()}</div>
                    </Pagination>
                ) || (
                    <div>No rows returned</div>
                )}

            </div>
        );
    }
});
