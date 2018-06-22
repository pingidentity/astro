"use strict";
var PropTypes = require("prop-types");
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
* @param {string} [className]
*     CSS classes to set on the top-level HTML container.
* @param {boolean} [divided]
*     When true, put dividers in gaps between columns
* @param {boolean} [noMargin]
*     When true, don't add margin between columns
* @param {boolean} [autoWidth]
*     When true, columns don't take up whole width
*/

class Row extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        divided: PropTypes.bool,
    };

    static defaultProps = {
        "data-id": "row"
    };

    componentWillMount() {
        if (!Utils.isProduction() && this.props.id) {
            throw new Error(Utils.deprecatePropError("id", "data-id"));
        }
    }

    render() {
        var className = classnames(
            "content-columns", this.props.className,
            "columns-" + (React.Children.count(this.props.children) || 1),
            {
                "content-columns--divided": this.props.divided,
                "columns-margin-none": this.props.noMargin,
                "columns-width-auto": this.props.autoWidth,
            }
        );
        // Note: the columns-[number] class seems to be unecessary now that the component
        // uses flexbox. Let's remove this in V4.

        return (
            <div data-id={this.props["data-id"]} className={classnames(className)}>
                {this.props.children}
            </div>
        );
    }
}

/**
 * @class Column
 * @memberof ColumnLayout
 * @desc The child tag/object used to pass in a column of content.
 *
 * @param {string} [data-id="column-layout"]
 *     To define the base "data-id" value for the top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 */

class Column extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string
    };

    static defaultProps = {
        "data-id": "column-layout"
    };

    componentWillMount() {
        if (!Utils.isProduction() && this.props.id) {
            throw new Error(Utils.deprecatePropError("id", "data-id"));
        }
    }

    render() {
        return (
            <div data-id={this.props["data-id"]} className={classnames("content-column", this.props.className)}>
                {this.props.children}
            </div>
        );
    }
}

exports.Column = Column;
exports.Row = Row;
