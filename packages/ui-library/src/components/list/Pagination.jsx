"use strict";

var React = require("react");
//var cx = require("classnames");
//var _ = require("underscore");

/**
 * @class PageLinks
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

    render: function () {
        var currentPage = this.props.currentPage,
            numPages = this.props.numPages,
            pageLinks = [];

        //previous page link
        pageLinks.push(<a
            name={currentPage <= 1 ? currentPage : currentPage - 1}
            key="previous"
            onClick={this.props.onClick}
            className={currentPage === 1 ? "disabled" : ""}>
                {"<<"}
            </a>);

        if (numPages <= 6) {
            for (var i = 0; i < this.props.numPages; i = i + 1) {
                var active = (i + 1) === currentPage ? "active" : "";
                var link = (<a name={i + 1}
                    className={active}
                    onClick={this.props.onClick}>
                        {i + 1}
                    </a>);
                pageLinks.push(link);
            }
        }
        else {
            //first page link
            pageLinks.push(<a
                name={1}
                key="first"
                className={currentPage === 1 ? "active" : "" }
                onMouseDown={this.props.onClick}>
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
                var link = (<a name={i + 1}
                        key={i + 1}
                        className={active}
                        onClick={this.props.onClick}>
                            {i + 1}
                        </a>);
                pageLinks.push(link);
            }
            //add ellipsis if needed
            if (currentPage < numPages - 3) {
                pageLinks.push("...");
            }
            //last page link
            pageLinks.push(<a
                name={numPages}
                key={numPages}
                className={currentPage === numPages ? "active" : "" }
                onMouseDown={this.props.onClick}>
                    {numPages}
                </a>);
        }

         //next page link
        pageLinks.push(<a
            name={currentPage >= numPages ? currentPage : currentPage + 1}
            key="next"
            onClick={this.props.onClick}>
            {">>"}
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
 * @class Pagination
 *
 * @desc Pagination displays page numbers to pass to parent and recieve page content as children
 *
 * @param {string} [className] - extra CSS classes to be applied
 * @param {string} [id] - it is used for a unique data-id
 * @param {number} [perPage] - number of results per page default 10
 * @param {number} total - total number of results
 * @param {function} onChange - Required parent callback
 * @param {number} [page] - optional for parent to set current page
 *
 *
 *
 * @example
 *
 *    <Pagination className = "result-set"
 *            perPage = {4}
 *            total = {20}
 *            onChange={this._callback}>
 *            {pageContent}
 *    </Pagination>
 *
 **/

var Pagination = React.createClass({

    displayName: "Pagination",

    propTypes: {
        className: React.PropTypes.string,
        id: React.PropTypes.string,
        perPage: React.PropTypes.number.isRequired,
        total: React.PropTypes.number.isRequired,
        onChange: React.PropTypes.func.isRequired,
        page: React.PropTypes.number
    },

    getInitialState: function () {
        return {
            page: 1
        };
    },

    getDefaultProps: function () {
        return {
            id: "pagination",
            perPage: 10
        };
    },

    componentWillMount: function () {
        var page = parseInt(this.state.page);
        this._getItems(page);

    },

    _handlePageChange: function (e) {
        var page = parseInt(e.target.name);
        this.setState({
            page: page
        });
        this._getItems(page);
    },

    //get items based on page
    _getItems: function (page) {
        var numPages = Math.ceil(this.props.total / this.props.perPage);
        var currentPage = page > numPages ? numPages : page;
        var start = (currentPage - 1) * this.props.perPage;
        var last = start + this.props.perPage;

        this.props.onChange(start, last, currentPage);
    },

    render: function () {
        var labelCss = this.props.className;
        var numPages = Math.ceil(this.props.total / this.props.perPage);
        //use parent set page if set, else use state
        var page = this.props.page ? this.props.page : this.state.page;
        //make sure current page isn't greater than number of pages
        var currentPage = parseInt(page) > numPages ? numPages : parseInt(page);

        return (
            <div
                className={labelCss}
                data-id={this.props.id} >
                <PageLinks
                    currentPage={currentPage}
                    numPages={numPages}
                    onClick={this._handlePageChange}/>
                {this.props.children}
                <PageLinks
                    currentPage={currentPage}
                    numPages={numPages}
                    onClick={this._handlePageChange}/>
            </div>
        );
    }
});


module.exports = Pagination;
