var React = require("re-react"),
    classnames = require("classnames"),
    DragDropColumn = require("./DragDropColumn.jsx"),
    DragDropContext = require("react-dnd").DragDropContext,
    HTML5Backend = require("react-dnd/modules/backends/HTML5");

/**
 * @typedef {object} MultiDrag~ColumnData
 *
 * @property {string} name
 *    The name of the column.
 * @property {object[]} rows
 *    An array of objects that constintute the rows. These are free to have any shape,
 *    remember that this will correspond to the props that will be injected to each row when rendering them.
 * @property {string} [filter]
 *    A filter to display for the column.
 */

/**
 * @typedef {object} MultiDrag~MoveDescriptor
 *
 * @property {object} from
 *    The dragged item description.
 * @property {number} from.column
 *    The column index.
 * @property {number} from.index
 *    The row index.
 * @property {object} to
 *    The target item description.
 * @property {number} to.column
 *    The column index.
 * @property {number} to.index
 *    The row index.
 */

 /**
 * @typedef {object} MultiDrag~previewLocation
 *
 * @property {number} column
 *    The column index of the preview.
 * @property {numer} row
 *    The row index of the preview.
 */

 /**
 * @callback MultiDrag~onSearch
 *
 * @param {number} index
 *    Since the multi-Drag component supports search in all columns,
 *    each column needs to report which column (via the column index) a search affects.
 * @param {string} value
 *    The value to search for.
 */

 /**
 * @callback MultiDrag~onDragDrop
 *
 * @param {MultiDrag~MoveDescriptor} moveDescriptor
 *    The move descriptor for the drag.
 */

 /**
 * @callback MultiDrag~onCancel
 */

 /**
 * @callback MultiDrag~onScrolledToPosition
 *
 * @param {number} columnIndex
 *     The column index for the column scrolled.
 */

/**
 * @class MultiDrag
 * @desc A multi-column drag and drop view. This is designed to allow more than two columns though,
 *    the requirements only specify 2 columns needed. The consumer of the component is responsible for implementing
 *    the component type for each row. The component will iterate over a set of data and coerce each item to a
 *    row component.
 *
 * @param {string} [data-id="multi-drag"]
 *    To define the base "data-id" value for the top-level HTML container.
 * @param {string} [className]
 *    CSS classes to set on the top-level HTML container.
 *
 * @param {MultiDrag~ColumnData[]} columns
 *    The data representing the columns in the component.
 * @param {MultiDrag~previewLocation} [previewMove]
 *    If passed, will render a placeholder in MultiDrag~previewLocation specified.
 *    This is used to give feedback when a user drags a row to a new location but has not released the mouse.
 * @param {string[]} [classNames]
 *    The classnames to assign to each column.
 *    By default the first column will have rows-available applied and the second rows-added.
 * @param {boolean} [showSearchOnAllColumns=false]
 *    Display searchbar on all columns.
 * @param {boolean} [showSearch=false]
 *    Dispaly searchbar on the first column.
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
 * @example
 *    <MultiDrag
 *               showSearchOnAllColumns={this.props.demo.search === "all"}
 *              showSearch={this.props.demo.search === "first"}
 *              onSearch={this.onSearch}
 *              columns={this.props.drag.columns}
 *              previewMove={this.props.drag.placeholder}
 *              onScrolledToTop={this.onScrolledToTop}
 *              onScrolledToBottom={this.onScrolledToBottom}
 *              onCancel={this.onCancel}
 *              onDrop={this.onDrop}
 *              onDrag={this.onDrag}
 *              contentType={contentType} />
 */
