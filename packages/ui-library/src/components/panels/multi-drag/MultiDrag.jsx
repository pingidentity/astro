var React = require("re-react"),
    ReactVanilla = require("react"),
    classnames = require("classnames"),
    DragDropColumn = require("./DragDropColumn.jsx"),
    DragDropContext = require("react-dnd").DragDropContext,
    HTML5Backend = require("react-dnd-html5-backend"),
    search = require("./MultiDragReducer.js").search,
    move = require("./MultiDragReducer.js").move,
    reapplyFilters = require("./MultiDragReducer.js").reapplyFilters,
    Utils = require("../../../util/Utils.js"),
    _ = require("underscore");

/**
 * @typedef {object} MultiDrag~IndexesDescriptor
 *
 * @property {number} from
 *    The index of the dragged row.
 * @property {number} to
 *    The index of the destination row.
 */

/**
 * @function MultiDrag.convertFilteredIndexes
 * @desc When dragging items to and from a filtered list, the to/from indexes the the component reports
 *    won't accurately describe what the underlying move in the unfiltered list should look like.
 *    We have to do some logic to convert back the indexes relative to the unfiltered rows.
 *
 * @param {MultiDrag~ColumnData[]} columns
 *    The data representing the columns in the component.
 * @param {MultiDrag~MoveDescriptor} desc
 *    The move descriptor for the drag.
 *
 * @return {MultiDrag~IndexesDescriptor}
 *    The indexes descriptor for the drag with the indexes converted.
 */
function convertFilteredIndexes (columns, desc) {
    //find the index in the unfiltered columns
    var from = columns[desc.from.column].rows.indexOf(
        columns[desc.from.column].filteredRows[desc.from.index]);

    var to = desc.to.index >= columns[desc.to.column].filteredRows.length
        //if an item is being dragged to the end of the list, append it to the end of the unfiltered list
        ? columns[desc.to.column].rows.length
        : columns[desc.to.column].rows.indexOf(
            columns[desc.to.column].filteredRows[desc.to.index]);

    return { from: from, to: to };
}

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
 * @typedef {object} MultiDrag~MoveObject
 *
 * @property {number} column
 *    The dragged/target column index.
 * @property {number} index
 *    The index dragged from/to.
 */

