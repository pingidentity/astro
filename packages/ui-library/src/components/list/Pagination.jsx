"use strict";

var React = require("react");
var _ = require("underscore");


module.exports = React.createClass({

    propTypes: {
        controlled: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            controlled: false
        };
    },

    render: function () {
        return (
            this.props.controlled
                ? <Stateless {...this.props} />
                : <Stateful {...this.props} />);
    }
});

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
 *       onClick = {this._handlePageChange}/>
 **/

var PageLinks = React.createClass({
    propTypes: {
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
        var currentPage = this.props.currentPage,
            numPages = this.props.numPages,
            pageLinks = [];

        //previous page link
        pageLinks.push(<a key="previous"
                          onClick={_.partial(this._onLinkClick, _, (currentPage <= 1 ? currentPage : currentPage - 1))}
                          className={currentPage === 1 ? "disabled" : ""}>
            <span className="icon-previous"></span>
        </a>);

        if (numPages <= 6) {
            for (var i = 0; i < this.props.numPages; i = i + 1) {
                var active = (i + 1) === currentPage ? "active" : "";
                var link = (<a key={i + 1}
                               className={active}
                               onClick={_.partial(this._onLinkClick, _, i+1)}>
                    {i + 1}
                </a>);
                pageLinks.push(link);
            }
        }
        else {
            //first page link
            pageLinks.push(<a key="first"
                              className={currentPage === 1 ? "active" : "" }
                              onClick={_.partial(this._onLinkClick, _, 1)}>
                {1}
            </a>);
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
                var link = (<a key={i + 1}
                               className={active}
                               onClick={_.partial(this._onLinkClick, _, i+1)}>
                    {i + 1}
                </a>);
                pageLinks.push(link);
            }
            //add ellipsis if needed
            if (currentPage < numPages - 3) {
                pageLinks.push("...");
            }
            //last page link
            pageLinks.push(<a key={numPages}
                              className={currentPage === numPages ? "active" : "" }
                              onClick={_.partial(this._onLinkClick, _, numPages)}>
                {numPages}
            </a>);
        }

        //next page link
        pageLinks.push(<a key="next" className={currentPage === numPages ? "disabled" : ""}
                  onClick={_.partial(this._onLinkClick, _, (currentPage >= numPages ? currentPage : currentPage + 1))}>
            <span className="icon-next"></span>
        </a>);

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

/**
 * @callback Pagination~onChangeCallback
 * @param {number} first - first item index for newly selected page
 * @param {number} last - last item index for newly selected page
 * @param {number} page - newly selected page number
 */

/**
 * @class Pagination
 *
 * @desc Pagination displays paging controls around its children content. Page navigation rulers are displayed above and
 * beyond content.
 *
 * @param {string} [className] - extra CSS classes to be applied
 * @param {string} [id="pagination] - it is used for a unique data-id
 * @param {number} [perPage=10] - number of results per page
 * @param {number} total - total number of items to paginate
 * @param {number} totalPages - total number of pages (alternate to passing total records)
 * @param {Pagination~onChangeCallback} onChange - callback to be trigger when new page selected
 * @param {number} [page] - currently selected page number. Respected only with externally managed variant.
 * @param {bool} [controlled=false] - A boolean to enable the component to be externally managed.  True will relinquish
 *   control to the components owner.  False or not specified will cause the component to manage state internally
 *   but still execute the onToggle callback in case the owner is interested.
 *
 * @example
 *
 *    <Pagination
 *        className="result-set"
 *        onChange={this._onPageChanged}
 *        page={this.state.currentPage}
 *        perPage={5}
 *        total={this.state.items.length} >
 *        {itemNodes}
 *    </Pagination>
 *    // OR (pass totalPages instead of total)
 *    <Pagination
 *        className="result-set"
 *        onChange={this._onPageChanged}
 *        page={this.state.currentPage}
 *        perPage={5}
 *        totalPages={Math.ceil(this.state.items.length/5)} >
 *        {itemNodes}
 *    </Pagination>
 *
 **/

var Stateless = React.createClass({

    displayName: "Pagination",

    propTypes: {
        className: React.PropTypes.string,
        id: React.PropTypes.string,
        totalPages: React.PropTypes.number,
        onChange: React.PropTypes.func.isRequired,
        page: React.PropTypes.number,
        perPage: React.PropTypes.number,
        total: React.PropTypes.number
    },

    getDefaultProps: function () {
        return {
            id: "pagination",
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

        this.props.onChange(start, last, currentPage);
    },

    render: function () {
        var numPages = this._getNumPages();

        //make sure current page isn't greater than number of pages
        var currentPage = parseInt(this.props.page) > numPages ? numPages : parseInt(this.props.page);

        return (
            <div
                className={this.props.className}
                data-id={this.props.id}>
                <PageLinks
                    currentPage={currentPage}
                    numPages={numPages}
                    onClick={this._handlePageChange}
                    key="topPageLinks" />
                {this.props.children}
                <PageLinks
                    currentPage={currentPage}
                    numPages={numPages}
                    onClick={this._handlePageChange}
                    key="bottomPageLinks" />
            </div>
        );
    }
});

var Stateful = React.createClass({

    getInitialState: function () {
        return {
            page: 0
        };
    },

    _onPageChange: function (first, last, newPage) {

        var self = this;

        this.setState({
            page: newPage
        }, function () {
            self.props.onChange(first, last, newPage);
        });
    },

    render: function () {
        return (
            <Stateless {...this.props} page={this.state.page} onChange={this._onPageChange}/>
        );
    }
});