var MultiDrag = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        className: React.PropTypes.string,
        columns: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                name: React.PropTypes.string,
                filter: React.PropTypes.string,
                rows: React.PropTypes.array
            })
        ).isRequired.affectsRendering,
        showSearchOnAllColumns: React.PropTypes.bool.affectsRendering,
        showSearch: React.PropTypes.bool.affectsRendering,
        previewMove: React.PropTypes.shape({
            column: React.PropTypes.number.affectsRendering,
            row: React.PropTypes.number.affectsRendering
        }),
        contentType: React.PropTypes.element.isRequired.affectsRendering,
        classNames: React.PropTypes.arrayOf(
            React.PropTypes.string
        ).affectsRendering,
        //callbacks
        onSearch: React.PropTypes.func.isRequired,
        onDrag: React.PropTypes.func.isRequired,
        onDrop: React.PropTypes.func.isRequired,
        onCancel: React.PropTypes.func.isRequired,
        onScrolledToBottom: React.PropTypes.func,
        onScrolledToTop: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            "data-id": "multi-drag",
            classNames: ["rows-available", "rows-added"],
            showSearchOnAllColumns: false,
            showSearch: false
        };
    },

    /*
     * This function will compare the current move to the last reported drag and if there is no change
     * return null, otherwise the MoveDescriptor
     */
    _changedSinceLastDrag: function (targetIndex, beingDraggedIndex, targetColumn, beingDraggedColumn) {
        if (this._lastDrag &&
            this._lastDrag.from.column === beingDraggedColumn &&
            this._lastDrag.from.index === beingDraggedIndex &&
            this._lastDrag.to.column === targetColumn &&
            this._lastDrag.to.index === targetIndex)
        {
            return null;
        }

        return {
            from: { column: beingDraggedColumn, index: beingDraggedIndex },
            to: { column: targetColumn, index: targetIndex }
        };
    },

    /*
     * Check the MoveDescriptor and block moving from the current position the same position or
     * the one position higher.
     */
    _isValidDrag: function () {
        return !(
            this._lastDrag &&
            this._lastDrag.from.column === this._lastDrag.to.column &&
            (
                this._lastDrag.from.index - this._lastDrag.to.index === -1 ||
                this._lastDrag.from.index - this._lastDrag.to.index === 0
            ));
    },

    /*
     * Call onDrop here because suppose the user drags a row to the top of a list but the mouse overshoots
     * the boundary of the list.  We still want to apply the last valid move in this case.
     */
    _onCancel: function () {
        if (this._lastDrag && this._isValidDrag()) {
            this.props.onDrop(this._lastDrag);
        }
        this._lastDrag = null;
        this.props.onCancel();
    },

    /*
     * Determines if the current onDrag call has changed since the last call, and if so executes the
     * component's onDrag callback.
     */
    _onDrag: function (targetIndex, beingDraggedIndex, targetColumn, beingDraggedColumn) {//eslint-disable-line
        var desc = this._changedSinceLastDrag.apply(this, arguments);

        //if nothing has changed, dont execute the callback
        if (!desc || typeof(targetIndex) === "undefined") {
            return;
        }

        this._lastDrag = desc;

        if (this._isValidDrag()) {
            this.props.onDrag(desc);
        }
    },

    /*
     * Dont actually need to implement onDrop because onCancel is always called and we want to
     * apply the last previewed move, even if the mouse is currently over an undroppable object.
     *
     * Only here because DragDropRow mandates passing something
     */
    _onDrop: function () {
    },

    render: function () {
        var preview = this.props.previewMove;

        var className = classnames("input-row row-selector", this.props.className);

        return (
            <div data-id={this.props["data-id"]} className={className}>
            {
                this.props.columns.map(function (column, index) {
                    return (
                        <DragDropColumn {...column} key={index} index={index}
                            rows={column.filteredRows || column.rows}
                            showSearch={(this.props.showSearch && index === 0) || this.props.showSearchOnAllColumns}
                            onSearch={this.props.onSearch}
                            onScrolledToBottom={this.props.onScrolledToBottom}
                            onScrolledToTop={this.props.onScrolledToTop}
                            onDrag={this._onDrag}
                            onDrop={this._onDrop}
                            onCancel={this._onCancel}
                            ghostRowAt={preview && preview.column === index ? preview.index : null}
                            className={this.props.classNames[index]}
                            contentType={this.props.contentType} />);
                }.bind(this))
            }
            </div>);
    }
});

module.exports = DragDropContext(HTML5Backend)(MultiDrag);
