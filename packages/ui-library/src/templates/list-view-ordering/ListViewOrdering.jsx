import PropTypes from "prop-types";
import React from "react";
import ExpandableRow from "../../components/rows/ExpandableRow";
import FormCheckbox from "../../components/forms/FormCheckbox";
import FormSearchBar from "../../components/forms/FormSearchBar";
import Pagination from "../../components/list/Pagination";
import Toggle from "../../components/forms/form-toggle";

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
        onPageChange: PropTypes.func,
        onReorder: PropTypes.func,
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

    _handleReorder = (from, to) => {
        this.props.onReorder(from, to);
    }

    _getAbsoluteIndex = (pageIndex) => {
        let absoluteIndex = pageIndex + ((this.props.page - 1) * this.props.perPage);
        const item = this.props.rows.page[pageIndex];
        while (item !== this.props.rows.all[absoluteIndex] && absoluteIndex < this.props.rows.all.length) {
            absoluteIndex += 1;
        }
        return absoluteIndex;
    }

    _generatePageRows = () => {
        return this.props.rows.page.map(function (obj, index) {
            const position = this._getAbsoluteIndex(index);
            return (
                <ExpandableRow
                    key={`${obj.title}`}
                    {...obj}
                    showEdit={true}
                    rowAccessories={ <Toggle /> }
                    ordering={{
                        position,
                        total: this.props.rows.all.length,
                        onReorder: this._handleReorder
                    }}
                />
            );
        }.bind(this));
    };

    render() {
        return (
            <div>
                <FormSearchBar
                    formSearchBoxProps={{
                        onValueChange: this._handleTextChange,
                        queryString: this.props.filters.text
                    }}
                >
                    <FormCheckbox label="filter odd rows"
                        onValueChange={this._handleOddFilterToggle}
                        checked={this.props.filters.odd}
                        className="inline" />
                    <FormCheckbox label="filter even rows"
                        onValueChange={this._handleEvenFilterToggle}
                        checked={this.props.filters.even}
                        className="inline" />
                </FormSearchBar>
                {this.props.rows.filtered.length && (
                    <Pagination stateless={true}
                        className = "result-set"
                        perPage = {this.props.perPage}
                        page = {this.props.page}
                        total = {this.props.rows.filtered.length}
                        onValueChange = {this._handlePageChange}>

                        <div className="result-set">
                            {this._generatePageRows()}
                        </div>
                    </Pagination>
                ) || (
                    <div className="result-set">No rows returned</div>
                )}

            </div>
        );
    }
};
