"use strict";

var React = require("re-react"),
    ReactVanilla = require("react"),
    _ = require("underscore"),
    Utils = require("../../util/Utils");

/**
 * @typedef Pagination~pagingDetails
 * @property {number} first
 *          First item index for newly selected page
 * @property {number} last
 *          Last item index for newly selected page
 * @property {number} page
 *          Newly selected page number
 */

/**
 * @callback Pagination~onValueChange
 * @param {Pagination~pagingDetails} pagingDetails
 *          The first item index, last item index, and selected page number in an object.
 */

/**
 * @class Pagination
 *
 * @desc Pagination displays paging controls around its children content. Page navigation rulers are displayed above and
 * beyond content.
 *
 * @param {string} [data-id="pagination"]
 *          To define the base "data-id" value for the top-level HTML container.
 * @param {string} [id]
 *     DEPRECATED. Use "data-id" instead.
 * @param {string} [className]
 *          CSS classes to set on the top-level HTML container
 * @param {boolean} [stateless]
 *          To enable the component to be externally managed. True will relinquish control to the component's owner.
 *          False or not specified will cause the component to manage state internally.
 * @param {boolean} [controlled=false]
 *          DEPRECATED. Use "stateless" instead.
 * @param {number} [perPage=10]
 *          Number of results per page
 * @param {number} total
 *          Total number of items to paginate
 * @param {number} totalPages
 *          Total number of pages (alternate to passing total records)
 * @param {number} [page]
 *          Currently selected page number. Respected only with externally managed variant.
 * @param {Pagination~onValueChange} onValueChange
 *          Callback to be triggered when a new page selected.
 *  @param {Pagination~onChange} [onChange]
 *          DEPRECATED. Use onValueChange instead, passing in an object as defined in JS Docs.
 *
 * @example
 *
 *    <Pagination
 *        data-id="my-pagination"
 *        className="result-set"
 *        onValueChange={this._onPageChanged}
 *        page={this.state.currentPage}
 *        perPage={5}
 *        total={this.state.items.length} >
 *        {itemNodes}
 *    </Pagination>
 *    // OR (pass totalPages instead of total)
 *    <Pagination
 *        className="result-set"
 *        onValueChange={this._onPageChanged}
 *        page={this.state.currentPage}
 *        perPage={5}
 *        totalPages={Math.ceil(this.state.items.length/5)} >
 *        {itemNodes}
 *    </Pagination>
 *
 */

module.exports = ReactVanilla.createClass({
    displayName: "Pagination",

    propTypes: {
        controlled: React.PropTypes.bool, //TODO: remove in new version
        stateless: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            controlled: false //TODO: change to stateless in new version
        };
    },

    componentWillMount: function () {
        if (!Utils.isProduction()) {
            console.warn(Utils.deprecateMessage("controlled", "stateless"));
        }
    },

    render: function () {
        var stateless = this.props.stateless !== undefined ? this.props.stateless : this.props.controlled;

        return (
            stateless
                ? <PaginationStateless ref="PaginationStateless" {...this.props} />
                : <PaginationStateful ref="PaginationStateful" {...this.props} />);
    }
});

/**
 * @callback PageLinks~onValueChange
 * @param {number} page
 *          Clicked on page number
 */

/**
 * @class PageLinks
 * @private
 * @param {number} numPages
 *          Number of total pages.
 * @param {number} currentPage
 *          Current page displayed
 * @param {PageLinks~onValueChange} onValueChange
 *          Callback to be triggered when user clicks on the page link.
 *
 * @example
 *
 *  <PageLinks
 *       currentPage = {currentPage}
 *       numPages = {numPages}
 *       onValueChange = {this._handlePageChange}/>
 */

