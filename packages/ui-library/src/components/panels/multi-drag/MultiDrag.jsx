import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";
import DragDropColumn from "./DragDropColumn";
import MultiDragRow from "./MultiDragRow";
import { move, reapplyFilters, search } from "./MultiDragReducer.js";
import update from "re-mutable";
import Utils from "../../../util/Utils.js";
import FormSearchBox from "../../forms/FormSearchBox";
import _ from "underscore";

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
        columns[desc.from.column].filteredRows[desc.from.index]
    );

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
 * @property {string} labelEmpty
 *    Empty label for the column. Overrides labelEmpty prop for the component as a whole, but falls back
 *    on that prop if not provided.
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
 * @property {number} [convertedIndex]
 *    The index dragged from/to, converted from filtered to unfiltered index if filtering is applied;
 *    only supplied by stateful implemenation.
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
* @property {number} row
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
 *
 * @param {MultiDrag~ColumnData[]} columns
 *    The data representing the columns in the component.
 * @param {MultiDrag~previewLocation} [previewMove]
 *    If passed, will render a placeholder in MultiDrag~previewLocation specified.
 *    This is used to give feedback when a user drags a row to a new location but has not released the mouse.
 * @param {string[]} [classNames]
 *    The classnames to assign to each column.
 *    By default the first column will have row-selector__available applied and the second row-selector__added.
 * @param {boolean} [showSearchOnAllColumns=false]
 *    Display searchbar on all columns.
 * @param {boolean} [showSearch=false]
 *    Display searchbar on the first column.
 * @param {boolean} [showCategoryFilterOnAllColumns=false]
 *    Display category list on all columns.
 * @param {boolean} [showCategoryFilter=false]
 *    Display category list on the first column.
 * @param {string[]} [filterFieldNames=[]]
 *    An array of field names of the row properties to use in a search where array index corresponds to each column index.
 *    If unset for any column index, search will use all row properties that have a string representation for that column.
 *    Only used when stateless=false.
 * @param {boolean} [disabled=false]
 *    Disables the MultiDrag component
 * @param {string} [labelEmpty]
 *    Sets the text for the right column when no items are added
 * @param {array} [categoryList]
 *    The list of categories that you can filter rows by
 * @param {object} contentType
 *    A react component to be used as a template for rendering rows. Can also be a function that returns JSX;
 *    function is passed all of the props of the column, including its handlers.
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
 * @param {MultiDrag~customSort} [customSort]
 *    Callback to sort rows according to custom criteria. Expects to receive rows as a return value.
 * @param {array} [flags]
 *     Set the flag for "use-portal" to render with popper.js and react-portal
 *
 * @example
 *    <MultiDrag
 *        showSearchOnAllColumns={this.props.demo.search === "all"}
 *        showSearch={this.props.demo.search === "first"}
 *        onSearch={this.onSearch}
 *        columns={this.props.drag.columns}
 *        previewMove={this.props.drag.placeholder}
 *        onScrolledToTop={this.onScrolledToTop}
 *        onScrolledToBottom={this.onScrolledToBottom}
 *        onCancel={this.onCancel}
 *        onDrop={this.onDrop}
 *        onDrag={this.onDrag}
 *        contentType={contentType}
 *    />
 */

