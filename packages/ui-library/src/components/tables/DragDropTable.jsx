var PropTypes = require("prop-types");
var React = require("react");
var ReactDOM = require("react-dom");
var DragDrop = require("../rows/DragDrop.jsx");
var InfiniteScroll = require("../list/InfiniteScroll.jsx");
var classnames = require("classnames");
var _ = require("underscore");
var uuid = require("uuid");

var Head = function (props) {
    var dataId = props.fixed ? props["data-id"] + "-fixedHead" : props["data-id"] + "-Head";
    return (
        <div data-id={dataId} className={classnames("thead", props.fixed && "fixed")}>
            <div className="tr">
                {props.columnOrder.map(function (headIndex, index) {
                    var style = props.widths
                        ? { minWidth: props.widths[headIndex], maxWidth: props.widths[headIndex] }
                        : null;
                    var className = classnames(props.getDropClass(props.headData[headIndex], index), "th");
                    return (
                            <DragDrop
                                    key={index}
                                    id={index}
                                    index={index}
                                    onDrag={props.onDrag}
                                    style={style}
                                    type="column"
                                    className={className}
                                    onDrop={props.onDrop}
                                    onCancel={props.onCancel}>
                                        { (props.headContentType)
                                            ? React.cloneElement(
                                                    props.headContentType,
                                                    _.defaults(
                                                        { id: headIndex,
                                                          key: headIndex,
                                                          index: headIndex,
                                                          data: props.headData[headIndex] }
                                                    )
                                                )
                                            : props.headData[headIndex]
                                        }
                            </DragDrop>
                    );
                })}
            </div>
        </div>
    );
};

var Body = function (props) {
    return (<div data-id={props["data-id"]} className={classnames(props.bodyClassName, "tbody")}>
        { props.bodyData.map(function (row, index) {
            return (
                <div className="tr" key={index}>
                    { props.columnOrder.map(function (columnIndex, dataIndex) {
                        var dragClass = props.beingDragged === dataIndex ? "dragging": null;
                        var style = props.widths
                            ? { minWidth: props.widths[columnIndex], maxWidth: props.widths[columnIndex] }
                            : null;
                        return (
                            <div
                                className={classnames(props.getDropClass(row[columnIndex], dataIndex), dragClass, "td")}
                                style={style}
                                key={columnIndex}>
                                {row[columnIndex]}
                            </div>
                        );
                    })}
                </div>
            );
        })}
    </div>);
};

var ISBody = function (props) {
    return (<div data-id={props["data-id"]} className={classnames(props.bodyClassName, "infinite-scroll-wrapper")}>
        <InfiniteScroll
            {...props.infiniteScroll}
            contentType={<ISRow {...props}/>}
            onScroll={props.onISScroll}
            batches={
                props.infiniteScroll.batches || [{ id: 1, data: props.bodyData }]}
            />
    </div>);
};


var ISRow = function (props) {
    return (<div>
        { props.columnOrder.map(function (columnIndex, dataIndex) {
            var dragClass = props.beingDragged === dataIndex ? "dragging": null;
            var style = props.widths
                ? { minWidth: props.widths[columnIndex], maxWidth: props.widths[columnIndex] }
                : null;
            return (
                <div key={uuid.v4()}
                    className={classnames(props.getDropClass(props[columnIndex], dataIndex), "td", dragClass)}
                    style={style}>
                    {props[columnIndex]}
                </div>
            );
        })}
    </div>);
};

/**
 * @callback DragDropTable~onDrag
 * @param {number} targetIndex
 *          current target index where items is dragged over or dropped
 * @param {number} sourceIndex
 *          origin index item is dragged or dropped from
 */

/**
 * @callback DragDropTable~onDrop
 * @param {number} targetIndex
 *          current target index where items is dragged over or dropped
 * @param {number} sourceIndex
 *          origin index item is dragged or dropped from
 */

/**
 * @callback DragDropTable~onCancel
 */

/**
 * @class DragDropTable
 *
 * @desc A stateless wrapper for the DragDrop component that provides table markup based on data
 *
 * @param {DragDrop~onDrag} onDrag
 *          A callback which is execute when the row is moved.  Must have signature function (targetIndex, ownIndex)
 * @param {DragDrop~onDrop} onDrop
 *          A callback which is execute when the row is dropped.  Must have signature function (targetIndex, ownIndex)
 * @param {DragDrop~onCancel} onCancel
 *          A callback which is executed when the dragging is cancelled (dropped outside a droppable area
 *          or esc button pressed).
 *
 * @param {array} headData
 *          An array of values for the table head
 * @param {array} [bodyData]
 *          An array of arrays for the body that are ordered in the same was as the headData
 * @param {array} [columnOrder]
 *          An array of values to represent the order of the columns
 * @param {object} [headContentType]
 *          A React object that can be used as a wrapper for the th elements. Receives id, key, index and data as props.
 * @param {string} [className="report-table"]
 *          Classname for the parent table
 * @param {number} [beingDragged]
 *          Index in the headData array that corresponds with the dragging item
 * @param {number} [dropTarget]
 *          Index in the headData array that corresponds with the item drop zone
 * @param {boolean} [fixedHead=true]
 *          Fixes the table header for vertical scrolling
 * @param {object} [infiniteScroll]
 *          Props to pass to the InfiniteScroll component. If included InfiniteScroll is automatically enabled.
 *
 * @example
 *
 * <DragDropTable
 *      data-id = "drag-drop-table"
 *      headData={this.state.headings}
 *      columnOrder={this.state.order}
 *      headContentType={this._getHeadContentType()}
 *      bodyData={this.state.rows}
 *      beingDragged={this.state.beingDragged}
 *      dropTarget={this.state.dropTarget}
 *      onDrag={this._onDrag}
 *      onDrop={this._onDrop}
 *      onCancel={this._onCancel} />
 *
 */

