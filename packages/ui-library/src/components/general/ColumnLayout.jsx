"use strict";
var React = require("react"),
    classnames = require("classnames"),
    Utils = require("../../util/Utils.js");

/**
 * @class ColumnLayout
 * @desc Renders vertical columns of content with equal percentage widths separated by a margin.
 *   The "content-nopad" css class may be passed in to render the columns without margin/padding
 *   between the columns.
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
 */

/**
* @class Row
* @memberof ColumnLayout
* @desc The child tag/object used to pass in a row of content.
*
* @param {string} [data-id="row"]
*     To define the base "data-id" value for the top-level HTML container.
* @param {string} [id]
*     DEPRECATED. Use "data-id" instead.
* @param {string} [className]
*     CSS classes to set on the top-level HTML container.
*/

var Row = React.createClass({
    propTypes: {
        "data-id": React.PropTypes.string,
        id: React.PropTypes.string, //TODO: remove when v1 no longer supported
        className: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            "data-id": "row"
        };
    },

    componentWillMount: function () {
        if (this.props.id && !Utils.isProduction()) {
            console.warn(Utils.deprecateMessage("id", "data-id"));
        }
    },

    render: function () {
        var id = this.props.id || this.props["data-id"],
            className = classnames("content-columns", this.props.className,
                "columns-" + (React.Children.count(this.props.children) || 1));

        return (
            <div data-id={id} className={classnames(className)}>
                {this.props.children}
            </div>
        );
    }
});


/**
 * @class Column
 * @memberof ColumnLayout
 * @desc The child tag/object used to pass in a column of content.
 *
 * @param {string} [data-id="column-layout"]
 *     To define the base "data-id" value for the top-level HTML container.
 * @param {string} [id]
 *     DEPRECATED. Use "data-id" instead.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 */

var Column = React.createClass({
    propTypes: {
        "data-id": React.PropTypes.string,
        id: React.PropTypes.string, //TODO: remove when v1 no longer supported
        className: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            "data-id": "column-layout"
        };
    },

    componentWillMount: function () {
        if (this.props.id) {
            console.warn(Utils.deprecateMessage("id", "data-id"));
        }
    },

    render: function () {
        var id = this.props.id || this.props["data-id"],
            className = classnames("content-column", this.props.className);

        return (
            <div data-id={id} className={className}>
                {this.props.children}
            </div>
        );
    }
});

exports.Column = Column;
exports.Row = Row;
