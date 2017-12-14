var PropTypes = require("prop-types");
var React = require("react"),
    CollapsibleLink = require("../../components/general/CollapsibleLink"),
    ExpandableRow = require("../../components/rows/ExpandableRow"),
    FormCheckbox = require("../../components/forms/FormCheckbox"),
    FormSearchBox = require("../../components/forms/FormSearchBox"),
    Pagination = require("../../components/list/Pagination"),
    Toggle = require("../../components/forms/form-toggle"),
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
module.exports = class extends React.Component {
    /*
     * Declare which variables affect rendering.  The shouldComponentUpdate method will be be injected by ReactDefaultMethods
     * utility.
     */
    static propTypes = {
        advancedSearch: PropTypes.bool,
        filters: PropTypes.object,
        page: PropTypes.number,
        onSearchFilterChange: PropTypes.func,
        onSearchAdvancedToggle: PropTypes.func,
        onPageChange: PropTypes.func
    };

    /*
     * When the component mounts, do a bunch of initialization
     */
    componentWillMount() {
        //Instead of creating partials in the render function, which get computed on ever render, or
        //extracting the data-id of the target.  Created partials on mount and use them
        this._handleTextChange = this._handleFilter.bind(null, "text");
        this._handleOddFilterToggle = this._handleFilter.bind(null, "odd");
        this._handleEvenFilterToggle = this._handleFilter.bind(null, "even");
    }

    /*
     * Wrap the callback in a function so that we can create partials without having to worry about the
     * callback changing.
     */
    _handleFilter = (name, value) => {
        this.props.onSearchFilterChange(name, value);
    };

    _handlePageChange = (pageDetails) => {
        this.props.onPageChange(pageDetails.page);
    };

    _generatePageRows = () => {
        return this.props.rows.page.map(function (obj) {
            return (<ExpandableRow {...obj} showEdit={true} rowAccessories={ <Toggle /> } />);
        });
    };

    render() {
        return (
            <div>
                <div className={classnames("search-bar", { expanded: this.props.advancedSearch })}>
                    <div>
                        <FormSearchBox
                            className="search-box"
                            onValueChange={this._handleTextChange}
                            queryString={this.props.filters.text} />


                        <CollapsibleLink data-id="narrow-by"
                            title="Narrow by"
                            onToggle={this.props.onSearchAdvancedToggle}
                            arrowPosition={CollapsibleLink.arrowPositions.RIGHT}
                            expanded={this.props.advancedSearch}
                            className="filter-by" />
                    </div>
                    <div className="filters">
                        <FormCheckbox label="filter odd rows"
                            onValueChange={this._handleOddFilterToggle}
                            checked={this.props.filters.odd}
                            className="inline" />
                        <FormCheckbox label="filter even rows"
                            onValueChange={this._handleEvenFilterToggle}
                            checked={this.props.filters.even}
                            className="inline" />
                    </div>

                </div>
                {this.props.rows.filtered.length && (
                    <Pagination stateless={true}
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
};