/**
 * @typedef {object} MultiDrag~MoveDescriptor
 *
 * @property {MultiDrag~MoveObject} from
 *    The dragged item location description.
 * @property {MultiDrag~MoveObject} to
 *    The target item location description.
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
 * @callback MultiDrag~onDragStart
 */

 /**
 * @callback MultiDrag~onDragEnd
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
 * @param {boolean} [stateless]
 *     To enable the component to be externally managed. True will relinquish control to the component's owner.
 *     False or not specified will cause the component to manage state internally.
 *     stateless=false will handle filtering and moving in addition to executing all callbacks if specified.
 * @param {boolean} [controlled=false]
 *     DEPRECATED. Use "stateless" instead.
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
 * @param {string[]} [filterFieldNames=[]]
 *    An array of field names of the row properties to use in a search where array index corresponds to each column index.
 *    If unset for any column index, search will use all row properties that have a string representation for that column.
 *    Only used when stateless=false.
 * @param {boolean} [disabled=false]
 *    Disables the MultiDrag component
 * @param {string} [labelEmpty]
 *    Sets the text for the right column when no items are added
 *
 * @param {MultiDrag~onSearch} onSearch
 *    Callback to be triggered when a column is searched. When stateless=false, will be executed after search has
 *    completed and the component re-renders.
 * @param {MultiDrag~onDragDrop} onDrag
 *    Callback to be triggered when a row is dragged. When stateless=false, will be executed after drag has
 *    completed and the component re-renders.
 * @param {MultiDrag~onDragDrop} onDrop
 *    Callback to be triggered when a row id dropped. When stateless=false, will be executed after drop has
 *    completed and the component re-renders.
 * @param {MultiDrag~onCancel} onCancel
 *    Callback to be triggered when a drag event ends. When stateless=false, will be executed after cancel has
 *    completed and the component re-renders.
 * @param {MultiDrag~onScrolledToPosition} [onScrolledToTop]
 *    Callback to be triggered when the list is scrolled to the top. Can be used to fetch more data.
 * @param {MultiDrag~onScrolledToPosition} [onScrolledToBottom]
 *    Callback to be triggered when the list is scrolled to the bottom. Can be used to fetch more data.
 *
 * @param {MultiDrag~onDragStart} [onDragStart]
 *    Callback to be triggered when a drag event starts.
 * @param {MultiDrag~onDragEnd} [onDragEnd]
 *    Callback to be triggered when a drag even ends.
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
var MultiDragStateless = React.createClass({
    displayName: "MultiDragStateless",

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
        // re-react doesn't wrap the React.PropTypes.shape validator with affectsRendering,
        // so can't specify shape of object for previewMove otherwise it won't re-render
        previewMove: React.PropTypes.object.affectsRendering,
        contentType: React.PropTypes.element.isRequired.affectsRendering,
        classNames: React.PropTypes.arrayOf(
            React.PropTypes.string
        ).affectsRendering,
        // callbacks
        onSearch: React.PropTypes.func.isRequired,
        onDrag: React.PropTypes.func.isRequired,
        onDrop: React.PropTypes.func.isRequired,
        onCancel: React.PropTypes.func.isRequired,
        onScrolledToBottom: React.PropTypes.func,
        onScrolledToTop: React.PropTypes.func,
        // optional items
        labelEmpty: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        onDragStart: React.PropTypes.func,
        onDragEnd: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            "data-id": "multi-drag",
            classNames: ["rows-available", "rows-added"],
            showSearchOnAllColumns: false,
            showSearch: false,
            disabled: false
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
        var className = classnames(
                            "input-row row-selector",
                            this.props.className, {
                                disabled: this.props.disabled
                            });

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
                            onDragStart={this.props.onDragStart}
                            onDragEnd={this.props.onDragEnd}
                            onCancel={this._onCancel}
                            ghostRowAt={preview && preview.column === index ? preview.index : null}
                            className={this.props.classNames[index]}
                            contentType={this.props.contentType}
                            data-id={"DragDropColumn-" + index}
                            labelEmpty={this.props.labelEmpty} />);
                }.bind(this))
            }
            </div>);
    }
});

var MultiDragStateful = ReactVanilla.createClass({
    displayName: "MultiDragStateful",

    propTypes: {
        filterFieldNames: React.PropTypes.arrayOf(React.PropTypes.string)
    },

    getDefaultProps: function () {
        return {
            filterFieldNames: []
        };
    },

    _handleSearch: function (index, value) {
        this.setState(search(this.state, {
            column: index,
            filter: value,
            fieldName: this.props.filterFieldNames[index]
        }), function () {
            if (this.props.onSearch) {
                this.props.onSearch(index, value);
            }
        });
    },

    _handleCancel: function () {
        this.setState({
            placeholder: null
        }, function () {
            if (this.props.onCancel) {
                this.props.onCancel();
            }
        });
    },

    _handleDrop: function (desc) {
        var convertedDesc = convertFilteredIndexes(this.state.columns, desc);

        var next = move(this.state, {
            from: { column: desc.from.column, index: convertedDesc.from },
            to: { column: desc.to.column, index: convertedDesc.to }
        });

        //reapply filters after a move so moved rows filtered as well
        next = reapplyFilters(next);
        this.setState(next, function () {
            if (this.props.onDrop) {
                this.props.onDrop(desc);
            }
        });
    },

    _handleDrag: function (desc) {
        this.setState({
            placeholder: desc.to
        }, function () {
            if (this.props.onDrag) {
                this.props.onDrag(desc);
            }
        });
    },

    componentWillMount: function () {
        //apply any initial filters
        var next = _.clone(this.state);
        next = reapplyFilters(next);
        this.setState(next);
    },

    componentWillReceiveProps: function (nextProps) {
        if (!_.isEqual(nextProps.columns, this.props.columns)) {
            //update columns and reapply filters
            var next = _.clone(this.state);
            next.columns = nextProps.columns;
            next = reapplyFilters(next);
            this.setState(next);
        }
    },

    getInitialState: function () {
        return {
            columns: this.props.columns,
            placeholder: null
        };
    },

    render: function () {
        var props = _.defaults({
            ref: "MultiDragStateless",
            onSearch: this._handleSearch,
            columns: this.state.columns,
            previewMove: this.state.placeholder,
            onCancel: this._handleCancel,
            onDrop: this._handleDrop,
            onDrag: this._handleDrag
        }, this.props);

        return React.createElement(MultiDragStateless, props);
    }
});

var MultiDrag = ReactVanilla.createClass({
    displayName: "MultiDrag",

    propTypes: {
        controlled: React.PropTypes.bool, //TODO remove in new version
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

        return stateless
            ? React.createElement(MultiDragStateless, _.defaults({ ref: "MultiDragStateless" }, this.props))
            : React.createElement(MultiDragStateful, _.defaults({ ref: "MultiDragStateful" }, this.props));
    }
});

var MultiDragDropContext = DragDropContext(HTML5Backend)(MultiDrag);

MultiDragDropContext.convertFilteredIndexes = convertFilteredIndexes;

module.exports = MultiDragDropContext;