class DragDropTable extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        onDrag: PropTypes.func.isRequired,
        onDrop: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        headData: PropTypes.array.isRequired,
        bodyData: PropTypes.array,
        columnOrder: PropTypes.array,
        headContentType: PropTypes.object,
        className: PropTypes.string,
        beingDragged: PropTypes.number,
        dropTarget: PropTypes.number,
        fixedHead: PropTypes.bool,
        infiniteScroll: PropTypes.object
    };

    static defaultProps = {
        "data-id": "drag-drop-table",
        className: "report-table",
        fixedHead: false
    };

    state = {
        columnWidths: null
    };

    _setWidths = () => {
        //this function reads the width of the initial table columns and uses it to set widths for the fixed table
        var thisElement = ReactDOM.findDOMNode(this);
        var tableHead = thisElement.getElementsByClassName("thead");
        var headerTh = tableHead[0].getElementsByClassName("th");

        var order = this.props.columnOrder || _.range(this.props.headData.length).map(Number.call, Number);
        var widths = new Array(this.props.headData.length);

        order.map(function (columnIndex, index) {
            var element = headerTh[index];
            widths[columnIndex] = element.getBoundingClientRect().width ;
        });

        this.setState({ columnWidths: widths });
    };

    _handleHorizontalScroll = (e) => {
        if (this.initialX === e.currentTarget.scrollLeft) {
            return;
        }
        this.tableHead.style.left = -(e.currentTarget.scrollLeft) + "px";
        this.initialX = e.currentTarget.scrollLeft;
    };

    _handleISHorizontalScroll = (param, e) => {
        this._handleHorizontalScroll(e);
    };

    _infiniteScrollRef = (component) => {
        this.infiniteScrollNode = ReactDOM.findDOMNode(component);
    };

    _getDropClass = (item, index) => {
        var dragRight= this.props.headData.length - 1 === index &&
                this.props.dropTarget === this.props.headData.length;
        return classnames("dd-column", { "drag-left": this.props.dropTarget === index }, { "drag-right": dragRight });
    };

    componentDidMount() {
        if (this.props.fixedHead && !this.state.columnWidths) {
            //Because componentDidMount is called before the dom is painted, the timeout is required to make sure the measured widths are accurate
            setTimeout(function () {
                this._setWidths();
            }.bind(this), 0);
        }
        var thisElement = ReactDOM.findDOMNode(this);
        this.tableHead = ReactDOM.findDOMNode(thisElement.getElementsByClassName("thead")[0]);
        this.intialY = 0;
    }

    render() {
        var order = this.props.columnOrder || _.range(this.props.headData.length).map(Number.call, Number);
        var bodyData = this.props.infiniteScroll
            ? (this.props.infiniteScroll.batches[0].data || this.props.bodyData)
            : this.props.bodyData;

        var infiniteScrollActive = this.props.infiniteScroll && this.state.columnWidths;
        var fixedHeadActive = (this.props.fixedHead || this.props.infiniteScroll) && this.state.columnWidths;

        var props = _.defaults({
            columnOrder: order,
            getDropClass: this._getDropClass,
            widths: this.state.columnWidths,
            fixed: fixedHeadActive,
            bodyData: bodyData,
            onISScroll: infiniteScrollActive ? this._handleISHorizontalScroll : null
        }, this.props);

        var onScroll = (fixedHeadActive && !infiniteScrollActive) ? this._handleHorizontalScroll : null;

        if (this.props.infiniteScroll) {
            this.props.infiniteScroll.ref = this._infiniteScrollRef;
        }

        var tableHead = <Head {...props} />;
        var tableBody = this.props.infiniteScroll && this.state.columnWidths
            ? <ISBody {...props} />
            : <Body {...props} />;

        var className = classnames(
            this.props.className,
            { "infinite-scroll-container": infiniteScrollActive },
            { "fixed-head": fixedHeadActive },
            { "has-next": infiniteScrollActive && this.props.infiniteScroll.hasNext }
        );

        return (
            <div data-id={this.props["data-id"]} className={className}>
                <div className="dd-table-container" onScroll={onScroll} data-id={this.props["data-id"] + "-container"}>
                    <div className="table" data-id={this.props["data-id"] + "-table"}>
                        {tableHead}
                        {tableBody}
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = DragDropTable;
