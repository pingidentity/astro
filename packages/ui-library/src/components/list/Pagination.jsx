"use strict";

var PropTypes = require("prop-types");

var React = require("react"),
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
 * @param {string} [className]
 *          CSS classes to set on the top-level HTML container
 * @param {boolean} [stateless]
 *          To enable the component to be externally managed. True will relinquish control to the component's owner.
 *          False or not specified will cause the component to manage state internally.
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

module.exports = class extends React.Component {
    static displayName = "Pagination";

    static propTypes = {
        stateless: PropTypes.bool
    };

    static defaultProps = {
        stateless: false
    };

    componentWillMount() {
        if (!Utils.isProduction()) {
            if (this.props.id) {
                throw new Error(Utils.deprecatePropError("id", "data-id"));
            }
            if (this.props.controlled !== undefined) {
                throw new Error(Utils.deprecatePropError("controlled", "stateless"));
            }
            if (this.props.onChange) {
                throw new Error(Utils.deprecatePropError("onChange", "onValueChange"));
            }
        }
    }

    render() {
        return (
            this.props.stateless
                ? <PaginationStateless ref="PaginationStateless" {...this.props} />
                : <PaginationStateful ref="PaginationStateful" {...this.props} />);
    }
};

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

class PageLinks extends React.Component {
    static displayName = "PageLinks";

    static propTypes = {
        "data-id": PropTypes.string,
        numPages: PropTypes.number.isRequired,
        currentPage: PropTypes.number.isRequired,
        onValueChange: PropTypes.func, // mark as isRequired once onClick is removed.
        onClick: PropTypes.func
    };

    _onLinkClick = (e, page) => {
        if (this.props.currentPage !== page) {
            this.props.onValueChange(page);
        }
    };

    render() {
        var currentPage = this.props.currentPage,
            numPages = this.props.numPages,
            pageLinks = [];

        //previous page link
        pageLinks.push(
            <a key="previous"
                data-id={this.props["data-id"] + "previous"}
               onClick={_.partial(this._onLinkClick, _, (currentPage <= 1 ? currentPage : currentPage - 1))}
               className={currentPage === 1 ? "disabled" : ""}>
                    <span className="icon-previous"></span>
            </a>
        );

        if (numPages <= 6) {
            for (var i = 0; i < this.props.numPages; i = i + 1) {
                var active = (i + 1) === currentPage ? "active" : "";
                var key = i + 1;
                var link = (
                    <a key={key}
                        data-id={this.props["data-id"] + key}
                        className={active}
                        onClick={_.partial(this._onLinkClick, _, i+1)}>{i + 1}</a>
                );
                pageLinks.push(link);
            }
        }
        else {
            //first page link
            pageLinks.push(
                <a key="first"
                    data-id={this.props["data-id"] + "first"}
                    className={currentPage === 1 ? "active" : "" }
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
                var key = i + 1;
                var link = (
                    <a key={key}
                        data-id={this.props["data-id"] + key}
                        className={active}
                        onClick={_.partial(this._onLinkClick, _, i+1)}>{i + 1}</a>
                );
                pageLinks.push(link);
            }
            //add ellipsis if needed
            if (currentPage < numPages - 3) {
                pageLinks.push("...");
            }
            //last page link
            pageLinks.push(
                <a key={numPages}
                    data-id={this.props["data-id"] + numPages}
                    className={currentPage === numPages ? "active" : "" }
                    onClick={_.partial(this._onLinkClick, _, numPages)}>{numPages}</a>
            );
        }

        //next page link
        pageLinks.push(
            <a key="next"
                data-id={this.props["data-id"] + "next"}
                className={currentPage === numPages ? "disabled" : ""}
                onClick={_.partial(this._onLinkClick, _, (currentPage >= numPages ? currentPage : currentPage + 1))}>
                    <span className="icon-next"></span>
            </a>
        );

        if (numPages <= 1) {
            pageLinks = [];
        }

        return (
            <div className="page-links" data-id={this.props["data-id"]}>
                {pageLinks}
            </div>
        );

    }
}

class PaginationStateless extends React.Component {
    static displayName = "PaginationStateless";

    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        "data-id": PropTypes.string,
        totalPages: PropTypes.number,
        onValueChange: PropTypes.func.isRequired,
        page: PropTypes.number,
        perPage: PropTypes.number,
        total: PropTypes.number
    };

    static defaultProps = {
        "data-id": "pagination",
        perPage: 10,
        totalPages: null
    };

    _getNumPages = () => {
        if (this.props.totalPages) {
            return this.props.totalPages;
        } else if (this.props.total && this.props.perPage) {
            return Math.ceil(this.props.total / this.props.perPage);
        } else {
            throw("Either props.totalPages OR (props.total and props.perPage) must be defined to \
                determine the number of page links to render!");
        }
    };

    _handlePageChange = (newPage) => {
        var page = newPage,
            numPages = this._getNumPages(),
            currentPage = page > numPages ? numPages : page,
            start = (currentPage - 1) * this.props.perPage,
            last = start + this.props.perPage;

        this.props.onValueChange({ first: start, last: last, page: currentPage });
    };

    render() {
        var numPages = this._getNumPages();

        //make sure current page isn't greater than number of pages
        var currentPage = parseInt(this.props.page) > numPages ? numPages : parseInt(this.props.page);
        return (
            <div
                className={this.props.className}
                data-id={this.props["data-id"]}>
                <PageLinks
                    currentPage={currentPage}
                    numPages={numPages}
                    onValueChange={this._handlePageChange}
                    key="topPageLinks"
                    data-id="topPageLinks" />
                {this.props.children}
                <PageLinks
                    currentPage={currentPage}
                    numPages={numPages}
                    onValueChange={this._handlePageChange}
                    key="bottomPageLinks"
                    data-id="bottomPageLinks" />
            </div>
        );
    }
}

class PaginationStateful extends React.Component {
    static displayName = "PaginationStateful";

    state = {
        page: 0
    };

    _onPageChange = (pagingDetails) => {
        var self = this;
        this.setState({
            page: pagingDetails.page
        }, function () {
            self.props.onValueChange(
                { first: pagingDetails.first, last: pagingDetails.last, page: pagingDetails.page }
            );
        });
    };

    render() {
        return (
            <PaginationStateless {...this.props} page={this.state.page} onValueChange={this._onPageChange}/>
        );
    }
}
