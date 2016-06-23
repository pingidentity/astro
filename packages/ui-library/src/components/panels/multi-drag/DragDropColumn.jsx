var React = require("re-react"),
    ReactDOM = require("react-dom"),
    FormTextField = require("../../forms/form-text-field"),
    FormLabel = require("../../forms/FormLabel.jsx"),
    DDRow = require("../../rows/DragDropRow.jsx"),
    classnames = require("classnames"),
    _ = require("underscore");

/**
 * @private
 * @class MultiDrag#DDColumn
 * @desc This component is internal to the MultiDrag component and is used to render a column of drag/drop rows.
 * @param {object[]} rows - The row objects.  The shape of these objects must correspond to the expected props
 * of your contentType.
 * @param {string} name - The name of the column
 * @param {number} index - The index of the column.  Used when executing callbacks
 * @param {string} filter - the filter to display in the search field
 * @param {object} contentType - A react component to be used as a template for rendering rows.
 * @param {string} labelEmpty - The placeholder string for when a column is empty
 * @param {bool} [showSearch=false] - determines if the searchbox should be shown
 * @param {string} [className] - Optional classname
 * @param {number} [ghostRowAt] - display a ghost row to preview where a row would be inserted
 *
 * @param {function} onSearch - onSearch callback.
 * @param {function} onDrag - onDrag callback.  Will be given a MultiDrag#MoveDescriptor
 * @param {function} onDrop - onDrop callback.  Will be given a MultiDrag#MoveDescriptor
 * @param {function} onCancel - A callback executed after every drag event ends
 * @param {function} [onScrolledToTop] - a callback executed when the list is scrolled to the top.
 * @param {function} [onScrolledToBottom] - a callback executed when the list is scrolled to the bottom (can be used
 * to fetch more data.
 */
module.exports = React.createClass({
    propTypes: {
        rows: React.PropTypes.arrayOf(
            React.PropTypes.object
        ).isRequired.affectsRendering,
        name: React.PropTypes.string.isRequired.affectsRendering,
        index: React.PropTypes.number.isRequired.affectsRendering,
        filter: React.PropTypes.string.affectsRendering,
        contentType: React.PropTypes.element.isRequired.affectsRendering,
        labelEmpty: React.PropTypes.string.affectsRendering,
        //optional
        showSearch: React.PropTypes.bool.affectsRendering,
        ghostRowAt: React.PropTypes.number.affectsRendering,
        className: React.PropTypes.string.affectsRendering,
        //callbacks
        onDrag: React.PropTypes.func.isRequired,
        onDrop: React.PropTypes.func.isRequired,
        onCancel: React.PropTypes.func.isRequired,
        onScrolledToBottom: React.PropTypes.func,
        onScrolledToTop: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            showSearch: false,
            labelEmpty: "Empty",
            onScrolledToBottom: _.noop,
            onScrolledToTop: _.noop
        };
    },

    /*
     * Since the multi-Drag component supports search in all columns, each column needs to report which
     * column a search affects.
     */
    _handleSearch: function (value) {
        this.props.onSearch(this.props.index, value);
    },

    /*
     * Handler for scrolls.  This is useful for implementing lazy loading of rows
     */
    _handleScroll: function () {
        var container = ReactDOM.findDOMNode(this.refs.items);
        var rect = container.getBoundingClientRect();

        if (container.scrollTop === 0) {
            this.props.onScrolledToTop(this.props.index);
        } else if (container.scrollTop + rect.height === container.scrollHeight) {
            this.props.onScrolledToBottom(this.props.index);
        }
    },

    /*
     * Renders the searchbar if the prop is set
     */
    _renderSearch: function () {
        if (!this.props.showSearch) {
            return null;
        }

        return (
            <div className="input-row" data-id="search">
                <FormTextField controlled={true}
                    onValueChange={this._handleSearch}
                    value={this.props.filter}
                    className="search" />
            </div>);
    },

    /*
     * Renders a drag/drop from give a data object
     */
    _renderRow: function (row, index, opts) {
        var inner = opts && opts.content;

        if (!inner) {
            var props = _.extend({ column: this.props.index, index: index }, row);
            inner = React.cloneElement(this.props.contentType, props);
        }

        return (
            <DDRow id={row.id} key={row.id} index={index}
                   disabled={opts && opts.disabled}
                   column={this.props.index}
                   onDrag={this.props.onDrag}
                   onDrop={this.props.onDrop}
                   onCancel={this.props.onCancel}>
            {
                inner
            }
            </DDRow>);
    },

    _renderRows: function () {
        if (!this.props.rows || this.props.rows.length === 0) {
            var className = classnames("no-items", {
                preview: typeof(this.props.ghostRowAt) === "number"
            });

            return this._renderRow({ id: 0 }, 0, {
                content: <div data-id="empty-placeholder" className={className}>{this.props.labelEmpty}</div>,
                disabled: true
            });
        }

        var rows = this.props.rows.map(this._renderRow);

        //if there's a preview add it after so it doesnt screw up the indexing
        if (typeof(this.props.ghostRowAt) === "number") {
            rows.splice(this.props.ghostRowAt, 0, this._renderRow({
                preview: true,
                id: "preview"
            }, this.props.ghostRowAt));
        }

        return rows;
    },

    render: function () {
        return (
            <div className={this.props.className}>
                <FormLabel value={this.props.name} />

                { this._renderSearch() }

                <div className="items" onScroll={this._handleScroll} ref="items">
                    { this._renderRows() }
                </div>
            </div>);
    }
});
