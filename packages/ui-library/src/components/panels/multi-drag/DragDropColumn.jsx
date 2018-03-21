var PropTypes = require("prop-types");
var React = require("react"),
    ReactDOM = require("react-dom"),
    DragDropRow = require("../../rows/DragDropRow"),
    LinkDropDownList = require("../../forms/LinkDropDownList"),
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
 * @param {object} contentType
 *    A react component to be used as a template for rendering rows.
 * @param {string} [labelEmpty]
 *    The placeholder string for when a column is empty.
 * @param {string} [className]
 *    CSS classes to set on the top-level HTML container.
 * @param {number} [ghostRowAt]
 *    Display a ghost row to preview where a row would be inserted
 * @param {boolean} [disableSort=false]
 *    Determines whether the column in internally sortable
 * @param {number} [dragToEdge=false]
 *    If true, the drag index will only increment when the drag location has passed the edge of the row instead
 *    of being incremented after the halfway mark which is the default behaviour.
 *
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
module.exports = class extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        rows: PropTypes.arrayOf(
            PropTypes.object
        ).isRequired,
        name: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        filterCategory: PropTypes.string,
        categoryList: PropTypes.arrayOf(PropTypes.string),
        contentType: PropTypes.element.isRequired,
        labelEmpty: PropTypes.string,
        // optional
        ghostRowAt: PropTypes.number,
        className: PropTypes.string,
        disableSort: PropTypes.bool,
        dragToEdge: PropTypes.bool,
        strings: PropTypes.objectOf(PropTypes.string),
        // callbacks
        onDrag: PropTypes.func.isRequired,
        onDrop: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        onScrolledToBottom: PropTypes.func,
        onScrolledToTop: PropTypes.func,
        onDragStart: PropTypes.func,
        onDragEnd: PropTypes.func
    };

    static defaultProps = {
        "data-id": "drag-drop-column",
        onScrolledToBottom: _.noop,
        onScrolledToTop: _.noop,
        labelEmpty: "No Items Added",
        onDragStart: _.noop,
        onDragEnd: _.noop,
        dragToEdge: false,
        strings: {}
    };

    /*
     * Handler for scrolls.  This is useful for implementing lazy loading of rows
     */
    _handleScroll = () => {
        var container = ReactDOM.findDOMNode(this.refs.items);
        var rect = container.getBoundingClientRect();

        if (container.scrollTop === 0) {
            this.props.onScrolledToTop(this.props.index);
        } else if (container.scrollTop + rect.height === container.scrollHeight) {
            this.props.onScrolledToBottom(this.props.index);
        }
    };

    /*
     * Renders a drag/drop from give a data object
     */
    _renderRow = (row, index, opts) => {
        var inner = opts && opts.content;

        if (!inner) {
            var props = _.extend({ column: this.props.index, index: index, "data-id": row.id }, row);
            inner = React.cloneElement(this.props.contentType, props);
        }

        return (
            <DragDropRow id={row.id} key={row.id} index={index}
                disabled={opts && opts.disabled}
                column={this.props.index}
                onDrag={this._handleDrag}
                onDrop={this.props.onDrop}
                onDragStart={this.props.onDragStart}
                onDragEnd={this.props.onDragEnd}
                onCancel={this.props.onCancel}
                dragToEdge={this.props.dragToEdge}
            >
                {inner}
            </DragDropRow>);
    };

    _renderRows = () => {
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
    };

    _getCategoryOptions = () => {
        if (this.props.categoryList) {
            return [{
                id: "",
                label: this.props.strings.defaultCategoryOption || "All"
            }].concat(
                this.props.categoryList.map(item => ({
                    id: item,
                    label: item
                }))
            );
        } else {
            return [];
        }
    };

    _handleCategoryToggle = () => {
        this.props.onCategoryToggle(this.props.index);
    };

    _handleCategoryClick = value => {
        this.props.onCategoryClick(this.props.index, value.id);
    };

    _handleDrag = (targetIndex, beingDraggedIndex, targetColumn, beingDraggedColumn) => {
        if (targetColumn === beingDraggedColumn && this.props.disableSort) {
            return;
        }

        this.props.onDrag(targetIndex, beingDraggedIndex, targetColumn, beingDraggedColumn);
    };

    render() {

        const className = classnames(
            this.props.className, {
                "disable-sort": this.props.disableSort
            }
        );

        const categoryOptions = this._getCategoryOptions();
        const selectedCategory = _.find(categoryOptions, option => option.id === (this.props.category || ""));
        const title = this.props.categoryList
            ? `${this.props.name} ${this.props.strings.filteredByLabel || "filtered by"}:`
            : this.props.name;

        return (
            <div data-id={this.props["data-id"]} className={className}>

                <div className="row-selector__column-header">
                    <span className="row-selector__column-title">{title}</span>
                    {this.props.categoryList &&
                        <LinkDropDownList
                            className="row-selector__category-selector"
                            open={this.props.showCategoryList}
                            label={selectedCategory.label}
                            stateless={true}
                            onClick={this._handleCategoryClick}
                            onToggle={this._handleCategoryToggle}
                            options={categoryOptions}
                        />
                    }
                    {this.props.showCount &&
                        <span className="row-selector__column-count">{this.props.rows.length}</span>
                    }
                </div>

                <div className="items" onScroll={this._handleScroll} ref="items">
                    { this._renderRows() }
                </div>
            </div>);
    }
};
