var React = require("re-react"),
    ReactDOM = require("react-dom"),
    FormSearchBox = require("../../forms/FormSearchBox.jsx"),
    FormLabel = require("../../forms/FormLabel.jsx"),
    DDRow = require("../../rows/DragDropRow.jsx"),
    classnames = require("classnames"),
    _ = require("underscore");

/**
 * @class MultiDrag#DragDropColumn
 * @private
 * @ignore
 *
 * @desc This component is internal to the MultiDrag component and is used to render a column of drag/drop rows.
 *
 * @param {string} [data-id="drag-drop-column"]
 *    To define the base "data-id" value for the top-level HTML container.
 *
 * @param {object[]} rows
 *    The row objects. The shape of these objects must correspond to the expected props of your contentType.
 * @param {string} name
 *    The name of the column.
 * @param {number} index
 *    The index of the column. Used when executing callbacks.
 * @param {string} filter
 *    The filter to display in the search field.
 * @param {object} contentType
 *    A react component to be used as a template for rendering rows.
 * @param {string} [labelEmpty]
 *    The placeholder string for when a column is empty.
 * @param {boolean} [showSearch=false]
 *    Determines if the searchbox should be shown.
 * @param {string} [className]
 *    CSS classes to set on the top-level HTML container.
 * @param {number} [ghostRowAt]
 *    Display a ghost row to preview where a row would be inserted
 * @param {boolean} [disableSort=false]
 *    Determines whether the column in internally sortable
 *
 * @param {MultiDrag~onSearch} onSearch
 *    Callback to be triggered when a column is searched.
 * @param {MultiDrag~onDragDrop} onDrag
 *    Callback to be triggered when a row is dragged.
 * @param {MultiDrag~onDragDrop} onDrop
 *    Callback to be triggered when a row id dropped.
 * @param {MultiDrag~onCancel} onCancel
 *    Callback to be triggered when a drag event ends.
 * @param {MultiDrag~onScrolledToPosition} [onScrolledToTop]
 *    Callback to be triggered when the list is scrolled to the top.
 * @param {MultiDrag~onScrolledToPosition} [onScrolledToBottom]
 *    Callback to be triggered when the list is scrolled to the bottom. Can be used to fetch more data.
 *
 * @param {MultiDrag~onDragStart} [onDragStart]
 *    Callback to be triggered when a drag event starts.
 * @param {MultiDrag~onDragEnd} [onDragEnd]
 *    Callback to be triggered when a drag even ends.
 *
 */
module.exports = React.createClass({
    propTypes: {
        "data-id": React.PropTypes.string,
        rows: React.PropTypes.arrayOf(
            React.PropTypes.object
        ).isRequired.affectsRendering,
        name: React.PropTypes.string.isRequired.affectsRendering,
        index: React.PropTypes.number.isRequired.affectsRendering,
        filter: React.PropTypes.string.affectsRendering,
        contentType: React.PropTypes.element.isRequired.affectsRendering,
        labelEmpty: React.PropTypes.string.affectsRendering,
        // optional
        showSearch: React.PropTypes.bool.affectsRendering,
        ghostRowAt: React.PropTypes.number.affectsRendering,
        className: React.PropTypes.string.affectsRendering,
        disableSort: React.PropTypes.bool.affectsRendering,
        // callbacks
        onSearch: React.PropTypes.func.isRequired,
        onDrag: React.PropTypes.func.isRequired,
        onDrop: React.PropTypes.func.isRequired,
        onCancel: React.PropTypes.func.isRequired,
        onScrolledToBottom: React.PropTypes.func,
        onScrolledToTop: React.PropTypes.func,
        onDragStart: React.PropTypes.func,
        onDragEnd: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            "data-id": "drag-drop-column",
            showSearch: false,
            onScrolledToBottom: _.noop,
            onScrolledToTop: _.noop,
            labelEmpty: "No Items Added",
            onDragStart: _.noop,
            onDragEnd: _.noop
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
                <FormSearchBox
                    onValueChange={this._handleSearch}
                    queryString={this.props.filter}
                    className="input-search"/>
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
                   onDragStart={this.props.onDragStart}
                   onDragEnd={this.props.onDragEnd}
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

        // if there's a preview add it after so it doesnt screw up the indexing
        if (typeof(this.props.ghostRowAt) === "number") {
            var index = Math.min(this.props.rows.length, this.props.ghostRowAt);

            rows.splice(index, 0, this._renderRow({
                preview: true,
                id: "preview"
            }, index));
        }

        return rows;
    },

    render: function () {
        
        var className = classnames(
            this.props.className, {
                "disable-sort": this.props.disableSort
            }
        );
        
        return (
            <div data-id={this.props["data-id"]} className={className}>
                <FormLabel value={this.props.name} />

                { this._renderSearch() }

                <div className="items" onScroll={this._handleScroll} ref="items">
                    { this._renderRows() }
                </div>
            </div>);
    }
});