class MultiDragStateless extends React.Component {
    static displayName = "MultiDragStateless";

    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        columns: PropTypes.arrayOf(
            PropTypes.shape({
                labelEmpty: PropTypes.string,
                name: PropTypes.string,
                filter: PropTypes.string,
                rows: PropTypes.array
            })
        ).isRequired,
        showSearchOnAllColumns: PropTypes.bool,
        showSearch: PropTypes.bool,
        showCategoryFilterOnAllColumns: PropTypes.bool,
        showCategoryFilter: PropTypes.bool,
        // react doesn't wrap the PropTypes.shape validator with,
        // so can't specify shape of object for previewMove otherwise it won't re-render
        previewMove: PropTypes.object,
        categoryList: PropTypes.arrayOf(PropTypes.string),
        contentType: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.func
        ]),
        classNames: PropTypes.arrayOf(
            PropTypes.string
        ),
        // callbacks
        onSearch: PropTypes.func.isRequired,
        onDrag: PropTypes.func.isRequired,
        onDrop: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        onScrolledToBottom: PropTypes.func,
        onScrolledToTop: PropTypes.func,
        // optional items
        labelEmpty: PropTypes.string,
        customSort: PropTypes.func,
        disabled: PropTypes.bool,
        onDragStart: PropTypes.func,
        onDragEnd: PropTypes.func,
        strings: PropTypes.objectOf(PropTypes.string),
        flags: PropTypes.arrayOf(PropTypes.string),
    };

    static defaultProps = {
        "data-id": "multi-drag",
        classNames: ["row-selector__available", "row-selector__added"],
        showSearchOnAllColumns: false,
        showSearch: false,
        disabled: false,
        showCategoryFilter: true,
        showCategoryFilterOnAllColumns: false,
        strings: {}
    };

    /*
     * This function will compare the current move to the last reported drag and if there is no change
     * return null, otherwise the MoveDescriptor
     */
    _changedSinceLastDrag = (targetIndex, beingDraggedIndex, targetColumn, beingDraggedColumn) => {
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
    };

    /*
     * Check the MoveDescriptor and block moving from the current position the same position or
     * the one position higher.
     */
    _isValidDrag = () => {
        return !(
            this._lastDrag &&
            this._lastDrag.from.column === this._lastDrag.to.column &&
            (
                this._lastDrag.from.index - this._lastDrag.to.index === 0
            )
        );
    };

    /*
     * Apply the last valid move
     */
    _onCancel = (droppedInContainer) => {
        // only apply drop if row dragged within a valid drop target
        // otherwise you can't cancel a drag that has started
        if ((this._lastDrag && this._isValidDrag()) && droppedInContainer) {
            this.props.onDrop(this._lastDrag);
        }
        this._lastDrag = null;
        this.props.onCancel();
    };

    /*
     * Determines if the current onDrag call has changed since the last call, and if so executes the
     * component's onDrag callback.
     */
    _onDrag = (targetIndex, beingDraggedIndex, targetColumn, beingDraggedColumn) => { //eslint-disable-line
        const desc = this._changedSinceLastDrag(targetIndex, beingDraggedIndex, targetColumn, beingDraggedColumn);

        // if nothing has changed, dont execute the callback
        if (!desc || typeof(targetIndex) === "undefined") {
            return;
        }

        this._lastDrag = desc;

        if (this._isValidDrag()) {
            this.props.onDrag(desc);
        }
    };

    /*
     * Dont actually need to implement onDrop because onCancel is always called and we want to
     * apply the last previewed move, even if the mouse is currently over an undroppable object.
     *
     * Only here because DragDropRow mandates passing something
     */
    _onDrop = () => {
    };

    _renderColumn = (column, index) => {
        const {
            column: prevColumn,
            index: prevIndex
        } = this.props.previewMove || {};

        let ghostRowAt = prevColumn === index ? prevIndex : null;

        // don't increment if ghostRowAt is null, otherwise a preview row
        // gets created in each column.
        // not applicable if from or to index is for a different column.
        if ((this._lastDrag && this._lastDrag.from.index < this._lastDrag.to.index) &&
            (this._lastDrag.from.column === this._lastDrag.to.column) &&
            ghostRowAt !== null) {
            ghostRowAt += 1;
        }

        const showCategoryFilter = (this.props.showCategoryFilter && index === 0) ||
            this.props.showCategoryFilterOnAllColumns;
        const categoryList = showCategoryFilter ? this.props.categoryList : null;
        const contentType = this.props.contentType ||
            <MultiDragRow onRemove={this.props.onRemove} onAdd={this.props.onAdd} />;

        return (
            <DragDropColumn
                // Columns can have their own labelEmpty; this lets this.props.labelEmpty
                // be the default
                labelEmpty={this.props.labelEmpty}
                {...column}
                categoryList={categoryList}
                key={index}
                index={index}
                disableSort={index === 0}
                rows={column.filteredRows}
                onScrolledToBottom={this.props.onScrolledToBottom}
                onScrolledToTop={this.props.onScrolledToTop}
                onDrag={this._onDrag}
                onDrop={this._onDrop}
                onDragStart={this.props.onDragStart}
                onDragEnd={this.props.onDragEnd}
                onCancel={this._onCancel}
                onCategoryClick={this.props.onCategoryClick}
                onCategoryToggle={this.props.onCategoryToggle}
                onAdd={this.props.onAdd}
                onRemove={this.props.onRemove}
                ghostRowAt={ghostRowAt}
                dragToEdge={true}
                className={this.props.classNames[index]}
                contentType={contentType}
                data-id={"DragDropColumn-" + index}
                showCount={index > 0}
                strings={this.props.strings}
                flags={this.props.flags}
            />
        );
    }

    _renderSearch = (column, index) => {
        const handleSearch = (value) => this.props.onSearch(index, value);

        return (
            <FormSearchBox
                data-id={`search-${index}`}
                key={`search-${index}`}
                onValueChange={handleSearch}
                className="input-search row-selector__search"
                placeholder={`Search ${column.searchName || column.name}`}
                showClear={true}
                value={column.search}
            />
        );
    };

    render() {
        const className = classnames(
            "input-row row-selector",
            this.props.className, {
                "row-selector--disabled": this.props.disabled
            }
        );

        const {
            columns,
            "data-id": dataId,
            showSearch,
            showSearchOnAllColumns
        } = this.props;

        return (
            <div data-id={dataId} className={className}>
                <div key="search-row" className="row-selector__search-row">
                    {columns.map((column, index) => (
                        (showSearch && index === 0) || showSearchOnAllColumns
                        ? this._renderSearch(column, index)
                        : <div key={"search"+column.name} className="row-selector__search"/>
                    ))}
                </div>
                <div key="columns" className="row-selector__columns">
                {
                    columns.map(this._renderColumn)
                }
                </div>
            </div>
        );
    }
}