var PageLinks = React.createClass({
    displayName: "PageLinks",

    propTypes: {
        numPages: React.PropTypes.number.isRequired.affectsRendering,
        currentPage: React.PropTypes.number.isRequired.affectsRendering,
        onValueChange: React.PropTypes.func, // mark as isRequired once onClick is removed.
        onClick: React.PropTypes.func
    },

    _onLinkClick: function (e, page) {
        if (this.props.currentPage !== page) {
            this.props.onValueChange(page);
        }
    },

    render: function () {
        var currentPage = this.props.currentPage,
            numPages = this.props.numPages,
            pageLinks = [];

        //previous page link
        pageLinks.push(
            <a key="previous"
               onClick={_.partial(this._onLinkClick, _, (currentPage <= 1 ? currentPage : currentPage - 1))}
               className={currentPage === 1 ? "disabled" : ""}>
                    <span className="icon-previous"></span>
            </a>
        );

        if (numPages <= 6) {
            for (var i = 0; i < this.props.numPages; i = i + 1) {
                var active = (i + 1) === currentPage ? "active" : "";
                var link = (
                    <a key={i + 1} className={active} onClick={_.partial(this._onLinkClick, _, i+1)}>{i + 1}</a>
                );
                pageLinks.push(link);
            }
        }
        else {
            //first page link
            pageLinks.push(
                <a key="first" className={currentPage === 1 ? "active" : "" }
                    onClick={_.partial(this._onLinkClick, _, 1)}>{1}</a>
            );
            //add ellipsis if needed
            if (currentPage >= 5) {
                pageLinks.push("...");
            }
            //create links to 5 middle pages
            var middleStart;
            if (currentPage <= 4) {
                middleStart = 1;
            }
            else if (currentPage >= numPages - 2) {
                middleStart = numPages - 6;
            }
            else {
                middleStart = currentPage - 3;
            }

            for (var i = middleStart; i < middleStart + 5; i = i + 1) {
                var active = (i + 1) === currentPage ? "active" : "";
                var link = (
                    <a key={i + 1} className={active} onClick={_.partial(this._onLinkClick, _, i+1)}>{i + 1}</a>
                );
                pageLinks.push(link);
            }
            //add ellipsis if needed
            if (currentPage < numPages - 3) {
                pageLinks.push("...");
            }
            //last page link
            pageLinks.push(
                <a key={numPages} className={currentPage === numPages ? "active" : "" }
                    onClick={_.partial(this._onLinkClick, _, numPages)}>{numPages}</a>
            );
        }

        //next page link
        pageLinks.push(
            <a key="next" className={currentPage === numPages ? "disabled" : ""}
                onClick={_.partial(this._onLinkClick, _, (currentPage >= numPages ? currentPage : currentPage + 1))}>
                    <span className="icon-next"></span>
            </a>
        );

        if (numPages <= 1) {
            pageLinks = [];
        }

        return (
            <div className="page-links">
                {pageLinks}
            </div>
        );

    }

});

var PaginationStateless = React.createClass({
    displayName: "PaginationStateless",

    propTypes: {
        children: React.PropTypes.node.affectsRendering,
        className: React.PropTypes.string.affectsRendering,
        "data-id": React.PropTypes.string,
        id: React.PropTypes.string,
        totalPages: React.PropTypes.number.affectsRendering,
        onValueChange: React.PropTypes.func, // add isRequired to this once onChange is removed.
        onChange: React.PropTypes.func,
        page: React.PropTypes.number.affectsRendering,
        perPage: React.PropTypes.number.affectsRendering,
        total: React.PropTypes.number.affectsRendering
    },

    getDefaultProps: function () {
        return {
            "data-id": "pagination",
            perPage: 10,
            totalPages: null
        };
    },

    _getNumPages: function () {
        if (this.props.totalPages) {
            return this.props.totalPages;
        } else if (this.props.total && this.props.perPage) {
            return Math.ceil(this.props.total / this.props.perPage);
        } else {
            throw("Either props.totalPages OR (props.total and props.perPage) must be defined to \
                determine the number of page links to render!");
        }
    },

    _handlePageChange: function (newPage) {
        var page = newPage,
            numPages = this._getNumPages(),
            currentPage = page > numPages ? numPages : page,
            start = (currentPage - 1) * this.props.perPage,
            last = start + this.props.perPage;
        if (this.props.onChange) { ///TODO We don't need this if statement once onChange is removed.
            this.props.onChange(start, last, currentPage);
        } else {
            this.props.onValueChange({ first: start, last: last, page: currentPage });
        }
    },

    componentWillMount: function () {
        if (!Utils.isProduction()) {
            if (this.props.id) {
                console.warn(Utils.deprecateMessage("id", "data-id"));
            }
            if (this.props.onChange) {
                console.warn(Utils.deprecateMessage("onChange", "onValueChange"));
            }
        }
    },

    render: function () {
        var numPages = this._getNumPages();
        var id = this.props.id || this.props["data-id"];
        //make sure current page isn't greater than number of pages
        var currentPage = parseInt(this.props.page) > numPages ? numPages : parseInt(this.props.page);
        return (
            <div
                className={this.props.className}
                data-id={id}>
                <PageLinks
                    currentPage={currentPage}
                    numPages={numPages}
                    onValueChange={this._handlePageChange}
                    key="topPageLinks" />
                {this.props.children}
                <PageLinks
                    currentPage={currentPage}
                    numPages={numPages}
                    onValueChange={this._handlePageChange}
                    key="bottomPageLinks" />
            </div>
        );
    }
});

var PaginationStateful = ReactVanilla.createClass({
    displayName: "PaginationStateful",

    getInitialState: function () {
        return {
            page: 0
        };
    },

    _onPageChange: function (pagingDetails) {
        var self = this;
        this.setState({
            page: pagingDetails.page
        }, function () {
            if (self.props.onChange) { ///TODO We don't need this if statement once onChange is removed.
                self.props.onChange(pagingDetails.first, pagingDetails.last, pagingDetails.page);
            } else {
                self.props.onValueChange(
                    { first: pagingDetails.first, last: pagingDetails.last, page: pagingDetails.page }
                );
            }

        });
    },

    render: function () {
        return (
            <PaginationStateless {...this.props} page={this.state.page} onValueChange={this._onPageChange}/>
        );
    }
});
