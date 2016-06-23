"use strict";

var React = require("react");
var _ = require("underscore");

/**
 * @class PageLinks
 * @private
 * @param {number} numPages - number of total pages.
 * @param {number} currentPage - current page displayed
 * @param {function} onClick - callback click function
 *
 * @example
 *
 *  <PageLinks
 *       currentPage = {currentPage}
 *       numPages = {numPages}
 *       onClick = {this._handlePageChange} />
 **/

var PageLinks = React.createClass({
    propTypes: {
        "data-id": React.PropTypes.string.isRequired,
        numPages: React.PropTypes.number.isRequired,
        currentPage: React.PropTypes.number.isRequired,
        onClick: React.PropTypes.func.isRequired
    },

    _onLinkClick: function (e, page) {
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
                    onClick={_.partial(this._onLinkClick, _, (currentPage <= 1 ? currentPage : currentPage - 1))} >
                </a>

                {this.props.currentPage} of {this.props.numPages}

                <a data-id={nextKey} key={nextKey}
                  className={currentPage === numPages ? "icon-next disabled" : "icon-next"}
                  onClick={_.partial(this._onLinkClick, _, (currentPage >= numPages ? currentPage : currentPage + 1))} >
                </a>
            </div>
        );
    }

});

/**
 * @callback ColumnPagination~onChangeCallback
 * @param {number} first - first item index for newly selected page
 * @param {number} last - last item index for newly selected page
 * @param {number} page - newly selected page number
 */

/**
 * @class ColumnPagination
 *
 * @desc ColumnPagination provides a callback to response first, last and currentPage.
 *          This is mostly copied from .../src/components/list/Pagination.jsx
 *
 * @param {string} [className] - extra CSS classes to be applied
 * @param {string} [data-id] - it is used for a unique data-id
 * @param {number} [perPage=5] - number of results per page
 * @param {number} total - total number of items to paginate
 * @param {ColumnPagination~onChangeCallback} onChange - callback to be triggered when new page selected
 * @param {number} [page] - currently selected page number. Respected only with externally managed variant.
 *
 * @example
 *
 *    <ColumnPagination
 *        onChange={this._onPageChanged}
 *        page={this.state.currentPage}
 *        perPage={5}
 *        total={this.state.items.length} />
 *
 **/

module.exports = React.createClass({

    displayName: "ColumnPagination",

    propTypes: {
        className: React.PropTypes.string,
        "data-id": React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired,
        page: React.PropTypes.number,
        perPage: React.PropTypes.number,
        total: React.PropTypes.number
    },

    getDefaultProps: function () {
        return {
            id: "columnPagination",
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