class MultiDragStateful extends React.Component {
    static displayName = "MultiDragStateful";

    static propTypes = {
        filterFieldNames: PropTypes.arrayOf(PropTypes.string)
    };

    static defaultProps = {
        filterFieldNames: [],
    };

    state = {
        columns: this.props.columns,
        placeholder: null,
        showCategoryList: false,
    };

    _handleSearch = (index, value) => {
        this.setState(
            search(this.state, {
                column: index,
                filter: value,
                fieldName: this.props.filterFieldNames[index] || "name"
            }),
            function () {
                if (this.props.onSearch) {
                    this.props.onSearch(index, value);
                }
            }
        );
    };

    _handleAdd = (from) => {
        if (this.props.onAdd) {
            this.props.onAdd(from);
        } else {
            this._handleDrop({ from: from, to: { column: 1, index: 0 } });
        }
    }

    _handleCategoryToggle = (index) => {
        const showing = this.state.columns[index].showCategoryList || false;

        this.setState(
            update(this.state).set(
                ["columns", index, "showCategoryList"],
                !showing
            ).end()
        );
    };

    _handleCategoryClick = (index, value) => {
        // use remutable to set state.colums[index].category to the new value
        const next = update(this.state).set(["columns", index, "category"], value).end();

        this.setState(
            // update the filteredRows
            reapplyFilters(next, this.props.customSort),
            function() {
                if (this.props.onCategoryClick) {
                    this.props.onCategoryClick(index, value);
                }
                this._handleCategoryToggle(index);
            }
        );
    };

    _handleCancel = () => {
        this.setState({
            placeholder: null
        }, () => {
            if (this.props.onCancel) {
                this.props.onCancel();
            }
        });
    };

    _handleDrop = (desc) => {
        const {
            from: convertedFrom,
            to: convertedTo
        } = convertFilteredIndexes(this.state.columns, desc);

        const {
            from,
            to
        } = desc;

        // reapply filters after a move so moved rows filtered as well
        const next = reapplyFilters(
            move(this.state, {
                from: {
                    column: from.column,
                    index: convertedFrom
                },
                to: {
                    column: to.column,
                    index: convertedTo
                }
            }),
            this.props.customSort
        );

        this.setState(next, () => {
            if (this.props.onDrop) {
                this.props.onDrop({
                    from: {
                        convertedIndex: convertedFrom,
                        ...from
                    },
                    to: {
                        convertedIndex: convertedTo,
                        ...to
                    }
                }, next.columns);
            }
        });
    };

    _handleDrag = (desc) =>
        this.setState({
            placeholder: desc.to
        }, () => {
            if (this.props.onDrag) {
                this.props.onDrag(desc, this.props.columns);
            }
        });

    _handleRemove = (from) => {
        if (this.props.onRemove) {
            this.props.onRemove(from);
        } else {
            this._handleDrop({ from: from, to: { column: 0, index: 0 } });
        }
    }

    componentWillMount() {
        // apply any initial filters
        this.setState({
            ...reapplyFilters(this.state, this.props.customSort)
        });
    }

    componentWillReceiveProps({ columns: nextCols, customSort }) {
        if (!_.isEqual(nextCols, this.props.columns) || !_.isEqual(customSort, this.props.customSort)) {
            this.setState((prevState) => reapplyFilters(prevState, customSort || this.props.customSort));
        }
    }

    render() {
        return (<MultiDragStateless {...{
            ...this.props,
            ref: "MultiDragStateless",
            onSearch: this._handleSearch,
            onCategoryClick: this._handleCategoryClick,
            onCategoryToggle: this._handleCategoryToggle,
            columns: this.state.columns,
            previewMove: this.state.placeholder,
            onAdd: this._handleAdd,
            onCancel: this._handleCancel,
            onDrop: this._handleDrop,
            onDrag: this._handleDrag,
            onRemove: this._handleRemove
        }} />);
    }
}

class MultiDrag extends React.Component {
    static displayName = "MultiDrag";

    static propTypes = {
        stateless: PropTypes.bool
    };

    static defaultProps = {
        stateless: false
    };

    componentWillMount() {
        if (!Utils.isProduction() && this.props.controlled !== undefined) {
            throw new Error(Utils.deprecatePropError("controlled", "stateless"));
        }
    }

    render() {
        return this.props.stateless
            ? <MultiDragStateless {...this.props} ref="MultiDragStateless" />
            : <MultiDragStateful {...this.props} ref="MultiDragStateful" />;
    }
}


MultiDrag.convertFilteredIndexes = convertFilteredIndexes;

module.exports = MultiDrag;
