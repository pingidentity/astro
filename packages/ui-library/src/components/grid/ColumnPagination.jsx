"use strict";

var React = require("react");
var _ = require("underscore");

/**
 * @callback PageLinks~onClick
 *
 * @param {number} page
 *     Page number for the link that was clicked.
 **/

/**
 * @class PageLinks
 * @private
 * @param {number} numPages
 *     Number of total pages.
 * @param {number} currentPage
 *     Current page displayed
 * @param {PageLinks~onClick} onClick
 *     Callback to be triggered when link is clicked.
 *
 * @example
 *
 *     <PageLinks currentPage = {currentPage} numPages = {numPages} onClick = {this._handlePageChange} />
 *
 **/

var PageLinks = React.createClass({
    propTypes: {
        "data-id": React.PropTypes.string.isRequired,
        numPages: React.PropTypes.number.isRequired,
        currentPage: React.PropTypes.number.isRequired,
        onClick: React.PropTypes.func.isRequired
    },

    _handleClick: function (e, page) {
        if (this.props.currentPage !== page) {
            this.props.onClick(page);
        }
    },

    render: function () {
        var currentPage = this.props.currentPage;
        var numPages = this.props.numPages;

        if (numPages <= 1) {
            return (<div></div>);
        }

        var nextKey = this.props["data-id"] + "-next";
        var previousKey = this.props["data-id"] + "-previous";

        return (
            <div data-id={this.props["data-id"]}>
                <a data-id={previousKey} key={previousKey}
                    className={currentPage === 1 ? "icon-previous disabled" : "icon-previous"}
                    onClick={_.partial(this._handleClick, _, (currentPage <= 1 ? currentPage : currentPage - 1))} >
                </a>

                {this.props.currentPage} of {this.props.numPages}

                <a data-id={nextKey} key={nextKey}
                  className={currentPage === numPages ? "icon-next disabled" : "icon-next"}
                  onClick={_.partial(this._handleClick, _, (currentPage >= numPages ? currentPage : currentPage + 1))} >
                </a>
            </div>
        );
    }

});

/**
 * @private
 * @class Grid#ColumnPagination
 * @desc ColumnPagination provides a callback to response first, last and currentPage.
 *     This is mostly copied from .../src/components/list/Pagination.jsx
 *
 * @param {string} [data-id="columnPagination"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 *
 * @param {number} [page]
 *     Currently selected page number. Only used when stateless.
 * @param {number} [perPage=5]
 *     Number of results per page
 * @param {number} total
 *     Total number of items to paginate
 * @param {Grid~onPaginationChanged} onChange
 *     Callback to be triggered when new page is selected.
 *
 * @example
 *
 *    <ColumnPagination
 *            onChange={this._onPageChanged}
 *            page={this.state.currentPage}
 *            perPage={5}
 *            total={this.state.items.length} />
 *
 **/

module.exports = React.createClass({

    displayName: "ColumnPagination",

    propTypes: {
        "data-id": React.PropTypes.string,
        className: React.PropTypes.string,
        page: React.PropTypes.number,
        perPage: React.PropTypes.number,
        total: React.PropTypes.number,
        onChange: React.PropTypes.func.isRequired
    },

    getDefaultProps: function () {
        return {
            "data-id": "columnPagination",
            perPage: 5
        };
    },

    _getNumPages: function () {
        if (this.props.total && this.props.perPage) {
            return Math.ceil(this.props.total / this.props.perPage);
        } else {
            throw("props.total and props.perPage must be defined to determine the number of page links!");
        }
    },

    _handlePageChange: function (newPage) {
        var page = newPage,
            numPages = this._getNumPages(),
            currentPage = page > numPages ? numPages : page,
            start = (currentPage - 1) * this.props.perPage,
            last = start + this.props.perPage;

        this.props.onChange(start, last, currentPage);
    },

    render: function () {
        var numPages = this._getNumPages();

        //make sure current page isn't greater than number of pages
        var currentPage = parseInt(this.props.page) > numPages ? numPages : parseInt(this.props.page);

        return (
            <PageLinks
                data-id={this.props["data-id"]}
                currentPage={currentPage}
                numPages={numPages}
                onClick={this._handlePageChange}
                key="pageLinks" />
        );
    }
});