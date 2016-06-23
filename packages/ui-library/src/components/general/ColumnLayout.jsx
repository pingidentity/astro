"use strict";
var React = require("react"),
    classnames = require("classnames");

/**
 * @class ColumnLayout
 * @desc Renders vertical columns of content with equal percentage widths separated by a margin.
 *   The "content-nopad" css class may be passed in to render the columns without margin/padding
 *   between the columns.
**/

/**
* @class Row
* @memberof ColumnLayout
* @param {string} [id="content-columns"] - data-id on top-level HTML element.
* @param {string} [className] - added class name applied to the top-level HTML element.
* @desc the child tag/object used to pass in a row of content
*/

var Row = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        className: React.PropTypes.string
    },

    render: function () {
        var containerCss = {
            "content-columns": true
        };

        containerCss["columns-" + (React.Children.count(this.props.children) || 1)] = true;
        containerCss[this.props.className] = !!this.props.className;

        return (
            <div className={classnames(containerCss)} data-id={this.props.id}>
                {this.props.children}
            </div>
        );
    }
});


/**
 * @class Column
 * @memberof ColumnLayout
 * @param {string} [id] - data-id on an individual column.
 * @param {string} [className] - added class name applied to an individual column.
 * @desc the child tag/object used to pass in a column of content
 *
 * @example
 *    <Layout.Row id="columns-3">
 *        <Layout.Column>
 *            column content
 *        </Layout.Column>
 *        <Layout.Column>
 *            column content
 *        </Layout.Column>
 *        <Layout.Column>
 *            column content
 *        </Layout.Column>
 *    </Layout.Row>
**/

var Column = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        className: React.PropTypes.string
    },

    render: function () {
        return (
            <div className={classnames("content-column", this.props.className)} data-id={this.props.id}>
                {this.props.children}
            </div>
        );
    }
});

exports.Column = Column;
exports.Row = Row;
